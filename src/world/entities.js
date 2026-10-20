import * as THREE from 'three';
import { RAPIER, GROUPS } from '../core/physics.js';
import {
  CUBE_HALF,
  createCubeMesh,
  createButtonMesh,
  createDoorMesh,
  createExitMesh,
  createHazardMesh,
  createSwitchMesh,
  createEmitterMesh,
  createCatcherMesh,
  createLauncherMesh,
  createFizzlerMesh,
} from './entityVisuals.js';
import { getMaterials, brushGeometry, TEX_SCALE } from './materials.js';

const _v = new THREE.Vector3();
const _q = new THREE.Quaternion();
const Z = new THREE.Vector3(0, 0, 1);

/** 让一个物体的本地 +Z 指向 dir */
function faceDir(obj, dir) {
  obj.quaternion.setFromUnitVectors(Z, new THREE.Vector3(...dir).normalize());
}

export class Cube {
  constructor(game, def) {
    this.game = game;
    this.def = def;
    this.kind = def.kind ?? 'normal'; // normal | prism（折射方块）
    this.spawn = new THREE.Vector3(...def.pos);
    this.spawnScale = def.scale ?? 1;
    this.spawnYaw = THREE.MathUtils.degToRad(def.yaw ?? 0);
    this.prevPos = this.spawn.clone();
    this.scale = 1;
    this.body = game.world.createRigidBody(
      RAPIER.RigidBodyDesc.dynamic()
        .setTranslation(this.spawn.x, this.spawn.y, this.spawn.z)
        .setRotation(_q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), this.spawnYaw))
        .setCcdEnabled(true)
        .setLinearDamping(0.05)
        .setAngularDamping(0.3)
    );
    this.collider = game.world.createCollider(
      RAPIER.ColliderDesc.cuboid(CUBE_HALF, CUBE_HALF, CUBE_HALF)
        .setDensity(60)
        .setFriction(0.7)
        .setRestitution(0.05)
        .setCollisionGroups(GROUPS.cube)
        .setActiveHooks(RAPIER.ActiveHooks.FILTER_CONTACT_PAIRS),
      this.body
    );
    game.colliderInfo.set(this.collider.handle, { kind: 'cube', cube: this });
    this.mesh = createCubeMesh(this.kind);
    this.clone = createCubeMesh(this.kind);
    this.clone.visible = false;
    game.levelGroup.add(this.mesh, this.clone);
    this.setScale(this.spawnScale);
    this.sync();
  }

  /** 改变方块大小（穿过大小不同的门时） */
  setScale(s) {
    if (s === this.scale) return;
    this.scale = s;
    const h = CUBE_HALF * s;
    this.collider.setHalfExtents({ x: h, y: h, z: h });
    this.collider.setDensity(60);
    this.mesh.scale.setScalar(s);
  }

  /** 重量：体积越大越重，普通方块是 1 */
  get weight() {
    return this.scale ** 3;
  }

  get half() {
    return CUBE_HALF * this.scale;
  }

  respawn() {
    this.setScale(this.spawnScale);
    this.body.setTranslation(this.spawn, true);
    this.body.setRotation(_q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), this.spawnYaw), true);
    this.body.setLinvel({ x: 0, y: 0, z: 0 }, true);
    this.body.setAngvel({ x: 0, y: 0, z: 0 }, true);
    this.prevPos.copy(this.spawn);
    this.sync();
  }

  get position() {
    const t = this.body.translation();
    return _v.set(t.x, t.y, t.z);
  }

  /** 折射方块的出光方向（本地 -Z） */
  forward(out) {
    const r = this.body.rotation();
    return out.set(0, 0, -1).applyQuaternion(_q.set(r.x, r.y, r.z, r.w));
  }

  sync() {
    const t = this.body.translation();
    const r = this.body.rotation();
    this.mesh.position.set(t.x, t.y, t.z);
    this.mesh.quaternion.set(r.x, r.y, r.z, r.w);
  }
}

