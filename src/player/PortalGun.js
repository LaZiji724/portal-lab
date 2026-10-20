import * as THREE from 'three';
import { PORTAL_COLORS } from '../portal/Portal.js';

/**
 * 第一人称手持的传送门枪模型。单独一个场景渲染在最上层，不会插进墙里。
 */
export class PortalGunView {
  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(60, 1, 0.01, 10);
    this.root = new THREE.Group();
    this.scene.add(this.root);
    this.scene.add(new THREE.HemisphereLight(0xdfe8ff, 0x403830, 1.6));
    const key = new THREE.DirectionalLight(0xffffff, 2.2);
    key.position.set(1, 2, 1);
    this.scene.add(key);
    this.coreColor = new THREE.Color(0x888888);
    this.recoil = 0;
    this.bobT = 0;
    this.sway = new THREE.Vector2();
    this.visible = true;
    this.holding = false;
    this._build();
  }

  _build() {
    const white = new THREE.MeshStandardMaterial({ color: 0xf2f2ee, roughness: 0.25, metalness: 0.05 });
    const dark = new THREE.MeshStandardMaterial({ color: 0x1d1f22, roughness: 0.5, metalness: 0.6 });
    const chrome = new THREE.MeshStandardMaterial({ color: 0xbfc4c8, roughness: 0.15, metalness: 1 });
    this.coreMat = new THREE.MeshStandardMaterial({ color: 0x111111, emissive: 0x888888, emissiveIntensity: 2 });
    const g = new THREE.Group();
    // 主体
    const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.075, 0.32, 8, 16), white);
    body.rotation.x = Math.PI / 2;
    g.add(body);
    const back = new THREE.Mesh(new THREE.SphereGeometry(0.11, 20, 16), white);
    back.position.z = 0.17;
    back.scale.set(1, 0.9, 1.1);
    g.add(back);
    // 发光内核
    const core = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.22, 16), this.coreMat);
    core.rotation.x = Math.PI / 2;
    core.position.set(0, 0.07, -0.02);
    g.add(core);
    const coreGlass = new THREE.Mesh(
      new THREE.CylinderGeometry(0.042, 0.042, 0.24, 16, 1, true),
      new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0.25, roughness: 0.05 })
    );
    coreGlass.rotation.x = Math.PI / 2;
    coreGlass.position.copy(core.position);
    g.add(coreGlass);
    // 枪口三个爪子
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.07, 0.014, 10, 24), dark);
    ring.position.z = -0.22;
    g.add(ring);
    this.prongs = [];
    for (let i = 0; i < 3; i++) {
      const a = (i / 3) * Math.PI * 2 + Math.PI / 2;
      const prong = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.018, 0.14), chrome);
      prong.position.set(Math.cos(a) * 0.075, Math.sin(a) * 0.075, -0.27);
      prong.rotation.set(-Math.sin(a) * 0.35, Math.cos(a) * 0.35, 0);
      g.add(prong);
      this.prongs.push(prong);
    }
    const muzzle = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.05, 0.05, 16), dark);
    muzzle.rotation.x = Math.PI / 2;
    muzzle.position.z = -0.215;
    g.add(muzzle);
    // 握把
    const grip = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.14, 0.07), dark);
    grip.position.set(0, -0.1, 0.06);
    grip.rotation.x = 0.25;
    g.add(grip);
    this.muzzleLight = new THREE.PointLight(0x888888, 0, 0.6, 2);
    this.muzzleLight.position.set(0, 0, -0.3);
    g.add(this.muzzleLight);
    g.scale.setScalar(0.8);
    g.rotation.y = 0.06;
    this.gun = g;
    this.root.add(g);
  }

  setAspect(a) {
    this.camera.aspect = a;
    this.camera.updateProjectionMatrix();
  }

  setColor(color) {
    this.coreColor.copy(PORTAL_COLORS[color]);
    this.coreMat.emissive.copy(this.coreColor);
    this.muzzleLight.color.copy(this.coreColor);
  }

  fire(color) {
    this.setColor(color);
    this.recoil = 1;
    this.muzzleLight.intensity = 4;
  }

  update(dt, speed, grounded, lookDX, lookDY) {
    this.recoil = Math.max(0, this.recoil - dt * 6);
    this.muzzleLight.intensity = Math.max(0, this.muzzleLight.intensity - dt * 20);
    if (grounded && speed > 0.5) this.bobT += dt * speed * 1.6;
    const bobAmt = grounded ? Math.min(1, speed / 5) : 0;
    this.sway.x += (-lookDX * 0.6 - this.sway.x) * Math.min(1, dt * 10);
    this.sway.y += (lookDY * 0.6 - this.sway.y) * Math.min(1, dt * 10);
    const g = this.gun;
    const r = this.recoil;
    g.position.set(
      0.26 + Math.sin(this.bobT) * 0.012 * bobAmt + this.sway.x * 0.02,
      -0.24 + Math.abs(Math.cos(this.bobT)) * 0.012 * bobAmt + this.sway.y * 0.02 - (this.holding ? 0.03 : 0),
      -0.62 + r * 0.06
    );
    g.rotation.x = r * 0.15;
    const spin = performance.now() * 0.002 * (this.holding ? 4 : 1);
    this.prongs.forEach((p, i) => {
      const a = (i / 3) * Math.PI * 2 + Math.PI / 2 + (this.holding ? spin : 0);
      const open = 0.075 + (this.holding ? 0.01 * Math.sin(spin * 3) : 0) + r * 0.01;
      p.position.x = Math.cos(a) * open;
      p.position.y = Math.sin(a) * open;
    });
  }
}

