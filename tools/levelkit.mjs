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

// ---------------------------------------------------------------- 旋转圆筒（太空殖民地）：绕 z 轴的正多边形管道
// 第 i 面墙正对着的方向是 i * 360 / n 度（0 = +x，90 = 顶，270 = 底）。重力用 axis 场，背离轴线。
const tubeAng = (n, i) => (i * 360) / n;

/** 圆筒的墙。gaps 是 z 方向上留空的区段 [[z0,z1],…]；skip 是整面不要的墙（给窗户让位） */
export function tubeWalls(cx, cy, R, n, [z0, z1], mat = 'metal', { skip = [], only = null, gaps = [], thick = T, extra = {} } = {}) {
  const len = 2 * R * Math.tan(Math.PI / n) + 0.14;
  const cuts = [z0, z1, ...gaps.flat()].sort((a, b) => a - b);
  const segs = [];
  for (let k = 0; k + 1 < cuts.length; k++) {
    const mid = (cuts[k] + cuts[k + 1]) / 2;
    if (gaps.some(([g0, g1]) => mid > g0 && mid < g1)) continue;
    if (cuts[k + 1] - cuts[k] < 0.01) continue;
    segs.push([cuts[k], cuts[k + 1]]);
  }
  const out = [];
  for (let i = 0; i < n; i++) {
    if (skip.includes(i) || (only && !only.includes(i))) continue;
    const a = tubeAng(n, i);
    const rc = R + thick / 2;
    for (const [s0, s1] of segs) {
      out.push({
        pos: [r(cx + Math.cos((a * Math.PI) / 180) * rc), r(cy + Math.sin((a * Math.PI) / 180) * rc), r((s0 + s1) / 2)],
        size: [r(len), r(thick), r(s1 - s0)],
        mat,
        rot: [0, 0, rd(a - 90)],
        ...extra,
      });
    }
  }
  return out;
}

/** 铺在第 faces 面墙内侧的一层薄薄的装饰（草地、河流、地毯），没有碰撞，比白板低一点点所以不会和面板打架 */
export function tubeLawn(cx, cy, R, n, faces, [z0, z1], color = 0x6fae5a, mat = 'concrete', extra = {}) {
  const len = 2 * R * Math.tan(Math.PI / n);
  return faces.map((i) => {
    const a = tubeAng(n, i);
    const rc = R - 0.01;
    return {
      pos: [r(cx + Math.cos((a * Math.PI) / 180) * rc), r(cy + Math.sin((a * Math.PI) / 180) * rc), r((z0 + z1) / 2)],
      size: [r(len), 0.02, r(z1 - z0)],
      mat,
      color,
      deco: true,
      rot: [0, 0, rd(a - 90)],
      ...extra,
    };
  });
}

/** 贴在第 i 面墙内侧的面板：宽 w，z0..z1。mat 可以是 white、glass…… */
export function tubePanel(cx, cy, R, n, i, w, [z0, z1], mat = 'white', extra = {}) {
  const a = tubeAng(n, i);
  const rc = R - P / 2;
  return {
    pos: [r(cx + Math.cos((a * Math.PI) / 180) * rc), r(cy + Math.sin((a * Math.PI) / 180) * rc), r((z0 + z1) / 2)],
    size: [r(w), P, r(z1 - z0)],
    mat,
    rot: [0, 0, rd(a - 90)],
    ...extra,
  };
}

/** 第 i 面墙内侧、离墙 inset 米的点（世界坐标） */
export function tubePoint(cx, cy, R, n, i, inset, z) {
  const a = (tubeAng(n, i) * Math.PI) / 180;
  return [r(cx + Math.cos(a) * (R - inset)), r(cy + Math.sin(a) * (R - inset)), z];
}

/** 立在圆筒内壁上的方块（房子、墙、树干）：angle 度，底面贴着内壁，size = [沿壁宽, 高(径向), 沿轴深] */
export function tubeBox(cx, cy, R, angle, z, size, mat = 'concrete', extra = {}) {
  const a = (angle * Math.PI) / 180;
  const rc = R - size[1] / 2;
  return {
    pos: [r(cx + Math.cos(a) * rc), r(cy + Math.sin(a) * rc), r(z)],
    size: size.map(r),
    mat,
    rot: [0, 0, rd(angle - 90)],
    ...extra,
  };
}

/** 圆筒两端的盖子（一个很扁的圆柱，轴沿 z） */
export function tubeCap(cx, cy, z, R, mat = 'metal', extra = {}) {
  return { pos: [cx, cy, r(z)], size: [r(R * 2 + 2), 0.5, r(R * 2 + 2)], mat, shape: 'cyl', rot: [90, 0, 0], ...extra };
}

