// 40 连环锁：三扇门、三个接收器、三束激光首尾相咬。一点火花点亮整圈，圈自己就能撑住；出口却要它全灭。
import { box, room, wallWithHoles, light, exit } from '../../levelkit.mjs';
import { glow, orb, plant, frameX, frameZ } from './deco.mjs';

const AMBER = 0xffb347;

// 地面上一个首尾相咬的金环（衔尾蛇）：外圈发光，内圈盖回去
const ring = (cx, cz, d, w, color, y = 0) => [
  { pos: [cx, y + 0.008, cz], size: [d, 0.016, d], mat: 'glow', shape: 'cyl', color, intensity: 1.1, deco: true },
  { pos: [cx, y + 0.012, cz], size: [d - w * 2, 0.02, d - w * 2], mat: 'plate', shape: 'cyl', color: 0xd9cdb0, deco: true },
];

const brushes = [
  // ---- 环形大厅：南半部是玩家的区域，三扇门把北半部的接收器室隔开
  ...room([-10, 10], [0, 5], [-10, 6], {}, ['xn']),
  // 西墙：通往另一间屋子的门洞（门 DG）+ 一扇看得见那间屋子的玻璃窗
  ...wallWithHoles('x', [-10.5, -10], [-10.5, 6.5], [0, 5.5], [[-3, 0, 0, 3], [2, 5, 0.8, 3]]),
  box(-10.3, 0.8, 2, -10.2, 3, 5, 'glass'),
  // 隔墙 z=-3：三个 2x3 的门洞
  ...wallWithHoles('z', [-3.25, -2.75], [-10, 10], [0, 5], [[-7, -5, 0, 3], [-1, 1, 0, 3], [5, 7, 0, 3]]),
  // 另一间屋子：踏板 q、踏板 z，北墙出口门 X，门后的走廊
  ...room([-24, -10.5], [0, 5], [-10, 6], {}, ['xp', 'zn']),
  ...wallWithHoles('z', [-10.5, -10], [-24.5, -10], [0, 5], [[-19, -17, 0, 3]]),
  ...room([-19.5, -16.5], [0, 3.5], [-16.5, -10.5], {}, ['zp']),
  // ---- 装饰：地面金环、门框
  ...ring(0, 1.6, 7.4, 0.14, 0xffd36b),
  ...ring(0, 1.6, 3.6, 0.1, 0xffd36b),
  ...[-6, 0, 6].flatMap((x) => frameZ(-2.75, 1, [x - 1, x + 1], [0, 3], 0xffd36b, 0.1, 1.2, 0.05)),
  ...frameX(-10, 1, [-3, 0], [0, 3], 0xffb347, 0.1, 1.2, 0.05),
  ...frameX(-10, 1, [2, 5], [0.8, 3], 0xffd36b, 0.1, 1.0, 0.05),
  ...frameZ(-10, 1, [-19, -17], [0, 3], 0xffb347, 0.1, 1.2, 0.05).map((b) => b),
  ...plant(9.0, 5.0, 1.2),
  ...plant(-9.2, -2.2, 0.0),
  ...plant(9.0, -2.2, 1.0),
  ...plant(-23.0, 5.0, 1.2),
  ...plant(-11.4, -9.0, 1.0),
  // 接收器室里的发光地带：看得出这里是“终点”
  glow(-10, 0.01, -9.6, 10, 0.03, -9.5, 0xff6a45, 0.6),
];

const entities = [
  // 三束激光
  { type: 'laser', pos: [-6, 1.3, 5.7], dir: [0, 0, -1] },
  { type: 'laser', pos: [0, 1.3, 5.7], dir: [0, 0, -1] },
  { type: 'laser', pos: [6, 1.3, 5.7], dir: [0, 0, -1] },
  // 火花：K 压在重型踏板 p 上时，从西墙射向东墙的辅助激光（抬到 3.4 米，跳起来也烧不到）
  { type: 'laser', pos: [-9.7, 3.4, 3], dir: [1, 0, 0], when: ['p'] },
  { type: 'catcher', id: 'c3', pos: [9.75, 3.4, 3], normal: [-1, 0, 0] },
  // 接收器：c1 在 D1 后面，c2 在 D2 后面，c3 在 D3 后面
  { type: 'catcher', id: 'c1', pos: [-6, 1.3, -9.75], normal: [0, 0, 1] },
  { type: 'catcher', id: 'c2', pos: [0, 1.3, -9.75], normal: [0, 0, 1] },
  { type: 'catcher', id: 'c3', pos: [6, 1.3, -9.75], normal: [0, 0, 1] },
  // 三扇门：D1 等 c3，D2 等 c1（并且踏板 z 没被踩），D3 等 c2
  { type: 'door', pos: [-6, 1.5, -3], size: [2, 3, 0.3], requires: ['c3'] },
  { type: 'door', pos: [0, 1.5, -3], size: [2, 3, 0.3], requires: ['c1', '!z'] },
  { type: 'door', pos: [6, 1.5, -3], size: [2, 3, 0.3], requires: ['c2'] },
  // 重型踏板 + 一块 1.55 倍的大方块（重量 3.7，比玩家重得多）
  { type: 'button', id: 'p', pos: [-8.5, 0, 1], heavy: true },
  { type: 'cube', pos: [-8.5, 0.48, 3.2], scale: 1.55 },
  // 去另一间屋子的门：环亮着才开
  { type: 'door', pos: [-10.25, 1.5, -1.5], size: [0.3, 3, 3], requires: ['c1'] },
  { type: 'button', id: 'q', pos: [-16, 0, -1.5] },
  { type: 'button', id: 'z', pos: [-14, 0, 3.5] },
  // 出口门：q 踩着，并且环必须是灭的
  { type: 'door', pos: [-18, 1.5, -10.25], size: [2, 3, 0.3], requires: ['q', '!c1'] },
  exit(-18, 0, -14.4, [2, 2.5, 2]),
  // 灯
  light(-5, 4.4, 1, 30, { color: 0xfff1da, shadow: true }),
  light(5, 4.4, 1, 26, { color: 0xfff1da }),
  light(0, 4.4, -6.5, 18, { color: 0xffb88a, distance: 14 }),
  light(-17, 4.4, -2, 32, { color: 0xffe0b0, shadow: true }),
  light(-18, 3.0, -14, 4, { color: 0xffd9a0, distance: 6 }),
];

