import * as THREE from 'three';
import { RAPIER, GROUPS } from '../core/physics.js';
import { Portal, PORTAL_HALF_W, PORTAL_HALF_H, TUNNEL_DEPTH } from './Portal.js';
import { computeTeleport } from './portalMath.js';

const _v = new THREE.Vector3();
const _v2 = new THREE.Vector3();
const _local = new THREE.Vector3();
const _n = new THREE.Vector3();
const _up = new THREE.Vector3();
const _right = new THREE.Vector3();
const _q = new THREE.Quaternion();
const _m = new THREE.Matrix4();
const _ray = new RAPIER.Ray({ x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 1 });
const AXES = ['x', 'y', 'z'];

/**
 * 管理一对传送门：开门判定、物体穿越、穿门时的碰撞过滤。
 */
export class PortalSystem {
  constructor(game) {
    this.game = game;
    this.blue = new Portal('blue');
    this.orange = new Portal('orange');
    this.blue.other = this.orange;
    this.orange.other = this.blue;
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
    for (const p of this.list) {
      scene.add(p.mesh);
      scene.add(p.light);
    }
  }

  reset() {
    for (const p of this.list) {
      p.remove();
      p.fixed = false;
    }
    this.cubeFilter.clear();
  }

  _updateTransforms() {
    if (this.blue.placed && this.orange.placed) {
      computeTeleport(this.blue, this.orange, this.blue.teleport, this.blue.teleportQ);
      computeTeleport(this.orange, this.blue, this.orange.teleport, this.orange.teleportQ);
    }
  }

  /** 门后“隧道”范围里的所有静态碰撞体：穿门时这些墙体会暂时失效 */
  _computeTunnel(portal) {
    portal.tunnel.clear();
    const world = this.game.world;
    const center = _v.copy(portal.position).addScaledVector(portal.normal, -(TUNNEL_DEPTH / 2 + 0.01));
    _q.copy(portal.quaternion);
    const shape = new RAPIER.Cuboid(PORTAL_HALF_W * 0.92, PORTAL_HALF_H * 0.92, TUNNEL_DEPTH / 2);
    world.intersectionsWithShape(center, _q, shape, (col) => {
      const info = this.game.colliderInfo.get(col.handle);
      if (info && (info.kind === 'brush' || info.kind === 'door')) portal.tunnel.add(col.handle);
      return true;
    });
    if (portal.surface) portal.tunnel.add(portal.surface.handle);
  }

  placeFixed(def) {
    const p = this.get(def.color ?? 'orange');
    const pos = new THREE.Vector3(...def.pos);
    const n = new THREE.Vector3(...(def.normal ?? [0, 0, 1])).normalize();
    const up = new THREE.Vector3(...(def.up ?? [0, 1, 0])).normalize();
    // 找到门贴着的那块墙
    _ray.origin = { x: pos.x + n.x * 0.2, y: pos.y + n.y * 0.2, z: pos.z + n.z * 0.2 };
    _ray.dir = { x: -n.x, y: -n.y, z: -n.z };
    const hit = this.game.world.castRay(_ray, 0.6, true, RAPIER.QueryFilterFlags.EXCLUDE_SENSORS | RAPIER.QueryFilterFlags.EXCLUDE_DYNAMIC);
    p.place(pos, n, up, hit ? hit.collider : null);
    p.fixed = true;
    p.openT = 1;
    this._computeTunnel(p);
    this._updateTransforms();
  }

