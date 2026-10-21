import * as THREE from 'three';
import { RAPIER, GROUPS } from '../core/physics.js';
import { Portal, TUNNEL_DEPTH } from './Portal.js';
import { computeTeleport } from './portalMath.js';
import { CUBE_HALF } from '../world/entityVisuals.js';

const _v = new THREE.Vector3();
const _v2 = new THREE.Vector3();
const _local = new THREE.Vector3();
const _n = new THREE.Vector3();
const _nW = new THREE.Vector3();
const _c = new THREE.Vector3();
const _up = new THREE.Vector3();
const _right = new THREE.Vector3();
const _q = new THREE.Quaternion();
const _m = new THREE.Matrix4();
const _ray = new RAPIER.Ray({ x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 1 });
const AXES = ['x', 'y', 'z'];

/** 物体缩放的上下限，防止反复穿门后变得无限大或无限小 */
export const MIN_SCALE = 0.15;
export const MAX_SCALE = 2.6;

/**
 * 管理所有传送门：玩家的蓝/橙门，以及关卡里成对出现的“空间门”。
 * 负责开门判定、物体穿越（含缩放）、穿门时的碰撞过滤。
 */
export class PortalSystem {
  constructor(game) {
    this.game = game;
    this.blue = new Portal('blue');
    this.orange = new Portal('orange');
    this.blue.other = this.orange;
    this.orange.other = this.blue;
    this.gates = [];
    this.list = [this.blue, this.orange];
    // 每个方块当前需要忽略的碰撞体：Map<方块碰撞体句柄, Set<墙体句柄>>
    this.cubeFilter = new Map();
    const filter = this.cubeFilter;
    this.hooks = {
      filterContactPair(h1, h2) {
        const a = filter.get(h1);
        if (a && a.has(h2)) return null;
        const b = filter.get(h2);
        if (b && b.has(h1)) return null;
        return RAPIER.SolverFlags.COMPUTE_IMPULSE;
      },
      filterIntersectionPair() {
        return true;
      },
    };
  }

  get(color) {
    return color === 'blue' ? this.blue : this.orange;
  }

  addToScene(scene) {
    this.scene = scene;
    for (const p of [this.blue, this.orange]) {
      scene.add(p.mesh);
      scene.add(p.light);
    }
  }

  reset() {
    for (const p of [this.blue, this.orange]) {
      p.remove();
      p.fixed = false;
      p.setSize(1);
    }
    for (const g of this.gates) {
      this.scene.remove(g.mesh);
      g.mesh.geometry.dispose();
      g.material.dispose();
    }
    this.gates = [];
    this.list = [this.blue, this.orange];
    this.cubeFilter.clear();
  }

  _updatePair(a) {
    const b = a.other;
    if (a.placed && b && b.placed) {
      a.teleportScale = computeTeleport(a, b, a.teleport, a.teleportQ);
      b.teleportScale = computeTeleport(b, a, b.teleport, b.teleportQ);
    }
  }

  _updateTransforms() {
    this._updatePair(this.blue);
  }

  /** 门后“隧道”范围里的所有静态碰撞体：穿门时这些墙体会暂时失效 */
  _computeTunnel(portal) {
    portal.tunnel.clear();
    const world = this.game.world;
    const depth = Math.max(TUNNEL_DEPTH, portal.halfH * 1.6);
    const center = _v.copy(portal.position).addScaledVector(portal.normal, -(depth / 2 + 0.01));
    _q.copy(portal.quaternion);
    const shape = new RAPIER.Cuboid(portal.halfW * 0.92, portal.halfH * 0.92, depth / 2);
    world.intersectionsWithShape(center, _q, shape, (col) => {
      const info = this.game.colliderInfo.get(col.handle);
      if (info && (info.kind === 'brush' || info.kind === 'door')) portal.tunnel.add(col.handle);
      return true;
    });
    if (portal.surface) portal.tunnel.add(portal.surface.handle);
  }

  _surfaceAt(pos, n) {
    _ray.origin = { x: pos.x + n.x * 0.2, y: pos.y + n.y * 0.2, z: pos.z + n.z * 0.2 };
    _ray.dir = { x: -n.x, y: -n.y, z: -n.z };
    const hit = this.game.world.castRay(_ray, 0.6, true, RAPIER.QueryFilterFlags.EXCLUDE_SENSORS | RAPIER.QueryFilterFlags.EXCLUDE_DYNAMIC);
    return hit ? hit.collider : null;
  }