/** 圆筒内壁上的一棵树：树干是实心的，树冠只是装饰（走得过去） */
export function tubeTree(cx, cy, R, angle, z, s = 1, color = 0x4aa05a) {
  const a = (angle * Math.PI) / 180;
  const k = R - 3.9 * s;
  return [
    tubeBox(cx, cy, R, angle, z, [0.5 * s, 3 * s, 0.5 * s], 'concrete', { color: 0x6b4a2f }),
    { pos: [r(cx + Math.cos(a) * k), r(cy + Math.sin(a) * k), r(z)], size: [r(4 * s), r(4 * s), r(4 * s)], mat: 'grass', shape: 'sphere', color, deco: true },
  ];
}

/** 水平的圆环（天花、平台边）：n 块放射状的长条，内半径 r0、外半径 r1，y0..y1 高 */
export function ringSlabs(cx, cz, r0, r1, n, [y0, y1], mat = 'concrete', extra = {}) {
  const out = [];
  const w = 2 * r1 * Math.tan(Math.PI / n) + 0.1;
  for (let i = 0; i < n; i++) {
    const a = ((i + 0.5) / n) * Math.PI * 2;
    const rc = (r0 + r1) / 2;
    out.push({
      pos: [r(cx + Math.cos(a) * rc), r((y0 + y1) / 2), r(cz + Math.sin(a) * rc)],
      size: [r(w), r(y1 - y0), r(r1 - r0)],
      mat,
      rot: [0, rd(90 - (a * 180) / Math.PI), 0],
      ...extra,
    });
  }
  return out;
}

// ---------------------------------------------------------------- 户外：小岛、树、倒影
/** 一棵树：树干是实心的细圆柱，树冠只是装饰 */
export function tree(x, y, z, s = 1, color = 0x4aa05a, trunk = 0x6b4a2f) {
  return [
    cyl(x, y, z, 0.28 * s, y + 3 * s, 'concrete', { color: trunk }),
    { pos: [r(x), r(y + 4.2 * s), r(z)], size: [r(3.8 * s), r(3.4 * s), r(3.8 * s)], mat: 'grass', shape: 'sphere', color, deco: true },
  ];
}

/** 浮岛：上面是草地的圆盘，下面挂着一块倒圆锥形的岩石（装饰） */
export function isle(x, y, z, rad, { grass = 0xffffff, rock = 0x9a7a62, depth = 3 } = {}) {
  return [
    cyl(x, y - depth, z, rad, y, 'grass', { color: grass }),
    { pos: [r(x), r(y - depth - rad * 0.45), r(z)], size: [r(rad * 2), r(rad * 2), r(rad * 2)], mat: 'concrete', shape: 'sphere', color: rock, deco: true },
  ];
}

/** 把一组装饰/方块沿水平面 y = y0 / 2 翻到对面：y -> y0 - y（倒影世界）。厚度不变，旋转不处理。 */
export function mirrorY(list, y0 = -100) {
  return list.map((b) => ({ ...b, pos: [b.pos[0], r(y0 - b.pos[1]), b.pos[2]] }));
}

// ---------------------------------------------------------------- 星球表面的东西（沿球面径向竖立）
const eulerFromDir = (dir) => {
  const d = new THREE.Vector3(...dir).normalize();
  const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), d);
  const e = new THREE.Euler().setFromQuaternion(q, 'YXZ');
  return { d, rot: [rd(e.x * DEG), rd(e.y * DEG), rd(e.z * DEG)] };
};

/** 立在星球表面的一棵树：dir 是从球心指向树的方向。树干实心，树冠装饰 */
export function planetTree(c, R, dir, s = 1, color = 0x4aa05a, trunk = 0x6b4a2f) {
  const { d, rot } = eulerFromDir(dir);
  const at = (h) => [r(c[0] + d.x * (R + h)), r(c[1] + d.y * (R + h)), r(c[2] + d.z * (R + h))];
  return [
    { pos: at(1.5 * s - 0.1), size: [r(0.56 * s), r(3 * s), r(0.56 * s)], mat: 'concrete', shape: 'cyl', color: trunk, rot },
    { pos: at(3.8 * s), size: [r(3.6 * s), r(3.2 * s), r(3.6 * s)], mat: 'grass', shape: 'sphere', color, deco: true },
  ];
}

/** 立在星球表面的方块（房子、石碑）：底面贴着球面，size = [宽, 高(径向), 深] */
export function planetBox(c, R, dir, size, mat = 'concrete', extra = {}) {
  const { d, rot } = eulerFromDir(dir);
  const h = R + size[1] / 2 - 0.1;
  return { pos: [r(c[0] + d.x * h), r(c[1] + d.y * h), r(c[2] + d.z * h)], size: size.map(r), mat, rot, ...extra };
}

/** 球面上的一个点（离球面 h 米） */
export function planetPoint(c, R, dir, h = 0) {
  const d = new THREE.Vector3(...dir).normalize();
  return [r(c[0] + d.x * (R + h)), r(c[1] + d.y * (R + h)), r(c[2] + d.z * (R + h))];
}
