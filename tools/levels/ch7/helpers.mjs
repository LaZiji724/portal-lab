// 第 7 章的小工具：发光灯带、灯牌、植物、出口走廊。
import { box, light, exit, T } from '../../levelkit.mjs';

export const AMBER = 0xffb347;
export const CYAN = 0x4fd8ff;
export const WARM = 0xffe2b8;
export const COOL = 0xcfe4ff;

/** 发光装饰条（没有碰撞） */
export const glow = (x0, y0, z0, x1, y1, z1, color = AMBER, intensity = 1.6) => ({
  ...box(x0, y0, z0, x1, y1, z1, 'glow'),
  color,
  intensity,
  deco: true,
});

/** 地面上围着一个点的方形灯框（按钮、踏板的“记号”） */
export function floorFrame(cx, cz, half, color = AMBER, y = 0.012, w = 0.07, intensity = 1.8) {
  return [
    glow(cx - half, y, cz - half, cx + half, y + 0.01, cz - half + w, color, intensity),
    glow(cx - half, y, cz + half - w, cx + half, y + 0.01, cz + half, color, intensity),
    glow(cx - half, y, cz - half + w, cx - half + w, y + 0.01, cz + half - w, color, intensity),
    glow(cx + half - w, y, cz - half + w, cx + half, y + 0.01, cz + half - w, color, intensity),
  ];
}

/** 贴在 z 向墙面上的方形灯框（接收器的“记号”）。z 是墙面，dir 朝房间内部 */
export function wallFrameZ(cx, cy, half, z, dir, color = AMBER, w = 0.07, intensity = 1.8) {
  const z0 = dir > 0 ? z : z - 0.02;
  const z1 = dir > 0 ? z + 0.02 : z;
  return [
    glow(cx - half, cy - half, z0, cx + half, cy - half + w, z1, color, intensity),
    glow(cx - half, cy + half - w, z0, cx + half, cy + half, z1, color, intensity),
    glow(cx - half, cy - half + w, z0, cx - half + w, cy + half - w, z1, color, intensity),
    glow(cx + half - w, cy - half + w, z0, cx + half, cy + half - w, z1, color, intensity),
  ];
}

/** 一盆植物（花盆实心很矮，叶子只是装饰） */
export function plant(x, z, s = 1, y = 0) {
  return [
    { ...box(x - 0.28 * s, y, z - 0.28 * s, x + 0.28 * s, y + 0.5 * s, z + 0.28 * s, 'concrete'), color: 0x514a44, deco: true },
    { pos: [x, y + 0.95 * s, z], size: [0.9 * s, 0.9 * s, 0.9 * s], mat: 'grass', shape: 'sphere', color: 0x6a9a58, deco: true },
    { pos: [x + 0.2 * s, y + 1.3 * s, z - 0.1 * s], size: [0.6 * s, 0.6 * s, 0.6 * s], mat: 'grass', shape: 'sphere', color: 0x86b36a, deco: true },
  ];
}

/**
 * 沿 -z 方向的出口走廊：门洞在墙面 z（墙外侧），洞口 x∈[cx-hw,cx+hw]，高 h，长 len。
 * 返回 { brushes, entities }，出口方块在走廊深处。
 */
export function corridorNZ(cx, z, hw = 1.5, h = 3, len = 5, y = 0) {
  const z1 = z - len;
  return {
    brushes: [
      box(cx - hw - T, y - T, z1 - T, cx + hw + T, y, z, 'concrete'),
      box(cx - hw - T, y + h, z1 - T, cx + hw + T, y + h + T, z),
      box(cx - hw - T, y, z1, cx - hw, y + h, z),
      box(cx + hw, y, z1, cx + hw + T, y + h, z),
      box(cx - hw, y, z1 - T, cx + hw, y + h, z1),
    ],
    entities: [exit(cx, y, z1 + 1.6, [hw * 2 - 0.4, 2.5, 2]), light(cx, y + h - 0.15, z1 + len / 2, 7)],
  };
}

/** 单个测试关用的套件：解法脚本外面包一层（降低画质、等弹窗、截图失败不算失败） */
export const wrapSolve = (solve) => async (H) => {
  const q = (typeof process !== 'undefined' && process.env.CH7_QUALITY) || 'low';
  await H.ev((qq) => window.__game.setQuality(qq), q);
  await H.page.waitForTimeout(600);
  const shot = async (name) => {
    try {
      await H.shot(name);
    } catch (e) {
      console.log('截图失败', name, e.message.split('\n')[0]);
    }
  };
  await solve({ ...H, shot });
};