export class Button {
  constructor(game, def) {
    this.game = game;
    this.def = def;
    this.id = def.id ?? 'b1';
    this.heavy = !!def.heavy;
    // 普通按钮要有“正常体重”的一半才压得下去；重型按钮需要 4 倍重量（巨大的方块或巨大的人）
    this.threshold = this.heavy ? 3.5 : 0.5;
    this.radius = this.heavy ? 1.36 : 0.8;
    this.pos = new THREE.Vector3(...def.pos);
    this.pressed = false;
    this.press = 0;
    const vis = createButtonMesh(this.heavy);
    this.group = vis.group;
    this.plunger = vis.plunger;
    this.plungerMat = vis.plungerMat;
    this.group.position.copy(this.pos);
    game.levelGroup.add(this.group);
    const body = game.world.createRigidBody(RAPIER.RigidBodyDesc.fixed().setTranslation(this.pos.x, this.pos.y + 0.08, this.pos.z));
    const col = game.world.createCollider(RAPIER.ColliderDesc.cylinder(0.08, this.radius + 0.1).setCollisionGroups(GROUPS.world), body);
    game.colliderInfo.set(col.handle, { kind: 'button', button: this });
  }

  update(dt, cubes, player) {
    let weight = 0;
    for (const c of cubes) {
      const p = c.position;
      const dx = p.x - this.pos.x;
      const dz = p.z - this.pos.z;
      const dy = p.y - this.pos.y;
      const r = this.radius + c.half * 0.5;
      if (dx * dx + dz * dz < r * r && dy > 0 && dy < c.half + 0.6) weight += c.weight;
    }
    const feet = player.position.y - player.footOffset;
    const dx = player.position.x - this.pos.x;
    const dz = player.position.z - this.pos.z;
    const r = this.radius * 0.94 + player.radius * 0.5;
    if (dx * dx + dz * dz < r * r && feet > this.pos.y - 0.05 && feet < this.pos.y + 0.45) weight += player.scale ** 3;
    const on = weight >= this.threshold;
    if (on !== this.pressed) {
      this.pressed = on;
      this.game.audio?.play(on ? 'buttonDown' : 'buttonUp');
    }
    this.light = weight > 0 && !on; // 有东西压着但不够重
    this.press += ((on ? 1 : 0) - this.press) * Math.min(1, dt * 12);
    this.plunger.position.y = 0.17 - 0.07 * this.press;
    this.plungerMat.color.setHex(on ? 0x146a1c : 0x8a1c14);
    this.plungerMat.emissive.setHex(on ? 0x30ff40 : this.light ? 0xffa010 : 0xff2a10);
  }
}

export class Door {
  constructor(game, def) {
    this.game = game;
    this.def = def;
    this.requires = def.requires ?? [];
    this.size = def.size ?? [0.3, 3, 3];
    this.pos = new THREE.Vector3(...def.pos);
    this.open = 0;
    this.isOpen = false;
    const vis = createDoorMesh(this.size);
    this.group = vis.group;
    this.lightMat = vis.lightMat;
    this.group.position.copy(this.pos);
    game.levelGroup.add(this.group);
    this.body = game.world.createRigidBody(RAPIER.RigidBodyDesc.kinematicPositionBased().setTranslation(this.pos.x, this.pos.y, this.pos.z));
    this.collider = game.world.createCollider(
      RAPIER.ColliderDesc.cuboid(this.size[0] / 2, this.size[1] / 2, this.size[2] / 2).setCollisionGroups(GROUPS.world),
      this.body
    );
    game.colliderInfo.set(this.collider.handle, { kind: 'door', door: this });
  }

  update(dt) {
    const want = this.requires.length > 0 && this.game.cond(this.requires);
    if (want !== this.isOpen) {
      this.isOpen = want;
      this.game.audio?.play(want ? 'doorOpen' : 'doorClose');
    }
    const target = want ? 1 : 0;
    if (this.open !== target) {
      const s = dt * 1.6;
      this.open = want ? Math.min(1, this.open + s) : Math.max(0, this.open - s);
      const y = this.pos.y + this.open * (this.size[1] - 0.15);
      this.group.position.y = y;
      this.body.setNextKinematicTranslation({ x: this.pos.x, y, z: this.pos.z });
    }
    this.collider.setEnabled(this.open < 0.95);
    this.lightMat.emissive.setHex(want ? 0x30ff40 : 0xff2010);
  }
}

