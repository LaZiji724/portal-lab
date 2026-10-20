// 第 1 章：基础训练（最早的 7 关）。每关后面跟着它的自动通关脚本。
import { T, box, room, panelX, panelY, panelZ, light, exit, doorWallAndCorridor } from '../levelkit.mjs';

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


// ---------------------------------------------------------------- 自动通关脚本
const solves = [
  async ({ ev, shot }) => {
  await ev(() => window.__pt.fire('blue', [0, 1.3, -6]));
  await shot('l0-portal');
  await ev(() => window.__pt.run(1.6, { x: 0, y: 1 }));
  await shot('l0-near');
  await ev(() => window.__pt.run(0.6, { x: 0, y: 1 }));
  await shot('l0-through');
  await ev(() => window.__pt.walkTo(20, 0));
  },
  async ({ ev, shot }) => {
  await ev(() => window.__pt.fire('orange', [0, 7, -10]));
  await ev(() => window.__pt.fire('blue', [0, 1.3, 8]));
  await shot('l1-portals');
  await ev(() => window.__pt.run(2.2, { x: 0, y: 1 }));
  await ev(() => window.__pt.run(1.5));
  await shot('l1-far');
  await ev(() => window.__pt.walkTo(0, -7.5));
  },
  async ({ ev, shot }) => {
  await ev(() => window.__pt.fire('orange', [0, 5.3, -8]));
  await ev(() => window.__pt.fire('blue', [0, 1.3, 8]));
  await ev(() => {
    const pt = window.__pt;
    pt.walkTo(0, 7.2, 4, 0.2);
    pt.run(0.8, { x: 0, y: 0.4 });
    pt.run(0.6);
  });
  await shot('l2-ledge');
  const held = await ev(() => window.__pt.use([0, 4.3, -6]));
  if (!held) throw new Error('没拿到方块');
  await ev(() => {
    const pt = window.__pt;
    window.__game.player.pitch = -0.15;
    pt.face(0, -8);
    pt.run(3, { x: 0, y: 1 });
    pt.run(0.5);
  });
  await shot('l2-back');
  await ev(() => {
    const pt = window.__pt;
    pt.walkTo(4, 4.9, 6, 0.25);
    pt.face(4, 2);
    window.__game.player.pitch = -0.6;
    pt.run(1);
    pt.use();
    pt.run(1.5);
  });
  await shot('l2-button');
  await ev(() => {
    const pt = window.__pt;
    pt.walkTo(6, 0, 5);
    pt.walkTo(13, 0, 8);
  });
  },
  async ({ ev, shot }) => {
  await ev(() => window.__pt.fire('orange', [0, 12, -7]));
  await ev(() => window.__pt.fire('blue', [0, 0, 2]));
  await shot('l3-portals');
  await ev(() => {
    const pt = window.__pt;
    pt.walkTo(0, 2.6, 4, 0.3);
    pt.run(2.5);
  });
  await shot('l3-ledge');
  await ev(() => window.__pt.walkTo(0, -8));
  },
  async ({ ev, shot }) => {
  await ev(() => {
    const pt = window.__pt;
    pt.walkTo(0, 7.3, 3, 0.15);
  });
  await ev(() => window.__pt.fire('blue', [0, 0, -0.6]));
  await ev(() => window.__pt.fire('orange', [0, 15, 10]));
  await shot('l4-portals');
  await ev(() => {
    const pt = window.__pt;
    pt.face(0, -20);
    window.__game.player.pitch = -0.3;
    pt.run(1.6, { x: 0, y: 1 });
  });
  await shot('l4-fall');
  await ev(() => window.__pt.run(3));
  await shot('l4-landed');
  await ev(() => window.__pt.walkTo(0, -20));
  },
  async ({ ev, shot }) => {
  await ev(() => window.__pt.fire('blue', [2.6, 0, 0]));
  await ev(() => window.__pt.fire('orange', [2.6, 14, 0]));
  await ev(() => {
    const pt = window.__pt;
    pt.walkTo(2.6, 0.8, 4, 0.4);
    window.__game.player.velocity.set(0, 0, 0);
    pt.run(3.2);
  });
  await shot('l5-loop');
  const sp = await ev(() => {
    const v = window.__game.player.velocity;
    return Math.hypot(v.x, v.y, v.z);
  });
  if (sp < 15) throw new Error('下落速度不够：' + sp.toFixed(1));
  await ev(() => {
    const pt = window.__pt;
    const g = window.__game;
    // 等到身体处在上半段再瞄墙
    for (let i = 0; i < 120 && g.player.position.y < 7; i++) pt.run(1 / 60);
    pt.fire('orange', [0, 8.5, 0]);
    pt.run(2.5);
  });
  await shot('l5-landed');
  await ev(() => window.__pt.walkTo(23, 0));
  },
  async ({ ev, shot }) => {
  await ev(() => window.__pt.fire('blue', [-8, 1.3, 2]));
  await ev(() => window.__pt.fire('orange', [0.5, 1.04, -7.75]));
  await shot('l6-portals');
  await ev(() => window.__pt.run(2.5));
  const cube = await ev(() => window.__game.cubes[0].position.toArray());
  if (cube[2] < -5.5) throw new Error('方块没掉出来：' + cube.map((v) => v.toFixed(2)));
  await ev((c) => {
    const pt = window.__pt;
    pt.walkTo(c[0] + 1.6, c[2], 6, 0.3);
    pt.use([c[0], c[1], c[2]]);
  }, cube);
  await ev(() => {
    const pt = window.__pt;
    pt.walkTo(4, 4.4, 8, 0.25);
    pt.face(4, 2);
    window.__game.player.pitch = -0.6;
    pt.run(1);
    pt.use();
    pt.run(1.5);
  });
  await shot('l6-button');
  await ev(() => {
    const pt = window.__pt;
    pt.walkTo(6, 0, 5);
    pt.walkTo(13, 0, 8);
  });
  },
];
export default levels.map((def, i) => ({ def, solve: solves[i] }));
