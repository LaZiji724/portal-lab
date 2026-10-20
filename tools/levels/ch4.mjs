// 第 4 章：光与力（激光、折射方块、光桥、弹射板、凝胶）。每关后面跟着它的自动通关脚本。
import { T, box, room, panelX, panelY, panelZ, light, exit, wallWithHoles } from '../levelkit.mjs';

/**
 * 墙外的出口走廊：axis 是墙的法线轴（'x' 或 'z'），w0 是墙外表面坐标，sign 是走廊延伸方向，
 * c 是门洞中心（另一条水平轴上的坐标），y0 是地面高度。门实体放在 doorAt（墙厚中心）。
 */
function corridor(axis, w0, sign, c, y0, { hw = 1.2, h = 3, len = 6, requires = [], doorAt } = {}) {
  const w1 = w0 + sign * len;
  const [lo, hi] = [Math.min(w0, w1), Math.max(w0, w1)];
  const B = (a0, b0, c0, a1, b1, c1, mat) => (axis === 'x' ? box(a0, b0, c0, a1, b1, c1, mat) : box(c0, b0, a0, c1, b1, a1, mat));
  const brushes = [
    B(lo, y0 - T, c - hw - T, hi, y0, c + hw + T, 'concrete'),
    B(lo, y0 + h, c - hw - T, hi, y0 + h + T, c + hw + T),
    B(lo, y0, c - hw - T, hi, y0 + h, c - hw),
    B(lo, y0, c + hw, hi, y0 + h, c + hw + T),
    sign > 0 ? B(hi - T, y0, c - hw, hi, y0 + h, c + hw) : B(lo, y0, c - hw, lo + T, y0 + h, c + hw),
  ];
  const P = (a, b, cc) => (axis === 'x' ? [a, b, cc] : [cc, b, a]);
  const exitAt = w1 - sign * 1.6;
  const entities = [
    exit(...P(exitAt, y0, c), axis === 'x' ? [2, 2.5, hw * 2 - 0.4] : [hw * 2 - 0.4, 2.5, 2]),
    light(...P((w0 + w1) / 2, y0 + h - 0.15, c), 6),
  ];
  if (doorAt !== undefined) {
    entities.push({ type: 'door', pos: P(doorAt, y0 + h / 2, c), size: axis === 'x' ? [0.3, h, hw * 2] : [hw * 2, h, 0.3], requires });
  }
  return { brushes, entities };
}

/** 刚好放得下一扇门的白板（门的位置被固定在面板中央），贴在 x 墙或 z 墙上 */
const slotX = (x, dir, zc, yc) => panelX(x, dir, [zc - 0.65, zc + 0.65], [yc - 1.15, yc + 1.15]);
const slotZ = (z, dir, xc, yc) => panelZ(z, dir, [xc - 0.65, xc + 0.65], [yc - 1.15, yc + 1.15]);

const levels = [];
const solves = [];

