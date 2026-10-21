import * as THREE from 'three';
import { RAPIER, GROUPS } from '../core/physics.js';
import { quaternionToLook, lookToQuaternion, MAX_PITCH } from '../portal/portalMath.js';
import { MIN_SCALE, MAX_SCALE } from '../portal/PortalSystem.js';

export const PLAYER = {
  radius: 0.3,
  halfHeight: 0.6, // 胶囊中段的一半，总高 = 2*(0.6+0.3) = 1.8m
  eye: 0.7, // 眼睛相对胶囊中心的高度（离地 1.6m）
  walkSpeed: 5.2,
  groundAccel: 45,
  airAccel: 9, // m/s²，空中只能轻微修正方向
  jumpSpeed: 5.0,
  gravity: 9.81,
  terminal: 32, // 最大速度，防止无限下落时速度失控
  crossOffset: 0.03, // 眼睛离门平面这么近时就判定穿越，避免近裁剪面切到门
  speedGel: 2.8, // 推进凝胶上的最高速度倍率
  bounceMin: 7.5, // 弹跳凝胶的最小弹起速度
};

const _v = new THREE.Vector3();
const _w = new THREE.Vector3();
const _local = new THREE.Vector3();
const _before = new THREE.Vector3();
const _n = new THREE.Vector3();
const _q = new THREE.Quaternion();
const _ray = new RAPIER.Ray({ x: 0, y: 0, z: 0 }, { x: 0, y: -1, z: 0 });
const _vl = new THREE.Vector3();
const _ml = new THREE.Vector3();
const _Yaxis = new THREE.Vector3(0, 1, 0);
const _inv = new THREE.Quaternion();
const _tq = new THREE.Quaternion();
const _qw = new THREE.Quaternion();
const _qa = new THREE.Quaternion();
const _qb = new THREE.Quaternion();
const _qc = new THREE.Quaternion();
const _tu = new THREE.Vector3();
const _ax = new THREE.Vector3();
const _g = { dir: new THREE.Vector3(0, -1, 0), mag: 1 };

export class Player {
  constructor(game) {
    this.game = game;
    this.camera = new THREE.PerspectiveCamera(75, 1, 0.01, 1000);
    this.camera.layers.enable(0);
    this.position = new THREE.Vector3(); // 胶囊中心
    this.velocity = new THREE.Vector3();
    this.scale = 1;
    this.yaw = 0;
    this.pitch = 0;
    this.roll = 0;
    // 重力坐标系：frame 把“局部 Y 朝上”的世界旋转到当前的“上”（普通关卡里始终是单位四元数）
    this.frame = new THREE.Quaternion();
    this.up = new THREE.Vector3(0, 1, 0);
    this.gMul = 1; // 当前所在重力场的强度倍数
    this.grounded = false;
    this.ground = null; // 脚下碰撞体的信息
    this.launched = false; // 被弹射板弹出去时，空中不能控制方向
    this.prevEye = new THREE.Vector3();
    this.disabled = new Set();
    this.held = null; // { cube, link }
    this.stepTimer = 0;
    this.airTime = 0;
    this.lastFall = 0;
    this.body = null;
    this.collider = null;
    this.controller = null;
    this.bodyMesh = this._makeBodyMesh();
  }

  get radius() {
    return PLAYER.radius * this.scale;
  }
  get halfHeight() {
    return PLAYER.halfHeight * this.scale;
  }
  get eyeOffset() {
    return PLAYER.eye * this.scale;
  }
  /** 胶囊中心到脚底的距离 */
  get footOffset() {
    return (PLAYER.halfHeight + PLAYER.radius) * this.scale;
  }
  get height() {
    return this.footOffset * 2;
  }