  /**
   * 计算开门位置。返回 { ok, position, normal, up, collider, reason }
   * 规则：必须打在白色面板上；门整个落在同一块面板内（放不下就自动往里推）；
   * 不和另一扇门重叠（重叠就推开）；门洞范围内没有别的东西挡着。
   */
  computePlacement(color, hit, viewDir) {
    const info = this.game.colliderInfo.get(hit.collider.handle);
    if (!info || info.kind !== 'brush' || !info.portalable) return { ok: false, reason: 'surface' };
    const b = info.def;
    const n = _n.set(hit.normal.x, hit.normal.y, hit.normal.z);
    const k = Math.abs(n.x) > 0.9 ? 0 : Math.abs(n.y) > 0.9 ? 1 : Math.abs(n.z) > 0.9 ? 2 : -1;
    if (k < 0) return { ok: false, reason: 'surface' };
    n.set(0, 0, 0).setComponent(k, Math.sign(hit.normal[AXES[k]]));

    // 门的“上”方向：墙面上永远朝上；地面/天花板上朝着玩家视线方向
    if (k === 1) {
      _up.copy(viewDir).setY(0);
      if (_up.lengthSq() < 1e-4) _up.set(0, 0, -1);
      _up.normalize();
    } else _up.set(0, 1, 0);
    _right.crossVectors(_up, n).normalize();

    const ua = (k + 1) % 3;
    const va = (k + 2) % 3;
    const hu = Math.hypot(PORTAL_HALF_W * _right.getComponent(ua), PORTAL_HALF_H * _up.getComponent(ua));
    const hv = Math.hypot(PORTAL_HALF_W * _right.getComponent(va), PORTAL_HALF_H * _up.getComponent(va));
    const min = (a) => b.pos[a] - b.size[a] / 2;
    const max = (a) => b.pos[a] + b.size[a] / 2;
    const plane = b.pos[k] + n.getComponent(k) * (b.size[k] / 2);
    const lo = [min(ua) + hu, min(va) + hv];
    const hi = [max(ua) - hu, max(va) - hv];
    if (lo[0] > hi[0] + 1e-4 || lo[1] > hi[1] + 1e-4) return { ok: false, reason: 'small' };
    const clampUV = (c) => {
      c[0] = THREE.MathUtils.clamp(c[0], lo[0], hi[0]);
      c[1] = THREE.MathUtils.clamp(c[1], lo[1], hi[1]);
      return c;
    };
    let c = clampUV([hit.point[AXES[ua]], hit.point[AXES[va]]]);
    const toWorld = (cc, out) => out.set(0, 0, 0).setComponent(k, plane).setComponent(ua, cc[0]).setComponent(va, cc[1]);

    // 和另一扇门（同一平面上）重叠时，把新门推开
    const other = this.get(color).other;
    if (other.placed && Math.abs(other.normal.dot(n) - 1) < 1e-3 && Math.abs(other.signedDistance(toWorld(c, _v))) < 0.02) {
      const overlaps = (cc) => this._ellipsesOverlap(toWorld(cc, _v), _right, _up, other);
      if (overlaps(c)) {
        const oc = [other.position.getComponent(ua), other.position.getComponent(va)];
        let dx = c[0] - oc[0];
        let dy = c[1] - oc[1];
        let len = Math.hypot(dx, dy);
        if (len < 1e-3) {
          dx = _right.getComponent(ua);
          dy = _right.getComponent(va);
          len = Math.hypot(dx, dy);
        }
        dx /= len;
        dy /= len;
        let found = null;
        for (let s = 0.05; s <= 3.0; s += 0.05) {
          const cc = clampUV([c[0] + dx * s, c[1] + dy * s]);
          if (!overlaps(cc)) {
            found = cc;
            break;
          }
        }
        if (!found) return { ok: false, reason: 'overlap' };
        c = found;
      }
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
        .addScaledVector(_right, sx * PORTAL_HALF_W)
        .addScaledVector(_up, sy * PORTAL_HALF_H)
        .addScaledVector(n, 0.25);
      _ray.origin = { x: _v2.x, y: _v2.y, z: _v2.z };
      _ray.dir = { x: -n.x, y: -n.y, z: -n.z };
      const h = world.castRay(_ray, 0.35, true, RAPIER.QueryFilterFlags.EXCLUDE_SENSORS | RAPIER.QueryFilterFlags.EXCLUDE_DYNAMIC, GROUPS.world, undefined, undefined, (col) => {
        const inf = this.game.colliderInfo.get(col.handle);
        return !inf || inf.kind !== 'player';
      });
      if (!h || h.collider.handle !== hit.collider.handle || Math.abs(h.timeOfImpact - 0.25) > 0.03) {
        return { ok: false, reason: 'blocked' };
      }
    }
    return { ok: true, position: pos, normal: n.clone(), up: _up.clone(), collider: hit.collider };
  }