// ---------------------------------------------------------------- 1 折光
// 激光把房间一分为二，折射方块在光墙另一边。先用传送门绕过光墙拿方块，
// 再把方块摆上底座、朝向接收器，最后用传送门把激光引过来。注意别把自己关在光里。
{
  const ex = corridor('x', 8.5, 1, -4, 0, { hw: 1, requires: ['c1'], doorAt: 8.25 });
  levels.push({
    name: '折光',
    hint: '激光很烫，人过不去，但传送门可以绕过它。折射方块会把射进来的光，转向它正面朝着的方向。',
    gun: 'both',
    spawn: { pos: [-2, 0, -3], yaw: 180 },
    brushes: [
      ...room([-8, 8], [0, 6], [-8, 8], {}, ['xp']),
      ...wallWithHoles('x', [8, 8.5], [-8, 8], [0, 6], [[-5, -3, 0, 3]]),
      ...ex.brushes,
      slotX(8, -1, 4, 1.15), // 激光正好打在这块白板上
      panelY(0, 1, [-3, 0], [5, 7.5]), // 光墙南边地上的白板
      slotX(-8, 1, -0.5, 1.15), // 西墙北段的白板
      box(4.5, 0, -1, 5.5, 1, 0, 'metal'), // 方块底座
    ],
    entities: [
      { type: 'laser', pos: [-7.7, 1.3, 4], dir: [1, 0, 0] },
      { type: 'catcher', id: 'c1', pos: [5, 1.3, -7.75], normal: [0, 0, 1] },
      { type: 'cube', kind: 'prism', pos: [-5, 0.31, 6.5] },
      ...ex.entities,
      light(-3, 5.85, 6, 30, { shadow: true }),
      light(-2, 5.85, -3, 35, { shadow: true }),
      light(5, 5.85, -4, 25),
    ],
  });
  solves.push(async ({ ev, shot }) => {
    await shot('c4-1-start');
    // 光墙挡路：橙门开在身边的西墙上，蓝门开在光墙另一边的地上，钻过去
    await ev(() => window.__pt.fire('orange', [-8, 1.15, -0.5]));
    await ev(() => window.__pt.fire('blue', [-1.5, 0, 6.3]));
    await ev(() => {
      const pt = window.__pt;
      const g = window.__game;
      pt.walkTo(-6.4, -0.5, 6, 0.15);
      pt.walkDir(90, 2, () => g.player.position.z > 4.5);
      // 从地上的门弹出来时往旁边挪一步，免得又掉回门里
      for (let i = 0; i < 90; i++) {
        pt.face(-3.3, 6.5);
        g.debugRun(1 / 60, { x: 0, y: 1 });
      }
      pt.run(0.5);
    });
    await shot('c4-1-south');
    // 拿起折射方块
    await ev(() => {
      const pt = window.__pt;
      pt.walkTo(-3.3, 6.5, 6, 0.15);
      pt.face(-5, 6.5);
      window.__game.player.pitch = -0.6;
    });
    const held = await ev(() => window.__pt.use([-5, 0.31, 6.5]));
    if (!held) throw new Error('没拿到方块');
    // 先把方块丢进地上的门（它会从西墙的门滑出来），自己再跳进去
    await ev(() => {
      const pt = window.__pt;
      const g = window.__game;
      pt.walkTo(-1.5, 8.2, 6, 0.15);
      pt.face(-1.5, 0);
      g.player.pitch = -0.75;
      pt.run(0.8);
      pt.use();
      pt.run(1.5);
      g.player.pitch = 0;
      pt.walkDir(0, 3, () => g.player.position.z < 2);
      pt.run(1);
    });
    const p1 = await ev(() => window.__pt.state());
    if (p1.pos[2] > 2 || p1.cubes[0][2] > 2) throw new Error('没带着方块回来：' + JSON.stringify(p1));
    await ev(() => {
      const pt = window.__pt;
      const c = window.__game.cubes[0].position;
      pt.walkTo(c.x + 1.5, c.z, 6, 0.2);
      pt.face(c.x, c.z);
      window.__game.player.pitch = -0.6;
      pt.use([c.x, c.y, c.z]);
    });
    // 放到底座上，正面朝北（朝着接收器）
    await ev(() => {
      const pt = window.__pt;
      const g = window.__game;
      pt.walkTo(5, 1.2, 8, 0.12);
      pt.face(5, -6);
      g.player.pitch = -0.12;
      pt.run(0.8);
      pt.use();
      pt.run(1.2);
    });
    const cube = await ev(() => window.__game.cubes[0].position.toArray());
    if (cube[1] < 1.1) throw new Error('方块没放上底座：' + cube.map((v) => v.toFixed(2)));
    // 蓝门开到激光打中的白板上：光从西墙的橙门射出，打中方块，折向接收器
    await ev(() => window.__pt.fire('blue', [8, 1.15, 4]));
    await ev(() => window.__pt.run(0.6));
    await shot('c4-1-lit');
    const st = await ev(() => window.__pt.state());
    if (!st.signals.c1) throw new Error('接收器没亮');
    await ev(() => {
      const pt = window.__pt;
      pt.walkTo(6.9, 0.5, 4, 0.3);
      pt.walkTo(6.9, -4, 4, 0.3);
      pt.walkTo(14, -4, 6);
    });
  });
}

