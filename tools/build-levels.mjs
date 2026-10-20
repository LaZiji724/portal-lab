// 生成内置关卡 JSON：node tools/build-levels.mjs
// 关卡用小函数拼出来，输出的 JSON 和关卡编辑器使用同一种格式。
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'levels');
const T = 0.5; // 墙厚
const P = 0.04; // 白色面板厚度
const r = (v) => Math.round(v * 1000) / 1000;

const box = (x0, y0, z0, x1, y1, z1, mat = 'metal') => ({
  pos: [r((x0 + x1) / 2), r((y0 + y1) / 2), r((z0 + z1) / 2)],
  size: [r(x1 - x0), r(y1 - y0), r(z1 - z0)],
  mat,
});

/** 一个封闭房间（内部尺寸），omit 可以去掉某面：floor ceil xn xp zn zp */
function room([x0, x1], [y0, y1], [z0, z1], mats = {}, omit = []) {
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

// 贴在墙面上的白色面板（可开门）。dir 是面板朝向房间内部的方向
const panelX = (x, dir, [z0, z1], [y0, y1]) => (dir > 0 ? box(x, y0, z0, x + P, y1, z1, 'white') : box(x - P, y0, z0, x, y1, z1, 'white'));
const panelZ = (z, dir, [x0, x1], [y0, y1]) => (dir > 0 ? box(x0, y0, z, x1, y1, z + P, 'white') : box(x0, y0, z - P, x1, y1, z, 'white'));
const panelY = (y, dir, [x0, x1], [z0, z1]) => (dir > 0 ? box(x0, y, z0, x1, y + P, z1, 'white') : box(x0, y - P, z0, x1, y, z1, 'white'));

const light = (x, y, z, intensity = 30, extra = {}) => ({ type: 'light', pos: [x, y, z], intensity, ...extra });
const exit = (x, y, z, size = [2.2, 2.5, 2.2]) => ({ type: 'exit', pos: [x, y + size[1] / 2, z], size });

/** 门洞朝 +x 的墙（墙面在 x 处），门洞 z∈[-hw,hw]，高 h，以及门后通往出口的走廊 */
function doorWallAndCorridor(x, [z0, z1], [y0, y1], hw = 1.5, h = 3, len = 6, buttonIds = ['b1']) {
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

const levels = [];

// ---------------------------------------------------------------- 0 第一扇门
levels.push({
  name: '第一扇门',
  hint: '点击画面锁定鼠标。左键在白色面板上开一扇蓝色传送门，然后走进去。橙色传送门已经在隔壁房间等你了。',
  gun: 'blue',
  spawn: { pos: [0, 0, 3], yaw: 0 },
  brushes: [
    ...room([-6, 6], [0, 5], [-6, 6]),
    panelX(-6, 1, [-4, 4], [0, 4]),
    panelX(6, -1, [-4, 4], [0, 4]),
    panelZ(-6, 1, [-4, 4], [0, 4]),
    panelZ(6, -1, [-4, 4], [0, 4]),
    ...room([14, 22], [0, 5], [-4, 4]),
  ],
  entities: [
    { type: 'portal', color: 'orange', pos: [14, 1.13, 0], normal: [1, 0, 0], up: [0, 1, 0] },
    exit(20, 0, 0),
    light(0, 4.85, 0, 35, { shadow: true }),
    light(18, 4.85, 0, 25, { shadow: true }),
  ],
});

// ---------------------------------------------------------------- 1 玻璃之隔
levels.push({
  name: '玻璃之隔',
  hint: '传送门打不穿玻璃。退后几步，越过玻璃找一面能看到的白色面板。右键发射橙色传送门。',
  gun: 'both',
  spawn: { pos: [0, 0, 5.5], yaw: 0 },
  brushes: [
    ...room([-8, 8], [0, 9], [-10, 8]),
    box(-8, 0, -0.15, 8, 2.6, 0.15, 'glass'),
    panelZ(8, -1, [-6, 6], [0, 4.5]),
    panelX(-8, 1, [1.5, 7], [0, 4]),
    panelX(8, -1, [1.5, 7], [0, 4]),
    panelZ(-10, 1, [-7, 7], [4.5, 8.6]),
  ],
  entities: [exit(0, 0, -7.5), light(0, 8.85, 4, 40, { shadow: true }), light(0, 8.85, -6, 35, { shadow: true })],
});

// ---------------------------------------------------------------- 2 搬运方块
{
  const d = doorWallAndCorridor(8, [-8, 8], [0, 10]);
  levels.push({
    name: '搬运方块',
    hint: '方块在高台上。用传送门上去，按 E 拿起方块，带着它穿门回来，放到红色按钮上就能开门。',
    gun: 'both',
    spawn: { pos: [0, 0, 5], yaw: 0 },
    brushes: [
      ...room([-8, 8], [0, 10], [-8, 8], {}, ['xp']),
      ...d.brushes,
      box(-8, 0, -8, 8, 4, -4, 'metal'),
      panelZ(-8, 1, [-6, 6], [4, 9.5]),
      panelZ(8, -1, [-6, 6], [0, 4]),
    ],
    entities: [
      { type: 'cube', pos: [0, 4.35, -6] },
      { type: 'button', id: 'b1', pos: [4, 0, 3] },
      ...d.entities,
      light(0, 9.85, 0, 45, { shadow: true }),
      light(0, 9.85, -6, 25),
    ],
  });
}

// ---------------------------------------------------------------- 3 天降
levels.push({
  name: '天降',
  hint: '传送门也能开在地面和天花板上。从地上的门掉下去，就会从天花板上的门掉出来。',
  gun: 'both',
  spawn: { pos: [0, 0, 5.3], yaw: 0 },
  brushes: [
    ...room([-8, 8], [0, 12], [-10, 6]),
    box(-8, 0, -10, 8, 6, -4, 'metal'),
    panelY(12, -1, [-4, 4], [-9.5, -4.3]),
    panelY(0, 1, [-4, 4], [-0.5, 4.5]),
  ],
  entities: [exit(0, 6, -8), light(0, 11.85, 1, 45, { shadow: true }), light(0, 11.85, -7, 30, { shadow: true })],
});

// ---------------------------------------------------------------- 4 飞跃
levels.push({
  name: '飞跃',
  hint: '速度穿过传送门时会被保留。从高台跳进地面上的门，就能从墙上的门高速飞出去，越过酸液池。',
  gun: 'both',
  spawn: { pos: [0, 10, 8.5], yaw: 0 },
  brushes: [
    ...room([-6, 6], [-2, 20], [-24, 10], {}, ['floor']),
    box(-6.5, -2.5, -2, 6.5, 0, 10.5, 'concrete'),
    box(-6.5, -2.5, -10, 6.5, -2, -2, 'concrete'),
    box(-6.5, -2.5, -24.5, 6.5, 0, -10, 'concrete'),
    box(-6, 0, 7, 6, 10, 10, 'metal'),
    panelZ(10, -1, [-4, 4], [11, 19.5]),
    panelY(0, 1, [-4, 4], [-1.9, 6.8]),
  ],
  entities: [
    { type: 'hazard', pos: [0, -1.2, -6], size: [12, 1.6, 8] },
    exit(0, 0, -20, [2.4, 2.5, 2.4]),
    light(0, 19.85, 4, 70, { shadow: true }),
    light(0, 19.85, -6, 50),
    light(0, 19.85, -17, 60, { shadow: true }),
  ],
});

// ---------------------------------------------------------------- 5 无限下落
levels.push({
  name: '无限下落',
  hint: '地面和天花板上的一对门会让你一直下落、越掉越快。下落途中把其中一扇门改开到墙上，就能把这股速度带出去。',
  gun: 'both',
  spawn: { pos: [3, 0, 4.5], yaw: -90 },
  brushes: [
    ...room([0, 26], [-2, 14], [-6, 6], {}, ['floor']),
    box(-0.5, -2.5, -6.5, 5, 0, 6.5, 'concrete'),
    box(5, -2.5, -6.5, 15, -2, 6.5, 'concrete'),
    box(15, -2.5, -6.5, 26.5, 0, 6.5, 'concrete'),
    panelY(0, 1, [0.6, 4.6], [-2.5, 2.5]),
    panelY(14, -1, [0.4, 4.8], [-3, 3]),
    panelX(0, 1, [-5.5, 5.5], [4, 10]),
  ],
  entities: [
    { type: 'hazard', pos: [10, -1.2, 0], size: [10, 1.6, 12] },
    exit(23, 0, 0, [2.4, 2.5, 2.4]),
    light(2.5, 13.85, -4.5, 45, { shadow: true }),
    light(12, 13.85, 0, 50),
    light(21, 13.85, 0, 50, { shadow: true }),
  ],
});

// ---------------------------------------------------------------- 6 隔栅取物
{
  const d = doorWallAndCorridor(8, [-6, 8], [0, 7]);
  levels.push({
    name: '隔栅取物',
    hint: '传送门子弹能穿过栅格，人和方块却过不去。试试把门开在方块底下。',
    gun: 'both',
    spawn: { pos: [0, 0, 5.5], yaw: 0 },
    brushes: [
      ...room([-8, 8], [0, 7], [-6, 8], {}, ['xp', 'zn']),
      ...d.brushes,
      // 带洞口的后墙
      box(-8.5, 0, -6.5, -3, 7, -6),
      box(3, 0, -6.5, 8.5, 7, -6),
      box(-3, 0, -6.5, 3, 1, -6),
      box(-3, 2.2, -6.5, 3, 7, -6),
      // 洞口后面的小隔间
      box(-3.5, 0, -9.5, 3.5, 1, -6.5),
      box(-3.5, 2.2, -9.5, 3.5, 2.7, -6.5),
      box(-3.5, 1, -9.5, -3, 2.2, -6.5),
      box(3, 1, -9.5, 3.5, 2.2, -6.5),
      box(-3, 1, -9.5, 3, 2.2, -9),
      box(-3, 1, -6.05, 3, 2.2, -5.95, 'grate'),
      panelY(1, 1, [-2.9, 2.9], [-8.95, -6.55]),
      panelX(-8, 1, [-4, 6], [0, 4]),
      panelZ(8, -1, [-6, 6], [0, 4]),
    ],
    entities: [
      { type: 'cube', pos: [0, 1.4, -7.75] },
      { type: 'button', id: 'b1', pos: [4, 0, 2.5] },
      ...d.entities,
      light(0, 6.85, 1.5, 45, { shadow: true }),
      light(0, 2.1, -7.8, 3, { fixture: false, distance: 5 }),
    ],
  });
}

mkdirSync(OUT, { recursive: true });
levels.forEach((lv, i) => {
  const file = join(OUT, `level${i}.json`);
  writeFileSync(file, JSON.stringify({ version: 1, ...lv }, null, 1) + '\n');
  console.log('wrote', file, lv.brushes.length, 'brushes');
});
