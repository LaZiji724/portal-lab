// 第 3 章：放大与缩小。穿过尺寸不同的门，人和方块都会按比例变大变小。
import { T, box, room, panelX, panelY, panelZ, light, exit, wallWithHoles, doorWallAndCorridor } from '../levelkit.mjs';

const levels = [];
const solves = [];

/** 墙洞后面的小隔间（空间门的“门框”后面要有东西，免得斜着看到虚空） */
function alcoveZ(x0, x1, zWall, depth, h) {
  const z1 = zWall - T - depth;
  return [
    box(x0 - T, -T, z1 - T, x1 + T, 0, zWall - T, 'concrete'),
    box(x0 - T, h, z1 - T, x1 + T, h + T, zWall - T),
    box(x0 - T, 0, z1 - T, x0, h, zWall - T),
    box(x1, 0, z1 - T, x1 + T, h, zWall - T),
    box(x0, 0, z1 - T, x1, h, z1),
  ];
}

/** 墙洞后面的小隔间，墙面在 x = xWall（洞口朝 +x，隔间在墙的 -x 一侧） */
function alcoveX(z0, z1, xWall, depth, h) {
  const x1 = xWall - T - depth;
  return [
    box(x1 - T, -T, z0 - T, xWall - T, 0, z1 + T, 'concrete'),
    box(x1 - T, h, z0 - T, xWall - T, h + T, z1 + T),
    box(x1 - T, 0, z0 - T, xWall - T, h, z0),
    box(x1 - T, 0, z1, xWall - T, h, z1 + T),
    box(x1 - T, 0, z0, x1, h, z1),
  ];
}