// ---------------------------------------------------------------- 2 双光束
// 门要两个接收器同时亮。第二台激光器（中继）只有在第一个接收器亮起后才通电。
// 只有一个折射方块和一对传送门：一束光要靠方块转弯，另一束只能靠传送门。
// 两束光会在房间里拉出两道“光墙”，点亮之前要想好自己站在哪儿。
{
  const ex = corridor('z', -9.5, -1, -6.5, 0, { hw: 1, requires: ['c1', 'c2'], doorAt: -9.25 });
  levels.push({
    name: '双光束',
    hint: '左下那台激光器要等第一个接收器亮了才会通电。一个方块、两扇门，各管一束光。先想清楚，最后你该站在哪儿。',
    gun: 'both',
    spawn: { pos: [0, 0, 2], yaw: 0 },
    brushes: [
      ...room([-9, 9], [0, 7], [-9, 9], {}, ['zn']),
      ...wallWithHoles('z', [-9.5, -9], [-9.5, 9.5], [0, 7], [[-7.5, -5.5, 0, 3]]),
      ...ex.brushes,
      slotX(9, -1, 6, 1.35), // 激光 A 打在这里
      slotZ(9, -1, -4, 1.35), // 南墙西段
      slotZ(-9, 1, 5, 1.35), // 北墙东段
      box(4.5, 0, -4.5, 5.5, 1, -3.5, 'metal'), // 底座
    ],
    entities: [
      { type: 'laser', pos: [-8.7, 1.3, 6], dir: [1, 0, 0] },
      { type: 'laser', pos: [-8.7, 1.3, -4], dir: [1, 0, 0], when: ['c1'] },
      { type: 'catcher', id: 'c1', pos: [-4, 1.3, -8.75], normal: [0, 0, 1] },
      { type: 'catcher', id: 'c2', pos: [5, 1.3, 8.75], normal: [0, 0, -1] },
      { type: 'cube', kind: 'prism', pos: [0, 0.31, -6.5] },
      ...ex.entities,
      light(-4, 6.85, -4, 35, { shadow: true }),
      light(4, 6.85, 4, 35, { shadow: true }),
      light(4, 6.85, -5, 20),
      light(-5, 6.85, 5, 20),
    ],
  });
  solves.push(async ({ ev, shot }) => {
    await shot('c4-2-start');
    // 第二台激光器还没通电：先把方块放到它前方的底座上，朝南对准第二个接收器
    await ev(() => {
      const pt = window.__pt;
      pt.walkTo(0, -4.9, 6, 0.15);
      pt.face(0, -6.5);
      window.__game.player.pitch = -0.6;
    });
    if (!(await ev(() => window.__pt.use([0, 0.31, -6.5])))) throw new Error('没拿到方块');
    await ev(() => {
      const pt = window.__pt;
      const g = window.__game;
      pt.walkTo(5, -5.7, 8, 0.12);
      pt.face(5, 6);
      g.player.pitch = -0.12;
      pt.run(0.8);
      pt.use();
      pt.run(1.2);
    });
    const cube = await ev(() => window.__game.cubes[0].position.toArray());
    if (cube[1] < 1.1) throw new Error('方块没放上底座：' + cube.map((v) => v.toFixed(2)));
    // 站到西北角，再用传送门把激光 A 引到第一个接收器
    await ev(() => window.__pt.walkTo(-6.5, -6.5, 8, 0.2));
    await ev(() => window.__pt.fire('blue', [9, 1.35, 6]));
    await ev(() => window.__pt.fire('orange', [-4, 1.35, 9]));
    await ev(() => window.__pt.run(0.8));
    await shot('c4-2-lit');
    const st = await ev(() => window.__pt.state());
    if (!st.signals.c1 || !st.signals.c2) throw new Error('接收器没全亮：' + JSON.stringify(st.signals));
    await ev(() => {
      const pt = window.__pt;
      pt.walkTo(-6.5, -9, 4, 0.3);
      pt.walkTo(-6.5, -15, 6);
    });
  });
}

