import * as THREE from 'three';

/*
 * 所有贴图都在运行时用 Canvas 程序化生成（不依赖外部图片），
 * 然后由高度图推导法线贴图，配合 PBR 材质得到偏写实的效果。
 */

function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** 可平铺的值噪声（多倍频） */
function makeNoise(size, seed, octaves = 5, base = 4) {
  const rand = rng(seed);
  const out = new Float32Array(size * size);
  let amp = 1;
  let total = 0;
  for (let o = 0; o < octaves; o++) {
    const cells = base << o;
    const grid = new Float32Array(cells * cells);
    for (let i = 0; i < grid.length; i++) grid[i] = rand();
    for (let y = 0; y < size; y++) {
      const gy = (y / size) * cells;
      const y0 = Math.floor(gy);
      const fy = gy - y0;
      const sy = fy * fy * (3 - 2 * fy);
      for (let x = 0; x < size; x++) {
        const gx = (x / size) * cells;
        const x0 = Math.floor(gx);
        const fx = gx - x0;
        const sx = fx * fx * (3 - 2 * fx);
        const a = grid[(y0 % cells) * cells + (x0 % cells)];
        const b = grid[(y0 % cells) * cells + ((x0 + 1) % cells)];
        const c = grid[((y0 + 1) % cells) * cells + (x0 % cells)];
        const d = grid[((y0 + 1) % cells) * cells + ((x0 + 1) % cells)];
        out[y * size + x] += amp * (a + (b - a) * sx + (c - a) * sy + (a - b - c + d) * sx * sy);
      }
    }
    total += amp;
    amp *= 0.5;
  }
  for (let i = 0; i < out.length; i++) out[i] /= total;
  return out;
}

function canvasFrom(size, fill) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d');
  const img = ctx.createImageData(size, size);
  fill(img.data);
  ctx.putImageData(img, 0, 0);
  return c;
}

function heightToNormal(height, size, strength) {
  return canvasFrom(size, (d) => {
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const l = height[y * size + ((x - 1 + size) % size)];
        const r = height[y * size + ((x + 1) % size)];
        const u = height[((y - 1 + size) % size) * size + x];
        const b = height[((y + 1) % size) * size + x];
        let nx = (l - r) * strength;
        let ny = (b - u) * strength;
        let nz = 1;
        const len = Math.hypot(nx, ny, nz);
        nx /= len;
        ny /= len;
        nz /= len;
        const i = (y * size + x) * 4;
        d[i] = (nx * 0.5 + 0.5) * 255;
        d[i + 1] = (ny * 0.5 + 0.5) * 255;
        d[i + 2] = (nz * 0.5 + 0.5) * 255;
        d[i + 3] = 255;
      }
    }
  });
}

function tex(canvas, srgb, anisotropy) {
  const t = new THREE.CanvasTexture(canvas);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
  t.anisotropy = anisotropy;
  t.needsUpdate = true;
  return t;
}

/** 白色可贴门混凝土面板：一张贴图代表 2m×2m，分成 4×4 块 */
function whitePanels(size, aniso) {
  const n = makeNoise(size, 11, 6, 4);
  const fine = makeNoise(size, 97, 3, 64);
  const tiles = 2;
  const tileRand = rng(5);
  const tint = [];
  for (let i = 0; i < tiles * tiles; i++) tint.push(0.94 + tileRand() * 0.08);
  const groove = Math.max(2, size / 170);
  const height = new Float32Array(size * size);
  const rough = new Float32Array(size * size);
  const color = canvasFrom(size, (d) => {
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const tx = (x / size) * tiles;
        const ty = (y / size) * tiles;
        const ex = Math.min(tx - Math.floor(tx), Math.ceil(tx) - tx) * (size / tiles);
        const ey = Math.min(ty - Math.floor(ty), Math.ceil(ty) - ty) * (size / tiles);
        const edge = Math.min(ex, ey);
        const g = edge < groove ? 0 : edge < groove * 2 ? (edge - groove) / groove : 1;
        const t = tint[Math.floor(ty) * tiles + Math.floor(tx)];
        const i = y * size + x;
        const v = (0.74 + n[i] * 0.16 + fine[i] * 0.06) * t * (0.55 + 0.45 * g);
        height[i] = g * 0.8 + fine[i] * 0.15 + n[i] * 0.05;
        rough[i] = 0.62 + n[i] * 0.25;
        const p = i * 4;
        d[p] = v * 238;
        d[p + 1] = v * 238;
        d[p + 2] = v * 232;
        d[p + 3] = 255;
      }
    }
  });
  const roughC = canvasFrom(size, (d) => {
    for (let i = 0; i < size * size; i++) {
      const v = rough[i] * 255;
      d[i * 4] = v;
      d[i * 4 + 1] = v;
      d[i * 4 + 2] = v;
      d[i * 4 + 3] = 255;
    }
  });
  return new THREE.MeshStandardMaterial({
    map: tex(color, true, aniso),
    normalMap: tex(heightToNormal(height, size, 6), false, aniso),
    roughnessMap: tex(roughC, false, aniso),
    roughness: 1,
    metalness: 0,
    envMapIntensity: 0.5,
  });
}

