import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { RAPIER, GROUPS } from './core/physics.js';
import { Input } from './core/Input.js';
import { AudioManager } from './core/Audio.js';
import { Player, PLAYER } from './player/Player.js';
import { PortalGunView, ShotEffects } from './player/PortalGun.js';
import { PortalSystem } from './portal/PortalSystem.js';
import { PortalRenderer } from './portal/PortalRenderer.js';
import { Portal } from './portal/Portal.js';
import { getMaterials, brushGeometry, PORTALABLE } from './world/materials.js';
import { createLightFixture } from './world/entityVisuals.js';
import { Cube, Button, Door, Exit, Hazard } from './world/entities.js';

const _v = new THREE.Vector3();
const _v2 = new THREE.Vector3();
const _d = new THREE.Vector3();
const _local = new THREE.Vector3();
const _ray = new RAPIER.Ray({ x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 1 });

export const QUALITY = {
  low: { pixelRatio: 1, depth: 1, rtScale: 0.5, shadows: false },
  medium: { pixelRatio: 1.25, depth: 2, rtScale: 0.75, shadows: true },
  high: { pixelRatio: 2, depth: 3, rtScale: 1, shadows: true },
};

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
    this.scene.add(new THREE.HemisphereLight(0xdce6ff, 0x2a2824, 0.35));

    this.materials = getMaterials(quality === 'low' ? 'low' : 'high', this.renderer.capabilities.getMaxAnisotropy());
    this.input = new Input(canvas);
    this.input.touchMode = touch;
    this.audio = new AudioManager();
    this.player = new Player(this);
    this.scene.add(this.player.bodyMesh);
    this.portals = new PortalSystem(this);
    this.portals.addToScene(this.scene);
    this.portalRenderer = new PortalRenderer(this.renderer, this.scene, this.portals.list, {});
    this.gunView = new PortalGunView();
    this.effects = new ShotEffects(this.scene);

    this.levelGroup = new THREE.Group();
    this.scene.add(this.levelGroup);
    this.colliderInfo = new Map();
    this.world = null;
    this.level = null;
    this.levelIndex = -1;
    this.cubes = [];
    this.buttons = [];
    this.doors = [];
    this.exits = [];
    this.hazards = [];
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
    this.portalRenderer.setQuality({ depth: cfg.depth, scale: cfg.rtScale });
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
  }

  // ---------------------------------------------------------------- 关卡

  loadLevel(def, index = -1) {
    this.unloadLevel();
    this.level = def;
    this.levelIndex = index;
    this.world = new RAPIER.World({ x: 0, y: -9.81, z: 0 });
    this.world.integrationParameters.numSolverIterations = 8;
    // 注意：Rapier 只有在传入事件队列时才会调用碰撞过滤钩子
    this.eventQueue = new RAPIER.EventQueue(false);
    this.player.attach(this.world);
    this.colliderInfo.set(this.player.collider.handle, { kind: 'player' });

    for (const b of def.brushes) this._addBrush(b);
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
        default:
          break;
      }
    }
    this._applyShadows();
    // 物理世界需要先跑一次查询结构，固定传送门才能找到它贴着的墙
    this.world.step();
    this.portals.reset();
    for (const e of def.entities ?? []) if (e.type === 'portal') this.portals.placeFixed(e);
    const sp = def.spawn ?? { pos: [0, 0, 0], yaw: 0 };
    this.player.spawn(sp.pos, sp.yaw ?? 0);
    this.gunView.setColor(def.gun === 'orange' ? 'orange' : 'blue');
    this.renderer.shadowMap.needsUpdate = true;
    this.time = 0;
    this.emit('level', def, index);
  }

  _addBrush(b) {
    const mat = this.materials[b.mat] ?? this.materials.metal;
    const mesh = new THREE.Mesh(brushGeometry(b.size, b.pos), mat);
    mesh.position.set(...b.pos);
    const transparent = b.mat === 'glass' || b.mat === 'grate';
    mesh.castShadow = b.mat !== 'glass';
    mesh.receiveShadow = !transparent;
    if (b.mat === 'glass') mesh.renderOrder = 2;
    this.levelGroup.add(mesh);
    const body = this.world.createRigidBody(RAPIER.RigidBodyDesc.fixed().setTranslation(...b.pos));
    const col = this.world.createCollider(
      RAPIER.ColliderDesc.cuboid(b.size[0] / 2, b.size[1] / 2, b.size[2] / 2).setCollisionGroups(GROUPS.world).setFriction(0.8),
      body
    );
    this.colliderInfo.set(col.handle, { kind: 'brush', def: b, mat: b.mat, portalable: PORTALABLE.has(b.mat) });
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
    for (const c of [...this.levelGroup.children]) {
      this.levelGroup.remove(c);
      c.traverse((o) => {
        if (o.geometry) o.geometry.dispose();
      });
    }
    this.cubes = [];
    this.buttons = [];
    this.doors = [];
    this.exits = [];
    this.hazards = [];
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

  // ---------------------------------------------------------------- 射线（可穿过传送门）

  /**
   * 沿射线检测，遇到连通的传送门会“拐进去”继续检测。
   * 返回 { hit, collider, point, normal, via: [穿过的门], dir, segments: [[起点, 终点], ...] }
   */
  raycast(origin, dir, maxDist, predicate) {
    const o = origin.clone();
    const d = dir.clone().normalize();
    let remaining = maxDist;
    const via = [];
    const segments = [];
    for (let depth = 0; depth < 4; depth++) {
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
        if (Portal.inEllipse(_local, 0.97) && (!best || t < best.t)) best = { P, t };
      }
      if (best) {
        const end = o.clone().addScaledVector(d, best.t);
        segments.push([o.clone(), end]);
        o.copy(end).applyMatrix4(best.P.teleport);
        d.applyQuaternion(best.P.teleportQ);
        o.addScaledVector(d, 0.005);
        remaining -= best.t;
        via.push(best.P);
        continue;
      }
      const end = o.clone().addScaledVector(d, hitT);
      segments.push([o.clone(), end]);
      if (!hit) return { hit: false, via, dir: d, point: end, segments, distance: maxDist - remaining + hitT };
      return {
        hit: true,
        collider: hit.collider,
        point: end,
        normal: hit.normal,
        via,
        dir: d,
        segments,
        distance: maxDist - remaining + hitT,
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
    const res = this.raycast(eye, fwd, 200, (col) => {
      const info = this.colliderInfo.get(col.handle);
      if (!info) return true;
      if (info.kind === 'player') return false;
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
    return new THREE.Vector3(0.2, -0.17, -0.7).applyMatrix4(cam.matrixWorld);
  }

  onPortalMoved(portal, old) {
    // 门被挪走时，正在穿门的物体可能卡在墙里，把它们推回原来那面墙的正面
    const fix = (pos) => {
      const d = _d.copy(pos).sub(old.pos).dot(old.n);
      if (d < 0.32 && d > -2.2) {
        _v.copy(pos).sub(old.pos).addScaledVector(old.n, -d);
        if (_v.length() < 1.4) return 0.33 - d;
      }
      return 0;
    };
    const p = this.player;
    const push = fix(p.position);
    if (push > 0) {
      p.position.addScaledVector(old.n, push);
      p._syncBody(true);
      p.eye(p.prevEye);
    }
    for (const c of this.cubes) {
      const pos = c.position.clone();
      const k = fix(pos);
      if (k > 0) {
        pos.addScaledVector(old.n, k);
        c.body.setTranslation(pos, true);
        c.prevPos.copy(pos);
      }
    }
    if (p.held && p.held.link) this.dropHeld();
  }

  // ---------------------------------------------------------------- 搬方块

  use() {
    if (this.player.held) {
      this.dropHeld();
      return;
    }
    const eye = this.player.eye(new THREE.Vector3());
    const fwd = this.player.forward(new THREE.Vector3());
    const res = this.raycast(eye, fwd, 2.6, (col) => this.colliderInfo.get(col.handle)?.kind !== 'player');
    const info = res.hit ? this.colliderInfo.get(res.collider.handle) : null;
    if (info?.kind === 'cube' && res.via.length <= 1) {
      this.pickUp(info.cube, res.via[0] ?? null);
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
    h.cube.body.setGravityScale(1, true);
    const v = h.cube.body.linvel();
    const s = Math.hypot(v.x, v.y, v.z);
    if (s > 8) h.cube.body.setLinvel({ x: (v.x / s) * 8, y: (v.y / s) * 8, z: (v.z / s) * 8 }, true);
    this.player.held = null;
    this.gunView.holding = false;
    this.audio.play('drop');
    this.audio.setHolding(false);
  }

  _updateHeld() {
    const h = this.player.held;
    const cube = h.cube;
    const eye = this.player.eye(new THREE.Vector3());
    const fwd = this.player.forward(new THREE.Vector3());
    const want = 1.7;
    const res = this.raycast(eye, fwd, want + 0.4, (col) => {
      const info = this.colliderInfo.get(col.handle);
      return !info || (info.kind !== 'player' && info.kind !== 'cube');
    });
    const dist = res.hit ? Math.max(0.7, Math.min(want, res.distance - 0.4)) : want;
    const tp = _v.copy(eye).addScaledVector(fwd, dist);
    const cp = _v2.copy(cube.position);
    if (h.link) cp.applyMatrix4(h.link.other.teleport); // 方块在门那边：换算到玩家这边
    const delta = _d.subVectors(tp, cp);
    // 方块被卡住、离手太远一段时间才松手；快速转身时它会跟着甩过来
    const far = delta.length();
    h.farTime = far > 2.2 ? (h.farTime ?? 0) + this._h : 0;
    if (far > 4 || h.farTime > 0.6) {
      this.dropHeld();
      return;
    }
    const vel = delta.multiplyScalar(14);
    if (vel.length() > 14) vel.setLength(14);
    if (h.link) vel.applyQuaternion(h.link.teleportQ);
    cube.body.setLinvel(vel, true);
    const av = cube.body.angvel();
    cube.body.setAngvel({ x: av.x * 0.8, y: av.y * 0.8, z: av.z * 0.8 }, true);
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

  // ---------------------------------------------------------------- 主循环

  simulate(h) {
    this._h = h;
    const p = this.player;
    p.step(h, this.input, this.portals.list);
    if (p.held) this._updateHeld();
    this.portals.prepareCubes(this.cubes);
    this.world.timestep = h;
    this.world.step(this.eventQueue, this.portals.hooks);
    this.eventQueue.clear();
    this.portals.teleportCubes(this.cubes);
    const went = p.checkPortals(this.portals.list);
    if (went) this.audio.play('teleport');

    for (const b of this.buttons) b.update(h, this.cubes, p);
    for (const d of this.doors) d.update(h, this.buttons);

    const eye = p.eye(_v);
    for (const hz of this.hazards) {
      if (hz.contains(eye) || hz.contains(p.position)) return this.die();
      for (const c of this.cubes) if (hz.contains(c.position)) this._fizzle(c);
    }
    for (const c of this.cubes) if (c.position.y < -40) this._fizzle(c);
    if (p.position.y < -40) return this.die();
    for (const ex of this.exits) if (ex.contains(p.position)) return this.complete();
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
    if (this.state === 'playing') {
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
    p.updateCamera();
    for (const c of this.cubes) c.sync();
    this.portals.updateClones(this.cubes);
    this.portals.update(dt, performance.now() / 1000);
    for (const ex of this.exits) ex.update(performance.now() / 1000);
    const acid = this.materials.acid.normalMap;
    if (acid) acid.offset.set(this.time * 0.02, this.time * 0.013);
    this.effects.update(dt);
    const sp = Math.hypot(p.velocity.x, p.velocity.z);
    this.gunView.update(dt, sp, p.grounded, lookDX, lookDY);

    if (this.shadows) this.renderer.shadowMap.needsUpdate = true;
    this.renderer.autoClear = true;
    this.portalRenderer.render(p.camera);
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
      yaw: +THREE.MathUtils.radToDeg(p.yaw).toFixed(1),
      pitch: +THREE.MathUtils.radToDeg(p.pitch).toFixed(1),
      grounded: p.grounded,
      held: !!p.held,
      portals: this.portals.list.map((q) => (q.placed ? { pos: q.position.toArray().map((v) => +v.toFixed(2)), n: q.normal.toArray() } : null)),
      cubes: this.cubes.map((c) => c.position.toArray().map((v) => +v.toFixed(2))),
      buttons: this.buttons.map((b) => b.pressed),
      doors: this.doors.map((d) => +d.open.toFixed(2)),
    };
  }
}

export { PLAYER };