// ---------------------------------------------------------------- 1 爱丽丝的门
// 拱门（2×3）连着储藏室墙角的老鼠洞（0.5×0.75），穿过去人会缩小到 1/4。
// 储藏室里的按钮小个子压不动，带进去的方块也会一起缩小；
// 要先缩小进去在储藏室墙上开门，再用普通大小把方块从传送门搬过去，最后缩小钻出口。
{
  const SX = 30; // 储藏室西墙
  levels.push({
    name: '爱丽丝的门',
    hint: '拱门后面是一个“很小”的地方。小个子压不动按钮，被你抱着一起缩小的方块也一样。',
    gun: 'both',
    spawn: { pos: [3, 0, 6], yaw: 20 },
    brushes: [
      // 大厅
      ...room([-8, 8], [0, 6], [-8, 8], {}, ['zn']),
      ...wallWithHoles('z', [-8.5, -8], [-8.5, 8.5], [0, 6], [[-5, -3, 0, 3]]),
      ...alcoveZ(-5, -3, -8, 1.2, 3),
      box(-5.4, 0, -7.9, -5, 3.4, -7.6, 'concrete'),
      box(-3, 0, -7.9, -2.6, 3.4, -7.6, 'concrete'),
      box(-5.4, 3, -7.9, -2.6, 3.4, -7.6, 'concrete'),
      panelX(8, -1, [-3, 3], [0, 3.5]),
      // 储藏室
      ...room([SX, 36], [0, 3], [-3, 3], {}, ['xn', 'xp']),
      ...wallWithHoles('x', [SX - T, SX], [-3.5, 3.5], [0, 3], [[-0.25, 0.25, 0, 0.75]]),
      box(SX - 1.5, -T, -1, SX - T, 1.25, 1),
      ...wallWithHoles('x', [36, 36 + T], [-3.5, 3.5], [0, 3], [[-0.35, 0.35, 0, 0.7]]),
      panelZ(-3, 1, [32.4, 35.6], [0, 2.6]),
      // 出口小通道
      box(36.5, -T, -0.85, 39.5, 0, 0.85, 'concrete'),
      box(36.5, 0.7, -0.85, 39.5, 1.2, 0.85),
      box(36.5, 0, -0.85, 39.5, 0.7, -0.35),
      box(36.5, 0, 0.35, 39.5, 0.7, 0.85),
      box(39.5, 0, -0.85, 40, 1.2, 0.85),
    ],
    entities: [
      { type: 'gateway', a: { pos: [-4, 1.5, -8], normal: [0, 0, 1] }, b: { pos: [SX, 0.375, 0], normal: [1, 0, 0] }, size: [2, 3], sizeB: [0.5, 0.75] },
      { type: 'cube', pos: [-5, 0.31, 3] },
      { type: 'button', id: 'b2', pos: [34, 0, -0.9] },
      { type: 'door', pos: [36.25, 0.35, 0], size: [0.2, 0.7, 0.7], requires: ['b2'] },
      exit(38.8, 0, 0, [0.9, 0.7, 0.6]),
      light(0, 5.85, 0, 40, { shadow: true }),
      light(-4, 5.85, -6, 18),
      light(33, 2.85, 0, 14, { shadow: true }),
      light(38, 0.6, 0, 1.2, { fixture: false, distance: 3 }),
    ],
  });
  solves.push(async ({ ev, shot }) => {
    await ev(() => window.__pt.fire('blue', [8, 1.2, 0]));
    await shot('c3l1-hall');
    // 走进拱门，缩小
    await ev(() => {
      const pt = window.__pt;
      pt.walkTo(-4, -6, 6, 0.2);
      pt.walkDir(0, 3, (g) => g.player.position.x > 20);
      pt.run(0.5);
    });
    await shot('c3l1-tiny');
    let s = await ev(() => window.__pt.state());
    if (Math.abs(s.scale - 0.25) > 0.02) throw new Error('没有缩小：' + s.scale);
    // 在储藏室墙上开橙门
    await ev(() => window.__pt.fire('orange', [34, 1.2, -3]));
    await shot('c3l1-storage');
    // 回大厅，变回原样
    await ev(() => {
      const pt = window.__pt;
      pt.walkTo(30.6, 0, 3, 0.1);
      pt.walkDir(90, 3, (g) => g.player.position.x < 10);
      pt.run(0.6);
    });
    s = await ev(() => window.__pt.state());
    if (Math.abs(s.scale - 1) > 0.02) throw new Error('没有变回来：' + s.scale);
    // 抱起方块，穿过蓝门进储藏室，放到按钮上
    await ev(() => {
      const pt = window.__pt;
      pt.walkTo(-3.6, 3, 6, 0.3);
      pt.use([-5, 0.3, 3]);
      window.__game.player.pitch = 0;
      pt.walkTo(6, 0, 6, 0.3);
      pt.walkDir(-90, 3, (g) => g.player.position.x > 20);
      pt.run(0.4);
      pt.face(34, -0.9);
      window.__game.player.pitch = -0.5;
      pt.run(1);
      pt.use();
      pt.run(1.5);
    });
    await shot('c3l1-placed');
    s = await ev(() => window.__pt.state());
    if (!s.signals.b2) throw new Error('方块没压住按钮：' + JSON.stringify(s.cubes));
    // 原路回大厅，再缩小钻出口
    await ev(() => {
      const pt = window.__pt;
      pt.walkDir(0, 3, (g) => g.player.position.x < 20);
      pt.run(0.5);
      pt.walkTo(-4, -6, 8, 0.2);
      pt.walkDir(0, 3, (g) => g.player.position.x > 20);
      pt.run(0.5);
    });
    await shot('c3l1-door');
    await ev(() => {
      const pt = window.__pt;
      pt.walkTo(35.5, 0, 6, 0.1);
      pt.walkTo(39, 0, 4, 0.1);
    });
  });
}