// ---------------------------------------------------------------- 3 光之桥
// 光桥贴着地面射进东墙。把它从南墙高处引出来，就是通往对岸高台的桥，而且可以沿着桥走进传送门。
// 但北墙脚有一台激光器贴着桥面射过来，桥一接通，激光也顺着同一对门钻下来、贴着低处的桥面扫过。
// 要先把方块放进光路挡住它，再躲到方块后面把它端起来，一路举在脚前走过去，最后方块压按钮。
{
  const ex = corridor('z', -16.5, -1, -4, 6, { hw: 1, requires: ['b1'], doorAt: -16.25 });
  levels.push({
    name: '光之桥',
    hint: '光桥是实心的，钻进哪扇门，你也能跟着走进去。激光也会跟着钻。方块放进光路就能挡住它，端着方块走，它就一直挡在你前面。',
    gun: 'both',
    spawn: { pos: [3, 0, 8.5], yaw: 0 },
    brushes: [
      ...room([-8, 8], [-8, 10], [-16, 10], {}, ['zn']),
      ...wallWithHoles('z', [-16.5, -16], [-8.5, 8.5], [-8, 10], [[-5, -3, 6, 9]]),
      ...ex.brushes,
      box(-8, -8, 4, 8, 0, 10, 'concrete'), // 南边平台
      box(-8, -8, -16, 8, 6, -11, 'concrete'), // 北边高台
      slotX(8, -1, 6, 1.15), // 光桥打中的白板
      slotZ(10, -1, 0, 7.15), // 南墙高处的白板
    ],
    entities: [
      { type: 'bridge', pos: [-7.7, 0.15, 6], dir: [1, 0, 0] },
      { type: 'laser', pos: [0, 6.42, -15.7], dir: [0, 0, 1] },
      { type: 'hazard', pos: [0, -7.5, -3.5], size: [16, 1, 15] },
      { type: 'cube', pos: [-5, 0.31, 8.2] },
      { type: 'button', id: 'b1', pos: [-6, 6, -12.6] },
      ...ex.entities,
      light(0, 9.85, 7, 45, { shadow: true }),
      light(0, 9.85, -3, 35),
      light(0, 9.85, -13, 40, { shadow: true }),
      light(0, -6, -3.5, 12, { color: 0x7dff6a, fixture: false, distance: 14 }),
    ],
  });
  solves.push(async ({ ev, shot }) => {
    await shot('c4-3-start');
    await ev(() => window.__pt.fire('blue', [8, 1.15, 6]));
    await ev(() => window.__pt.fire('orange', [0, 7.15, 10]));
    await ev(() => window.__pt.run(0.3));
    await shot('c4-3-bridge');
    // 拿上方块，放到低处桥面上的光路里
    await ev(() => {
      const pt = window.__pt;
      pt.walkTo(-3.4, 8.2, 6, 0.15);
      pt.face(-5, 8.2);
      window.__game.player.pitch = -0.6;
    });
    if (!(await ev(() => window.__pt.use([-5, 0.31, 8.2])))) throw new Error('没拿到方块');
    await ev(() => {
      const pt = window.__pt;
      const g = window.__game;
      pt.walkTo(2, 7.4, 6, 0.12);
      pt.face(2, 5);
      g.player.pitch = -0.75;
      pt.run(0.8);
      pt.use();
      pt.run(1);
    });
    await shot('c4-3-blocked');
    // 绕到方块后面（西边），面朝东把它端起来
    await ev(() => {
      const pt = window.__pt;
      const g = window.__game;
      pt.walkTo(0, 7.3, 4, 0.15);
      pt.walkTo(0, 6, 4, 0.1);
      const c = g.cubes[0].position;
      pt.face(c.x, c.z);
      g.player.pitch = -0.75;
      pt.use();
      pt.run(0.4);
    });
    const p0 = await ev(() => window.__pt.state());
    if (!p0.held) throw new Error('没端起方块：' + JSON.stringify(p0));
    // 端着方块沿桥走进东墙的门，从南墙高处出来，再一路走到高台
    await ev(() => {
      const pt = window.__pt;
      const g = window.__game;
      pt.walkDir(-90, 6, () => g.player.position.y > 5);
      pt.run(0.2);
    });
    const p1 = await ev(() => window.__pt.state());
    if (p1.pos[1] < 6.5 || !p1.held) throw new Error('没上到高处的桥：' + JSON.stringify(p1));
    await shot('c4-3-high');
    await ev(() => window.__pt.walkTo(0, -11.8, 8, 0.15));
    await shot('c4-3-ledge');
    await ev(() => {
      const pt = window.__pt;
      const g = window.__game;
      pt.walkTo(-4.3, -12.6, 4, 0.12);
      pt.face(-6, -12.6);
      g.player.pitch = -0.6;
      pt.run(0.6);
      pt.use();
      pt.run(1.2);
    });
    const st = await ev(() => window.__pt.state());
    if (!st.signals.b1) throw new Error('按钮没压下：' + JSON.stringify(st));
    await ev(() => {
      const pt = window.__pt;
      pt.walkTo(-4, -15, 4, 0.3);
      pt.walkTo(-4, -21, 6);
    });
  });
}

