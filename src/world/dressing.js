import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

/**
 * 场景细节：只有外观、没有碰撞。根据关卡里的方块墙面自动生成
 *  - 踢脚线：墙和地面相接的地方
 *  - 灯带：深色墙面上一圈发光的强调色线条（会被泛光晕开）
 *  - 天花横梁和管线：给空旷的天花板加层次
 * 全部合并成很少的几个网格，不影响帧率。
 */

const SOLID = new Set(['metal', 'concrete', 'white', 'whiteS', 'whiteL', 'plate']);
const EPS = 0.02;

const _mats = new WeakMap();
function dressingMaterials(game) {
  let m = _mats.get(game);
  if (!m) {
    m = {
      base: new THREE.MeshStandardMaterial({ color: 0x2b3038, roughness: 0.45, metalness: 0.75 }),
      pipe: new THREE.MeshStandardMaterial({ color: 0x5a6270, roughness: 0.35, metalness: 0.9 }),
      strip: new THREE.MeshBasicMaterial({ color: 0xffffff, toneMapped: true }),
    };
    _mats.set(game, m);
  }
  return m;
}

function box(list, cx, cy, cz, sx, sy, sz) {
  const g = new THREE.BoxGeometry(sx, sy, sz);
  g.translate(cx, cy, cz);
  list.push(g);
}

function flush(parent, list, material, cast = false) {
  if (!list.length) return;
  const geo = mergeGeometries(list, false);
  for (const g of list) g.dispose();
  const mesh = new THREE.Mesh(geo, material);
  mesh.castShadow = cast;
  mesh.receiveShadow = true;
  mesh.matrixAutoUpdate = false;
  parent.add(mesh);
}

const bounds = (b) => ({
  min: [b.pos[0] - b.size[0] / 2, b.pos[1] - b.size[1] / 2, b.pos[2] - b.size[2] / 2],
  max: [b.pos[0] + b.size[0] / 2, b.pos[1] + b.size[1] / 2, b.pos[2] + b.size[2] / 2],
});

export function addDressing(game, def, parent) {
  const m = dressingMaterials(game);
  const accent = game.theme?.accent ?? 0x55c0ff;
  m.strip.color.setHex(accent).multiplyScalar(2.6);

  const solids = def.brushes.filter((b) => SOLID.has(b.mat) && !b.rot && (b.shape ?? 'box') === 'box').map((b) => ({ b, ...bounds(b) }));
  // 地面：又宽又薄的方块；天花：同样的形状但离地面至少 2.4 米
  const floors = solids.filter((s) => s.b.size[1] <= 2 && s.b.size[0] >= 2 && s.b.size[2] >= 2);
  const walls = solids.filter((s) => s.b.size[1] >= 1.8);

  const base = [];
  const strip = [];
  const seen = new Set();
  const key = (...a) => a.map((v) => v.toFixed(2)).join(',');

  for (const f of floors) {
    const top = f.max[1];
    for (const w of walls) {
      if (w === f) continue;
      if (w.min[1] > top + EPS || w.max[1] < top + 1.2) continue; // 墙要从这块地面一直立起来
      // 四个侧面：axis 0 = x 面，1 = z 面；dir -1 = 朝负方向，+1 = 朝正方向
      for (const [axis, dir] of [[0, -1], [0, 1], [1, -1], [1, 1]]) {
        const o = axis === 0 ? 2 : 0; // 沿墙面的方向
        const plane = dir < 0 ? w.min[axis * 2] : w.max[axis * 2];
        if (plane < f.min[axis * 2] - EPS || plane > f.max[axis * 2] + EPS) continue;
        // 墙面必须露在地面上：地面在这个面朝外的一侧要有延伸（否则是地面的边缘）
        const outside = plane + dir * 0.3;
        if (outside < f.min[axis * 2] || outside > f.max[axis * 2]) continue;
        const a = Math.max(w.min[o], f.min[o]);
        const c = Math.min(w.max[o], f.max[o]);
        if (c - a < 0.3) continue;
        const k = key(axis, dir, plane, top, a, c);
        if (seen.has(k)) continue;
        seen.add(k);
        const len = c - a;
        const mid = (a + c) / 2;
        const off = dir * 0.025;
        // 踢脚线（深色金属）+ 上沿的发光灯带（只给不能开门的墙，白板保持干净）
        const white = w.b.mat.startsWith('white');
        if (axis === 0) box(base, plane + off, top + 0.11, mid, 0.05, 0.22, len);
        else box(base, mid, top + 0.11, plane + off, len, 0.22, 0.05);
        if (!white && w.max[1] - top >= 2.4) {
          const y = top + 0.26;
          if (axis === 0) box(strip, plane + dir * 0.012, y, mid, 0.024, 0.035, len - 0.1);
          else box(strip, mid, y, plane + dir * 0.012, len - 0.1, 0.035, 0.024);
        }
      }
    }
  }

  // 天花：下表面朝下、离某块地面至少 2.4 米的宽板
  const beams = [];
  const pipes = [];
  for (const c of solids) {
    if (c.b.size[1] > 2 || c.b.size[0] < 4 || c.b.size[2] < 4 || c.b.mat.startsWith('white')) continue;
    const under = floors.find(
      (f) => f !== c && f.max[1] < c.min[1] - 2.4 && f.min[0] < c.max[0] && f.max[0] > c.min[0] && f.min[2] < c.max[2] && f.max[2] > c.min[2],
    );
    if (!under) continue;
    const y = c.min[1];
    const w = c.max[0] - c.min[0];
    const d = c.max[2] - c.min[2];
    const longX = w >= d;
    const L = longX ? w : d;
    const S = longX ? d : w;
    // 横梁：垂直于长边，每隔约 4 米一根
    const n = Math.max(1, Math.round(L / 4));
    for (let i = 0; i < n; i++) {
      const t = -L / 2 + ((i + 0.5) * L) / n;
      if (longX) box(beams, c.b.pos[0] + t, y - 0.14, c.b.pos[2], 0.34, 0.28, S - 0.02);
      else box(beams, c.b.pos[0], y - 0.14, c.b.pos[2] + t, S - 0.02, 0.28, 0.34);
    }
    // 管线：沿长边两根，贴着横梁下方穿过
    for (const s of [-0.28, 0.28]) {
      const g = new THREE.CylinderGeometry(0.07, 0.07, L - 0.02, 10);
      if (longX) {
        g.rotateZ(Math.PI / 2);
        g.translate(c.b.pos[0], y - 0.32, c.b.pos[2] + s * S);
      } else {
        g.rotateX(Math.PI / 2);
        g.translate(c.b.pos[0] + s * S, y - 0.32, c.b.pos[2]);
      }
      pipes.push(g);
    }
  }

  flush(parent, base, m.base);
  flush(parent, strip, m.strip);
  flush(parent, beams, m.base);
  flush(parent, pipes, m.pipe);
}