// ---------------------------------------------------------------- 2 千斤按钮
// 重型按钮在 2.4 米高的平台上。只有放大的方块才压得动它，但普通人搬不动大方块；
// 要抱着方块一起从大号白板钻出来，变成巨人跳上平台；出口的门洞巨人钻不过，最后还得变回来。
{
  const d = doorWallAndCorridor(10, [-10, 10], [0, 9], 1.5, 3, 6, ['hb']);
  levels.push({
    name: '千斤按钮',
    hint: '黄黑相间的重型按钮要很重的东西才压得动。暖色的大号白板上开出的门特别大——从那里出来的东西也一样。',
    gun: 'both',
    spawn: { pos: [3, 0, 7], yaw: 0 },
    brushes: [
      ...room([-10, 10], [0, 9], [-10, 10], {}, ['xp']),
      ...d.brushes,
      box(-10, 0, -10, 10, 2.4, -5, 'concrete'),
      box(-10, 2.4, -5.15, 10, 2.5, -5, 'metal'),
      panelX(-10, 1, [0, 6], [0, 3.5]),
      panelZ(10, -1, [-8.5, -2.5], [0, 5.8], 'whiteL'),
    ],
    entities: [
      { type: 'cube', pos: [-6, 0.31, 4] },
      { type: 'button', id: 'hb', pos: [0, 2.4, -7.5], heavy: true },
      ...d.entities,
      light(0, 8.85, 4, 55, { shadow: true }),
      light(0, 8.85, -6, 40, { shadow: true }),
      light(-6, 8.85, 6, 25),
    ],
  });
  solves.push(async ({ ev, shot }) => {
    await ev(() => window.__pt.fire('blue', [-10, 1.5, 3]));
    await ev(() => window.__pt.fire('orange', [-5.5, 2.8, 10]));
    await shot('c3l2-portals');
    // 抱起方块，一起钻进普通门，从大号门出来
    await ev(() => {
      const pt = window.__pt;
      pt.walkTo(-4.6, 4, 6, 0.3);
      pt.use([-6, 0.3, 4]);
      window.__game.player.pitch = 0;
      pt.walkTo(-7.5, 3, 6, 0.3);
      pt.walkDir(90, 3, (g) => g.player.scale > 2);
      pt.run(1);
    });
    let s = await ev(() => window.__pt.state());
    await shot('c3l2-giant');
    if (s.scale < 2 || !s.held || s.cubes[0][3] < 2) throw new Error('没有一起变大：' + JSON.stringify(s));
    // 巨人跳上平台，把大方块放到重型按钮上
    await ev(() => {
      const pt = window.__pt;
      pt.walkTo(0, -2.5, 6, 0.3);
      pt.face(0, -8);
      pt.run(0.1, { x: 0, y: 1 }, true);
      pt.run(1.2, { x: 0, y: 1 });
      pt.walkTo(0, -5.7, 3, 0.2);
    });
    await shot('c3l2-ledge');
    await ev(() => {
      const pt = window.__pt;
      pt.face(0, -7.5);
      window.__game.player.pitch = -0.95;
      pt.run(1);
      pt.use();
      pt.run(1.5);
    });
    s = await ev(() => window.__pt.state());
    if (!s.signals.hb) throw new Error('重型按钮没压下：' + JSON.stringify(s));
    await shot('c3l2-pressed');
    // 跳下平台，走进大号门变回原样，出门
    await ev(() => {
      const pt = window.__pt;
      window.__game.player.pitch = 0;
      pt.walkTo(-5.5, 6, 8, 0.4);
      pt.walkDir(180, 3, (g) => g.player.scale < 1.5);
      pt.run(0.6);
      pt.walkTo(9, 0, 8);
      pt.walkTo(15, 0, 6);
    });
  });
}

