// 第 6 章的小工具：发光灯带、盆栽、立柱、玻璃护栏等装饰
import { box, r } from '../../levelkit.mjs';

/** 发光灯带（纯装饰，没有碰撞） */
export const strip = (x0, y0, z0, x1, y1, z1, color = 0x5ef0c8, intensity = 1.6) => ({ ...box(x0, y0, z0, x1, y1, z1, 'glow'), color, intensity, deco: true });

/** 一盆植物：花盆是实心的小方块，叶子只是装饰 */
export function planter(x, z, y = 0, s = 1, color = 0x4fae78) {
  return [
    { ...box(x - 0.35 * s, y, z - 0.35 * s, x + 0.35 * s, y + 0.5 * s, z + 0.35 * s, 'concrete'), color: 0xcfe3dc },
    { pos: [r(x), r(y + 0.5 * s + 0.55 * s), r(z)], size: [r(1.1 * s), r(1.1 * s), r(1.1 * s)], mat: 'grass', shape: 'sphere', color, deco: true },
    { pos: [r(x + 0.25 * s), r(y + 0.5 * s + 0.35 * s), r(z - 0.15 * s)], size: [r(0.7 * s), r(0.7 * s), r(0.7 * s)], mat: 'grass', shape: 'sphere', color: 0x3f9c68, deco: true },
  ];
}

/** 沿墙的踢脚灯带：墙面在 axis 方向，沿 a 轴铺开 */
export const baseStripX = (x, dir, [z0, z1], y = 0.12, color = 0x5ef0c8, intensity = 1.4) => strip(dir > 0 ? x : x - 0.05, y, z0, dir > 0 ? x + 0.05 : x, y + 0.07, z1, color, intensity);
export const baseStripZ = (z, dir, [x0, x1], y = 0.12, color = 0x5ef0c8, intensity = 1.4) => strip(x0, y, dir > 0 ? z : z - 0.05, x1, y + 0.07, dir > 0 ? z + 0.05 : z, color, intensity);
