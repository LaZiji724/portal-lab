// 拼关卡用的小函数。坐标单位是米，y 轴朝上。
export const T = 0.5; // 墙厚
export const P = 0.04; // 白色面板厚度
export const r = (v) => Math.round(v * 1000) / 1000;

export const box = (x0, y0, z0, x1, y1, z1, mat = 'metal') => ({
  pos: [r((x0 + x1) / 2), r((y0 + y1) / 2), r((z0 + z1) / 2)],
  size: [r(Math.abs(x1 - x0)), r(Math.abs(y1 - y0)), r(Math.abs(z1 - z0))],
  mat,
});

/** 一个封闭房间（内部尺寸），omit 可以去掉某面：floor ceil xn xp zn zp */
export function room([x0, x1], [y0, y1], [z0, z1], mats = {}, omit = []) {
  const out = [];
  const m = (k, d) => mats[k] ?? d;
  if (!omit.includes('floor')) out.push(box(x0 - T, y0 - T, z0 - T, x1 + T, y0, z1 + T, m('floor', 'concrete')));
  if (!omit.includes('ceil')) out.push(box(x0 - T, y1, z0 - T, x1 + T, y1 + T, z1 + T, m('ceil', 'metal')));
  if (!omit.includes('xn')) out.push(box(x0 - T, y0, z0, x0, y1, z1, m('xn', 'metal')));
  if (!omit.includes('xp')) out.push(box(x1, y0, z0, x1 + T, y1, z1, m('xp', 'metal')));
  if (!omit.includes('zn')) out.push(box(x0 - T, y0, z0 - T, x1 + T, y1, z0, m('zn', 'metal')));
  if (!omit.includes('zp')) out.push(box(x0 - T, y0, z1, x1 + T, y1, z1 + T, m('zp', 'metal')));
  return out;
}

/**
 * 在一面墙上挖出矩形洞口：墙在 axis 方向的 [w0,w1] 厚度范围，墙面沿 a、b 两轴铺开。
 * holes 是洞口列表 [a0,a1,b0,b1]，返回拼出这面墙的若干方块（洞口之间不能重叠）。
 */
export function wallWithHoles(axis, [w0, w1], [a0, a1], [b0, b1], holes, mat = 'metal') {
  // 沿 a 轴切条，再在每一条里沿 b 轴避开洞口
  const cutsA = new Set([a0, a1]);
  for (const h of holes) {
    cutsA.add(h[0]);
    cutsA.add(h[1]);
  }
  const as = [...cutsA].sort((x, y) => x - y);
  const out = [];
  for (let i = 0; i + 1 < as.length; i++) {
    const s0 = as[i];
    const s1 = as[i + 1];
    const mid = (s0 + s1) / 2;
    const blocks = holes.filter((h) => mid > h[0] && mid < h[1]).map((h) => [h[2], h[3]]);
    blocks.sort((x, y) => x[0] - y[0]);
    let cur = b0;
    const spans = [];
    for (const [h0, h1] of blocks) {
      if (h0 > cur) spans.push([cur, h0]);
      cur = Math.max(cur, h1);
    }
    if (cur < b1) spans.push([cur, b1]);
    for (const [c0, c1] of spans) out.push(axisBox(axis, [w0, w1], [s0, s1], [c0, c1], mat));
  }
  return out;
}

/** axis = 'x' 时墙面在 yz 平面：a 轴 = z，b 轴 = y；'z' 时 a = x，b = y；'y'（地板）时 a = x，b = z */
export function axisBox(axis, [w0, w1], [a0, a1], [b0, b1], mat) {
  if (axis === 'x') return box(w0, b0, a0, w1, b1, a1, mat);
  if (axis === 'z') return box(a0, b0, w0, a1, b1, w1, mat);
  return box(a0, w0, b0, a1, w1, b1, mat);
}

// 贴在墙面上的白色面板（可开门）。dir 是面板朝向房间内部的方向
export const panelX = (x, dir, [z0, z1], [y0, y1], mat = 'white') => (dir > 0 ? box(x, y0, z0, x + P, y1, z1, mat) : box(x - P, y0, z0, x, y1, z1, mat));
export const panelZ = (z, dir, [x0, x1], [y0, y1], mat = 'white') => (dir > 0 ? box(x0, y0, z, x1, y1, z + P, mat) : box(x0, y0, z - P, x1, y1, z, mat));
export const panelY = (y, dir, [x0, x1], [z0, z1], mat = 'white') => (dir > 0 ? box(x0, y, z0, x1, y + P, z1, mat) : box(x0, y - P, z0, x1, y, z1, mat));

export const light = (x, y, z, intensity = 30, extra = {}) => ({ type: 'light', pos: [x, y, z], intensity, ...extra });
export const exit = (x, y, z, size = [2.2, 2.5, 2.2]) => ({ type: 'exit', pos: [x, y + size[1] / 2, z], size });

/** 门洞朝 +x 的墙（墙面在 x 处），门洞 z∈[-hw,hw]，高 h，以及门后通往出口的走廊 */
export function doorWallAndCorridor(x, [z0, z1], [y0, y1], hw = 1.5, h = 3, len = 6, buttonIds = ['b1']) {
  const brushes = [
    box(x, y0, z0, x + T, y1, -hw),
    box(x, y0, hw, x + T, y1, z1),
    box(x, h, -hw, x + T, y1, hw),
    // 走廊
    box(x + T, -T, -hw - T, x + T + len, 0, hw + T, 'concrete'),
    box(x + T, h, -hw - T, x + T + len, h + T, hw + T),
    box(x + T, 0, -hw - T, x + T + len, h, -hw),
    box(x + T, 0, hw, x + T + len, h, hw + T),
    box(x + T + len - T, 0, -hw, x + T + len, h, hw),
  ];
  const entities = [
    { type: 'door', pos: [x + T / 2, h / 2, 0], size: [0.3, h, hw * 2], requires: buttonIds },
    exit(x + T + len - 1.6, 0, 0, [2, 2.5, hw * 2 - 0.4]),
    light(x + T + len / 2, h - 0.15, 0, 6),
  ];
  return { brushes, entities };
}