// ---------------------------------------------------------------- 3 巨人一跃
// 7 米宽的酸液坑，普通人跳不过去；变成巨人能跳过去，可对岸的门洞巨人钻不进。
// 对岸能开门的地方都藏着：大号白板躲在隔墙后面，普通白板只能从门洞里看到。
{
  levels.push({
    name: '巨人一跃',
    hint: '巨人跑得快、跳得远，可是普通大小的门和门洞都钻不进去。到了对岸，换个角度看看。',
    gun: 'both',
    spawn: { pos: [3, 0, 10], yaw: 0 },
    killY: -6,
    brushes: [
      // 大厅外壳（近岸地面 y=0，对岸地面 y=1，中间是坑）
      box(-7.5, 11, -20.5, 7.5, 11.5, 14.5),
      box(-7.5, -3.5, -20.5, -7, 11, 14.5),
      box(-7.5, -3.5, 14, 7.5, 11, 14.5),
      box(-7.5, -3.5, -20.5, 7.5, 11, -20),
      ...wallWithHoles('x', [7, 7.5], [-20.5, 14.5], [-3.5, 11], [[-17, -15, 1, 3.6]]),
      box(-7, -0.5, 0, 7, 0, 14, 'concrete'),
      box(-7, -3.5, -7, 7, -3, 0, 'concrete'),
      box(-7, -3, -0.3, 7, 0, 0, 'metal'),
      box(-7, -3, -7, 7, 1, -6.7, 'metal'),
      box(-7, 0.5, -20, 7, 1, -6.7, 'concrete'),
      // 对岸的隔墙（挡住大号白板）
      box(-7, 1, -10.5, -1, 11, -10),
      // 出口侧室
      box(7.5, 0.5, -20.5, 15.5, 1, -11.5, 'concrete'),
      box(7.5, 4.5, -20.5, 15.5, 5, -11.5),
      box(7.5, 1, -20.5, 15.5, 4.5, -20),
      box(7.5, 1, -12, 15.5, 4.5, -11.5),
      box(15, 1, -20, 15.5, 4.5, -12),
      // 面板
      panelX(-7, 1, [6, 10], [0, 3.5]),
      panelZ(14, -1, [-3, 3], [0, 5.8], 'whiteL'),
      panelX(-7, 1, [-19.5, -12.5], [1, 7], 'whiteL'),
      panelX(15, -1, [-18, -14], [1, 4.3]),
    ],
    entities: [
      { type: 'hazard', pos: [0, -2.2, -3.5], size: [14, 1.6, 7] },
      exit(12.5, 1, -13.6, [2.2, 2.5, 2.2]),
      light(0, 10.85, 8, 50, { shadow: true }),
      light(0, 10.85, -3, 35),
      light(1, 10.85, -15, 50, { shadow: true }),
      light(-5, 10.85, -16, 25),
      light(11, 4.35, -16, 14, { shadow: true }),
    ],
  });
  solves.push(async ({ ev, shot }) => {
    await ev(() => window.__pt.fire('blue', [-7, 1.5, 8]));
    await ev(() => window.__pt.fire('orange', [0, 2.8, 14]));
    // 变成巨人
    await ev(() => {
      const pt = window.__pt;
      pt.walkTo(-5.5, 8, 6, 0.3);
      pt.walkDir(90, 3, (g) => g.player.scale > 2);
      pt.run(0.8);
    });
    await shot('c3l3-giant');
    // 助跑起跳
    await ev(() => {
      const pt = window.__pt;
      pt.walkTo(0, 11, 4, 0.3);
      pt.walkDir(0, 4, (g) => g.player.position.z < 1.4);
      pt.run(0.1, { x: 0, y: 1 }, true);
      pt.run(1.6, { x: 0, y: 1 });
      pt.run(0.5);
    });
    let s = await ev(() => window.__pt.state());
    await shot('c3l3-landed');
    if (s.pos[2] > -7 || s.state !== 'playing') throw new Error('没跳过去：' + JSON.stringify(s));
    // 透过门洞在侧室墙上开蓝门，在隔墙后面的大号白板上开橙门
    await ev(() => {
      const pt = window.__pt;
      pt.walkTo(2, -16, 6, 0.3);
      pt.fire('blue', [15, 1.4, -16]);
      pt.walkTo(-1, -15, 4, 0.3);
      pt.fire('orange', [-7, 3.6, -16]);
    });
    await shot('c3l3-portals');
    await ev(() => {
      const pt = window.__pt;
      pt.walkTo(-4, -16, 4, 0.3);
      pt.walkDir(90, 3, (g) => g.player.scale < 1.5);
      pt.run(0.6);
      pt.walkTo(12.5, -13.6, 6);
    });
  });
}

