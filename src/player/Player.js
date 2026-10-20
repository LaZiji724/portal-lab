import * as THREE from 'three';
import { RAPIER, GROUPS } from '../core/physics.js';
import { quaternionToLook, lookToQuaternion, MAX_PITCH } from '../portal/portalMath.js';
import { Portal, PORTAL_HALF_W, PORTAL_HALF_H } from '../portal/Portal.js';

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
};

const _v = new THREE.Vector3();
const _w = new THREE.Vector3();
const _local = new THREE.Vector3();
const _before = new THREE.Vector3();
const _q = new THREE.Quaternion();
const _ray = new RAPIER.Ray({ x: 0, y: 0, z: 0 }, { x: 0, y: -1, z: 0 });

export class Player {
  constructor(game) {
    this.game = game;
    this.camera = new THREE.PerspectiveCamera(75, 1, 0.01, 1000);
    this.camera.layers.enable(0);
    this.position = new THREE.Vector3(); // 胶囊中心
    this.velocity = new THREE.Vector3();
    this.yaw = 0;
    this.pitch = 0;
    this.roll = 0;
    this.grounded = false;
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
    c.enableAutostep(0.35, 0.15, false);
    c.enableSnapToGround(0.25);
    c.setMaxSlopeClimbAngle(THREE.MathUtils.degToRad(50));
    c.setMinSlopeSlideAngle(THREE.MathUtils.degToRad(35));
    c.setSlideEnabled(true);
    c.setApplyImpulsesToDynamicBodies(true);
    c.setCharacterMass(70);
    this.controller = c;
  }

  spawn(pos, yawDeg = 0) {
    this.position.set(pos[0], pos[1] + PLAYER.halfHeight + PLAYER.radius + 0.02, pos[2]);
    this.velocity.set(0, 0, 0);
    this.yaw = THREE.MathUtils.degToRad(yawDeg);
    this.pitch = 0;
    this.roll = 0;
    this.held = null;
    this._syncBody(true);
    this.eye(this.prevEye);
    this.updateCamera();
  }

  eye(out) {
    return out.set(this.position.x, this.position.y + PLAYER.eye, this.position.z);
  }

  forward(out) {
    return out.set(0, 0, -1).applyQuaternion(this.camera.quaternion);
  }

  _syncBody(teleport) {
    if (!this.body) return;
    if (teleport) {
      this.body.setTranslation(this.position, true);
      this.world.propagateModifiedBodyPositionsToColliders();
    }
    this.body.setNextKinematicTranslation(this.position);
  }

  look(dx, dy) {
    this.yaw -= dx;
    this.pitch = THREE.MathUtils.clamp(this.pitch - dy, -MAX_PITCH, MAX_PITCH);
  }

  updateCamera() {
    this.eye(this.camera.position);
    lookToQuaternion(this.yaw, this.pitch, this.roll, this.camera.quaternion);
    this.camera.updateMatrixWorld(true);
    this.bodyMesh.position.copy(this.position);
    this.bodyMesh.rotation.set(0, this.yaw, 0);
  }

  /** 玩家（眼睛或身体中心）处于某扇门前方的“穿门区域”时，门背后的墙体不再阻挡 */
  _inZone(portal, p) {
    const d = portal.signedDistance(p);
    if (d > 2.0 || d < -2.0) return false;
    portal.toLocal(p, _local);
    return Portal.inEllipse(_local, 0.98);
  }

  /** 已经有一部分身体进了门：判定放宽，避免在门边缘时墙体突然恢复把人卡住 */
  _inTransit(portal, p) {
    const d = portal.signedDistance(p);
    if (d > 0.1 || d < -2.4) return false;
    portal.toLocal(p, _local);
    return Portal.inEllipse(_local, 1.6);
  }

