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

let prismMats = null;
/** 折射方块：五个面是普通外壳，正面（-Z）是一块红色透镜，激光从这里射出 */
function prismMaterials() {
  if (prismMats) return prismMats;
  const size = 256;
  const draw = (lens) => {
    const c = document.createElement('canvas');
    c.width = c.height = size;
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#3c4044';
    ctx.fillRect(0, 0, size, size);
    const inset = size * 0.14;
    ctx.fillStyle = '#9ea3a6';
    ctx.fillRect(inset, inset, size - inset * 2, size - inset * 2);
    ctx.strokeStyle = '#22262a';
    ctx.lineWidth = 4;
    ctx.strokeRect(inset, inset, size - inset * 2, size - inset * 2);
    if (lens) {
      ctx.fillStyle = '#2a0805';
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size * 0.3, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // 侧面画一个箭头，指向透镜那一面
      ctx.fillStyle = '#5a2a22';
      ctx.beginPath();
      ctx.moveTo(size * 0.5, size * 0.25);
      ctx.lineTo(size * 0.7, size * 0.55);
      ctx.lineTo(size * 0.3, size * 0.55);
      ctx.closePath();
      ctx.fill();
    }
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  };
  const side = new THREE.MeshStandardMaterial({ map: draw(false), roughness: 0.5, metalness: 0.35 });
  const lensC = document.createElement('canvas');
  lensC.width = lensC.height = size;
  const lctx = lensC.getContext('2d');
  const g = lctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size * 0.3);
  g.addColorStop(0, '#ffd0c0');
  g.addColorStop(0.5, '#ff3010');
  g.addColorStop(1, '#000');
  lctx.fillStyle = '#000';
  lctx.fillRect(0, 0, size, size);
  lctx.fillStyle = g;
  lctx.beginPath();
  lctx.arc(size / 2, size / 2, size * 0.3, 0, Math.PI * 2);
  lctx.fill();
  const lensEmit = new THREE.CanvasTexture(lensC);
  lensEmit.colorSpace = THREE.SRGBColorSpace;
  const front = new THREE.MeshStandardMaterial({ map: draw(true), emissiveMap: lensEmit, emissive: 0xffffff, emissiveIntensity: 1.4, roughness: 0.2, metalness: 0.3 });
  // 侧面贴图的箭头朝上（+V），四个侧面都要让箭头指向 -Z
  const top = side.clone();
  prismMats = [side, side, top, top, side, front];
  return prismMats;
}

export function createCubeMesh(kind = 'normal') {
  const s = CUBE_HALF * 2;
  const geo = new THREE.BoxGeometry(s, s, s);
  const mesh = new THREE.Mesh(geo, kind === 'prism' ? prismMaterials() : cubeMaterial());
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

export function createButtonMesh(heavy = false) {
  const mats = getMaterials();
  const group = new THREE.Group();
  if (heavy) {
    // 重型按钮：更大，底座有黄黑警示条纹
    const c = document.createElement('canvas');
    c.width = 512;
    c.height = 64;
    const ctx = c.getContext('2d');
    for (let i = -2; i < 20; i++) {
      ctx.fillStyle = i % 2 ? '#111' : '#f0c020';
      ctx.beginPath();
      ctx.moveTo(i * 32, 64);
      ctx.lineTo(i * 32 + 32, 64);
      ctx.lineTo(i * 32 + 64, 0);
      ctx.lineTo(i * 32 + 32, 0);
      ctx.fill();
    }
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    t.wrapS = THREE.RepeatWrapping;
    t.repeat.set(3, 1);
    const ring = new THREE.Mesh(new THREE.CylinderGeometry(1.0, 1.0, 0.13, 48, 1, true), new THREE.MeshStandardMaterial({ map: t, roughness: 0.6 }));
    ring.position.y = 0.065;
    group.add(ring);
  }
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
  if (heavy) group.scale.set(1.7, 1.2, 1.7);
  return { group, plunger, plungerMat };
}

/** 台座开关：按 E 触发，可以带倒计时 */
export function createSwitchMesh() {
  const mats = getMaterials();
  const group = new THREE.Group();
  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.34, 0.08, 24), mats.metal);
  base.position.y = 0.04;
  group.add(base);
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.07, 0.95, 12), mats.metal);
  pole.position.y = 0.55;
  pole.castShadow = true;
  group.add(pole);
  const head = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.14, 0.3), new THREE.MeshStandardMaterial({ color: 0xd8d8d2, roughness: 0.4, metalness: 0.2 }));
  head.position.y = 1.08;
  head.rotation.x = -0.35;
  head.castShadow = true;
  group.add(head);
  const capMat = new THREE.MeshStandardMaterial({ color: 0x8a1c14, emissive: 0xff2a10, emissiveIntensity: 0.8 });
  const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.06, 20), capMat);
  cap.position.set(0, 1.16, 0.02);
  cap.rotation.x = -0.35;
  group.add(cap);
  // 倒计时灯环
  const ringMat = new THREE.MeshBasicMaterial({ color: 0x30ff60 });
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.018, 6, 40), ringMat);
  ring.position.y = 0.09;
  ring.rotation.x = Math.PI / 2;
  ring.visible = false;
  group.add(ring);
  return { group, capMat, ring };
}