  placeFixed(def) {
    const p = this.get(def.color ?? 'orange');
    const pos = new THREE.Vector3(...def.pos);
    const n = new THREE.Vector3(...(def.normal ?? [0, 0, 1])).normalize();
    const up = new THREE.Vector3(...(def.up ?? [0, 1, 0])).normalize();
    p.setSize(def.size ?? 1);
    p.place(pos, n, up, this._surfaceAt(pos, n));
    p.fixed = true;
    p.openT = 1;
    this._computeTunnel(p);
    this._updateTransforms();
  }

  /**
   * 空间门：一对固定连通的门，可以是无缝的矩形门洞，两端大小可以不同（穿过会缩放）。
   * def: { a:{pos,normal,up}, b:{pos,normal,up}, size:[宽,高], sizeB, shape, frame, when }
   */
  addGateway(def) {
    const [w, h] = def.size ?? [2, 3];
    const [wb, hb] = def.sizeB ?? [w * ((def.sizeB?.[1] ?? h) / h), def.sizeB?.[1] ?? h];
    const shape = def.shape ?? 'rect';
    const seamless = !def.frame;
    const a = new Portal('gate', { shape, seamless, halfW: w / 2, halfH: h / 2 });
    const b = new Portal('gate', { shape, seamless, halfW: wb / 2, halfH: hb / 2 });
    for (const [p, end] of [
      [a, def.a],
      [b, def.b],
    ]) {
      p.gateway = true;
      p.fixed = true;
      p.def = def;
      if (def.color) p.material.uniforms.color.value.set(def.color);
      if (this.game.level?.fog) p.material.uniforms.fallback.value.set(this.game.level.fog.color ?? 0x07090b);
      const pos = new THREE.Vector3(...end.pos);
      const n = new THREE.Vector3(...end.normal).normalize();
      const up = new THREE.Vector3(...(end.up ?? [0, 1, 0])).normalize();
      p.place(pos, n, up, this._surfaceAt(pos, n));
      this.scene.add(p.mesh);
    }
    a.other = b;
    b.other = a;
    // oneWay: 'ab' 只能从 a 进、b 出；'ba' 反之。只出不进的那一端看起来就是普通墙面
    if (def.oneWay === 'ab') b.exitOnly = true;
    if (def.oneWay === 'ba') a.exitOnly = true;
    for (const p of [a, b]) p.setActive(p.active);
    this._computeTunnel(a);
    this._computeTunnel(b);
    this._updatePair(a);
    this.gates.push(a, b);
    this.list.push(a, b);
    return [a, b];
  }