  _ellipsesOverlap(center, right, up, other) {
    const N = 24;
    for (let i = 0; i <= N; i++) {
      // i === N 时检查圆心
      const a = (i / N) * Math.PI * 2;
      const s = i === N ? 0 : 1;
      _v2.copy(center)
        .addScaledVector(right, Math.cos(a) * PORTAL_HALF_W * s)
        .addScaledVector(up, Math.sin(a) * PORTAL_HALF_H * s);
      other.toLocal(_v2, _local);
      if (Portal.inEllipse(_local, 1.0)) return true;
    }
    // 反过来再查一次：另一扇门的边缘是否落在新门里
    _m.makeBasis(right, up, _v2.crossVectors(right, up)).setPosition(center).invert();
    for (let i = 0; i <= N; i++) {
      const a = (i / N) * Math.PI * 2;
      const s = i === N ? 0 : 1;
      _local
        .copy(other.position)
        .addScaledVector(other.right, Math.cos(a) * PORTAL_HALF_W * s)
        .addScaledVector(other.up, Math.sin(a) * PORTAL_HALF_H * s)
        .applyMatrix4(_m);
      if (Portal.inEllipse(_local, 1.0)) return true;
    }
    return false;
  }

  place(color, placement) {
    const p = this.get(color);
    const oldTunnel = p.placed ? new Set(p.tunnel) : null;
    const oldPortal = p.placed ? { pos: p.position.clone(), n: p.normal.clone() } : null;
    p.place(placement.position, placement.normal, placement.up, placement.collider);
    this._computeTunnel(p);
    this._updateTransforms();
    if (oldPortal) this.game.onPortalMoved?.(p, oldPortal, oldTunnel);
  }

  /** 方块：计算碰撞过滤，供物理步进的钩子使用 */
  prepareCubes(cubes) {
    this.cubeFilter.clear();
    for (const cube of cubes) {
      const pos = cube.body.translation();
      _v.set(pos.x, pos.y, pos.z);
      let set = null;
      for (const p of this.list) {
        if (!p.linked) continue;
        const d = p.signedDistance(_v);
        if (d > 0.9 || d < -0.9) continue;
        p.toLocal(_v, _local);
        // 已经进去一半的方块判定放宽，防止卡在墙里
        if (!Portal.inEllipse(_local, d < 0 ? 1.5 : 1.0)) continue;
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
          if (!Portal.inEllipse(_local, 1.0)) continue;
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
    // 稍微推到出口门正面
    const Q = P.other;
    const dq = Q.signedDistance(_v);
    if (dq < 0.01) _v.addScaledVector(Q.normal, 0.01 - dq);
    const r = body.rotation();
    _q.set(r.x, r.y, r.z, r.w).premultiply(P.teleportQ);
    const lv = body.linvel();
    const av = body.angvel();
    _v2.set(lv.x, lv.y, lv.z).applyQuaternion(P.teleportQ);
    body.setTranslation(_v, true);
    body.setRotation(_q, true);
    body.setLinvel(_v2, true);
    _v2.set(av.x, av.y, av.z).applyQuaternion(P.teleportQ);
    body.setAngvel(_v2, true);
    cube.prevPos.copy(_v);
  }

  /** 方块卡在门中间时，在另一侧画一个“分身”，两边都能看到它的一半 */
  updateClones(cubes) {
    for (const cube of cubes) {
      cube.clone.visible = false;
      const pos = cube.mesh.position;
      for (const P of this.list) {
        if (!P.linked) continue;
        const d = P.signedDistance(pos);
        if (d > 0.55 || d < -0.55) continue;
        P.toLocal(pos, _local);
        if (!Portal.inEllipse(_local, 1.1)) continue;
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