/** 射击轨迹和命中火花 */
export class ShotEffects {
  constructor(scene) {
    this.scene = scene;
    this.items = [];
  }

  beam(from, to, color, ok) {
    const c = PORTAL_COLORS[color];
    const dir = new THREE.Vector3().subVectors(to, from);
    const len = dir.length();
    const geo = new THREE.CylinderGeometry(0.012, 0.012, len, 6, 1, true);
    geo.translate(0, len / 2, 0);
    geo.rotateX(Math.PI / 2);
    const mat = new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: 0.8, depthWrite: false, blending: THREE.AdditiveBlending });
    const m = new THREE.Mesh(geo, mat);
    m.position.copy(from);
    m.lookAt(to);
    this.scene.add(m);
    this.items.push({ obj: m, life: 0.18, max: 0.18 });
    this.sparks(to, color, ok ? 14 : 22);
  }

  sparks(at, color, count) {
    const c = PORTAL_COLORS[color];
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const vel = [];
    for (let i = 0; i < count; i++) {
      pos[i * 3] = at.x;
      pos[i * 3 + 1] = at.y;
      pos[i * 3 + 2] = at.z;
      vel.push(new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.3, Math.random() - 0.5).multiplyScalar(5));
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({ color: c, size: 0.06, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
    const pts = new THREE.Points(geo, mat);
    pts.frustumCulled = false;
    this.scene.add(pts);
    this.items.push({ obj: pts, life: 0.6, max: 0.6, vel });
  }

  update(dt) {
    for (let i = this.items.length - 1; i >= 0; i--) {
      const it = this.items[i];
      it.life -= dt;
      it.obj.material.opacity = Math.max(0, it.life / it.max);
      if (it.vel) {
        const p = it.obj.geometry.attributes.position;
        for (let j = 0; j < it.vel.length; j++) {
          it.vel[j].y -= 9.8 * dt;
          p.setXYZ(j, p.getX(j) + it.vel[j].x * dt, p.getY(j) + it.vel[j].y * dt, p.getZ(j) + it.vel[j].z * dt);
        }
        p.needsUpdate = true;
      }
      if (it.life <= 0) {
        this.scene.remove(it.obj);
        it.obj.geometry.dispose();
        it.obj.material.dispose();
        this.items.splice(i, 1);
      }
    }
  }

  clear() {
    for (const it of this.items) this.scene.remove(it.obj);
    this.items = [];
  }
}