/** 深色金属墙板：不可贴门，带拉丝纹理、接缝和铆钉 */
function darkMetal(size, aniso) {
  const n = makeNoise(size, 23, 5, 4);
  const rand = rng(77);
  const streak = new Float32Array(size);
  for (let y = 0; y < size; y++) streak[y] = rand();
  const height = new Float32Array(size * size);
  const rough = new Float32Array(size * size);
  const seams = 2;
  const cell = size / seams;
  const color = canvasFrom(size, (d) => {
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const i = y * size + x;
        const lx = x % cell;
        const ly = y % cell;
        const edge = Math.min(lx, ly, cell - lx, cell - ly);
        const seam = edge < 3 ? 0.35 : edge < 6 ? 0.8 : 1;
        // 铆钉
        let rivet = 0;
        const rr = cell * 0.06;
        for (const [cx, cy] of [
          [rr * 1.4, rr * 1.4],
          [cell - rr * 1.4, rr * 1.4],
          [rr * 1.4, cell - rr * 1.4],
          [cell - rr * 1.4, cell - rr * 1.4],
        ]) {
          const dd = Math.hypot(lx - cx, ly - cy) / (rr * 0.45);
          if (dd < 1) rivet = Math.max(rivet, Math.sqrt(1 - dd * dd));
        }
        const brushed = 0.85 + streak[y] * 0.15;
        const v = (0.2 + n[i] * 0.12) * brushed * seam + rivet * 0.08;
        height[i] = seam * 0.7 + rivet * 0.6 + streak[y] * 0.05;
        rough[i] = 0.38 + n[i] * 0.3 + (1 - seam) * 0.2;
        const p = i * 4;
        d[p] = v * 255;
        d[p + 1] = v * 262;
        d[p + 2] = v * 270;
        d[p + 3] = 255;
      }
    }
  });
  const roughC = canvasFrom(size, (d) => {
    for (let i = 0; i < size * size; i++) {
      const v = Math.min(1, rough[i]) * 255;
      d[i * 4] = v;
      d[i * 4 + 1] = v;
      d[i * 4 + 2] = v;
      d[i * 4 + 3] = 255;
    }
  });
  return new THREE.MeshStandardMaterial({
    map: tex(color, true, aniso),
    normalMap: tex(heightToNormal(height, size, 5), false, aniso),
    roughnessMap: tex(roughC, false, aniso),
    roughness: 1,
    metalness: 0.75,
    envMapIntensity: 0.9,
  });
}

/** 粗糙的深灰混凝土（不可贴门） */
function roughConcrete(size, aniso) {
  const n = makeNoise(size, 41, 6, 6);
  const pits = makeNoise(size, 43, 2, 96);
  const height = new Float32Array(size * size);
  const color = canvasFrom(size, (d) => {
    for (let i = 0; i < size * size; i++) {
      const pit = pits[i] > 0.78 ? 0.6 : 1;
      const v = (0.32 + n[i] * 0.18) * pit;
      height[i] = n[i] * 0.6 + (pit < 1 ? 0 : 0.4);
      d[i * 4] = v * 250;
      d[i * 4 + 1] = v * 248;
      d[i * 4 + 2] = v * 240;
      d[i * 4 + 3] = 255;
    }
  });
  return new THREE.MeshStandardMaterial({
    map: tex(color, true, aniso),
    normalMap: tex(heightToNormal(height, size, 4), false, aniso),
    roughness: 0.92,
    metalness: 0,
    envMapIntensity: 0.3,
  });
}

function grate(size, aniso) {
  const cells = 16;
  const c = canvasFrom(size, (d) => {
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const u = ((x + y) / size) * cells;
        const v = ((x - y + size) / size) * cells;
        const fu = Math.abs(u - Math.round(u));
        const fv = Math.abs(v - Math.round(v));
        const bar = fu < 0.12 || fv < 0.12;
        const frame = x < size * 0.02 || y < size * 0.02 || x > size * 0.98 || y > size * 0.98;
        const i = (y * size + x) * 4;
        const g = bar || frame ? 70 : 0;
        d[i] = g;
        d[i + 1] = g;
        d[i + 2] = g + 6;
        d[i + 3] = bar || frame ? 255 : 0;
      }
    }
  });
  return new THREE.MeshStandardMaterial({
    map: tex(c, true, aniso),
    alphaTest: 0.5,
    side: THREE.DoubleSide,
    metalness: 0.8,
    roughness: 0.4,
  });
}