/** 空间门的一端：墙面上的矩形门洞，pos 是门洞中心 */
export const gateEnd = (pos, normal, up = [0, 1, 0]) => ({ pos, normal, up });

// ---------------------------------------------------------------- 异形几何：斜板、圆柱、球、多边形房间
import * as THREE from 'three';

const DEG = 180 / Math.PI;
const rd = (v) => Math.round(v * 100) / 100;

/** 竖直圆柱：圆心 (cx,cz)，高度 y0..y1，半径 rad */
export const cyl = (cx, y0, cz, rad, y1, mat = 'metal', extra = {}) => ({
  pos: [r(cx), r((y0 + y1) / 2), r(cz)],
  size: [r(rad * 2), r(y1 - y0), r(rad * 2)],
  mat,
  shape: 'cyl',
  ...extra,
});

/** 球（星球）：球心和半径，color 可以给表面染色 */
export const sphere = (cx, cy, cz, rad, mat = 'concrete', color) => ({
  pos: [r(cx), r(cy), r(cz)],
  size: [r(rad * 2), r(rad * 2), r(rad * 2)],
  mat,
  shape: 'sphere',
  ...(color !== undefined ? { color } : {}),
});

/**
 * 一块斜放的板（斜坡、斜墙、台阶）：从 a 点到 b 点，宽 width，厚 thick。
 * 板的中心线在 a、b 之间，上表面比中心线高 thick/2。
 */
export function slab(a, b, width = 3, thick = 0.4, mat = 'metal', extra = {}) {
  const d = new THREE.Vector3(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
  // extend：首尾各多出一截，用来盖住相邻两块斜板在外侧留下的楔形缺口（螺旋坡道）
  const len = d.length() + (extra.extend ?? 0);
  delete extra.extend;
  d.normalize();
  const pitch = -Math.asin(d.y) * DEG;
  const yaw = Math.atan2(d.x, d.z) * DEG;
  return {
    pos: [r((a[0] + b[0]) / 2), r((a[1] + b[1]) / 2), r((a[2] + b[2]) / 2)],
    size: [r(width), r(thick), r(len)],
    mat,
    rot: [rd(pitch), rd(yaw), 0],
    ...extra,
  };
}

/**
 * 正多边形的墙：n 面，内切圆半径 apothem，围着 (cx,cz)，y0..y1 高。
 * skip 是要留空的面的编号（门洞）；返回每一面墙（斜放的方块）。
 */
export function ringWalls(cx, cz, apothem, n, [y0, y1], mat = 'metal', skip = [], thick = T) {
  const out = [];
  const len = 2 * apothem * Math.tan(Math.PI / n) + 0.14;
  for (let i = 0; i < n; i++) {
    if (skip.includes(i)) continue;
    const a = ((i + 0.5) / n) * Math.PI * 2;
    const rc = apothem + thick / 2;
    out.push({
      pos: [r(cx + Math.cos(a) * rc), r((y0 + y1) / 2), r(cz + Math.sin(a) * rc)],
      size: [r(len), r(y1 - y0), r(thick)],
      mat,
      rot: [0, rd(-(a * DEG + 90)), 0],
    });
  }
  return out;
}

/** 贴在多边形墙内侧的白色面板：第 i 面墙的正中，宽 w，y0..y1 高 */
export function ringPanel(cx, cz, apothem, n, i, w, [y0, y1], mat = 'white') {
  const a = ((i + 0.5) / n) * Math.PI * 2;
  const rc = apothem - P / 2;
  return {
    pos: [r(cx + Math.cos(a) * rc), r((y0 + y1) / 2), r(cz + Math.sin(a) * rc)],
    size: [r(w), r(y1 - y0), P],
    mat,
    rot: [0, rd(-(a * DEG + 90)), 0],
  };
}

/** 第 i 面墙内侧正中的点（离墙 inset 米），用来摆灯、出口 */
export function ringPoint(cx, cz, apothem, n, i, inset = 0) {
  const a = ((i + 0.5) / n) * Math.PI * 2;
  return [cx + Math.cos(a) * (apothem - inset), cz + Math.sin(a) * (apothem - inset)];
}

/** 贴在球面上的一块平整白板：球心 c、半径 R，朝向 dir（从球心指向外），边长 w×h，厚 thick */
export function spherePad(c, R, dir, w = 3, h = 3, mat = 'white', thick = 0.3) {
  const d = new THREE.Vector3(...dir).normalize();
  const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), d);
  const e = new THREE.Euler().setFromQuaternion(q, 'YXZ');
  // 板的外表面略高出球面，像是一块嵌进去的面板
  const centerR = R + 0.04 - thick / 2 + 0.0;
  return {
    pos: [r(c[0] + d.x * centerR), r(c[1] + d.y * centerR), r(c[2] + d.z * centerR)],
    size: [r(w), r(thick), r(h)],
    mat,
    rot: [rd(e.x * DEG), rd(e.y * DEG), rd(e.z * DEG)],
  };
}