  _makeBodyMesh() {
    // 只有虚拟相机（透过传送门）才看得到自己的身体
    const g = new THREE.Group();
    const suit = new THREE.MeshStandardMaterial({ color: 0xe86a1a, roughness: 0.7 });
    const dark = new THREE.MeshStandardMaterial({ color: 0x2a2d30, roughness: 0.6, metalness: 0.4 });
    const skin = new THREE.MeshStandardMaterial({ color: 0xd9b59a, roughness: 0.8 });
    const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.24, 0.55, 4, 12), suit);
    torso.position.y = 0.15;
    g.add(torso);
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.16, 16, 12), skin);
    head.position.y = 0.72;
    g.add(head);
    const hair = new THREE.Mesh(new THREE.SphereGeometry(0.165, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.55), dark);
    hair.position.y = 0.74;
    g.add(hair);
    for (const s of [-1, 1]) {
      const leg = new THREE.Mesh(new THREE.CapsuleGeometry(0.09, 0.6, 4, 8), dark);
      leg.position.set(s * 0.11, -0.5, 0);
      g.add(leg);
      const arm = new THREE.Mesh(new THREE.CapsuleGeometry(0.07, 0.5, 4, 8), suit);
      arm.position.set(s * 0.3, 0.2, 0);
      g.add(arm);
    }
    const gun = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.14, 0.5), new THREE.MeshStandardMaterial({ color: 0xeeeeee, roughness: 0.3 }));
    gun.position.set(0.25, 0.15, -0.3);
    g.add(gun);
    g.traverse((o) => {
      o.layers.set(1);
      if (o.isMesh) o.castShadow = true;
    });
    return g;
  }

  attach(world) {
    this.world = world;
    this.body = world.createRigidBody(RAPIER.RigidBodyDesc.kinematicPositionBased().setTranslation(this.position.x, this.position.y, this.position.z));
    this.collider = world.createCollider(
      RAPIER.ColliderDesc.capsule(PLAYER.halfHeight, PLAYER.radius).setCollisionGroups(GROUPS.player).setFriction(0),
      this.body
    );
    const c = world.createCharacterController(0.02);
    c.setUp({ x: 0, y: 1, z: 0 });
    this.controller = c;
    c.setMaxSlopeClimbAngle(THREE.MathUtils.degToRad(50));
    c.setMinSlopeSlideAngle(THREE.MathUtils.degToRad(35));
    c.setSlideEnabled(true);
    c.setApplyImpulsesToDynamicBodies(true);
    c.setCharacterMass(70);
    this.scale = 0; // 强制 setScale 刷新
    this.setScale(1);
  }

  /** 改变体型：碰撞胶囊、台阶高度、身体模型都跟着缩放 */
  setScale(s) {
    s = THREE.MathUtils.clamp(s, MIN_SCALE, MAX_SCALE);
    if (s === this.scale) return;
    this.scale = s;
    if (this.collider) {
      this.collider.setHalfHeight(PLAYER.halfHeight * s);
      this.collider.setRadius(PLAYER.radius * s);
    }
    if (this.controller) {
      this.controller.setOffset(Math.max(0.004, 0.02 * Math.min(1, s)));
      this.controller.enableAutostep(0.35 * s, 0.15 * s, false);
      this.controller.enableSnapToGround(0.25 * s);
      this.controller.setCharacterMass(70 * s * s * s);
    }
    this.bodyMesh.scale.setScalar(s);
    this.camera.near = 0.01 * Math.min(1, s);
    this.camera.updateProjectionMatrix();
  }

  spawn(pos, yawDeg = 0, scale = 1) {
    this.setScale(scale);
    this.frame.identity();
    this.up.set(0, 1, 0); // frame 重置了，up 也要跟着回正；否则倒着通关/死在天花板上之后，下一次出生会陷进地里
    this.game.gravityAt?.(_v.set(pos[0], pos[1], pos[2]), _g);
    this._alignFrame(0, true, _g.dir);
    this.gMul = _g.mag;
    this.position.set(pos[0], pos[1], pos[2]).addScaledVector(this.up, this.footOffset + 0.02);
    this.velocity.set(0, 0, 0);
    this.yaw = THREE.MathUtils.degToRad(yawDeg);
    this.pitch = 0;
    this.roll = 0;
    this.held = null;
    this.launched = false;
    this.ground = null;
    this._syncBody(true);
    this.eye(this.prevEye);
    this.updateCamera();
  }

  eye(out) {
    return out.copy(this.position).addScaledVector(this.up, this.eyeOffset);
  }

  /**
   * 让坐标系的“上”转到 -gdir。物理坐标系一步到位（贴着星球走时每一步只转一点点，镜头跟着地面转）；
   * 突然的大转向（走进反重力区、从一颗星飞到另一颗星）时，镜头保持不动，roll 之后慢慢归零，像翻个身。
   */
  _alignFrame(dt, instant, gdir) {
    _tu.copy(gdir).negate();
    const dot = THREE.MathUtils.clamp(this.up.dot(_tu), -1, 1);
    if (dot > 0.999999) return;
    const angle = Math.acos(dot);
    _ax.crossVectors(this.up, _tu);
    if (_ax.lengthSq() < 1e-8) _ax.set(1, 0, 0).applyQuaternion(this.frame); // 正好倒过来：绕自己的左右轴翻
    _ax.normalize();
    _qa.copy(this.frame);
    _tq.setFromAxisAngle(_ax, angle);
    this.frame.premultiply(_tq).normalize();
    this.up.set(0, 1, 0).applyQuaternion(this.frame);
    // 贴着球面走：速度跟着地面一起转，否则低重力下会被甩出去（像《马里奥银河》）
    if (angle <= 0.15 && this.grounded) this.velocity.applyQuaternion(_tq);
    if (angle > 0.15) {
      lookToQuaternion(this.yaw, this.pitch, this.roll, _qb).premultiply(_qa).premultiply(_qc.copy(this.frame).invert());
      const look = quaternionToLook(_qb);
      this.yaw = look.yaw;
      this.pitch = look.pitch;
      this.roll = look.roll;
    }
  }

  forward(out) {
    return out.set(0, 0, -1).applyQuaternion(this.camera.quaternion);
  }

  /** 脚底所在的点 */
  feet(out) {
    return out.copy(this.position).addScaledVector(this.up, -this.footOffset);
  }

  _syncBody(teleport) {
    if (!this.body) return;
    if (teleport) {
      this.body.setTranslation(this.position, true);
      this.body.setRotation(this.frame, true);
      this.world.propagateModifiedBodyPositionsToColliders();
    }
    this.body.setNextKinematicTranslation(this.position);
    this.body.setNextKinematicRotation(this.frame);
  }

  look(dx, dy) {
    this.yaw -= dx;
    this.pitch = THREE.MathUtils.clamp(this.pitch - dy, -MAX_PITCH, MAX_PITCH);
  }

  updateCamera() {
    this.eye(this.camera.position);
    lookToQuaternion(this.yaw, this.pitch, this.roll, this.camera.quaternion);
    this.camera.quaternion.premultiply(this.frame);
    this.camera.updateMatrixWorld(true);
    this.bodyMesh.position.copy(this.position);
    this.bodyMesh.quaternion.setFromAxisAngle(_Yaxis, this.yaw).premultiply(this.frame);
  }

  fits(portal) {
    return portal.fits(this.radius, this.height);
  }

  /** 玩家（眼睛或身体中心）处于某扇门前方的“穿门区域”时，门背后的墙体不再阻挡 */
  _inZone(portal, p) {
    const d = portal.signedDistance(p);
    const reach = Math.max(2.0, this.height * 1.1);
    if (d > reach || d < -reach) return false;
    portal.toLocal(p, _local);
    return portal.contains(_local, 0.98);
  }

  /** 已经有一部分身体进了门：判定放宽，避免在门边缘时墙体突然恢复把人卡住 */
  _inTransit(portal, p) {
    const d = portal.signedDistance(p);
    if (d > 0.1 * this.scale || d < -Math.max(2.4, this.height * 1.3)) return false;
    portal.toLocal(p, _local);
    return portal.contains(_local, 1.6);
  }

  computeDisabled(portals) {
    this.disabled.clear();
    const eye = this.eye(_w);
    for (const p of portals) {
      if (!p.linked || !this.fits(p)) continue;
      if (this._inZone(p, eye) || this._inZone(p, this.position) || this._inTransit(p, eye) || this._inTransit(p, this.position)) {
        for (const h of p.tunnel) this.disabled.add(h);
      }
    }
    if (this.held) this.disabled.add(this.held.cube.collider.handle);
  }

  /**
   * 身体在门平面背后时，门洞边缘就像一圈看不见的墙：只能前后移动，不能横着从墙里走出去。
   */
  _clampToPortalTunnel(portals, before, after) {
    for (const P of portals) {
      if (!P.linked || !this.fits(P)) continue;
      const d1 = P.signedDistance(after);
      // 身体有一部分已经到了门平面背后（掉进地上的门时是脚先进去）就要限制
      const ext = this.radius + Math.abs(P.normal.dot(this.up)) * this.halfHeight - 0.08 * this.scale;
      if (d1 >= ext || d1 < -Math.max(2.4, this.height * 1.3)) continue;
      if (d1 >= 0 && this.velocity.dot(P.normal) > 0) continue; // 正在从门里出来：可以往旁边挪开
      P.toLocal(before, _local);
      const bx = _local.x;
      const by = _local.y;
      const n0 = P.norm(_local);
      if (n0 > 2.6) continue; // 不是从这扇门进来的
      P.toLocal(after, _local);
      const n1 = P.norm(_local);
      if (n1 > Math.max(n0, 0.85)) {
        _local.x = bx;
        _local.y = by;
        after.copy(_local).applyMatrix4(P.matrix);
        // 去掉沿门面方向的速度
        const vr = this.velocity.dot(P.right);
        const vu = this.velocity.dot(P.up);
        this.velocity.addScaledVector(P.right, -vr).addScaledVector(P.up, -vu);
      }
    }
  }

  /** 脚下踩着什么：返回 colliderInfo（地面、凝胶、移动平台……） */
  _probeGround() {
    _ray.origin = { x: this.position.x, y: this.position.y, z: this.position.z };
    _ray.dir = { x: -this.up.x, y: -this.up.y, z: -this.up.z };
    const disabled = this.disabled;
    const hit = this.world.castRay(_ray, this.footOffset + 0.12 * this.scale + 0.05, true, RAPIER.QueryFilterFlags.EXCLUDE_SENSORS, GROUPS.player, this.collider, undefined, (c) => !disabled.has(c.handle));
    return hit ? this.game.colliderInfo.get(hit.collider.handle) ?? null : null;
  }

  step(dt, input, portals) {
    this.computeDisabled(portals);
    const s = this.scale;
    const ss = Math.sqrt(s);

    // 重力方向（可能来自反重力区或星球）：坐标系平滑地转向，之后的运动都在局部坐标里算
    this.game.gravityAt?.(this.position, _g);
    this.gMul = _g.mag;
    if (_g.mag > 0) this._alignFrame(dt, false, _g.dir);
    this.controller.setUp(this.up);
    _inv.copy(this.frame).invert();
    const fq = this.frame;

    // 期望移动方向（水平面）
    const fx = input.move.x;
    const fz = input.move.y;
    const sin = Math.sin(this.yaw);
    const cos = Math.cos(this.yaw);
    _v.set(fx * cos - fz * sin, 0, -fx * sin - fz * cos);
    const wishLen = Math.min(1, _v.length());
    if (wishLen > 0.001) _v.normalize();
    const onSpeed = this.grounded && this.ground?.mat === 'speed';
    const wishSpeed = PLAYER.walkSpeed * ss * wishLen * (onSpeed ? PLAYER.speedGel : 1);

    const vel = _vl.copy(this.velocity).applyQuaternion(_inv);
    if (this.grounded) {
      // 地面：快速贴近目标速度（含摩擦）；推进凝胶上加速慢、摩擦小，但能跑得飞快
      const tx = _v.x * wishSpeed;
      const tz = _v.z * wishSpeed;
      const dx = tx - vel.x;
      const dz = tz - vel.z;
      const dl = Math.hypot(dx, dz);
      const accel = onSpeed ? (wishLen > 0.1 ? 16 : 3) : PLAYER.groundAccel;
      const maxDelta = accel * ss * dt;
      if (dl <= maxDelta) {
        vel.x = tx;
        vel.z = tz;
      } else {
        vel.x += (dx / dl) * maxDelta;
        vel.z += (dz / dl) * maxDelta;
      }
      if (input.jump) {
        vel.y = PLAYER.jumpSpeed * ss * Math.sqrt(Math.max(0.35, this.gMul)) * (this.ground?.mat === 'bounce' ? 1.9 : 1);
        this.grounded = false;
        this.game.audio?.play('jump');
      }
    } else if (wishSpeed > 0 && !this.launched) {
      // 空中：只给很小的控制力，而且不会把速度推到步行速度以上，所以飞跃轨迹可预测
      const cur = vel.x * _v.x + vel.z * _v.z;
      const add = wishSpeed - cur;
      if (add > 0) {
        const a = Math.min(PLAYER.airAccel * ss * dt * wishLen, add);
        vel.x += _v.x * a;
        vel.z += _v.z * a;
      }
    }
    if (!this.grounded || vel.y > 0) vel.y -= PLAYER.gravity * this.gMul * (this.gravityScale ?? 1) * dt;
    const sp = vel.length();
    if (sp > PLAYER.terminal) vel.multiplyScalar(PLAYER.terminal / sp);

    const desired = { x: vel.x * dt, y: vel.y * dt, z: vel.z * dt };
    // 站在移动平台上：跟着平台一起走
    const plat = this.grounded && this.ground?.kind === 'platform' ? this.ground.platform : null;
    if (plat) {
      _w.set(plat.delta.x, Math.max(0, plat.delta.y), plat.delta.z).applyQuaternion(_inv);
      desired.x += _w.x;
      desired.y += _w.y;
      desired.z += _w.z;
    }
    const disabled = this.disabled;
    _w.set(desired.x, desired.y, desired.z).applyQuaternion(fq);
    this.controller.computeColliderMovement(
      this.collider,
      { x: _w.x, y: _w.y, z: _w.z },
      RAPIER.QueryFilterFlags.EXCLUDE_SENSORS,
      GROUPS.player,
      (col) => !disabled.has(col.handle)
    );
    const mw = this.controller.computedMovement();
    const m = _ml.set(mw.x, mw.y, mw.z).applyQuaternion(_inv); // 局部坐标下的实际位移
    const mWorld = { x: mw.x, y: mw.y, z: mw.z };
    const wasGrounded = this.grounded;
    const fallSpeed = vel.y;
    this.grounded = this.controller.computedGrounded() && vel.y <= 0.01;

    // 撞到弹跳凝胶的墙面：水平速度被反弹
    let bounced = false;
    const nc = this.controller.numComputedCollisions();
    for (let i = 0; i < nc; i++) {
      const c = this.controller.computedCollision(i);
      if (!c?.collider) continue;
      const info = this.game.colliderInfo.get(c.collider.handle);
      if (info?.mat !== 'bounce') continue;
      _n.set(c.normal1.x, c.normal1.y, c.normal1.z).applyQuaternion(_inv);
      if (Math.abs(_n.y) < 0.6) {
        _n.y = 0;
        _n.normalize();
        const vn = vel.x * _n.x + vel.z * _n.z;
        if (vn < -0.5) {
          const out = Math.max(-vn, 6 * ss);
          vel.x += _n.x * (out - vn);
          vel.z += _n.z * (out - vn);
          vel.y = Math.max(vel.y, 4 * ss);
          bounced = true;
        }
      } else if (_n.y < -0.6 && vel.y > 0) {
        vel.y = -Math.max(vel.y, 2); // 天花板上的弹跳凝胶
        bounced = true;
      }
    }

    // 被墙挡住的分量要清掉，否则会“粘”在墙上
    if (!bounced) {
      if (Math.abs(desired.x) > 1e-6 && Math.abs(m.x) < Math.abs(desired.x) * 0.98) vel.x = m.x / dt;
      if (Math.abs(desired.z) > 1e-6 && Math.abs(m.z) < Math.abs(desired.z) * 0.98) vel.z = m.z / dt;
    }
    if (desired.y > 0 && m.y < desired.y * 0.5 && !bounced) vel.y = 0; // 撞到天花板

    _before.copy(this.position);
    this.position.x += mWorld.x;
    this.position.y += mWorld.y;
    this.position.z += mWorld.z;
    this.velocity.copy(vel).applyQuaternion(fq);
    this._clampToPortalTunnel(portals, _before, this.position);
    vel.copy(this.velocity).applyQuaternion(_inv);

    this.ground = this.grounded ? this._probeGround() : null;
    if (this.grounded) {
      this.launched = false;
      if (this.ground?.mat === 'bounce') {
        // 弹跳凝胶：落下来多快，就弹起来多快
        vel.y = Math.max(-Math.min(fallSpeed, this.lastFall) * 0.97, PLAYER.bounceMin * ss);
        this.grounded = false;
        this.ground = null;
        this.game.audio?.play('bounce');
      } else {
        if (!wasGrounded) this.game.onLand?.(-this.lastFall / ss);
        if (vel.y < 0) vel.y = 0;
      }
      this.airTime = 0;
    } else {
      this.airTime += dt;
      this.lastFall = vel.y;
    }
    this.velocity.copy(vel).applyQuaternion(fq);
    this._syncBody(false);

    // 脚步声
    if (this.grounded && wishLen > 0.1) {
      this.stepTimer -= (dt * Math.hypot(vel.x, vel.z)) / ss;
      if (this.stepTimer <= 0) {
        this.stepTimer = 2.1;
        this.game.audio?.play('step');
      }
    }
  }

  /** 弹射板等外力：直接设定速度，飞行途中不能控制方向 */
  launch(v) {
    this.velocity.copy(v);
    this.grounded = false;
    this.ground = null;
    this.launched = true;
  }

  /** 检查眼睛这一步有没有穿过某扇门，穿过就传送 */
  checkPortals(portals) {
    const eye = this.eye(_w);
    for (const P of portals) {
      if (!P.linked || !this.fits(P)) continue;
      const off = PLAYER.crossOffset * Math.min(1, this.scale);
      const d0 = P.signedDistance(this.prevEye) - off;
      const d1 = P.signedDistance(eye) - off;
      if (d0 >= 0 && d1 < 0) {
        const t = d0 / (d0 - d1);
        _v.copy(this.prevEye).lerp(eye, t);
        P.toLocal(_v, _local);
        if (P.contains(_local, 1.0)) {
          this.teleport(P, eye);
          return P;
        }
      }
    }
    this.prevEye.copy(eye);
    return null;
  }

  teleport(P, eye) {
    const Q = P.other;
    const k = P.teleportScale;
    const newEye = _v.copy(eye).applyMatrix4(P.teleport);
    this.velocity.applyQuaternion(P.teleportQ).multiplyScalar(k);
    if (Math.abs(k - 1) > 1e-3) this.setScale(this.scale * k);
    // 推出到出口门正面一点点，保证下一帧相机在门前
    const dq = Q.signedDistance(newEye);
    newEye.addScaledVector(Q.normal, PLAYER.crossOffset * 2 * Math.min(1, this.scale) - dq);

    // 朝向：把相机四元数整体旋转，再拆回 yaw/pitch，多出来的 roll 之后慢慢归正
    lookToQuaternion(this.yaw, this.pitch, this.roll, _q);
    _q.premultiply(this.frame).premultiply(P.teleportQ);
    const worldLook = _qw.copy(_q);
    // 出口处的重力可能和入口不同（比如从一颗星球的北极走到另一颗的南极）：坐标系当场对齐，镜头只剩下门造成的歪斜
    this.position.copy(newEye);
    this.game.gravityAt?.(this.position, _g);
    if (_g.mag > 0) this._alignFrame(0, true, _g.dir);
    this.gMul = _g.mag;
    _q.copy(worldLook).premultiply(_inv.copy(this.frame).invert());
    const look = quaternionToLook(_q);
    this.yaw = look.yaw;
    this.pitch = look.pitch;
    this.roll = look.roll;

    this.position.copy(newEye).addScaledVector(this.up, -this.eyeOffset);
    // 从墙上的门出来时，身体保持直立；如果脚会陷进地板，就往上抬
    const skip = Q.tunnel;
    _ray.origin = { x: newEye.x, y: newEye.y, z: newEye.z };
    _ray.dir = { x: -this.up.x, y: -this.up.y, z: -this.up.z };
    const need = this.eyeOffset + this.footOffset + 0.02;
    const hit = this.world.castRay(_ray, need, true, RAPIER.QueryFilterFlags.EXCLUDE_SENSORS, GROUPS.player, undefined, undefined, (c) => {
      return !skip.has(c.handle) && c.handle !== this.collider.handle && !(this.held && c.handle === this.held.cube.collider.handle);
    });
    if (hit && hit.timeOfImpact < need) {
      this.position.addScaledVector(this.up, need - hit.timeOfImpact);
      const vu = this.velocity.dot(this.up);
      if (vu < 0) this.velocity.addScaledVector(this.up, -vu);
    }
    this.grounded = false;
    this.ground = null;
    this._syncBody(true);
    this.eye(this.prevEye);

    if (this.held) {
      const h = this.held;
      if (h.link === null) h.link = Q;
      else if (h.link === P) h.link = null;
      else this.game.dropHeld?.();
    }
  }

  updateRoll(dt) {
    if (this.roll !== 0) {
      const k = Math.min(1, dt * 6);
      this.roll += (0 - this.roll) * k;
      if (Math.abs(this.roll) < 0.001) this.roll = 0;
    }
  }
}