/** 墙上的发射器外壳（激光、光桥共用），朝向本地 +Z */
export function createEmitterMesh(kind) {
  const mats = getMaterials();
  const group = new THREE.Group();
  const housing = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.9, 0.3), mats.metal);
  housing.position.z = 0.15;
  housing.castShadow = true;
  group.add(housing);
  const color = kind === 'laser' ? 0xff2a10 : 0x4ab0ff;
  const lensMat = new THREE.MeshStandardMaterial({ color: 0x110000, emissive: color, emissiveIntensity: 2.5 });
  if (kind === 'laser') {
    const lens = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.24, 0.12, 24), lensMat);
    lens.rotation.x = Math.PI / 2;
    lens.position.z = 0.34;
    group.add(lens);
  } else {
    const strip = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.08, 0.1), lensMat);
    strip.position.set(0, 0, 0.33);
    group.add(strip);
  }
  return { group, lensMat };
}

/** 激光接收器：被激光照到时亮起 */
export function createCatcherMesh() {
  const mats = getMaterials();
  const group = new THREE.Group();
  const housing = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.9, 0.25), mats.metal);
  housing.position.z = 0.125;
  group.add(housing);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.05, 10, 32), new THREE.MeshStandardMaterial({ color: 0x777777, metalness: 0.9, roughness: 0.3 }));
  ring.position.z = 0.27;
  group.add(ring);
  const coreMat = new THREE.MeshStandardMaterial({ color: 0x220a08, emissive: 0x401008, emissiveIntensity: 1 });
  const core = new THREE.Mesh(new THREE.SphereGeometry(0.24, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2), coreMat);
  core.rotation.x = Math.PI / 2;
  core.position.z = 0.25;
  group.add(core);
  return { group, coreMat };
}

/** 弹射板：圆形踏板 + 指向落点的箭头 */
export function createLauncherMesh() {
  const mats = getMaterials();
  const group = new THREE.Group();
  const base = new THREE.Mesh(new THREE.CylinderGeometry(1.0, 1.05, 0.12, 40), mats.metal);
  base.position.y = 0.06;
  base.receiveShadow = true;
  group.add(base);
  const plateMat = new THREE.MeshStandardMaterial({ color: 0xd9dbd6, roughness: 0.45, metalness: 0.2 });
  const plate = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.85, 0.06, 40), plateMat);
  plate.position.y = 0.14;
  plate.receiveShadow = true;
  group.add(plate);
  const arrowMat = new THREE.MeshStandardMaterial({ color: 0x0a2a3a, emissive: 0x2ab0ff, emissiveIntensity: 1.3 });
  const arrows = new THREE.Group();
  for (let i = 0; i < 3; i++) {
    const shape = new THREE.Shape();
    shape.moveTo(-0.35, 0);
    shape.lineTo(0, 0.25);
    shape.lineTo(0.35, 0);
    shape.lineTo(0.35, -0.1);
    shape.lineTo(0, 0.15);
    shape.lineTo(-0.35, -0.1);
    shape.closePath();
    const m = new THREE.Mesh(new THREE.ShapeGeometry(shape), arrowMat);
    m.rotation.x = -Math.PI / 2;
    m.position.set(0, 0.175, 0.35 - i * 0.28);
    arrows.add(m);
  }
  group.add(arrows);
  return { group, plate, arrows, arrowMat };
}

/** 消散力场：一面会让传送门消失、让方块蒸发的半透明光幕 */
export function createFizzlerMesh(size) {
  const group = new THREE.Group();
  const mat = new THREE.ShaderMaterial({
    uniforms: { time: { value: 0 }, on: { value: 1 } },
    vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
    fragmentShader: `
      uniform float time; uniform float on; varying vec2 vUv;
      float h(vec2 p){ return fract(sin(dot(p, vec2(12.9898,78.233))) * 43758.5453); }
      void main(){
        float lines = smoothstep(0.92, 1.0, sin(vUv.y * 90.0 + time * 6.0) * 0.5 + 0.5);
        float spark = step(0.985, h(floor(vec2(vUv.x * 60.0, vUv.y * 30.0 - time * 8.0))));
        float edge = smoothstep(0.08, 0.0, min(vUv.x, 1.0 - vUv.x));
        float a = (0.08 + lines * 0.22 + spark * 0.5 + edge * 0.4) * on;
        gl_FragColor = vec4(vec3(0.35, 0.7, 1.0) * 1.6, a);
      }`,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
  });
  // 光幕所在平面：取尺寸最小的轴作为法线
  const k = size.indexOf(Math.min(...size));
  const w = k === 0 ? size[2] : size[0];
  const hgt = k === 1 ? size[2] : size[1];
  const plane = new THREE.Mesh(new THREE.PlaneGeometry(w, hgt), mat);
  if (k === 0) plane.rotation.y = Math.PI / 2;
  if (k === 1) plane.rotation.x = -Math.PI / 2;
  plane.renderOrder = 3;
  group.add(plane);
  const mats = getMaterials();
  const postGeo = new THREE.BoxGeometry(0.15, k === 1 ? 0.15 : hgt, 0.15);
  for (const s of [-1, 1]) {
    const post = new THREE.Mesh(postGeo, mats.metal);
    if (k === 0) post.position.z = (s * w) / 2;
    else post.position.x = (s * w) / 2;
    group.add(post);
  }
  return { group, mat };
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