// ---------------------------------------------------------------- 4 微缩工坊
// 按钮在一间只有通风管能进的工坊里。通风管只容得下缩小后的人，普通方块塞不进，小个子也搬不动它；
// 要抱着方块一起缩小钻进去，再在工坊里把方块“隔着传送门”放大压到按钮上，自己原路钻回来；
// 出口门后有个台阶，小个子爬不上去，还得变回原样。
{
  const d = doorWallAndCorridor(9, [-6, 10], [0, 7], 1.5, 3, 6, ['b1']);
  levels.push({
    name: '微缩工坊',
    hint: '通风管只有小个子钻得过去。淡蓝色小号白板开出的门很小，穿过它的东西都会跟着变小——反过来走也一样。',
    gun: 'both',
    spawn: { pos: [0, 0, 8], yaw: 0 },
    brushes: [
      ...room([-9, 9], [0, 7], [-6, 10], {}, ['xp', 'zn']),
      ...d.brushes,
      ...wallWithHoles('z', [-6.5, -6], [-9.5, 9.5], [0, 7], [[4.75, 5.25, 0, 1]]),
      box(9.5 + 1.2, 0, -1.5, 9.5 + 6 - T, 0.8, 1.5, 'concrete'),
      panelX(-9, 1, [2, 7], [0, 3.5]),
      panelX(9, -1, [3, 5], [0, 1.6], 'whiteS'),
      // 通风管（L 形，0.5 宽 1 高）
      box(2.5, -T, -9.75, 5.75, 0, -6.5, 'concrete'),
      box(2.5, 1, -9.75, 5.75, 1.5, -6.5),
      box(2.5, 0, -8.75, 4.75, 1, -6.5),
      box(5.25, 0, -9.75, 5.75, 1, -6.5),
      box(2.5, 0, -9.75, 5.75, 1, -9.25),
      // 工坊
      ...room([-6, 2], [0, 4], [-15, -7], {}, ['xp']),
      ...wallWithHoles('x', [2, 2.5], [-15.5, -6.5], [0, 4], [[-9.25, -8.75, 0, 1]]),
      panelY(4, -1, [-3.3, -0.7], [-12.3, -9.7]),
      panelX(2, -1, [-13.5, -11], [0, 1.6], 'whiteS'),
      box(-6, 0, -15, -4.5, 1.2, -13.5, 'metal'),
      box(-6, 0, -8.5, -5, 2, -7, 'metal'),
    ],
    entities: [
      { type: 'cube', pos: [-4, 0.31, 5] },
      { type: 'button', id: 'b1', pos: [-2, 0, -11] },
      ...d.entities.map((e) => (e.type === 'exit' ? { ...e, pos: [e.pos[0], e.pos[1] + 0.8, e.pos[2]] } : e)),
      light(0, 6.85, 4, 45, { shadow: true }),
      light(0, 6.85, -3, 25),
      light(-2, 3.85, -11, 20, { shadow: true }),
      light(4, 0.9, -8, 1.5, { fixture: false, distance: 4 }),
    ],
  });
  solves.push(async ({ ev, shot }) => {
    await ev(() => window.__pt.fire('blue', [-9, 1.5, 4.5]));
    await ev(() => window.__pt.fire('orange', [9, 0.6, 4]));
    // 抱着方块一起缩小
    await ev(() => {
      const pt = window.__pt;
      pt.walkTo(-2.6, 5, 6, 0.3);
      pt.use([-4, 0.3, 5]);
      window.__game.player.pitch = 0;
      pt.walkTo(-6.5, 4.5, 6, 0.3);
      pt.walkDir(90, 3, (g) => g.player.scale < 0.6);
      pt.run(0.8);
    });
    let s = await ev(() => window.__pt.state());
    await shot('c3l4-tiny');
    if (s.scale > 0.5 || !s.held || s.cubes[0][3] > 0.5) throw new Error('没有一起缩小：' + JSON.stringify(s));
    // 钻通风管
    await ev(() => {
      const pt = window.__pt;
      pt.walkTo(5, -4.5, 8, 0.15);
      pt.walkTo(5, -9, 6, 0.1);
      pt.walkTo(1.2, -9, 6, 0.15);
    });
    s = await ev(() => window.__pt.state());
    await shot('c3l4-workshop');
    if (s.pos[0] > 1.6 || !s.held) throw new Error('没钻进工坊：' + JSON.stringify(s));
    // 小号白板开蓝门，按钮上方天花板开橙门；把方块推进蓝门（自己不进去），方块变大掉到按钮上
    await ev(() => {
      const pt = window.__pt;
      pt.use(); // 先放下方块才能开枪
      pt.run(0.5);
      pt.fire('blue', [2, 0.6, -12.2]);
      pt.fire('orange', [-2, 4, -11]);
      const c = window.__game.cubes[0].position;
      pt.walkTo(c.x - 0.7, c.z - 0.3, 4, 0.1);
      pt.use([c.x, c.y, c.z]);
    });
    await ev(() => {
      const pt = window.__pt;
      const g = window.__game;
      g.player.pitch = 0;
      pt.walkTo(0.9, -12.2, 4, 0.1);
      pt.face(2.5, -12.2);
      g.player.pitch = -0.3;
      pt.walkDir(-90, 2, (gg) => gg.cubes[0].scale > 0.9);
      pt.run(0.3);
      pt.use();
      pt.run(2);
    });
    s = await ev(() => window.__pt.state());
    await shot('c3l4-pressed');
    if (!s.signals.b1) throw new Error('按钮没压下：' + JSON.stringify(s));
    // 原路钻回大厅，变回原样，爬上台阶出门
    await ev(() => {
      const pt = window.__pt;
      pt.walkTo(1.2, -9, 6, 0.15);
      pt.walkTo(5, -9, 6, 0.1);
      pt.walkTo(5, -5, 6, 0.15);
      pt.walkTo(7.5, 4, 6, 0.2);
      pt.fire('blue', [9, 0.6, 4]);
      pt.fire('orange', [-9, 1.5, 4.5]);
      pt.walkDir(-90, 3, (g) => g.player.scale > 0.9);
      pt.run(0.6);
      pt.walkTo(9, 0, 8, 0.3);
      pt.walkTo(10.1, 0, 3, 0.2);
      pt.face(14, 0);
      pt.run(0.1, { x: 0, y: 1 }, true);
      pt.run(0.6, { x: 0, y: 1 });
      pt.walkTo(14, 0, 6);
    });
  });
}