/** 台座开关：按 E 触发。timer > 0 时是限时开关，否则每按一次切换开/关 */
export class Switch {
  constructor(game, def) {
    this.game = game;
    this.def = def;
    this.id = def.id ?? 's1';
    this.timer = def.timer ?? 0;
    this.on = false;
    this.t = 0;
    this.tick = 0;
    this.pos = new THREE.Vector3(...def.pos);
    const vis = createSwitchMesh();
    this.group = vis.group;
    this.capMat = vis.capMat;
    this.ring = vis.ring;
    this.group.position.copy(this.pos);
    this.group.rotation.y = THREE.MathUtils.degToRad(def.yaw ?? 0);
    game.levelGroup.add(this.group);
    const body = game.world.createRigidBody(RAPIER.RigidBodyDesc.fixed().setTranslation(this.pos.x, this.pos.y + 0.6, this.pos.z));
    const col = game.world.createCollider(RAPIER.ColliderDesc.cuboid(0.2, 0.6, 0.2).setCollisionGroups(GROUPS.world), body);
    game.colliderInfo.set(col.handle, { kind: 'switch', sw: this });
  }

  activate() {
    if (this.timer > 0) {
      this.t = this.timer;
      this.on = true;
    } else this.on = !this.on;
    this.game.audio?.play('switch');
  }

  update(dt) {
    if (this.timer > 0 && this.t > 0) {
      this.t -= dt;
      this.tick -= dt;
      if (this.tick <= 0) {
        this.tick = this.t < 2 ? 0.25 : 0.5;
        this.game.audio?.play('tick');
      }
      if (this.t <= 0) {
        this.on = false;
        this.game.audio?.play('switchOff');
      }
    }
    this.ring.visible = this.on && this.timer > 0;
    if (this.ring.visible) this.ring.scale.setScalar(Math.max(0.05, this.t / this.timer));
    this.capMat.color.setHex(this.on ? 0x146a1c : 0x8a1c14);
    this.capMat.emissive.setHex(this.on ? 0x30ff40 : 0xff2a10);
  }
}

/** 激光发射器 */
export class LaserEmitter {
  constructor(game, def) {
    this.game = game;
    this.def = def;
    this.when = def.when;
    this.pos = new THREE.Vector3(...def.pos);
    this.dir = new THREE.Vector3(...(def.dir ?? [0, 0, 1])).normalize();
    const vis = createEmitterMesh('laser');
    this.group = vis.group;
    this.lensMat = vis.lensMat;
    this.group.position.copy(this.pos).addScaledVector(this.dir, -0.3);
    faceDir(this.group, this.dir.toArray());
    game.levelGroup.add(this.group);
  }
  get active() {
    return this.game.cond(this.when, true);
  }
}

/** 激光接收器：被激光照到时发出信号 */
export class Catcher {
  constructor(game, def) {
    this.game = game;
    this.def = def;
    this.id = def.id ?? 'c1';
    this.pos = new THREE.Vector3(...def.pos);
    this.normal = new THREE.Vector3(...(def.normal ?? [0, 0, 1])).normalize();
    this.lit = false;
    this.hit = false;
    this.hold = 0;
    const vis = createCatcherMesh();
    this.group = vis.group;
    this.coreMat = vis.coreMat;
    this.group.position.copy(this.pos).addScaledVector(this.normal, -0.25);
    faceDir(this.group, this.normal.toArray());
    game.levelGroup.add(this.group);
    const c = this.pos.clone().addScaledVector(this.normal, -0.05);
    const body = game.world.createRigidBody(RAPIER.RigidBodyDesc.fixed().setTranslation(c.x, c.y, c.z).setRotation(this.group.quaternion));
    const col = game.world.createCollider(RAPIER.ColliderDesc.cuboid(0.45, 0.45, 0.1).setCollisionGroups(GROUPS.world), body);
    game.colliderInfo.set(col.handle, { kind: 'catcher', catcher: this });
  }

  update(dt) {
    this.hold = this.hit ? 0.12 : Math.max(0, this.hold - dt);
    const on = this.hit || this.hold > 0;
    if (on !== this.lit) {
      this.lit = on;
      this.game.audio?.play(on ? 'catcherOn' : 'catcherOff');
    }
    this.coreMat.emissive.setHex(on ? 0xff5030 : 0x401008);
    this.coreMat.emissiveIntensity = on ? 3 : 1;
  }
}

