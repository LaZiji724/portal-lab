import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { RAPIER, GROUPS } from './core/physics.js';
import { Input } from './core/Input.js';
import { AudioManager } from './core/Audio.js';
import { Player, PLAYER } from './player/Player.js';
import { PortalGunView, ShotEffects } from './player/PortalGun.js';
import { PortalSystem } from './portal/PortalSystem.js';
import { PortalRenderer } from './portal/PortalRenderer.js';
import { Post } from './core/post.js';
import { Ambience, createShaft } from './world/ambience.js';
import { Sky } from './world/sky.js';
import { GravityField } from './world/gravity.js';
import { addDressing } from './world/dressing.js';
import { applyTheme } from './world/theme.js';
import { getMaterials, brushGeometry, tintedMaterial, PORTALABLE, TEX_SCALE } from './world/materials.js';
import { createLightFixture } from './world/entityVisuals.js';
import { Cube, Button, Door, Exit, Hazard, Switch, LaserEmitter, Catcher, Bridge, Launcher, Platform, Fizzler } from './world/entities.js';

const _v = new THREE.Vector3();
const _v2 = new THREE.Vector3();
const _d = new THREE.Vector3();
const _local = new THREE.Vector3();
const _q = new THREE.Quaternion();
const _yawQ = new THREE.Quaternion();
const _Y = new THREE.Vector3(0, 1, 0);
const _dq = new THREE.Quaternion();
const _downVec = new THREE.Vector3(0, -1, 0);
const _g = { dir: new THREE.Vector3(0, -1, 0), mag: 1 };
const _ray = new RAPIER.Ray({ x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 1 });

export const QUALITY = {
  low: { pixelRatio: 1, depth: 1, rtScale: 0.5, shadows: false, budget: 4, post: false },
  medium: { pixelRatio: 1.25, depth: 2, rtScale: 0.75, shadows: true, budget: 8, post: true, msaa: 0, bloomScale: 0.35 },
  high: { pixelRatio: 2, depth: 3, rtScale: 1, shadows: true, budget: 13, post: true, msaa: 4, bloomScale: 0.5 },
};

/** 激光光束的画法：一根发光的细圆柱 + 白色内芯 */
class LaserBeams {
  constructor(scene) {
    this.group = new THREE.Group();
    scene.add(this.group);
    this.geo = new THREE.CylinderGeometry(1, 1, 1, 8, 1, true);
    this.geo.translate(0, 0.5, 0);
    this.geo.rotateX(Math.PI / 2); // 沿 +Z 方向，从 0 到 1
    this.outer = new THREE.MeshBasicMaterial({ color: 0xff3018, transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending, depthWrite: false });
    this.inner = new THREE.MeshBasicMaterial({ color: 0xffd0c0, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true });
    this.pool = [];
    this.used = 0;
    this.spark = new THREE.PointLight(0xff4020, 0, 3, 2);
    scene.add(this.spark);
  }
  begin() {
    this.used = 0;
  }
  add(a, b, scale = 1) {
    const len = a.distanceTo(b);
    if (len < 1e-3) return;
    let item = this.pool[this.used];
    if (!item) {
      item = { outer: new THREE.Mesh(this.geo, this.outer), inner: new THREE.Mesh(this.geo, this.inner) };
      item.outer.renderOrder = 4;
      item.inner.renderOrder = 5;
      this.group.add(item.outer, item.inner);
      this.pool.push(item);
    }
    this.used++;
    for (const [m, r] of [
      [item.outer, 0.035 * scale],
      [item.inner, 0.012 * scale],
    ]) {
      m.visible = true;
      m.position.copy(a);
      m.lookAt(b);
      m.scale.set(r, r, len);
    }
  }
  end(hitPoint) {
    for (let i = this.used; i < this.pool.length; i++) {
      this.pool[i].outer.visible = false;
      this.pool[i].inner.visible = false;
    }
    if (hitPoint) {
      this.spark.position.copy(hitPoint);
      this.spark.intensity = 1.5;
    } else this.spark.intensity = 0;
  }
  clear() {
    this.begin();
    this.end(null);
  }
}