function glass() {
  return new THREE.MeshPhysicalMaterial({
    color: 0x9fc4d0,
    metalness: 0,
    roughness: 0.04,
    transparent: true,
    opacity: 0.16,
    envMapIntensity: 1.6,
    clearcoat: 1,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
}

function acid(size, aniso) {
  const n = makeNoise(size, 59, 5, 4);
  const normal = heightToNormal(n, size, 10);
  const t = tex(normal, false, aniso);
  return new THREE.MeshStandardMaterial({
    color: 0x2c6b16,
    emissive: 0x3cff2a,
    emissiveIntensity: 0.35,
    normalMap: t,
    roughness: 0.15,
    metalness: 0.1,
    transparent: true,
    opacity: 0.92,
  });
}

/** 凝胶：一层有光泽、带气泡起伏的涂料 */
function gel(size, aniso, color, emissive, seed) {
  const n = makeNoise(size, seed, 5, 6);
  const blobs = makeNoise(size, seed + 1, 3, 12);
  const height = new Float32Array(size * size);
  for (let i = 0; i < height.length; i++) height[i] = n[i] * 0.5 + Math.max(0, blobs[i] - 0.55) * 1.6;
  return new THREE.MeshPhysicalMaterial({
    color,
    emissive,
    emissiveIntensity: 0.18,
    normalMap: tex(heightToNormal(height, size, 8), false, aniso),
    roughness: 0.18,
    metalness: 0,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
    envMapIntensity: 1.1,
  });
}

let cache = null;

/** 材质库。brush 的 mat 字段见 BRUSH_MATERIALS */
let aniso = 4;
export function getMaterials(quality = 'high', anisotropy = 4) {
  if (cache) return cache;
  // 这里生成的是照片贴图加载完成前的临时贴图，分辨率很低，生成很快
  const size = 128;
  aniso = anisotropy;
  const white = whitePanels(size, anisotropy);
  // 小号面板：贴图更密、偏冷色；大号面板：贴图更疏、偏暖色。面板的“格子大小”就是门的大小
  const whiteS = white.clone();
  whiteS.color = new THREE.Color(0xd8ecff);
  const whiteL = white.clone();
  whiteL.color = new THREE.Color(0xfff0d6);
  cache = {
    white,
    whiteS,
    whiteL,
    metal: darkMetal(size, anisotropy),
    concrete: roughConcrete(size, anisotropy),
    plate: new THREE.MeshStandardMaterial({ color: 0x9aa3ad, roughness: 0.5, metalness: 0.6 }),
    glass: glass(),
    grate: grate(size, anisotropy),
    acid: acid(size, anisotropy),
    bounce: gel(size, anisotropy, 0x1a7dff, 0x0a3cff, 131),
    speed: gel(size, anisotropy, 0xff7a10, 0xff4a00, 151),
  };
  upgradeMaterials(cache);
  return cache;
}

// ---------------------------------------------------------------- 照片级 PBR 贴图（public/tex，ambientCG CC0 照片 + 自己叠加的板缝）

const TEX_BASE = `${import.meta.env?.BASE_URL ?? './'}tex/`;
const texCache = new Map();

function loadTex(file, srgb) {
  if (texCache.has(file)) return texCache.get(file);
  const p = new Promise((resolve, reject) => {
    new THREE.TextureLoader().load(
      TEX_BASE + file,
      (t) => {
        t.wrapS = t.wrapT = THREE.RepeatWrapping;
        t.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
        t.anisotropy = aniso;
        resolve(t);
      },
      undefined,
      reject
    );
  });
  texCache.set(file, p);
  return p;
}

const setCache = new Map();
/** 一套贴图：<name>_c 颜色、_n 法线、_o（R=AO G=粗糙度 B=金属度）。加载失败时返回 null，继续用临时贴图 */
export function loadPBRSet(name) {
  if (!setCache.has(name)) {
    setCache.set(
      name,
      Promise.all([loadTex(`${name}_c.webp`, true), loadTex(`${name}_n.webp`, false), loadTex(`${name}_o.webp`, false)])
        .then(([map, normalMap, orm]) => ({ map, normalMap, orm }))
        .catch(() => null)
    );
  }
  return setCache.get(name);
}

function applySet(mat, set, { normalScale = 1, aoIntensity = 1, roughness = 1, metalness = 1 } = {}) {
  if (!set) return;
  mat.map = set.map;
  mat.normalMap = set.normalMap;
  mat.normalScale?.set(normalScale, normalScale);
  mat.aoMap = set.orm;
  mat.aoMapIntensity = aoIntensity;
  mat.roughnessMap = set.orm;
  mat.metalnessMap = set.orm;
  mat.roughness = roughness;
  mat.metalness = metalness;
  mat.needsUpdate = true;
  // 染过色的副本（星球表面）也跟着换贴图
  for (const c of _cloneMap.get(mat) ?? []) {
    c.map = mat.map;
    c.normalMap = mat.normalMap;
    c.normalScale?.copy(mat.normalScale);
    c.aoMap = mat.aoMap;
    c.aoMapIntensity = mat.aoMapIntensity;
    c.roughnessMap = mat.roughnessMap;
    c.metalnessMap = mat.metalnessMap;
    c.roughness = mat.roughness;
    c.metalness = mat.metalness;
    c.needsUpdate = true;
  }
}

const _cloneMap = new Map();
/** 同一种材质染成别的颜色（星球表面用）；贴图和原材质保持同步 */
const _tinted = new Map();
export function tintedMaterial(base, hex) {
  const key = base.uuid + ':' + hex;
  let c = _tinted.get(key);
  if (!c) {
    c = base.clone();
    c.color.setHex(hex);
    if (!_cloneMap.has(base)) _cloneMap.set(base, []);
    _cloneMap.get(base).push(c);
    _tinted.set(key, c);
  }
  return c;
}

function upgradeMaterials(m) {
  loadPBRSet('white').then((set) => {
    for (const k of ['white', 'whiteS', 'whiteL']) applySet(m[k], set, { normalScale: 1, aoIntensity: 1 });
  });
  loadPBRSet('dark').then((set) => applySet(m.metal, set, { normalScale: 1.1, aoIntensity: 1 }));
  setFloor(m, 'floor_light');
  loadPBRSet('plate').then((set) => applySet(m.plate, set, { normalScale: 1.2 }));
}

let floorName = null;
/** 切换地面（concrete 材质）使用的贴图 */
export function setFloor(m, name) {
  if (floorName === name) return;
  floorName = name;
  loadPBRSet(name).then((set) => {
    if (floorName === name) applySet(m.concrete, set, { normalScale: 1, aoIntensity: 1 });
  });
}

export const BRUSH_MATERIALS = ['white', 'whiteS', 'whiteL', 'metal', 'concrete', 'plate', 'glass', 'grate', 'bounce', 'speed'];
export const MATERIAL_LABELS = {
  white: '白色面板（可开门）',
  whiteS: '小号面板（开出小门，穿过会缩小）',
  whiteL: '大号面板（开出大门，穿过会放大）',
  metal: '金属（不可开门）',
  concrete: '地砖 / 混凝土（不可开门）',
  plate: '八角金属板（不可开门）',
  glass: '玻璃（挡子弹）',
  grate: '栅格（子弹可穿过）',
  bounce: '弹跳凝胶（蓝）',
  speed: '推进凝胶（橙）',
};
/** 可开门的面板，以及在上面开出的门的尺寸倍率 */
export const PORTALABLE = new Map([
  ['white', 1],
  ['whiteS', 0.45],
  ['whiteL', 2.2],
]);
/** 贴图重复周期（米）：小号面板格子小，大号面板格子大 */
export const TEX_SCALE = { white: 2, whiteS: 0.9, whiteL: 4.4, metal: 2, concrete: 3, plate: 2 };

/** 每 2 米重复一次贴图，并按世界坐标展开 UV，相邻墙体的纹理可以无缝衔接 */
export function brushGeometry(size, pos, texScale = 2, shape = 'box') {
  let g;
  if (shape === 'sphere') g = new THREE.SphereGeometry(size[0] / 2, 72, 44);
  else if (shape === 'cyl') g = new THREE.CylinderGeometry(size[0] / 2, size[0] / 2, size[1], 48, 1);
  else g = new THREE.BoxGeometry(size[0], size[1], size[2]);
  const p = g.attributes.position;
  const nrm = g.attributes.normal;
  const uv = g.attributes.uv;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i) + pos[0];
    const y = p.getY(i) + pos[1];
    const z = p.getZ(i) + pos[2];
    const nx = Math.abs(nrm.getX(i));
    const ny = Math.abs(nrm.getY(i));
    const nz = Math.abs(nrm.getZ(i));
    let u, v;
    if (shape !== 'box') {
      // 曲面：按法线最大的那个轴做方盒投影
      if (nx >= ny && nx >= nz) {
        u = z * Math.sign(nrm.getX(i) || 1);
        v = y;
      } else if (ny >= nz) {
        u = x;
        v = z;
      } else {
        u = -x * Math.sign(nrm.getZ(i) || 1);
        v = y;
      }
    } else if (nx > 0.5) {
      u = z * Math.sign(nrm.getX(i));
      v = y;
    } else if (ny > 0.5) {
      u = x;
      v = z;
    } else {
      u = -x * Math.sign(nrm.getZ(i));
      v = y;
    }
    uv.setXY(i, -u / texScale, v / texScale);
  }
  uv.needsUpdate = true;
  return g;
}
