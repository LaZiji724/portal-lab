import * as THREE from 'three';
import { getMaterials } from './materials.js';
import { PORTAL_COLORS } from '../portal/Portal.js';

export const CUBE_HALF = 0.3;

let cubeMat = null;
function cubeMaterial() {
  if (cubeMat) return cubeMat;
  const size = 256;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d');
  // 外框：深色金属护角
  ctx.fillStyle = '#4a4e52';
  ctx.fillRect(0, 0, size, size);
  // 中间浅色面板
  const inset = size * 0.16;
  const grad = ctx.createLinearGradient(0, 0, size, size);
  grad.addColorStop(0, '#d8d8d2');
  grad.addColorStop(1, '#b9bab4');
  ctx.fillStyle = grad;
  ctx.fillRect(inset, inset, size - inset * 2, size - inset * 2);
  ctx.strokeStyle = '#33373a';
  ctx.lineWidth = 3;
  ctx.strokeRect(inset, inset, size - inset * 2, size - inset * 2);
  // 护角的螺栓
  ctx.fillStyle = '#25282b';
  for (const [x, y] of [
    [inset / 2, inset / 2],
    [size - inset / 2, inset / 2],
    [inset / 2, size - inset / 2],
    [size - inset / 2, size - inset / 2],
  ]) {
    ctx.beginPath();
    ctx.arc(x, y, size * 0.02, 0, Math.PI * 2);
    ctx.fill();
  }
  // 中央圆形
  ctx.fillStyle = '#5d6266';
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size * 0.2, 0, Math.PI * 2);
  ctx.fill();
  const map = new THREE.CanvasTexture(c);
  map.colorSpace = THREE.SRGBColorSpace;

  const e = document.createElement('canvas');
  e.width = e.height = size;
  const ectx = e.getContext('2d');
  ectx.fillStyle = '#000';
  ectx.fillRect(0, 0, size, size);
  const eg = ectx.createRadialGradient(size / 2, size / 2, size * 0.08, size / 2, size / 2, size * 0.17);
  eg.addColorStop(0, '#9fdcff');
  eg.addColorStop(0.7, '#2a90ff');
  eg.addColorStop(1, '#000');
  ectx.fillStyle = eg;
  ectx.beginPath();
  ectx.arc(size / 2, size / 2, size * 0.17, 0, Math.PI * 2);
  ectx.fill();
  const emap = new THREE.CanvasTexture(e);
  emap.colorSpace = THREE.SRGBColorSpace;
  cubeMat = new THREE.MeshStandardMaterial({
    map,
    emissiveMap: emap,
    emissive: 0xffffff,
    emissiveIntensity: 1.2,
    roughness: 0.45,
    metalness: 0.35,
  });
  return cubeMat;
}

export function createCubeMesh() {
  const s = CUBE_HALF * 2;
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(s, s, s), cubeMaterial());
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

export function createButtonMesh() {
  const mats = getMaterials();
  const group = new THREE.Group();
  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.95, 0.12, 40), mats.metal);
  base.position.y = 0.06;
  base.receiveShadow = true;
  base.castShadow = true;
  group.add(base);
  const plungerMat = new THREE.MeshStandardMaterial({
    color: 0x8a1c14,
    emissive: 0xff2a10,
    emissiveIntensity: 0.6,
    roughness: 0.35,
    metalness: 0.2,
  });
  const plunger = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.66, 0.1, 40), plungerMat);
  plunger.position.y = 0.17;
  plunger.castShadow = true;
  group.add(plunger);
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(0.72, 0.035, 8, 48),
    new THREE.MeshStandardMaterial({ color: 0x222222, metalness: 0.9, roughness: 0.3 })
  );
  ring.rotation.x = Math.PI / 2;
  ring.position.y = 0.13;
  group.add(ring);
  return { group, plunger, plungerMat };
}

export function createDoorMesh(size) {
  const mats = getMaterials();
  const group = new THREE.Group();
  const body = new THREE.Mesh(new THREE.BoxGeometry(size[0], size[1], size[2]), mats.metal);
  body.castShadow = true;
  body.receiveShadow = true;
  group.add(body);
  const lightMat = new THREE.MeshStandardMaterial({ color: 0x220000, emissive: 0xff2010, emissiveIntensity: 1.5 });
  const thin = Math.min(size[0], size[2]) === size[0] ? 0 : 2;
  // 门两面各一条指示灯带
  for (const s of [-1, 1]) {
    const stripSize = thin === 0 ? [0.02, 0.08, size[2] * 0.8] : [size[0] * 0.8, 0.08, 0.02];
    const strip = new THREE.Mesh(new THREE.BoxGeometry(...stripSize), lightMat);
    if (thin === 0) strip.position.x = s * (size[0] / 2 + 0.01);
    else strip.position.z = s * (size[2] / 2 + 0.01);
    strip.position.y = size[1] * 0.15;
    group.add(strip);
  }
  return { group, lightMat };
}