// ---------------------------------------------------------------- 4 弹射轨道
// 弹射板会把人或方块抛向酸液池上方那块悬空的墙，直接撞上去就掉进池里。
// 在落点开一扇门，抛出去的东西就会从另一扇门出来：方块要从天花板落进高柱顶上的按钮槽里，
// 人要从天花板落到对岸。只有一对门，所以要先送方块，再送自己。
{
  const ex = corridor('z', -22.5, -1, 0, 0, { hw: 1, requires: ['b1'], doorAt: -22.25 });
  const cup = [
    box(3.9, 0, 4.9, 6.1, 6, 7.1, 'metal'), // 高柱
    box(3.9, 6, 4.9, 6.1, 6.5, 5.1),
    box(3.9, 6, 6.9, 6.1, 6.5, 7.1),
    box(3.9, 6, 5.1, 4.1, 6.5, 6.9),
    box(5.9, 6, 5.1, 6.1, 6.5, 6.9),
  ];
  levels.push({
    name: '弹射轨道',
    hint: '弹射板会把站在上面的东西，抛向箭头所指的那面悬空的墙。落点上正好有一块白板。门的另一头开在哪里，东西就从哪里出来。',
    gun: 'both',
    spawn: { pos: [-4, 0, 8.6], yaw: 0 },
    brushes: [
      ...room([-8, 8], [-6, 12], [-22, 10], {}, ['zn']),
      ...wallWithHoles('z', [-22.5, -22], [-8.5, 8.5], [-6, 12], [[-1, 1, 0, 3]]),
      ...ex.brushes,
      box(-8, -6, 2, 8, 0, 10, 'concrete'), // 南边平台
      box(-8, -6, -22, 8, 0, -14, 'concrete'), // 北边平台
      box(-0.8, 4.4, -11.5, 0.8, 12, -11, 'metal'), // 悬空的墙
      slotZ(-11, 1, 0, 5.65), // 落点白板
      ...cup,
      panelY(12, -1, [4.35, 5.65], [4.8, 7.2]), // 高柱正上方的天花板白板
      panelY(12, -1, [-1.5, 1.5], [-19.5, -16.5]), // 对岸天花板白板
    ],
    entities: [
      { type: 'launcher', pos: [0, 0, 5], target: [0, 4.9, -11], time: 1.0 },
      { type: 'hazard', pos: [0, -5.5, -6], size: [16, 1, 16] },
      { type: 'cube', pos: [-4, 0.31, 6.8] },
      { type: 'button', id: 'b1', pos: [5, 6, 6] },
      ...ex.entities,
      light(-2, 11.85, 6, 50, { shadow: true }),
      light(0, 11.85, -6, 40),
      light(0, 11.85, -18, 45, { shadow: true }),
      light(5, 9, 6, 10, { fixture: false, distance: 8 }),
      light(0, -4, -6, 14, { color: 0x7dff6a, fixture: false, distance: 16 }),
    ],
  });
  solves.push(async ({ ev, shot }) => {
    await ev(() => window.__pt.run(0.5));
    await shot('c4-4-start');
    await ev(() => window.__pt.fire('blue', [0, 5.65, -11]));
    await ev(() => window.__pt.fire('orange', [5, 12, 6]));
    await ev(() => {
      const pt = window.__pt;
      pt.face(-4, 6.8);
      window.__game.player.pitch = -0.7;
    });
    if (!(await ev(() => window.__pt.use([-4, 0.31, 6.8])))) throw new Error('没拿到方块');
    // 把方块丢到弹射板上
    await ev(() => {
      const pt = window.__pt;
      const g = window.__game;
      pt.walkTo(0, 6.9, 6, 0.12);
      pt.face(0, 0);
      g.player.pitch = -0.7;
      pt.run(0.6);
      pt.use();
      pt.run(0.5);
    });
    await shot('c4-4-cubefly');
    await ev(() => window.__pt.run(2.5));
    const st = await ev(() => window.__pt.state());
    if (!st.signals.b1) throw new Error('方块没落到按钮上：' + JSON.stringify(st.cubes));
    await shot('c4-4-cup');
    // 橙门改开到对岸的天花板上，自己站上弹射板
    await ev(() => {
      const pt = window.__pt;
      pt.walkTo(-6, 8, 6, 0.2);
      pt.fire('orange', [0, 12, -18]);
    });
    const ok = await ev(() => window.__game.portals.get('orange').position.z < -15);
    if (!ok) throw new Error('橙门没开到对岸');
    await ev(() => {
      const pt = window.__pt;
      const g = window.__game;
      // 走上弹射板，一被弹起来就松开按键
      for (let k = 0; k < 400 && !g.player.launched; k++) {
        pt.face(0, 5);
        g.debugRun(1 / 60, { x: 0, y: 1 });
      }
      pt.run(0.6);
    });
    await shot('c4-4-fly');
    await ev(() => window.__pt.run(3));
    const p2 = await ev(() => window.__pt.state());
    if (p2.pos[2] > -14) throw new Error('没飞到对岸：' + JSON.stringify(p2.pos));
    await ev(() => window.__pt.walkTo(0, -27, 8));
  });
}