  computeDisabled(portals) {
    this.disabled.clear();
    const eye = this.eye(_w);
    for (const p of portals) {
      if (!p.linked) continue;
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
      if (!P.linked) continue;
      const d1 = P.signedDistance(after);
      if (d1 >= 0 || d1 < -2.4) continue;
      P.toLocal(before, _local);
      const bx = _local.x;
      const by = _local.y;
      const n0 = (bx / PORTAL_HALF_W) ** 2 + (by / PORTAL_HALF_H) ** 2;
      if (n0 > 2.6) continue; // 不是从这扇门进来的
      P.toLocal(after, _local);
      const n1 = (_local.x / PORTAL_HALF_W) ** 2 + (_local.y / PORTAL_HALF_H) ** 2;
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

  step(dt, input, portals) {
    this.computeDisabled(portals);

    // 期望移动方向（水平面）
    const fx = input.move.x;
    const fz = input.move.y;
    const sin = Math.sin(this.yaw);
    const cos = Math.cos(this.yaw);
    _v.set(fx * cos - fz * sin, 0, -fx * sin - fz * cos);
    const wishLen = Math.min(1, _v.length());
    if (wishLen > 0.001) _v.normalize();
    const wishSpeed = PLAYER.walkSpeed * wishLen;

    const vel = this.velocity;
    if (this.grounded) {
      // 地面：快速贴近目标速度（含摩擦）
      const tx = _v.x * wishSpeed;
      const tz = _v.z * wishSpeed;
      const dx = tx - vel.x;
      const dz = tz - vel.z;
      const dl = Math.hypot(dx, dz);
      const maxDelta = PLAYER.groundAccel * dt;
      if (dl <= maxDelta) {
        vel.x = tx;
        vel.z = tz;
      } else {
        vel.x += (dx / dl) * maxDelta;
        vel.z += (dz / dl) * maxDelta;
      }
      if (input.jump) {
        vel.y = PLAYER.jumpSpeed;
        this.grounded = false;
        this.game.audio?.play('jump');
      }
    } else if (wishSpeed > 0) {
      // 空中：只给很小的控制力，而且不会把速度推到步行速度以上，所以飞跃轨迹可预测
      const cur = vel.x * _v.x + vel.z * _v.z;
      const add = wishSpeed - cur;
      if (add > 0) {
        const a = Math.min(PLAYER.airAccel * dt * wishLen, add);
        vel.x += _v.x * a;
        vel.z += _v.z * a;
      }
    }
    if (!this.grounded || vel.y > 0) vel.y -= PLAYER.gravity * dt;
    const sp = vel.length();
    if (sp > PLAYER.terminal) vel.multiplyScalar(PLAYER.terminal / sp);

    const desired = { x: vel.x * dt, y: vel.y * dt, z: vel.z * dt };
    const disabled = this.disabled;
    this.controller.computeColliderMovement(
      this.collider,
      desired,
      RAPIER.QueryFilterFlags.EXCLUDE_SENSORS,
      GROUPS.player,
      (col) => !disabled.has(col.handle)
    );
    const m = this.controller.computedMovement();
    const wasGrounded = this.grounded;
    this.grounded = this.controller.computedGrounded() && vel.y <= 0.01;

    // 被墙挡住的分量要清掉，否则会“粘”在墙上
    if (Math.abs(desired.x) > 1e-6 && Math.abs(m.x) < Math.abs(desired.x) * 0.98) vel.x = m.x / dt;
    if (Math.abs(desired.z) > 1e-6 && Math.abs(m.z) < Math.abs(desired.z) * 0.98) vel.z = m.z / dt;
    if (desired.y > 0 && m.y < desired.y * 0.5) vel.y = 0; // 撞到天花板
    if (this.grounded) {
      if (!wasGrounded) {
        this.game.onLand?.(-this.lastFall);
      }
      if (vel.y < 0) vel.y = 0;
      this.airTime = 0;
    } else {
      this.airTime += dt;
      this.lastFall = vel.y;
    }

    _before.copy(this.position);
    this.position.x += m.x;
    this.position.y += m.y;
    this.position.z += m.z;
    this._clampToPortalTunnel(portals, _before, this.position);
    this._syncBody(false);

    // 脚步声
    if (this.grounded && wishLen > 0.1) {
      this.stepTimer -= dt * Math.hypot(vel.x, vel.z);
      if (this.stepTimer <= 0) {
        this.stepTimer = 2.1;
        this.game.audio?.play('step');
      }
    }
  }

  /** 检查眼睛这一步有没有穿过某扇门，穿过就传送 */
  checkPortals(portals) {
    const eye = this.eye(_w);
    for (const P of portals) {
      if (!P.linked) continue;
      const d0 = P.signedDistance(this.prevEye) - PLAYER.crossOffset;
      const d1 = P.signedDistance(eye) - PLAYER.crossOffset;
      if (d0 >= 0 && d1 < 0) {
        const t = d0 / (d0 - d1);
        _v.copy(this.prevEye).lerp(eye, t);
        P.toLocal(_v, _local);
        if (Portal.inEllipse(_local, 1.0)) {
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
    const newEye = _v.copy(eye).applyMatrix4(P.teleport);
    // 推出到出口门正面一点点，保证下一帧相机在门前
    const dq = Q.signedDistance(newEye);
    newEye.addScaledVector(Q.normal, PLAYER.crossOffset * 2 - dq);
    this.velocity.applyQuaternion(P.teleportQ);

    // 朝向：把相机四元数整体旋转，再拆回 yaw/pitch，多出来的 roll 之后慢慢归正
    lookToQuaternion(this.yaw, this.pitch, this.roll, _q);
    _q.premultiply(P.teleportQ);
    const look = quaternionToLook(_q);
    this.yaw = look.yaw;
    this.pitch = look.pitch;
    this.roll = look.roll;

    this.position.set(newEye.x, newEye.y - PLAYER.eye, newEye.z);
    // 从墙上的门出来时，身体保持直立；如果脚会陷进地板，就往上抬
    const skip = Q.tunnel;
    _ray.origin = { x: newEye.x, y: newEye.y, z: newEye.z };
    _ray.dir = { x: 0, y: -1, z: 0 };
    const need = PLAYER.eye + PLAYER.halfHeight + PLAYER.radius + 0.02;
    const hit = this.world.castRay(_ray, need, true, RAPIER.QueryFilterFlags.EXCLUDE_SENSORS, GROUPS.player, undefined, undefined, (c) => {
      return !skip.has(c.handle) && c.handle !== this.collider.handle && !(this.held && c.handle === this.held.cube.collider.handle);
    });
    if (hit && hit.timeOfImpact < need) {
      this.position.y += need - hit.timeOfImpact;
      if (this.velocity.y < 0) this.velocity.y = 0;
    }
    this.grounded = false;
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