  /**
   * 计算开门位置。返回 { ok, position, normal, up, collider, size, reason }
   * 规则：必须打在白色面板上（面板种类决定门的大小）；门整个落在同一块面板内（放不下就自动往里推）；
   * 不和另一扇门重叠（重叠就推开）；门洞范围内没有别的东西挡着。
   */
  computePlacement(color, hit, viewDir) {
    const info = this.game.colliderInfo.get(hit.collider.handle);
    if (!info || info.kind !== 'brush' || !info.portalable) return { ok: false, reason: 'surface' };
    const size = info.portalSize ?? 1;
    const HW = 0.62 * size;
    const HH = 1.12 * size;
    const b = info.def;
    // 斜放的面板：先把命中点换算到“没转过”的局部坐标里算，最后再转回世界
    const Q = info.quat;
    const QI = Q ? Q.clone().invert() : null;
    const C = _c.set(...b.pos);
    const toLoc = (p, out) => (Q ? out.copy(p).sub(C).applyQuaternion(QI).add(C) : out.copy(p));
    const toWld = (p, out) => (Q ? out.copy(p).sub(C).applyQuaternion(Q).add(C) : out.copy(p));
    const dirLoc = (d, out) => (Q ? out.copy(d).applyQuaternion(QI) : out.copy(d));
    const dirWld = (d, out) => (Q ? out.copy(d).applyQuaternion(Q) : out.copy(d));

    const nW = _nW.set(hit.normal.x, hit.normal.y, hit.normal.z);
    const n = dirLoc(nW, _n);
    const k = Math.abs(n.x) > 0.9 ? 0 : Math.abs(n.y) > 0.9 ? 1 : Math.abs(n.z) > 0.9 ? 2 : -1;
    if (k < 0) return { ok: false, reason: 'surface' };
    const sg = Math.sign(n.getComponent(k));
    n.set(0, 0, 0).setComponent(k, sg);
    dirWld(n, nW); // 对齐到面板真正的法线

    // 门的“上”方向：墙面上永远朝上（世界的上）；平躺的面（地面、天花板）朝着玩家视线方向。
    // 平躺的窄条面板放不下斜着的门时，改成沿面板长边摆正
    const ups = [];
    const wu = _v2.set(0, 1, 0);
    const proj = _v.copy(wu).addScaledVector(nW, -wu.dot(nW));
    if (proj.length() > 0.5) ups.push(dirLoc(proj.normalize(), new THREE.Vector3()));
    else {
      const v = _v.set(viewDir.x, viewDir.y, viewDir.z);
      v.addScaledVector(nW, -v.dot(nW));
      if (v.lengthSq() < 1e-4) v.crossVectors(nW, _v2.set(1, 0, 0));
      if (v.lengthSq() < 1e-4) v.crossVectors(nW, _v2.set(0, 0, 1));
      v.normalize();
      const vl = dirLoc(v, new THREE.Vector3());
      ups.push(vl);
      const ua0 = (k + 1) % 3;
      const va0 = (k + 2) % 3;
      const ax = new THREE.Vector3();
      if (Math.abs(vl.getComponent(ua0)) > Math.abs(vl.getComponent(va0))) ax.setComponent(ua0, Math.sign(vl.getComponent(ua0)));
      else ax.setComponent(va0, Math.sign(vl.getComponent(va0)) || -1);
      ups.push(ax, new THREE.Vector3().crossVectors(n, ax));
    }

    const ua = (k + 1) % 3;
    const va = (k + 2) % 3;
    const min = (a) => b.pos[a] - b.size[a] / 2;
    const max = (a) => b.pos[a] + b.size[a] / 2;
    const plane = b.pos[k] + n.getComponent(k) * (b.size[k] / 2);
    let lo;
    let hi;
    let fits = false;
    for (const u of ups) {
      _up.copy(u);
      _right.crossVectors(_up, n).normalize();
      const hu = Math.hypot(HW * _right.getComponent(ua), HH * _up.getComponent(ua));
      const hv = Math.hypot(HW * _right.getComponent(va), HH * _up.getComponent(va));
      lo = [min(ua) + hu, min(va) + hv];
      hi = [max(ua) - hu, max(va) - hv];
      if (lo[0] <= hi[0] + 1e-4 && lo[1] <= hi[1] + 1e-4) {
        fits = true;
        break;
      }
    }
    if (!fits) return { ok: false, reason: 'small' };
    const clampUV = (c) => {
      c[0] = THREE.MathUtils.clamp(c[0], lo[0], hi[0]);
      c[1] = THREE.MathUtils.clamp(c[1], lo[1], hi[1]);
      return c;
    };
    const hp = toLoc(_v.set(hit.point.x, hit.point.y, hit.point.z), _v2);
    let c = clampUV([hp.getComponent(ua), hp.getComponent(va)]);
    const toLocal0 = (cc, out) => out.set(0, 0, 0).setComponent(k, plane).setComponent(ua, cc[0]).setComponent(va, cc[1]);
    const toWorld = (cc, out) => toWld(toLocal0(cc, out), out);
    const rightW = dirWld(_right, new THREE.Vector3());
    const upW = dirWld(_up, new THREE.Vector3());

    // 和同一平面上的其它门重叠时，把新门推开
    const others = this.list.filter((o) => o !== this.get(color) && o.placed);
    for (const other of others) {
      if (!(Math.abs(other.normal.dot(nW) - 1) < 1e-3 && Math.abs(other.signedDistance(toWorld(c, _v))) < 0.02)) continue;
      const overlaps = (cc) => this._ellipsesOverlap(toWorld(cc, _v), rightW, upW, HW, HH, other);
      if (!overlaps(c)) continue;
      const oc = toLoc(other.position, _v2);
      const o2 = [oc.getComponent(ua), oc.getComponent(va)];
      let dx = c[0] - o2[0];
      let dy = c[1] - o2[1];
      let len = Math.hypot(dx, dy);
      if (len < 1e-3) {
        dx = _right.getComponent(ua);
        dy = _right.getComponent(va);
        len = Math.hypot(dx, dy);
      }
      dx /= len;
      dy /= len;
      let found = null;
      for (let s = 0.05; s <= 3.0 * Math.max(1, size); s += 0.05) {
        const cc = clampUV([c[0] + dx * s, c[1] + dy * s]);
        if (!overlaps(cc)) {
          found = cc;
          break;
        }
      }
      if (!found) return { ok: false, reason: 'overlap' };
      c = found;
    }
    const pos = toWorld(c, new THREE.Vector3());

    // 门洞内采样检查：每个采样点往墙里打一条短射线，必须先碰到同一块面板
    const samples = [[0, 0]];
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      samples.push([Math.cos(a) * 0.92, Math.sin(a) * 0.92]);
    }
    const world = this.game.world;
    for (const [sx, sy] of samples) {
      _v2.copy(pos)
        .addScaledVector(rightW, sx * HW)
        .addScaledVector(upW, sy * HH)
        .addScaledVector(nW, 0.25);
      _ray.origin = { x: _v2.x, y: _v2.y, z: _v2.z };
      _ray.dir = { x: -nW.x, y: -nW.y, z: -nW.z };
      const h = world.castRay(_ray, 0.35, true, RAPIER.QueryFilterFlags.EXCLUDE_SENSORS | RAPIER.QueryFilterFlags.EXCLUDE_DYNAMIC, GROUPS.world, undefined, undefined, (col) => {
        const inf = this.game.colliderInfo.get(col.handle);
        return !inf || (inf.kind !== 'player' && inf.kind !== 'bridge');
      });
      if (!h || h.collider.handle !== hit.collider.handle || Math.abs(h.timeOfImpact - 0.25) > 0.03) {
        return { ok: false, reason: 'blocked' };
      }
    }
    return { ok: true, position: pos, normal: nW.clone(), up: upW.clone(), collider: hit.collider, size };
  }

  _ellipsesOverlap(center, right, up, hw, hh, other) {
    const N = 24;
    for (let i = 0; i <= N; i++) {
      // i === N 时检查圆心
      const a = (i / N) * Math.PI * 2;
      const s = i === N ? 0 : 1;
      _v2.copy(center)
        .addScaledVector(right, Math.cos(a) * hw * s)
        .addScaledVector(up, Math.sin(a) * hh * s);
      other.toLocal(_v2, _local);
      if (other.contains(_local, 1.0)) return true;
    }
    // 反过来再查一次：另一扇门的边缘是否落在新门里
    _m.makeBasis(right, up, _v2.crossVectors(right, up)).setPosition(center).invert();
    for (let i = 0; i <= N; i++) {
      const a = (i / N) * Math.PI * 2;
      const s = i === N ? 0 : 1;
      _local
        .copy(other.position)
        .addScaledVector(other.right, Math.cos(a) * other.halfW * s)
        .addScaledVector(other.up, Math.sin(a) * other.halfH * s)
        .applyMatrix4(_m);
      const x = _local.x / hw;
      const y = _local.y / hh;
      if (x * x + y * y <= 1) return true;
    }
    return false;
  }

  place(color, placement) {
    const p = this.get(color);
    const oldTunnel = p.placed ? new Set(p.tunnel) : null;
    const oldPortal = p.placed ? { pos: p.position.clone(), n: p.normal.clone(), hw: p.halfW, hh: p.halfH } : null;
    p.setSize(placement.size ?? 1);
    p.place(placement.position, placement.normal, placement.up, placement.collider);
    this._computeTunnel(p);
    this._updateTransforms();
    if (oldPortal) this.game.onPortalMoved?.(p, oldPortal, oldTunnel);
  }

  /** 撤掉玩家的门（消散力场） */
  clearPlayerPortals() {
    let any = false;
    for (const p of [this.blue, this.orange]) {
      if (p.placed && !p.fixed) {
        const old = { pos: p.position.clone(), n: p.normal.clone(), hw: p.halfW, hh: p.halfH };
        p.remove();
        this.game.onPortalMoved?.(p, old);
        any = true;
      }
    }
    return any;
  }

  /** 方块：计算碰撞过滤，供物理步进的钩子使用 */
  prepareCubes(cubes) {
    this.cubeFilter.clear();
    for (const cube of cubes) {
      const pos = cube.body.translation();
      _v.set(pos.x, pos.y, pos.z);
      const half = CUBE_HALF * cube.scale;
      let set = null;
      for (const p of this.list) {
        if (!p.linked) continue;
        const reach = Math.max(0.9, half * 3);
        const d = p.signedDistance(_v);
        if (d > reach || d < -reach) continue;
        if (!p.fits(half * 1.1, half * 2.2)) continue;
        p.toLocal(_v, _local);
        // 已经进去一半的方块判定放宽，防止卡在墙里
        if (!p.contains(_local, d < 0 ? 1.5 : 1.0)) continue;
        if (!set) set = new Set();
        for (const h of p.tunnel) set.add(h);
      }
      if (set) {
        this.cubeFilter.set(cube.collider.handle, set);
        cube.body.wakeUp(); // 睡着的刚体不会因为脚下的地面消失而掉下去
      }
      cube.prevPos.copy(_v);
    }
  }

  /** 物理步进之后：方块中心穿过门平面就传送 */
  teleportCubes(cubes) {
    for (const cube of cubes) {
      const t = cube.body.translation();
      _v.set(t.x, t.y, t.z);
      for (const P of this.list) {
        if (!P.linked) continue;
        const d0 = P.signedDistance(cube.prevPos);
        const d1 = P.signedDistance(_v);
        if (d0 >= 0 && d1 < 0) {
          const k = d0 / (d0 - d1);
          _v2.copy(cube.prevPos).lerp(_v, k);
          P.toLocal(_v2, _local);
          if (!P.contains(_local, 1.0)) continue;
          const half = CUBE_HALF * cube.scale;
          if (!P.fits(half * 1.1, half * 2.2)) continue;
          this._teleportBody(cube, P);
          this.game.onCubeTeleported?.(cube, P);
          break;
        }
      }
    }
  }

  _teleportBody(cube, P) {
    const body = cube.body;
    const t = body.translation();
    _v.set(t.x, t.y, t.z).applyMatrix4(P.teleport);
    const k = P.teleportScale;
    // 稍微推到出口门正面
    const Q = P.other;
    const dq = Q.signedDistance(_v);
    if (dq < 0.01) _v.addScaledVector(Q.normal, 0.01 - dq);
    const r = body.rotation();
    _q.set(r.x, r.y, r.z, r.w).premultiply(P.teleportQ);
    const lv = body.linvel();
    const av = body.angvel();
    _v2.set(lv.x, lv.y, lv.z).applyQuaternion(P.teleportQ).multiplyScalar(k);
    body.setTranslation(_v, true);
    body.setRotation(_q, true);
    body.setLinvel(_v2, true);
    _v2.set(av.x, av.y, av.z).applyQuaternion(P.teleportQ);
    body.setAngvel(_v2, true);
    if (Math.abs(k - 1) > 1e-3) cube.setScale(THREE.MathUtils.clamp(cube.scale * k, MIN_SCALE, MAX_SCALE));
    cube.prevPos.copy(_v);
  }

  /** 方块卡在门中间时，在另一侧画一个“分身”，两边都能看到它的一半 */
  updateClones(cubes) {
    for (const cube of cubes) {
      cube.clone.visible = false;
      const pos = cube.mesh.position;
      const half = CUBE_HALF * cube.scale;
      for (const P of this.list) {
        if (!P.linked) continue;
        const d = P.signedDistance(pos);
        if (d > half * 1.85 || d < -half * 1.85) continue;
        P.toLocal(pos, _local);
        if (!P.contains(_local, 1.1)) continue;
        _m.compose(cube.mesh.position, cube.mesh.quaternion, cube.mesh.scale).premultiply(P.teleport);
        _m.decompose(cube.clone.position, cube.clone.quaternion, cube.clone.scale);
        cube.clone.visible = true;
        break;
      }
    }
  }

  update(dt, time) {
    for (const p of this.list) p.update(dt, time);
  }
}