// ---------------------------------------------------------------- 5 凝胶跑酷
// 三段：① 推进凝胶跑道冲进东墙的门，从南墙高处飞出去，越过酸液池；
// ② 竖井里只有弹跳凝胶，掉多高就弹多高——从地上的门掉进去、从天花板的门掉下来，借这一摔弹上 9 米高台；
// ③ 踩着往返的平台过最后一段酸液。
{
  const shaftNorth = wallWithHoles('z', [-40.5, -40], [-5.5, 5.5], [0, 18], [[-1.5, 1.5, 9, 12]]);
  levels.push({
    name: '凝胶跑酷',
    hint: '蓝色推进凝胶让你越跑越快，速度穿过传送门不会丢。橙色弹跳凝胶会把你弹回掉下来的高度。',
    gun: 'both',
    spawn: { pos: [-20, 0, 2], yaw: -90 },
    brushes: [
      // ① 大厅（地面在酸液池底 -6）
      ...room([-8, 8], [-6, 14], [-26, 4], {}, ['xn', 'zn']),
      box(-8.5, -6, -26.5, -8, 14, 0), // 西墙（北段）
      box(-8.5, 6, 0, -8, 14, 4.5), // 西墙（跑道入口上方）
      box(-8.5, -6, 0, -8, 0, 4.5),
      ...wallWithHoles('z', [-26.5, -26], [-8.5, 8.5], [-6, 14], [[-1.5, 1.5, 0, 3]]),
      box(-8, -6, 0, 8, 0, 4, 'concrete'), // 近岸
      box(-8, -6, -26, 8, 0, -12, 'concrete'), // 对岸
      // 跑道走廊
      ...room([-22, -8], [0, 6], [0, 4], {}, ['xp']),
      box(-21.6, 0, 0.6, 8, 0.03, 3.4, 'speed'),
      slotX(8, -1, 2, 1.15), // 跑道尽头
      slotZ(4, -1, 0, 9.15), // 南墙高处
      // ② 竖井
      ...room([-5, 5], [0, 18], [-40, -26.5], {}, ['zp', 'zn']),
      ...shaftNorth,
      box(-5.5, 14, -26.5, 5.5, 18.5, -26),
      box(-5, 0, -40, 5, 9, -36, 'concrete'), // 高台
      box(-2, 0, -36, 2, 0.05, -32.4, 'bounce'),
      panelY(0, 1, [-4.6, -3.2], [-31.5, -29]),
      panelY(18, -1, [-1.3, 1.3], [-35.6, -33]),
      // ③ 往返平台
      ...room([-3, 3], [3, 15], [-60, -40.5], {}, ['zp']),
      box(-3.5, 12, -40.5, 3.5, 15.5, -40),
      box(-3, 3, -44, 3, 9, -40.5, 'concrete'),
      box(-3, 3, -60, 3, 9, -56, 'concrete'),
    ],
    entities: [
      { type: 'hazard', pos: [0, -5.5, -6], size: [16, 1, 12] },
      { type: 'hazard', pos: [0, 3.5, -50], size: [6, 1, 12] },
      { type: 'platform', pos: [0, 8.8, -45.6], to: [0, 8.8, -54.4], size: [2.8, 0.4, 2.8], period: 8 },
      exit(0, 9, -58.2, [2.4, 2.5, 2.4]),
      light(-15, 5.85, 2, 25, { shadow: true }),
      light(0, 13.85, 0, 45, { shadow: true }),
      light(0, 13.85, -18, 45, { shadow: true }),
      light(0, -4, -6, 14, { color: 0x7dff6a, fixture: false, distance: 16 }),
      light(0, 17.85, -31, 40, { shadow: true }),
      light(0, 14.85, -50, 30, { shadow: true }),
      light(0, 6, -50, 8, { color: 0x7dff6a, fixture: false, distance: 10 }),
    ],
  });
  solves.push(async ({ ev, shot }) => {
    await ev(() => window.__pt.run(0.5));
    await shot('c4-5-start');
    await ev(() => window.__pt.fire('blue', [8, 1.15, 2]));
    await ev(() => {
      const pt = window.__pt;
      pt.walkTo(-2, 1, 8, 0.3);
      pt.fire('orange', [0, 9.15, 4]);
      pt.walkTo(-20.5, 2, 10, 0.3);
    });
    // ① 沿着推进凝胶一路冲刺
    await ev(() => {
      const pt = window.__pt;
      const g = window.__game;
      pt.walkDir(-90, 8, () => g.player.position.y > 4);
      for (let i = 0; i < 240 && !g.player.grounded; i++) g.debugRun(1 / 60);
      pt.run(0.5);
    });
    const p1 = await ev(() => window.__pt.state());
    if (p1.pos[2] > -12.5 || p1.state !== 'playing') throw new Error('没飞过酸液池：' + JSON.stringify(p1));
    await shot('c4-5-landed');
    // ② 进竖井，地上和天花板各开一扇门
    await ev(() => {
      const pt = window.__pt;
      pt.walkTo(0, -24, 8, 0.3);
      pt.walkTo(1.5, -29, 4, 0.3);
      pt.fire('blue', [-3.9, 0, -30.25]);
      pt.fire('orange', [0, 18, -34.3]);
    });
    await shot('c4-5-shaft');
    await ev(() => {
      const pt = window.__pt;
      const g = window.__game;
      pt.walkTo(-3.9, -27.6, 4, 0.15);
      pt.walkDir(180, 3, () => g.player.position.y > 10);
      // 掉下来、弹起来的途中一直往北飘
      for (let i = 0; i < 400; i++) {
        g.player.yaw = 0;
        g.debugRun(1 / 60, { x: 0, y: 1 });
        if (g.player.grounded && g.player.position.y > 9.5) break;
      }
      pt.run(0.3);
    });
    const p2 = await ev(() => window.__pt.state());
    if (p2.pos[1] < 9.5) throw new Error('没弹上高台：' + JSON.stringify(p2));
    await shot('c4-5-ledge');
    // ③ 等平台靠岸再踩上去
    await ev(() => {
      const pt = window.__pt;
      const g = window.__game;
      pt.walkTo(0, -43, 4, 0.2);
      const pl = g.platforms[0];
      for (let i = 0; i < 900 && !(pl.u < 0.01 && pl.delta.lengthSq() < 1e-8); i++) g.debugRun(1 / 60);
      pt.walkTo(0, -45.6, 2, 0.2);
      for (let i = 0; i < 900 && pl.u < 0.999; i++) g.debugRun(1 / 60);
      pt.walkTo(0, -58, 4);
    });
  });
}

export default levels.map((def, i) => ({ def, solve: solves[i] }));