// ---------------------------------------------------------------- 5 套娃尺度
// 大厅里有一座小木屋模型，屋门只有 0.6 米高，连着远处一间正常大小的房间（比例约 1:5）。
// 缩小一次（0.45）还钻不进屋门，得连缩两次（0.2）；进去后在屋里变回正常大小，从高架上取到方块；
// 抱着方块出屋门，两个都缩到 0.2；再连放大两次（小号→大号 ×4.9，普通→大号 ×2.2）变成巨人，
// 把巨型方块压到重型按钮上；巨人钻不过出口门洞，最后从大号门回到普通门变回原样。
{
  const d = doorWallAndCorridor(9, [-7, 9], [0, 8], 1.5, 3, 6, ['hb']);
  const RX = 30; // 屋内房间的西墙
  levels.push({
    name: '套娃尺度',
    hint: '小屋的门只有很小很小的人才进得去，缩小一次还不够。重型按钮要一块很大的方块，而只有巨人才搬得动它。',
    gun: 'both',
    spawn: { pos: [4, 0, 7.5], yaw: 15 },
    brushes: [
      // 大厅
      ...room([-9, 9], [0, 8], [-7, 9], {}, ['xp']),
      ...d.brushes,
      panelX(-9, 1, [-1, 4], [0, 3.5]),
      panelX(9, -1, [5, 7], [0, 1.6], 'whiteS'),
      panelZ(-7, 1, [-8, -2], [0, 5.8], 'whiteL'),
      // 小屋模型
      ...wallWithHoles('z', [4.6, 5], [-3, 1], [0, 1.5], [[-1.225, -0.775, 0, 0.6]], 'concrete'),
      box(-3, 0, 3, 1, 1.5, 4.6, 'concrete'),
      box(-3.15, 1.5, 2.85, 1.15, 1.62, 5.15, 'metal'),
      box(-2.6, 1.62, 3.3, 0.6, 2.1, 4.7, 'metal'),
      // 屋里的房间
      ...room([RX, 40], [0, 6], [-6, 6], {}, ['xn']),
      ...wallWithHoles('x', [RX - T, RX], [-6.5, 6.5], [0, 6], [[-1.1, 1.1, 0, 2.96]]),
      ...alcoveX(-1.1, 1.1, RX, 1.2, 3),
      box(RX, 0, -6, RX + 4, 3.2, -3, 'concrete'),
      box(RX + 3.9, 3.2, -6, RX + 4, 3.5, -3, 'metal'),
      panelX(RX, 1, [-5.8, -3.2], [3.2, 5.9]),
      panelX(RX, 1, [2.3, 5.7], [0, 3.5]),
      // 屋里的家具（和外面小屋的屋顶一样的配色，提示这是“屋里”）
      box(36, 0, 2, 39, 0.9, 5, 'concrete'),
      box(35.8, 0.9, 1.8, 39.2, 1.02, 5.2, 'metal'),
      box(38.5, 0, -5.5, 39.8, 2.2, -2.5, 'metal'),
    ],
    entities: [
      { type: 'gateway', a: { pos: [RX, 1.48, 0], normal: [1, 0, 0] }, b: { pos: [-1, 0.3, 5], normal: [0, 0, 1] }, size: [2.2, 2.96], sizeB: [0.45, 0.6] },
      { type: 'cube', pos: [RX + 2.3, 3.51, -4.5] },
      { type: 'button', id: 'hb', pos: [5, 0, -3], heavy: true },
      ...d.entities,
      light(0, 7.85, 4, 45, { shadow: true }),
      light(0, 7.85, -3, 35, { shadow: true }),
      light(-1, 0.75, 5.6, 1, { fixture: false, distance: 2.5, color: 0xffd9a0 }),
      light(35, 5.85, 0, 35, { shadow: true, color: 0xffe2b8 }),
      light(32, 5.85, -4.5, 12, { color: 0xffe2b8 }),
    ],
  });
  solves.push(async ({ ev, shot }) => {
    await shot('c3l5-hall');
    await ev(() => window.__pt.walkTo(3, 1, 4));
    await ev(() => window.__pt.fire('blue', [-9, 1.5, 1.5]));
    await ev(() => window.__pt.fire('orange', [9, 0.6, 6]));
    // 连缩两次：1 → 0.45 → 0.2
    await ev(() => {
      const pt = window.__pt;
      pt.walkTo(-7.5, 1.5, 6, 0.3);
      pt.walkDir(90, 3, (g) => g.player.scale < 0.6);
      pt.run(0.5);
      pt.walkTo(-8, 1.5, 12, 0.2);
      pt.walkDir(90, 3, (g) => g.player.scale < 0.3);
      pt.run(0.5);
    });
    let s = await ev(() => window.__pt.state());
    if (Math.abs(s.scale - 0.2025) > 0.01) throw new Error('没有缩到 0.2：' + s.scale);
    // 钻进小屋
    await ev(() => {
      const pt = window.__pt;
      pt.walkTo(-1, 6.2, 12, 0.1);
      pt.walkDir(0, 4, (g) => g.player.position.x > 20);
      pt.run(0.5);
    });
    s = await ev(() => window.__pt.state());
    await shot('c3l5-house');
    if (s.pos[0] < 20 || Math.abs(s.scale - 1) > 0.02) throw new Error('没进小屋：' + JSON.stringify(s));
    // 屋里：上高架取方块
    await ev(() => {
      const pt = window.__pt;
      pt.walkTo(37, 0, 6, 0.3);
      pt.fire('blue', [30, 1.5, 4]);
      pt.fire('orange', [30, 4.5, -4.5]);
      pt.walkTo(31.8, 4, 6, 0.3);
      pt.walkDir(90, 3, (g) => g.player.position.y > 3);
      pt.run(0.6);
      pt.use([32.3, 3.5, -4.5]);
      window.__game.player.pitch = 0;
      pt.walkTo(36, -1, 6, 0.3);
      pt.run(0.5);
    });
    s = await ev(() => window.__pt.state());
    if (!s.held) throw new Error('没拿到方块：' + JSON.stringify(s));
    // 抱着方块出屋门：一起缩到 0.2
    await ev(() => {
      const pt = window.__pt;
      pt.walkTo(32.5, 0, 6, 0.2);
      pt.walkDir(90, 3, (g) => g.player.position.x < 20);
      pt.run(0.6);
    });
    s = await ev(() => window.__pt.state());
    await shot('c3l5-out');
    if (!s.held || s.cubes[0][3] > 0.3) throw new Error('方块没一起出来：' + JSON.stringify(s));
    // 第一次放大：小号门 → 大号门（×4.9）
    await ev(() => {
      const pt = window.__pt;
      pt.use();
      pt.run(0.4);
      pt.walkTo(-4.5, 6.5, 6, 0.2);
      pt.fire('blue', [9, 0.6, 6]);
      pt.fire('orange', [-5, 2.8, -7]);
      const c = window.__game.cubes[0].position;
      pt.walkTo(c.x, c.z + 0.4, 6, 0.05);
      pt.use([c.x, c.y, c.z]);
      window.__game.player.pitch = 0;
      pt.walkTo(7.8, 6, 12, 0.15);
      pt.walkDir(-90, 3, (g) => g.player.scale > 0.8);
      pt.run(0.6);
    });
    s = await ev(() => window.__pt.state());
    if (!s.held || Math.abs(s.scale - 0.99) > 0.03 || Math.abs(s.cubes[0][3] - 0.99) > 0.03) throw new Error('第一次放大不对：' + JSON.stringify(s));
    // 第二次放大：普通门 → 大号门（×2.2）
    await ev(() => {
      const pt = window.__pt;
      pt.use();
      pt.run(0.4);
      pt.fire('blue', [-9, 1.5, 1.5]);
      const c = window.__game.cubes[0].position;
      pt.walkTo(c.x, c.z + 1.4, 3, 0.1);
      pt.use([c.x, c.y, c.z]);
      window.__game.player.pitch = 0;
      pt.walkTo(-7, 1.5, 8, 0.3);
      pt.walkDir(90, 3, (g) => g.player.scale > 2);
      pt.run(0.8);
    });
    s = await ev(() => window.__pt.state());
    await shot('c3l5-giant');
    if (!s.held || s.scale < 2 || s.cubes[0][3] < 2) throw new Error('第二次放大不对：' + JSON.stringify(s));
    // 巨型方块压重型按钮
    await ev(() => {
      const pt = window.__pt;
      pt.walkTo(5, -0.8, 6, 0.2);
      pt.face(5, -3);
      window.__game.player.pitch = -0.95;
      pt.run(1);
      pt.use();
      pt.run(1.5);
    });
    s = await ev(() => window.__pt.state());
    if (!s.signals.hb) throw new Error('重型按钮没压下：' + JSON.stringify(s));
    // 巨人走进大号门，从普通门出来变回原样
    await ev(() => {
      const pt = window.__pt;
      window.__game.player.pitch = 0;
      pt.walkTo(-5, -3, 6, 0.3);
      pt.walkDir(0, 3, (g) => g.player.scale < 1.5);
      pt.run(0.6);
      pt.walkTo(9, 0, 8, 0.3);
      pt.walkTo(14, 0, 6);
    });
  });
}

export default levels.map((def, i) => ({ def, solve: solves[i] }));