function makeLabel(text, color) {
  const c = document.createElement('canvas');
  c.width = 512;
  c.height = 160;
  const ctx = c.getContext('2d');
  ctx.fillStyle = 'rgba(10,14,18,0.9)';
  ctx.fillRect(0, 0, 512, 160);
  ctx.strokeStyle = color;
  ctx.lineWidth = 6;
  ctx.strokeRect(8, 8, 496, 144);
  ctx.fillStyle = color;
  ctx.font = 'bold 84px "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, 256, 84);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export function createExitMesh(size) {
  const group = new THREE.Group();
  const glow = new THREE.MeshStandardMaterial({ color: 0x0a2a10, emissive: 0x40ff80, emissiveIntensity: 1.6 });
  const w = size[0];
  const d = size[2];
  const h = size[1];
  const frameGeo = new THREE.BoxGeometry(0.08, h, 0.08);
  for (const [x, z] of [
    [-w / 2, -d / 2],
    [w / 2, -d / 2],
    [-w / 2, d / 2],
    [w / 2, d / 2],
  ]) {
    const post = new THREE.Mesh(frameGeo, glow);
    post.position.set(x, 0, z);
    group.add(post);
  }
  const pad = new THREE.Mesh(
    new THREE.CylinderGeometry(Math.min(w, d) * 0.42, Math.min(w, d) * 0.45, 0.06, 48),
    new THREE.MeshStandardMaterial({ color: 0x1b1e20, metalness: 0.8, roughness: 0.3, emissive: 0x30ff70, emissiveIntensity: 0.25 })
  );
  pad.position.y = -h / 2 + 0.03;
  pad.receiveShadow = true;
  group.add(pad);
  const beam = new THREE.Mesh(
    new THREE.CylinderGeometry(Math.min(w, d) * 0.4, Math.min(w, d) * 0.4, h, 32, 1, true),
    new THREE.MeshBasicMaterial({ color: 0x50ff90, transparent: true, opacity: 0.08, depthWrite: false, side: THREE.DoubleSide })
  );
  group.add(beam);
  const label = new THREE.Sprite(new THREE.SpriteMaterial({ map: makeLabel('EXIT 出口', '#5dff95'), depthWrite: false }));
  label.scale.set(1.6, 0.5, 1);
  label.position.y = h / 2 + 0.35;
  group.add(label);
  const light = new THREE.PointLight(0x50ff90, 2.5, 6, 2);
  light.position.y = 0;
  group.add(light);
  group.userData.beam = beam;
  return group;
}

export function createHazardMesh(size) {
  const mats = getMaterials();
  const group = new THREE.Group();
  const geo = new THREE.PlaneGeometry(size[0], size[2], 1, 1);
  const uv = geo.attributes.uv;
  for (let i = 0; i < uv.count; i++) uv.setXY(i, (uv.getX(i) * size[0]) / 3, (uv.getY(i) * size[2]) / 3);
  const surface = new THREE.Mesh(geo, mats.acid);
  surface.rotation.x = -Math.PI / 2;
  surface.position.y = size[1] / 2;
  surface.receiveShadow = true;
  group.add(surface);
  const glow = new THREE.PointLight(0x50ff30, 2, Math.max(size[0], size[2]) * 0.8, 2);
  glow.position.y = size[1] / 2 + 0.5;
  group.add(glow);
  return group;
}

export function createLightFixture(def) {
  const group = new THREE.Group();
  const color = new THREE.Color(def.color ?? 0xfff2e0);
  const panel = new THREE.Mesh(
    new THREE.BoxGeometry(1.4, 0.06, 0.5),
    new THREE.MeshStandardMaterial({ color: 0x111111, emissive: color, emissiveIntensity: 2.2 })
  );
  group.add(panel);
  const housing = new THREE.Mesh(
    new THREE.BoxGeometry(1.5, 0.08, 0.6),
    new THREE.MeshStandardMaterial({ color: 0x2a2c2e, metalness: 0.7, roughness: 0.5 })
  );
  housing.position.y = 0.05;
  group.add(housing);
  return group;
}

/** 编辑器里的出生点标记 */
export function createSpawnMarker() {
  const group = new THREE.Group();
  const body = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.3, 1.2, 4, 12),
    new THREE.MeshStandardMaterial({ color: 0x3fa9ff, transparent: true, opacity: 0.6 })
  );
  body.position.y = 0.9;
  group.add(body);
  const arrow = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.5, 12), new THREE.MeshStandardMaterial({ color: 0xffffff }));
  arrow.rotation.x = -Math.PI / 2;
  arrow.position.set(0, 1.6, -0.45);
  group.add(arrow);
  return group;
}

/** 编辑器里的固定传送门标记 */
export function createPortalMarker(color) {
  const geo = new THREE.RingGeometry(0.9, 1.0, 40);
  geo.scale(0.62, 1.12, 1);
  const m = new THREE.Mesh(
    geo,
    new THREE.MeshBasicMaterial({ color: PORTAL_COLORS[color] ?? PORTAL_COLORS.orange, side: THREE.DoubleSide })
  );
  const fill = new THREE.Mesh(
    new THREE.CircleGeometry(0.9, 40).scale(0.62, 1.12, 1),
    new THREE.MeshBasicMaterial({ color: PORTAL_COLORS[color] ?? PORTAL_COLORS.orange, transparent: true, opacity: 0.25, side: THREE.DoubleSide })
  );
  m.add(fill);
  return m;
}