/** 光桥发射器：沿发射方向投出一座硬光桥，遇到传送门会从另一扇门继续延伸 */
export class Bridge {
  constructor(game, def) {
    this.game = game;
    this.def = def;
    this.when = def.when;
    this.pos = new THREE.Vector3(...def.pos);
    this.dir = new THREE.Vector3(...(def.dir ?? [0, 0, 1])).normalize();
    this.up = new THREE.Vector3(...(def.up ?? [0, 1, 0])).normalize();
    this.width = def.width ?? 1.6;
    this.parts = []; // { body, collider, mesh }
    this.key = '';
    const vis = createEmitterMesh('bridge');
    this.group = vis.group;
    this.group.position.copy(this.pos).addScaledVector(this.dir, -0.3);
    const m = new THREE.Matrix4().makeBasis(new THREE.Vector3().crossVectors(this.up, this.dir), this.up, this.dir);
    this.group.quaternion.setFromRotationMatrix(m);
    game.levelGroup.add(this.group);
    this.material = Bridge.material();
  }

  static material() {
    if (Bridge._mat) return Bridge._mat;
    Bridge._mat = new THREE.ShaderMaterial({
      uniforms: { time: { value: 0 } },
      vertexShader: `varying vec2 vUv; varying vec2 vLen; uniform float time;
        attribute float len;
        void main(){ vUv = uv; vLen = vec2(len, 0.0); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
      fragmentShader: `uniform float time; varying vec2 vUv; varying vec2 vLen;
        void main(){
          float edge = smoothstep(0.06, 0.0, min(vUv.x, 1.0 - vUv.x));
          float along = vUv.y * vLen.x;
          float chev = smoothstep(0.85, 1.0, fract(along * 0.8 - abs(vUv.x - 0.5) * 0.8 - time * 0.6));
          float a = 0.22 + edge * 0.6 + chev * 0.2;
          gl_FragColor = vec4(vec3(0.45, 0.78, 1.0) * (1.2 + edge), a);
        }`,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    return Bridge._mat;
  }

  get active() {
    return this.game.cond(this.when, true);
  }

  clear() {
    for (const p of this.parts) {
      this.game.colliderInfo.delete(p.collider.handle);
      this.game.world.removeRigidBody(p.body);
      this.game.levelGroup.remove(p.mesh);
      p.mesh.geometry.dispose();
    }
    this.parts = [];
  }

  /** 每一步重新追踪光桥路径；路径变化时重建碰撞体 */
  update() {
    const g = this.game;
    if (!this.active) {
      if (this.key) {
        this.clear();
        this.key = '';
        g.audio?.play('bridgeOff');
      }
      return;
    }
    const o = this.pos.clone();
    const res = g.raycast(o, this.dir, 160, (col) => {
      const info = g.colliderInfo.get(col.handle);
      return !info || (info.kind !== 'player' && info.kind !== 'cube' && info.kind !== 'bridge');
    });
    const ups = [this.up.clone()];
    for (const P of res.via) ups.push(ups[ups.length - 1].clone().applyQuaternion(P.teleportQ));
    const key = res.segments.map(([a, b]) => a.toArray().concat(b.toArray()).map((v) => v.toFixed(2)).join(',')).join('|');
    if (key === this.key) return;
    const fresh = !this.key;
    this.key = key;
    this.clear();
    res.segments.forEach(([a, b], i) => {
      const scale = i === 0 ? 1 : res.via.slice(0, i).reduce((k, P) => k * P.teleportScale, 1);
      const len = a.distanceTo(b);
      if (len < 0.05) return;
      const fwd = b.clone().sub(a).normalize();
      const up = ups[i].clone();
      up.addScaledVector(fwd, -up.dot(fwd)).normalize();
      const right = new THREE.Vector3().crossVectors(up, fwd).normalize();
      const rot = new THREE.Quaternion().setFromRotationMatrix(new THREE.Matrix4().makeBasis(right, up, fwd));
      const center = a.clone().add(b).multiplyScalar(0.5).addScaledVector(up, -0.06 * scale);
      const w = this.width * scale;
      const body = g.world.createRigidBody(RAPIER.RigidBodyDesc.fixed().setTranslation(center.x, center.y, center.z).setRotation(rot));
      const collider = g.world.createCollider(RAPIER.ColliderDesc.cuboid(w / 2, 0.06 * scale, len / 2).setCollisionGroups(GROUPS.world).setFriction(0.9), body);
      g.colliderInfo.set(collider.handle, { kind: 'bridge', bridge: this });
      const geo = new THREE.PlaneGeometry(w, len);
      geo.rotateX(-Math.PI / 2);
      geo.setAttribute('len', new THREE.Float32BufferAttribute(new Array(geo.attributes.position.count).fill(len), 1));
      const mesh = new THREE.Mesh(geo, this.material);
      mesh.position.copy(center).addScaledVector(up, 0.065 * scale);
      mesh.quaternion.copy(rot);
      mesh.renderOrder = 2;
      g.levelGroup.add(mesh);
      this.parts.push({ body, collider, mesh });
    });
    if (fresh) g.audio?.play('bridgeOn');
  }
}

/** 弹射板：踩上去就把人或方块抛向目标点（target 是落点，time 是飞行时间） */
export class Launcher {
  constructor(game, def) {
    this.game = game;
    this.def = def;
    this.when = def.when;
    this.pos = new THREE.Vector3(...def.pos);
    this.target = new THREE.Vector3(...def.target);
    this.time = def.time ?? 1.4;
    this.cool = 0;
    this.anim = 0;
    const vis = createLauncherMesh();
    this.group = vis.group;
    this.plate = vis.plate;
    this.arrows = vis.arrows;
    this.group.position.copy(this.pos);
    const d = this.target.clone().sub(this.pos);
    this.arrows.rotation.y = Math.atan2(-d.x, -d.z) + Math.PI;
    game.levelGroup.add(this.group);
    const body = game.world.createRigidBody(RAPIER.RigidBodyDesc.fixed().setTranslation(this.pos.x, this.pos.y + 0.085, this.pos.z));
    const col = game.world.createCollider(RAPIER.ColliderDesc.cylinder(0.085, 1.0).setCollisionGroups(GROUPS.world), body);
    game.colliderInfo.set(col.handle, { kind: 'launcher', launcher: this });
  }

  /** 从 from 出发 time 秒后到达 to 所需的初速度 */
  velocity(from, to, out) {
    const t = this.time;
    const g = 9.81;
    return out.set((to.x - from.x) / t, (to.y - from.y + 0.5 * g * t * t) / t, (to.z - from.z) / t);
  }

  update(dt, player, cubes) {
    this.cool = Math.max(0, this.cool - dt);
    this.anim = Math.max(0, this.anim - dt * 3);
    this.plate.position.y = 0.14 + Math.sin(this.anim * Math.PI) * 0.25;
    if (this.cool > 0 || !this.game.cond(this.when, true)) return;
    const top = this.pos.y + 0.17;
    const p = player.position;
    const feet = p.y - player.footOffset;
    if (player.grounded && Math.hypot(p.x - this.pos.x, p.z - this.pos.z) < 0.95 && Math.abs(feet - top) < 0.3) {
      const from = new THREE.Vector3(p.x, feet, p.z);
      const v = this.velocity(from, this.target, new THREE.Vector3());
      player.launch(v);
      this.fire();
      return;
    }
    for (const c of cubes) {
      const cp = c.position;
      if (this.game.player.held?.cube === c) continue;
      if (Math.hypot(cp.x - this.pos.x, cp.z - this.pos.z) < 0.95 && cp.y - c.half - top < 0.25 && cp.y > top) {
        const from = new THREE.Vector3(cp.x, cp.y - c.half, cp.z);
        const v = this.velocity(from, this.target, new THREE.Vector3());
        c.body.setLinvel(v, true);
        c.body.setAngvel({ x: 0, y: 0, z: 0 }, true);
        this.fire();
        return;
      }
    }
  }

  fire() {
    this.cool = 0.6;
    this.anim = 1;
    this.game.audio?.play('launch');
  }
}

/** 移动平台：在 pos 和 to 之间往返；有 when 时，条件满足就移到 to，否则回到 pos */
export class Platform {
  constructor(game, def) {
    this.game = game;
    this.def = def;
    this.when = def.when;
    this.a = new THREE.Vector3(...def.pos);
    this.b = new THREE.Vector3(...(def.to ?? def.pos));
    this.size = def.size ?? [3, 0.4, 3];
    this.period = def.period ?? 6;
    this.speed = def.speed ?? 2;
    this.u = 0;
    this.t = def.phase ?? 0;
    this.cur = this.a.clone();
    this.delta = new THREE.Vector3();
    const mats = getMaterials();
    this.mesh = new THREE.Mesh(brushGeometry(this.size, [0, 0, 0], TEX_SCALE[def.mat] ?? 2), mats[def.mat ?? 'metal'] ?? mats.metal);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    this.mesh.position.copy(this.a);
    game.levelGroup.add(this.mesh);
    this.body = game.world.createRigidBody(RAPIER.RigidBodyDesc.kinematicPositionBased().setTranslation(this.a.x, this.a.y, this.a.z));
    this.collider = game.world.createCollider(
      RAPIER.ColliderDesc.cuboid(this.size[0] / 2, this.size[1] / 2, this.size[2] / 2).setCollisionGroups(GROUPS.world).setFriction(1),
      this.body
    );
    game.colliderInfo.set(this.collider.handle, { kind: 'platform', platform: this, mat: def.mat ?? 'metal' });
  }

  /** 在物理步进之前调用：算出这一步要走到哪 */
  step(dt) {
    const len = Math.max(0.01, this.a.distanceTo(this.b));
    if (this.when !== undefined) {
      const target = this.game.cond(this.when, true) ? 1 : 0;
      const du = (this.speed * dt) / len;
      this.u = target > this.u ? Math.min(target, this.u + du) : Math.max(target, this.u - du);
    } else {
      // 来回往返：两端各停留四分之一周期，方便上下
      this.t += dt;
      const f = (((this.t / this.period) % 1) + 1) % 1;
      const ease = (x) => x * x * (3 - 2 * x);
      this.u = f < 0.25 ? 0 : f < 0.5 ? ease((f - 0.25) * 4) : f < 0.75 ? 1 : 1 - ease((f - 0.75) * 4);
    }
    _v.copy(this.a).lerp(this.b, this.u);
    this.delta.subVectors(_v, this.cur);
    this.cur.copy(_v);
    this.body.setNextKinematicTranslation(this.cur);
  }

  sync() {
    this.mesh.position.copy(this.cur);
  }
}

export class Volume {
  constructor(def) {
    this.def = def;
    const p = def.pos;
    const s = def.size ?? [2, 2, 2];
    this.box = new THREE.Box3(new THREE.Vector3(p[0] - s[0] / 2, p[1] - s[1] / 2, p[2] - s[2] / 2), new THREE.Vector3(p[0] + s[0] / 2, p[1] + s[1] / 2, p[2] + s[2] / 2));
  }
  contains(p) {
    return this.box.containsPoint(p);
  }
}

/** 消散力场：人穿过时自己的传送门消失；方块穿过时被蒸发（回到出生点） */
export class Fizzler extends Volume {
  constructor(game, def) {
    super(def);
    this.game = game;
    this.when = def.when;
    const vis = createFizzlerMesh(def.size ?? [0.1, 3, 3]);
    this.group = vis.group;
    this.mat = vis.mat;
    this.group.position.set(...def.pos);
    game.levelGroup.add(this.group);
    this.inside = false;
  }

  get active() {
    return this.game.cond(this.when, true);
  }

  /** 体积膨胀一点，用于判断胶囊/方块是否碰到光幕 */
  touches(p, r) {
    const b = this.box;
    return p.x > b.min.x - r && p.x < b.max.x + r && p.y > b.min.y - r && p.y < b.max.y + r && p.z > b.min.z - r && p.z < b.max.z + r;
  }

  update(time) {
    this.mat.uniforms.time.value = time;
    this.mat.uniforms.on.value = this.active ? 1 : 0;
  }
}

export class Exit extends Volume {
  constructor(game, def) {
    super(def);
    this.group = createExitMesh(def.size ?? [2, 2.5, 2]);
    this.group.position.set(...def.pos);
    game.levelGroup.add(this.group);
  }
  update(time) {
    const beam = this.group.userData.beam;
    if (beam) beam.material.opacity = 0.06 + 0.04 * Math.sin(time * 3);
  }
}

export class Hazard extends Volume {
  constructor(game, def) {
    super(def);
    this.group = createHazardMesh(def.size ?? [4, 1, 4]);
    this.group.position.set(...def.pos);
    game.levelGroup.add(this.group);
  }
}
