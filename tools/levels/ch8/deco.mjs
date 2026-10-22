// 第 8 章用的装饰小函数：全部是 deco（没有碰撞），只负责好看和“用光做记号”。
import { box, r } from '../../levelkit.mjs';

export const GOLD = 0xffd36b;
export const IVORY = 0xf0e6cf;

/** 发光条 / 发光块（deco） */
export const glow = (x0, y0, z0, x1, y1, z1, color = GOLD, intensity = 1.5) => ({ ...box(x0, y0, z0, x1, y1, z1, 'glow'), color, intensity, deco: true });

/** 发光球（灯泡、宝石） */
export const orb = (x, y, z, d = 0.3, color = GOLD, intensity = 2.2) => ({ pos: [r(x), r(y), r(z)], size: [d, d, d], mat: 'glow', shape: 'sphere', color, intensity, deco: true });

/** 薄薄的染色地毯 / 地面镶边（deco） */
export const rug = (cx, cz, w, d, color = 0xc9b27a, y = 0, mat = 'concrete', h = 0.02) => ({ pos: [r(cx), r(y + h / 2 + 0.002), r(cz)], size: [r(w), h, r(d)], mat, color, deco: true });

/** 染色的装饰块（任意位置） */
export const slab = (x0, y0, z0, x1, y1, z1, color, mat = 'concrete') => ({ ...box(x0, y0, z0, x1, y1, z1, mat), color, deco: true });

/** 墙面上的洞口镶一圈发光边：墙面在 x = X，dir 是朝房间内的方向，洞口 z∈[z0,z1]，y∈[y0,y1] */
export function frameX(X, dir, [z0, z1], [y0, y1], color = GOLD, t = 0.1, inten = 1.6, d = 0.05) {
  const a = dir > 0 ? X : X - d;
  const b = dir > 0 ? X + d : X;
  return [
    glow(a, y0 - t, z0 - t, b, y1 + t, z0, color, inten),
    glow(a, y0 - t, z1, b, y1 + t, z1 + t, color, inten),
    glow(a, y1, z0, b, y1 + t, z1, color, inten),
    ...(y0 > 0.05 ? [glow(a, y0 - t, z0, b, y0, z1, color, inten)] : []),
  ];
}
export function frameZ(Z, dir, [x0, x1], [y0, y1], color = GOLD, t = 0.1, inten = 1.6, d = 0.05) {
  const a = dir > 0 ? Z : Z - d;
  const b = dir > 0 ? Z + d : Z;
  return [
    glow(x0 - t, y0 - t, a, x0, y1 + t, b, color, inten),
    glow(x1, y0 - t, a, x1 + t, y1 + t, b, color, inten),
    glow(x0, y1, a, x1, y1 + t, b, color, inten),
    ...(y0 > 0.05 ? [glow(x0, y0 - t, a, x1, y0, b, color, inten)] : []),
  ];
}

/** 盆栽：陶盆（圆柱）+ 几团叶子（球）。大小 s，全是 deco */
export function plant(x, z, s = 1, y = 0, leaf = 0x6aa86a) {
  const out = [
    { pos: [r(x), r(y + 0.22 * s), r(z)], size: [r(0.5 * s), r(0.44 * s), r(0.5 * s)], mat: 'concrete', shape: 'cyl', color: 0xb98a5e, deco: true },
    { pos: [r(x), r(y + 0.46 * s), r(z)], size: [r(0.44 * s), r(0.04 * s), r(0.44 * s)], mat: 'concrete', shape: 'cyl', color: 0x4a3a2a, deco: true },
  ];
  const puffs = [[0, 0.95, 0, 0.8], [0.16, 0.7, 0.1, 0.55], [-0.15, 0.78, -0.12, 0.6], [0.02, 1.25, 0.04, 0.5]];
  for (const [dx, dy, dz, k] of puffs) out.push({ pos: [r(x + dx * s), r(y + dy * s), r(z + dz * s)], size: [r(k * s), r(k * s), r(k * s)], mat: 'grass', shape: 'sphere', color: leaf, deco: true });
  return out;
}

/** 第 8 章的墙：象牙色的石材（concrete 带染色的磨石），金色只留给点缀 */
export const STONE = 'concrete';
export const WALLS = { xn: STONE, xp: STONE, zn: STONE, zp: STONE };
/** 给一块（地板）刷上暖色 */
export const tint = (b, color) => ({ ...b, color });
export const FLOOR = 0xc2a67c;
export const WALLTINT = 0xdcd0b6;
/** 给没染色的石墙/石块统一染上象牙色（地板、装饰不动） */
export const dress = (list) => list.map((b) => (b.mat === 'concrete' && !b.color && !b.deco ? { ...b, color: b.pos[1] < 0 && b.size[1] <= 0.6 ? FLOOR : WALLTINT } : b));