export class Game {
  constructor(canvas, { quality = 'high', touch = false } = {}) {
    this.canvas = canvas;
    this.touch = touch;
    this.quality = quality;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: !touch, powerPreference: 'high-performance' });
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.shadowMap.autoUpdate = false;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x07090b);
    const pmrem = new THREE.PMREMGenerator(this.renderer);
    this.scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    this.scene.environmentIntensity = 0.55;
    this.hemi = new THREE.HemisphereLight(0xdce6ff, 0x2a2824, 0.35);
    this.scene.add(this.hemi);

    this.materials = getMaterials(quality === 'low' ? 'low' : 'high', this.renderer.capabilities.getMaxAnisotropy());
    this.input = new Input(canvas);
    this.input.touchMode = touch;
    this.audio = new AudioManager();
    this.player = new Player(this);
    this.scene.add(this.player.bodyMesh);
    this.portals = new PortalSystem(this);
    this.portals.addToScene(this.scene);
    this.portalRenderer = new PortalRenderer(this.renderer, this.scene, () => this.portals.list, {});
    this.gunView = new PortalGunView();
    this.effects = new ShotEffects(this.scene);
    this.beams = new LaserBeams(this.scene);
    this.ambience = new Ambience(this.scene);

    this.levelGroup = new THREE.Group();
    this.scene.add(this.levelGroup);
    this.colliderInfo = new Map();
    this.world = null;
    this.level = null;
    this.levelIndex = -1;
    this._clearLists();
    this.signals = new Map();
    this.state = 'menu'; // menu | playing | paused | complete | dead
    this.time = 0;
    this.listeners = {};
    this.fov = 75;

    this.input.on('fire', (c) => this.state === 'playing' && this.fire(c));
    this.input.on('use', () => this.state === 'playing' && this.use());
    this.input.on('restart', () => this.state === 'playing' && this.restart());
    this.input.on('unlock', () => this.state === 'playing' && !this.touch && this.emit('pause'));

    this.setQuality(quality);
    window.addEventListener('resize', () => this.resize());
    this.resize();
  }

  _clearLists() {
    this.cubes = [];
    this.buttons = [];
    this.doors = [];
    this.exits = [];
    this.hazards = [];
    this.switches = [];
    this.lasers = [];
    this.catchers = [];
    this.bridges = [];
    this.launchers = [];
    this.platforms = [];
    this.fizzlers = [];
    this.gateDefs = [];
    this.gravityFields = [];
  }

  on(name, fn) {
    (this.listeners[name] ??= []).push(fn);
  }

  emit(name, ...args) {
    for (const fn of this.listeners[name] ?? []) fn(...args);
  }

  setQuality(q) {
    this.quality = q;
    const cfg = QUALITY[q] ?? QUALITY.high;
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, cfg.pixelRatio));
    this.shadows = cfg.shadows;
    this.renderer.shadowMap.enabled = cfg.shadows;
    // 后期（泛光）：低画质关闭；重新建立，因为多重采样数随画质变化
    this.post?.dispose();
    this.post = cfg.post ? new Post(this.renderer, this.portalRenderer, () => this.player.camera, { samples: this.touch ? 0 : cfg.msaa, bloomScale: cfg.bloomScale }) : null;
    if (this.theme) applyTheme(this, this.level?.chapter ?? 0);
    this.portalRenderer.setQuality({ depth: cfg.depth, scale: cfg.rtScale, budget: cfg.budget });
    // 阴影开关会改变着色器，需要重新编译
    this.scene.traverse((o) => {
      if (o.material) (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => (m.needsUpdate = true));
    });
    if (this.level) this._applyShadows();
    this.resize();
  }

  setFov(f) {
    this.fov = f;
    this.player.camera.fov = f;
    this.player.camera.updateProjectionMatrix();
  }

  resize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.renderer.setSize(w, h, false);
    this.canvas.style.width = w + 'px';
    this.canvas.style.height = h + 'px';
    const cam = this.player.camera;
    cam.aspect = w / h;
    cam.fov = this.fov;
    cam.updateProjectionMatrix();
    this.gunView.setAspect(w / h);
    const size = this.renderer.getDrawingBufferSize(new THREE.Vector2());
    this.portalRenderer.setSize(size.x, size.y);
    this.post?.setSize(w, h, this.renderer.getPixelRatio());
    this.ambience?.setPixelRatio(this.renderer.getPixelRatio());
  }

  // ---------------------------------------------------------------- 信号（按钮、开关、激光接收器）

  /** 条件列表：每一项是信号名，前面加 ! 表示取反；全部满足才为真。空列表返回 dflt */
  cond(list, dflt = false) {
    if (list === undefined || list === null) return dflt;
    if (!Array.isArray(list)) list = [list];
    if (!list.length) return dflt;
    return list.every((id) => (id.startsWith('!') ? !this.signals.get(id.slice(1)) : !!this.signals.get(id)));
  }

  _updateSignals() {
    const s = this.signals;
    s.clear();
    const set = (id, on) => s.set(id, (s.get(id) ?? false) || on);
    for (const b of this.buttons) set(b.id, b.pressed);
    for (const sw of this.switches) set(sw.id, sw.on);
    for (const c of this.catchers) set(c.id, c.lit);
  }

  // ---------------------------------------------------------------- 关卡

  loadLevel(def, index = -1) {
    this.unloadLevel();
    this.level = def;
    this.levelIndex = index;
    // 有反重力区、星球或自定义方向时，重力由我们自己算（玩家和方块都按所在位置的重力场受力）
    this.defaultGravity = new THREE.Vector3(...(def.gravityDir ?? [0, -1, 0])).normalize();
    this.customGravity = !!def.gravityDir || def.gravityMag !== undefined || (def.entities ?? []).some((e) => e.type === 'gravity');
    this.world = new RAPIER.World(this.customGravity ? { x: 0, y: 0, z: 0 } : { x: 0, y: -9.81, z: 0 });
    this.world.integrationParameters.numSolverIterations = 8;
    // 注意：Rapier 只有在传入事件队列时才会调用碰撞过滤钩子
    this.eventQueue = new RAPIER.EventQueue(false);
    this.player.attach(this.world);
    this.colliderInfo.set(this.player.collider.handle, { kind: 'player' });

    if (def.fog) {
      const c = new THREE.Color(def.fog.color ?? 0x07090b);
      this.scene.fog = new THREE.Fog(c, def.fog.near ?? 10, def.fog.far ?? 60);
      this.scene.background = c;
    } else {
      this.scene.fog = null;
      this.scene.background = new THREE.Color(0x07090b);
    }
    applyTheme(this, def.chapter ?? 0);
    this.sky = null;
    if (def.sky) {
      // 天空：星空、白天或黄昏，天穹跟着相机，太阳是一盏平行光
      this.sky = new Sky(def.sky, { low: this.touch });
      this.levelGroup.add(this.sky.group);
      if (this.sky.light) this.levelGroup.add(this.sky.light, this.sky.light.target);
      this.scene.background = new THREE.Color(0x000000);
      if (this.sky.fogColor !== null && !def.fog) this.scene.fog = new THREE.Fog(this.sky.fogColor, def.sky.fogNear ?? 80, def.sky.fogFar ?? 520);
    }

    for (const b of def.brushes) this._addBrush(b);
    addDressing(this, def, this.levelGroup);
    this.lights = [];
    for (const e of def.entities ?? []) {
      switch (e.type) {
        case 'cube':
          this.cubes.push(new Cube(this, e));
          break;
        case 'button':
          this.buttons.push(new Button(this, e));
          break;
        case 'door':
          this.doors.push(new Door(this, e));
          break;
        case 'exit':
          this.exits.push(new Exit(this, e));
          break;
        case 'hazard':
          this.hazards.push(new Hazard(this, e));
          break;
        case 'light':
          this._addLight(e);
          break;
        case 'switch':
          this.switches.push(new Switch(this, e));
          break;
        case 'laser':
          this.lasers.push(new LaserEmitter(this, e));
          break;
        case 'catcher':
          this.catchers.push(new Catcher(this, e));
          break;
        case 'bridge':
          this.bridges.push(new Bridge(this, e));
          break;
        case 'launcher':
          this.launchers.push(new Launcher(this, e));
          break;
        case 'platform':
          this.platforms.push(new Platform(this, e));
          break;
        case 'fizzler':
          this.fizzlers.push(new Fizzler(this, e));
          break;
        case 'gravity':
          this.gravityFields.push(new GravityField(this, e));
          break;
        default:
          break;
      }
    }
    this._applyShadows();
    // 物理世界需要先跑一次查询结构，固定传送门才能找到它贴着的墙
    this.world.step();
    this.portals.reset();
    for (const e of def.entities ?? []) {
      if (e.type === 'portal') this.portals.placeFixed(e);
      if (e.type === 'gateway') this.gateDefs.push({ def: e, pair: this.portals.addGateway(e) });
    }
    const sp = def.spawn ?? { pos: [0, 0, 0], yaw: 0 };
    this.player.spawn(sp.pos, sp.yaw ?? 0, sp.scale ?? 1);
    this.player.burn = 0;
    this.gunView.setColor(def.gun === 'orange' ? 'orange' : 'blue');
    this.renderer.shadowMap.needsUpdate = true;
    this.time = 0;
    this._updateSignals();
    this._updateGates();
    for (const b of this.bridges) b.update();
    this.emit('level', def, index);
  }

  /** pos 处的重力：方向写进 out.dir（单位向量），强度倍数写进 out.mag */
  gravityAt(pos, out) {
    let best = null;
    let bestScore = Infinity;
    for (const f of this.gravityFields) {
      if (!f.contains(pos) || !f.active) continue;
      // 方块场（区域）优先于球形场；方块场之间体积小的优先，球形场之间离球心近的优先
      const score = f.shape === 'sphere' ? 1e9 + pos.distanceTo(f.pos) : f.vol;
      if (score < bestScore) {
        bestScore = score;
        best = f;
      }
    }
    if (best) {
      best.dirAt(pos, out.dir);
      out.mag = best.magAt(pos);
    } else {
      out.dir.copy(this.defaultGravity ?? _downVec);
      out.mag = this.level?.gravityMag ?? 1;
    }
    return out;
  }

  _addBrush(b) {
    const shape = b.shape ?? 'box';
    let mat = this.materials[b.mat] ?? this.materials.metal;
    if (b.mat === 'glow') {
      // 自发光（水晶、灯带、远处的城市灯火）：颜色乘上亮度，泛光会把它晕开
      const key = `${b.color ?? 0xffffff}:${b.intensity ?? 2.5}`;
      this._glowMats ??= new Map();
      if (!this._glowMats.has(key)) this._glowMats.set(key, new THREE.MeshBasicMaterial({ color: new THREE.Color(b.color ?? 0xffffff).multiplyScalar(b.intensity ?? 2.5) }));
      mat = this._glowMats.get(key);
    } else if (b.color !== undefined && mat.color) mat = tintedMaterial(mat, b.color);
    // 酸液外观：intensity 调自发光的强弱（大片的酸河不要晃眼）
    if (b.mat === 'acid' && b.intensity !== undefined) {
      const key = `acid:${b.color ?? 0}:${b.intensity}`;
      this._glowMats ??= new Map();
      if (!this._glowMats.has(key)) this._glowMats.set(key, Object.assign(mat.clone(), { emissiveIntensity: b.intensity }));
      mat = this._glowMats.get(key);
    }
    const mesh = new THREE.Mesh(brushGeometry(b.size, b.pos, TEX_SCALE[b.mat] ?? 2, shape), mat);
    mesh.position.set(...b.pos);
    // rot：绕 x、y、z 轴的旋转角（度），用来做斜坡、斜墙、多边形房间
    const quat = b.rot ? new THREE.Quaternion().setFromEuler(new THREE.Euler(...b.rot.map((d) => THREE.MathUtils.degToRad(d)), 'YXZ')) : null;
    if (quat) mesh.quaternion.copy(quat);
    const transparent = b.mat === 'glass' || b.mat === 'grate' || b.mat === 'acid';
    mesh.castShadow = b.mat !== 'glass' && b.mat !== 'glow' && b.mat !== 'acid';
    mesh.receiveShadow = !transparent;
    if (b.mat === 'glass') mesh.renderOrder = 2;
    this.levelGroup.add(mesh);
    // deco：只有外观没有碰撞（树冠、云朵、水晶……）
    if (b.deco) return;
    const bodyDesc = RAPIER.RigidBodyDesc.fixed().setTranslation(...b.pos);
    if (quat) bodyDesc.setRotation(quat);
    const body = this.world.createRigidBody(bodyDesc);
    let desc;
    if (shape === 'sphere') desc = RAPIER.ColliderDesc.ball(b.size[0] / 2);
    else if (shape === 'cyl') desc = RAPIER.ColliderDesc.cylinder(b.size[1] / 2, b.size[0] / 2);
    else desc = RAPIER.ColliderDesc.cuboid(b.size[0] / 2, b.size[1] / 2, b.size[2] / 2);
    desc.setCollisionGroups(GROUPS.world).setFriction(0.8);
    if (b.mat === 'bounce') desc.setRestitution(0.95).setRestitutionCombineRule(RAPIER.CoefficientCombineRule.Max);
    if (b.mat === 'speed') desc.setFriction(0.05).setFrictionCombineRule(RAPIER.CoefficientCombineRule.Min);
    const col = this.world.createCollider(desc, body);
    // 只有平整的方块面板能开门（弯曲的星球表面不行，要在上面放白色面板）
    const portalable = shape === 'box' && PORTALABLE.has(b.mat);
    this.colliderInfo.set(col.handle, { kind: 'brush', def: b, mat: b.mat, portalable, portalSize: PORTALABLE.get(b.mat), quat });
  }

  _addLight(e) {
    const color = new THREE.Color(e.color ?? 0xfff1dc);
    const light = new THREE.PointLight(color, e.intensity ?? 30, e.distance ?? 22, 2);
    light.position.set(...e.pos);
    light.userData.wantsShadow = !!e.shadow;
    light.shadow.mapSize.set(1024, 1024);
    light.shadow.bias = -0.002;
    light.shadow.normalBias = 0.03;
    light.shadow.camera.near = 0.2;
    light.shadow.camera.far = e.distance ?? 22;
    this.levelGroup.add(light);
    if (e.fixture !== false) {
      const f = createLightFixture(e);
      f.position.set(e.pos[0], e.pos[1] + 0.12, e.pos[2]);
      this.levelGroup.add(f);
      if ((e.intensity ?? 30) >= 25 && e.shaft !== false) {
        const h = Math.min(e.distance ?? 22, Math.max(2.5, e.pos[1] * 0.9), 8);
        const shaft = createShaft(e.color ?? 0xfff1dc, h, Math.min(2.4, 0.9 + h * 0.18));
        shaft.position.set(e.pos[0], e.pos[1] - 0.05, e.pos[2]);
        this.levelGroup.add(shaft);
      }
    }
    this.lights.push(light);
  }

  _applyShadows() {
    let n = 0;
    for (const l of this.lights ?? []) {
      l.castShadow = this.shadows && l.userData.wantsShadow && n < 2;
      if (l.castShadow) n++;
    }
    this.renderer.shadowMap.needsUpdate = true;
  }

  unloadLevel() {
    if (this.player.held) this.dropHeld();
    this.effects.clear();
    this.beams.clear();
    for (const b of this.bridges) b.clear();
    for (const c of [...this.levelGroup.children]) {
      this.levelGroup.remove(c);
      c.traverse((o) => {
        if (o.geometry) o.geometry.dispose();
      });
    }
    this._clearLists();
    this.colliderInfo.clear();
    this.portals.reset();
    if (this.world) {
      this.world.free();
      this.world = null;
      this.eventQueue?.free();
      this.eventQueue = null;
    }
  }

  restart() {
    if (this.level) this.loadLevel(this.level, this.levelIndex);
    this.state = 'playing';
  }

  _updateGates() {
    for (const g of this.gateDefs) {
      const on = this.cond(g.def.when, true);
      for (const p of g.pair) if (p.active !== on) p.setActive(on);
    }
  }

  // ---------------------------------------------------------------- 射线（可穿过传送门）

  /**
   * 沿射线检测，遇到连通的传送门会“拐进去”继续检测。
   * 返回 { hit, collider, point, normal, via: [穿过的门], dir, segments: [[起点, 终点], ...] }
   */
  raycast(origin, dir, maxDist, predicate) {
    const o = origin.clone();
    const d = dir.clone().normalize();
    let remaining = maxDist;
    let travelled = 0;
    const via = [];
    const segments = [];
    for (let depth = 0; depth < 6; depth++) {
      _ray.origin = { x: o.x, y: o.y, z: o.z };
      _ray.dir = { x: d.x, y: d.y, z: d.z };
      const hit = this.world.castRayAndGetNormal(_ray, remaining, true, RAPIER.QueryFilterFlags.EXCLUDE_SENSORS, undefined, undefined, undefined, predicate);
      const hitT = hit ? hit.timeOfImpact : remaining;
      let best = null;
      for (const P of this.portals.list) {
        if (!P.linked) continue;
        const denom = d.dot(P.normal);
        if (denom > -1e-4) continue;
        const t = -P.signedDistance(o) / denom;
        if (t < 0 || t > hitT + 0.05) continue;
        _v.copy(o).addScaledVector(d, t);
        P.toLocal(_v, _local);
        if (P.contains(_local, 0.97) && (!best || t < best.t)) best = { P, t };
      }
      if (best) {
        const end = o.clone().addScaledVector(d, best.t);
        segments.push([o.clone(), end]);
        o.copy(end).applyMatrix4(best.P.teleport);
        d.applyQuaternion(best.P.teleportQ);
        o.addScaledVector(d, 0.005);
        travelled += best.t;
        remaining = (remaining - best.t) * best.P.teleportScale;
        via.push(best.P);
        continue;
      }
      const end = o.clone().addScaledVector(d, hitT);
      segments.push([o.clone(), end]);
      if (!hit) return { hit: false, via, dir: d, point: end, segments, distance: travelled + hitT };
      return {
        hit: true,
        collider: hit.collider,
        point: end,
        normal: hit.normal,
        via,
        dir: d,
        segments,
        distance: travelled + hitT,
      };
    }
    return { hit: false, via, dir: d, point: o, segments, distance: maxDist };
  }

  // ---------------------------------------------------------------- 开门

  allowColor(color) {
    const gun = this.level?.gun ?? 'both';
    if (gun === 'none') return false;
    if (gun === 'both') return true;
    return gun === color;
  }

  fire(color) {
    if (!this.allowColor(color) || this.portals.get(color).fixed) {
      this.audio.play('deny');
      this.emit('toast', this.level?.gun === 'none' ? '这一关不能使用传送门枪' : '这一关只能发射' + (this.level.gun === 'blue' ? '蓝色' : '橙色') + '传送门');
      return false;
    }
    if (this.player.held) {
      this.dropHeld();
      return false;
    }
    const eye = this.player.eye(new THREE.Vector3());
    const fwd = this.player.forward(new THREE.Vector3());
    const res = this.raycast(eye, fwd, 300, (col) => {
      const info = this.colliderInfo.get(col.handle);
      if (!info) return true;
      if (info.kind === 'player' || info.kind === 'bridge') return false;
      if (info.kind === 'brush' && info.mat === 'grate') return false; // 子弹穿过栅格
      return true;
    });
    this.gunView.fire(color);
    this.audio.play('shoot', color);
    const muzzle = this._muzzle();
    const first = res.segments[0][1];
    let ok = false;
    if (res.hit) {
      const placement = this.portals.computePlacement(color, res, res.dir);
      if (placement.ok) {
        this.portals.place(color, placement);
        this.audio.play('portalOpen', color);
        ok = true;
      } else {
        this.audio.play('fail');
      }
    } else this.audio.play('fail');
    this.effects.beam(muzzle, first, color, ok);
    if (res.segments.length > 1) this.effects.sparks(res.point, color, ok ? 10 : 20);
    this.emit('portals');
    return ok;
  }

  _muzzle() {
    const cam = this.player.camera;
    const s = this.player.scale;
    return new THREE.Vector3(0.2 * s, -0.17 * s, -0.7 * s).applyMatrix4(cam.matrixWorld);
  }

  onPortalMoved(portal, old) {
    // 门被挪走时，正在穿门的物体可能卡在墙里，把它们推回原来那面墙的正面
    const reach = Math.max(1.4, (old.hh ?? 1.12) * 1.25);
    const fix = (pos, margin) => {
      const d = _d.copy(pos).sub(old.pos).dot(old.n);
      if (d < margin && d > -2.2 * Math.max(1, reach / 1.4)) {
        _v.copy(pos).sub(old.pos).addScaledVector(old.n, -d);
        if (_v.length() < reach) return margin + 0.01 - d;
      }
      return 0;
    };
    const p = this.player;
    const push = fix(p.position, p.radius + 0.02);
    if (push > 0) {
      p.position.addScaledVector(old.n, push);
      p._syncBody(true);
      p.eye(p.prevEye);
    }
    for (const c of this.cubes) {
      const pos = c.position.clone();
      const k = fix(pos, c.half + 0.02);
      if (k > 0) {
        pos.addScaledVector(old.n, k);
        c.body.setTranslation(pos, true);
        c.prevPos.copy(pos);
      }
    }
    if (p.held && p.held.link) this.dropHeld();
  }

  // ---------------------------------------------------------------- 搬方块 / 按开关

  use() {
    if (this.player.held) {
      this.dropHeld();
      return;
    }
    const eye = this.player.eye(new THREE.Vector3());
    const fwd = this.player.forward(new THREE.Vector3());
    const reach = 2.6 * Math.max(0.6, this.player.scale);
    const res = this.raycast(eye, fwd, reach, (col) => {
      const k = this.colliderInfo.get(col.handle)?.kind;
      return k !== 'player' && k !== 'bridge';
    });
    const info = res.hit ? this.colliderInfo.get(res.collider.handle) : null;
    if (info?.kind === 'cube' && res.via.length <= 1) {
      if (info.cube.scale > this.player.scale * 1.6) {
        this.audio.play('deny');
        this.emit('toast', '太重了，搬不动');
        return;
      }
      this.pickUp(info.cube, res.via[0] ?? null);
    } else if (info?.kind === 'switch') {
      info.sw.activate();
    } else {
      this.audio.play('deny');
    }
  }

  pickUp(cube, link) {
    this.player.held = { cube, link };
    cube.collider.setCollisionGroups(GROUPS.heldCube);
    cube.body.setGravityScale(0, true);
    this.gunView.holding = true;
    this.audio.play('pickup');
    this.audio.setHolding(true);
  }

  dropHeld() {
    const h = this.player.held;
    if (!h) return;
    h.cube.collider.setCollisionGroups(GROUPS.cube);
    h.cube.body.setGravityScale(this.customGravity ? 0 : 1, true);
    const v = h.cube.body.linvel();
    const s = Math.hypot(v.x, v.y, v.z);
    const max = 8 * h.cube.scale;
    if (s > max) h.cube.body.setLinvel({ x: (v.x / s) * max, y: (v.y / s) * max, z: (v.z / s) * max }, true);
    h.cube.body.setAngvel({ x: 0, y: 0, z: 0 }, true);
    this.player.held = null;
    this.gunView.holding = false;
    this.audio.play('drop');
    this.audio.setHolding(false);
  }

  _updateHeld() {
    const h = this.player.held;
    const cube = h.cube;
    const s = this.player.scale;
    const eye = this.player.eye(new THREE.Vector3());
    const fwd = this.player.forward(new THREE.Vector3());
    const want = 1.1 * s + cube.half * 2;
    const res = this.raycast(eye, fwd, want + 0.4 * s, (col) => {
      const info = this.colliderInfo.get(col.handle);
      return !info || (info.kind !== 'player' && info.kind !== 'cube' && info.kind !== 'bridge');
    });
    const dist = res.hit ? Math.max(0.5 * s + cube.half, Math.min(want, res.distance - cube.half - 0.1 * s)) : want;
    const tp = _v.copy(eye).addScaledVector(fwd, dist);
    let k = 1;
    if (h.link) {
      // 方块在门那边：把目标点换算到方块所在的空间
      tp.applyMatrix4(h.link.teleport);
      k = h.link.teleportScale;
    }
    const delta = _d.subVectors(tp, cube.position);
    // 方块被卡住、离手太远一段时间才松手；快速转身时它会跟着甩过来
    const far = delta.length() / k;
    h.farTime = far > 2.2 * s ? (h.farTime ?? 0) + this._h : 0;
    if (far > 5.5 * s || h.farTime > 0.8) {
      this.dropHeld();
      return;
    }
    const vel = delta.multiplyScalar(14);
    const max = 14 * Math.max(1, s) * k;
    if (vel.length() > max) vel.setLength(max);
    cube.body.setLinvel(vel, true);
    // 拿着的方块始终端正地朝着玩家的视线方向（折射方块靠这个来瞄准）
    _yawQ.setFromAxisAngle(_Y, this.player.yaw).premultiply(this.player.frame);
    if (h.link) _yawQ.premultiply(h.link.teleportQ);
    cube.body.setRotation(_yawQ, true);
    cube.body.setAngvel({ x: 0, y: 0, z: 0 }, true);
  }

  onCubeTeleported(cube, P) {
    const h = this.player.held;
    if (h && h.cube === cube) {
      if (h.link === null) h.link = P;
      else if (h.link === P.other) h.link = null;
      else this.dropHeld();
    }
  }

  onLand(speed) {
    if (speed > 3) this.audio.play('land', speed);
  }

  // ---------------------------------------------------------------- 激光

  _traceLasers(h) {
    for (const c of this.catchers) c.hit = false;
    this.beams.begin();
    let burned = false;
    let lastHit = null;
    const pred = (col) => {
      const info = this.colliderInfo.get(col.handle);
      if (!info) return true;
      if (info.kind === 'bridge') return false;
      if (info.kind === 'brush' && (info.mat === 'glass' || info.mat === 'grate')) return false; // 激光穿过玻璃和栅格
      return true;
    };
    for (const L of this.lasers) {
      L.lensMat.emissiveIntensity = L.active ? 2.5 : 0.2;
      if (!L.active) continue;
      const o = L.pos.clone();
      const d = L.dir.clone();
      let scale = 1;
      const visited = new Set();
      for (let bounce = 0; bounce < 8; bounce++) {
        const res = this.raycast(o, d, 200, pred);
        res.segments.forEach(([a, b], i) => {
          this.beams.add(a, b, scale * (i === 0 ? 1 : res.via.slice(0, i).reduce((k, P) => k * P.teleportScale, 1)));
        });
        for (const P of res.via) scale *= P.teleportScale;
        if (!res.hit) break;
        lastHit = res.point;
        const info = this.colliderInfo.get(res.collider.handle);
        if (info?.kind === 'player') {
          burned = true;
          // 激光像一堵烫手的墙：把人往垂直于光束的方向推开
          const [a, b] = res.segments[res.segments.length - 1];
          const ab = b.clone().sub(a).normalize();
          const away = this.player.position.clone().sub(a);
          away.addScaledVector(ab, -away.dot(ab)).setY(0);
          if (away.lengthSq() < 1e-6) away.set(-ab.z, 0, ab.x);
          away.normalize();
          const v = this.player.velocity;
          const vn = v.x * away.x + v.z * away.z;
          const push = 4.5 * Math.sqrt(this.player.scale);
          if (vn < push) {
            v.x += away.x * (push - vn);
            v.z += away.z * (push - vn);
          }
          break;
        }
        if (info?.kind === 'cube' && info.cube.kind === 'prism' && !visited.has(info.cube)) {
          const cube = info.cube;
          visited.add(cube);
          const c = cube.position.clone();
          this.beams.add(res.point, c, scale);
          d.copy(cube.forward(new THREE.Vector3()));
          o.copy(c).addScaledVector(d, cube.half * 1.05);
          this.beams.add(c, o.clone(), scale);
          scale = cube.scale;
          continue;
        }
        if (info?.kind === 'catcher') info.catcher.hit = true;
        break;
      }
    }
    this.beams.end(lastHit);
    for (const c of this.catchers) c.update(h);
    const p = this.player;
    if (burned) {
      p.burn = (p.burn ?? 0) + h;
      if (!this._burnSfx || this.time - this._burnSfx > 0.25) {
        this._burnSfx = this.time;
        this.audio.play('burn');
      }
      this.emit('burn', Math.min(1, p.burn / 0.45));
      if (p.burn > 0.45) this.die();
    } else if (p.burn > 0) {
      p.burn = Math.max(0, p.burn - h * 2);
      this.emit('burn', Math.min(1, p.burn / 0.45));
    }
  }

  // ---------------------------------------------------------------- 主循环

  simulate(h) {
    this._h = h;
    const p = this.player;
    this._updateSignals();
    this._updateGates();
    for (const pl of this.platforms) pl.step(h);
    p.step(h, this.input, this.portals.list);
    if (this.customGravity) this._applyCubeGravity(h);
    if (p.held) this._updateHeld();
    this.portals.prepareCubes(this.cubes);
    this.world.timestep = h;
    this.world.step(this.eventQueue, this.portals.hooks);
    this.eventQueue.clear();
    this.portals.teleportCubes(this.cubes);
    const went = p.checkPortals(this.portals.list);
    if (went) this.audio.play(Math.abs(went.teleportScale - 1) > 0.01 ? (went.teleportScale > 1 ? 'grow' : 'shrink') : 'teleport');

    for (const b of this.buttons) b.update(h, this.cubes, p);
    for (const sw of this.switches) sw.update(h);
    if (this.lasers.length) this._traceLasers(h);
    if (this.state !== 'playing') return;
    for (const b of this.bridges) b.update();
    for (const l of this.launchers) l.update(h, p, this.cubes);
    this._updateSignals();
    for (const d of this.doors) d.update(h);

    const eye = p.eye(_v);
    for (const f of this.fizzlers) {
      if (!f.active) {
        f.inside = false;
        continue;
      }
      const inside = f.touches(p.position, p.radius) || f.touches(eye, 0.05);
      if (inside && !f.inside && this.portals.clearPlayerPortals()) {
        this.audio.play('fizzle');
        this.emit('portals');
      }
      f.inside = inside;
      for (const c of this.cubes) if (f.touches(c.position, c.half * 0.8)) this._fizzle(c);
    }
    for (const hz of this.hazards) {
      if (hz.contains(eye) || hz.contains(p.position)) return this.die();
      for (const c of this.cubes) if (hz.contains(c.position)) this._fizzle(c);
    }
    const killY = this.level.killY ?? -40;
    for (const c of this.cubes) if (c.position.y < killY) this._fizzle(c);
    if (p.position.y < killY) return this.die();
    // 太空关卡：飘得离出生点太远（掉出星系）也算坠亡
    const killR = this.level.killR;
    if (killR) {
      for (const c of this.cubes) if (c.position.length() > killR) this._fizzle(c);
      if (p.position.length() > killR) return this.die();
    }
    for (const ex of this.exits) if (ex.contains(p.position)) return this.complete();
  }

  _applyCubeGravity(h) {
    for (const c of this.cubes) {
      if (this.player.held?.cube === c) continue;
      this.gravityAt(c.position, _g);
      const k = 9.81 * _g.mag * c.body.mass() * h;
      c.body.applyImpulse({ x: _g.dir.x * k, y: _g.dir.y * k, z: _g.dir.z * k }, true);
    }
  }

  _fizzle(cube) {
    if (this.player.held?.cube === cube) this.dropHeld();
    this.audio.play('fizzle');
    this.effects.sparks(cube.position.clone(), 'blue', 20);
    cube.respawn();
  }

  die() {
    if (this.state !== 'playing') return;
    this.state = 'dead';
    this.audio.play('death');
    this.emit('death');
    setTimeout(() => {
      if (this.state === 'dead') {
        this.restart();
        this.emit('respawn');
      }
    }, 1100);
  }

  complete() {
    if (this.state !== 'playing') return;
    this.state = 'complete';
    if (this.player.held) this.dropHeld();
    this.audio.play('complete');
    this.emit('complete', this.levelIndex);
  }

  start() {
    this.last = performance.now();
    const loop = (now) => {
      requestAnimationFrame(loop);
      const dt = Math.min(0.05, (now - this.last) / 1000);
      this.last = now;
      this.frame(dt);
    };
    requestAnimationFrame(loop);
  }

  frame(dt) {
    if (!this.world) return;
    this.input.poll();
    let lookDX = 0;
    let lookDY = 0;
    if (this.state === 'playing' && !this.frozen) {
      [lookDX, lookDY] = this.input.consumeLook();
      this.player.look(lookDX, lookDY);
      const n = Math.max(1, Math.ceil(dt / (1 / 60) - 0.01));
      const h = dt / n;
      for (let i = 0; i < n && this.state === 'playing'; i++) this.simulate(h);
      this.player.updateRoll(dt);
      this.time += dt;
    } else {
      this.input.consumeLook();
      if (this.state === 'menu') this.player.yaw += dt * 0.08; // 主菜单背景缓慢环视
    }
    this.render(dt, lookDX, lookDY);
  }

  render(dt, lookDX = 0, lookDY = 0) {
    const p = this.player;
    const now = performance.now() / 1000;
    p.updateCamera();
    for (const c of this.cubes) c.sync();
    for (const pl of this.platforms) pl.sync();
    this.portals.updateClones(this.cubes);
    this.portals.update(dt, now);
    for (const ex of this.exits) ex.update(now);
    for (const gf of this.gravityFields) gf.update(now);
    for (const f of this.fizzlers) f.update(now);
    if (this.bridges.length) this.bridges[0].material.uniforms.time.value = now;
    const acid = this.materials.acid.normalMap;
    if (acid) acid.offset.set(this.time * 0.02, this.time * 0.013);
    this.effects.update(dt);
    const sp = Math.hypot(p.velocity.x, p.velocity.z) / Math.sqrt(p.scale);
    this.gunView.update(dt, sp, p.grounded, lookDX, lookDY);
    this.ambience.update(now, p.camera.position);
    this.sky?.update(p.camera.position, now);

    if (this.shadows) this.renderer.shadowMap.needsUpdate = true;
    this.renderer.autoClear = true;
    if (this.post) this.post.render();
    else this.portalRenderer.render(p.camera);
    if (this.gunView.visible && this.state !== 'menu') {
      this.renderer.autoClear = false;
      this.renderer.clearDepth();
      this.renderer.render(this.gunView.scene, this.gunView.camera);
      this.renderer.autoClear = true;
    }
  }

  // ---------------------------------------------------------------- 调试 / 自动化测试接口

  debugAimAt(target) {
    const eye = this.player.eye(new THREE.Vector3());
    const d = new THREE.Vector3(...target).sub(eye).normalize();
    d.applyQuaternion(_dq.copy(this.player.frame).invert()); // 换算到玩家自己的坐标系
    this.player.yaw = Math.atan2(-d.x, -d.z);
    this.player.pitch = Math.asin(THREE.MathUtils.clamp(d.y, -1, 1));
    this.player.roll = 0;
    this.player.updateCamera();
  }

  debugRun(seconds, move = { x: 0, y: 0 }, jump = false) {
    this.input.scripted = { move, jump };
    const h = 1 / 60;
    const steps = Math.round(seconds / h);
    for (let i = 0; i < steps && this.state === 'playing'; i++) {
      this.input.poll();
      this.simulate(h);
      this.player.updateRoll(h);
      this.player.updateCamera();
      for (const c of this.cubes) c.sync();
      this.time += h;
    }
    this.input.scripted = null;
    return this.state;
  }

  debugState() {
    const p = this.player;
    return {
      state: this.state,
      pos: p.position.toArray().map((v) => +v.toFixed(3)),
      vel: p.velocity.toArray().map((v) => +v.toFixed(3)),
      scale: +p.scale.toFixed(3),
      yaw: +THREE.MathUtils.radToDeg(p.yaw).toFixed(1),
      pitch: +THREE.MathUtils.radToDeg(p.pitch).toFixed(1),
      up: p.up.toArray().map((v) => +v.toFixed(3)),
      grounded: p.grounded,
      held: !!p.held,
      portals: [this.portals.blue, this.portals.orange].map((q) => (q.placed ? { pos: q.position.toArray().map((v) => +v.toFixed(2)), n: q.normal.toArray(), size: q.size } : null)),
      cubes: this.cubes.map((c) => c.position.toArray().map((v) => +v.toFixed(2)).concat([+c.scale.toFixed(2)])),
      buttons: this.buttons.map((b) => b.pressed),
      signals: Object.fromEntries(this.signals),
      doors: this.doors.map((d) => +d.open.toFixed(2)),
    };
  }
}

export { PLAYER };