export default {
  def: {
    name: '连环锁',
    hint: '三扇门各等着前一束光，像咬住自己尾巴的蛇。想想怎么把它点着，又怎么让它熄灭。',
    gun: 'none',
    killY: -20,
    look: { hemi: 0.55, exposure: 0.98, bloom: 0.34 },
    spawn: { pos: [-8.5, 0, 4.5], yaw: 0 },
    brushes,
    entities,
  },
  solve: async ({ ev, shot }) => {
    await shot('c8-40-start');
    // 1. 把大方块端到重型踏板上，等火花点着整圈
    await ev(() => {
      const pt = window.__pt;
      const g = window.__game;
      pt.walkTo(-8.5, 4.4, 4, 0.2);
      if (!pt.use([-8.5, 0.5, 3.2])) throw new Error('没拿到大方块');
      pt.drop(-8.5, 1, 8);
      pt.run(4.5);
      const s = window.__pt.state();
      if (!s.signals.p) throw new Error('重型踏板没压下：' + JSON.stringify(s.signals) + JSON.stringify(s.cubes));
    });
    await shot('c8-40-lit');
    const s1 = await ev(() => window.__pt.state());
    if (!(s1.signals.c1 && s1.signals.c2 && s1.signals.c3)) throw new Error('环没有点亮：' + JSON.stringify(s1.signals));
    // 2. 把方块拿走，环自己撑着；带着它走进西墙的门
    await ev(() => {
      const pt = window.__pt;
      const g = window.__game;
      pt.walkTo(-8.5, 2.6, 4, 0.2);
      const c = g.cubes[0].position.clone();
      g.debugAimAt([c.x, c.y, c.z]);
      if (!pt.use([c.x, c.y, c.z])) throw new Error('没能把方块从踏板上拿起来');
      pt.run(1.5);
    });
    await ev(() => {
      const pt = window.__pt;
      pt.walkTo(-8.6, -1.5, 8, 0.25);
      pt.run(1.0);
      const sg = window.__pt.state().signals;
      if (!(sg.c1 && sg.c2 && sg.c3) || sg.p) throw new Error('拿走方块后环熄了：' + JSON.stringify(sg));
      pt.walkDir(90, 3, (g) => g.player.position.x < -12.5 || g.state !== 'playing');
      pt.run(0.3);
    });
    await shot('c8-40-far');
    // 3. 方块放到 q 上，自己踩 z：环断开，出口门亮绿灯
    await ev(() => {
      const pt = window.__pt;
      pt.drop(-16, -1.5, 8);
      pt.run(0.6);
      const kk = () => window.__game.cubes[0].position.toArray().map((v) => +v.toFixed(2));
      pt.log.push('afterdrop K ' + kk() + ' P ' + window.__game.player.position.toArray().map((v) => +v.toFixed(2)));
      if (!window.__pt.state().signals.q) throw new Error('q 没压下');
      pt.walkTo(-14, 3.5, 8, 0.2);
      pt.log.push('atz K ' + kk());
      pt.run(2.5);
      pt.log.push('end K ' + kk());
    });
    const s3 = await ev(() => window.__pt.state());
    if (s3.signals.c1 || s3.signals.c2 || s3.signals.c3) throw new Error('环没有熄灭：' + JSON.stringify(s3.signals));
    await ev(() => {
      const pt = window.__pt;
      pt.walkTo(-13.5, -1.5, 8, 0.3);
      pt.walkTo(-13.5, -7, 8, 0.3);
      pt.walkTo(-18, -8, 8, 0.3);
      pt.log.push('atX ' + JSON.stringify(window.__pt.state().signals) + JSON.stringify(window.__pt.state().doors));
      pt.walkTo(-18, -14.4, 8, 0.3);
      pt.run(0.5);
    });
  },
};
