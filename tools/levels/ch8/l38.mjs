// 38 尺度环：一间没有传送枪的房间，东墙的大门和西墙脚下的小窗其实是同一个洞的两头。
import { box, room, wallWithHoles, light, exit } from '../../levelkit.mjs';
import { glow, orb, rug, plant, frameX } from './deco.mjs';

const WARM = 0xffe2b0;

const brushes = [
  // 房间本体（东西两面墙自己砌，带 1.2 米深的壁龛，门洞后面不会露出虚空）
  ...room([-8, 8], [0, 4], [-5, 5], {}, ['xp', 'xn', 'zn', 'floor']),
  box(-9.7, -0.5, -5.5, 9.7, 0, 5.5, 'concrete'),
  ...wallWithHoles('x', [8, 9.2], [-5.5, 5.5], [0, 4.5], [[-3.5, -0.5, 0, 3]]),
  box(9.2, 0, -5.5, 9.7, 4.5, 5.5, 'concrete'),
  ...wallWithHoles('x', [-9.2, -8], [-5.5, 5.5], [0, 4.5], [[1.4, 2.6, 0, 1.2]]),
  box(-9.7, 0, -5.5, -9.2, 4.5, 5.5, 'concrete'),
  // 北墙：老鼠洞（0.8 宽 0.9 高），洞口上方留着墙，门往上缩进去
  ...wallWithHoles('z', [-5.5, -5], [-8.5, 8.5], [0, 4], [[-2.4, -1.6, 0, 0.9]]),
  // 老鼠洞里的小走廊和小房间
  box(-2.6, -0.5, -9.9, -1.4, 0, -5.5, 'concrete'),
  box(-2.9, 0, -9.9, -2.6, 1.3, -5.5),
  box(-1.4, 0, -9.9, -1.1, 1.3, -5.5),
  box(-2.9, 1.0, -9.9, -1.1, 1.3, -5.5),
  box(-2.9, 0, -9.9, -1.1, 1.3, -9.6),
  // ---- 装饰
  rug(0, 0.6, 13.6, 3.2, 0xd9c79a),
  glow(-6.8, 0.012, -1.02, 6.8, 0.03, -0.98, 0xffd36b, 1.0),
  glow(-6.8, 0.012, 2.18, 6.8, 0.03, 2.22, 0xffd36b, 1.0),
  ...frameX(8, -1, [-3.5, -0.5], [0, 3]),
  ...frameX(-8, 1, [1.4, 2.6], [0, 1.2]),
  // 门楣上的小灯饰，把大门和小窗系在一起
  orb(7.94, 3.35, -2, 0.22),
  orb(-7.94, 1.55, 2, 0.16),
  glow(-8.5, 2.62, -4.96, 8.5, 2.7, -4.92, 0xffd36b, 0.8),
  orb(-2, 1.25, -5.0, 0.12, 0xffc870, 2.4),
  ...plant(7.1, 4.2, 1),
  ...plant(7.1, -4.3, 1.1),
  ...plant(-7.1, -4.2, 1.2),
  ...plant(-7.1, 4.2, 0.9),
  // 吊灯
  ...[-4.5, 0, 4.5].flatMap((x) => [glow(x - 0.01, 3.3, -0.01, x + 0.01, 4, 0.01, 0xffe2b0, 0.4), orb(x, 3.25, 0.6, 0.34, WARM, 1.8)]),
  // 小房间里的光和一小块金色地毯
  rug(-2, -7.9, 0.8, 2.4, 0xe0b85a, 0, 'concrete', 0.015),
];

const entities = [
  light(0, 3.6, 0, 46, { color: 0xfff3dc, shadow: true }),
  light(-6, 3.4, -3, 22, { color: 0xfff0d0 }),
  light(6, 3.4, 3.2, 22, { color: 0xfff0d0 }),
  light(-2, 0.8, -7.2, 3, { color: 0xffc870, distance: 5 }),
  { type: 'gateway', a: { pos: [8, 1.5, -2], normal: [-1, 0, 0], up: [0, 1, 0] }, b: { pos: [-8, 0.6, 2], normal: [1, 0, 0], up: [0, 1, 0] }, size: [3, 3], sizeB: [1.2, 1.2] },
  { type: 'button', id: 'hb', pos: [5.8, 0, -2], heavy: true },
  { type: 'cube', pos: [-6.3, 0.31, 3.0] },
  { type: 'door', pos: [-2, 0.5, -5.25], size: [1.0, 1.0, 0.3], requires: ['hb'] },
  exit(-2, 0, -8.2, [0.7, 0.9, 1.0]),
];

export default {
  def: {
    name: '尺度环',
    hint: '先走进那扇大门看看。再想想：同一个洞，换个方向，对人和对方块是不是一回事？',
    gun: 'none',
    killY: -20,
    look: { hemi: 0.6, exposure: 0.98, bloom: 0.3 },
    spawn: { pos: [0, 0, 3], yaw: 0 },
    brushes,
    entities,
  },
  solve: async ({ ev, shot }) => {
    await shot('c8-38-start');
    // 1. 试一试：走进东墙大门 -> 从西窗出来，变成 0.4 倍；再走进西窗 -> 回到大门口，恢复原样
    await ev(() => {
      const pt = window.__pt;
      const g = window.__game;
      pt.walkTo(5.4, 0.8, 8, 0.3);
      pt.walkTo(7, -2, 4, 0.2);
      pt.walkDir(-90, 3, (gg) => gg.player.scale < 0.5 || gg.state !== 'playing');
      pt.run(0.4);
      if (g.player.scale > 0.45) throw new Error('走进大门没有变小：' + g.player.scale);
      pt.walkTo(-6.5, 2, 6, 0.2);
      pt.walkDir(90, 3, (gg) => gg.player.scale > 0.9 || gg.state !== 'playing');
      pt.run(0.4);
      if (g.player.scale < 0.95) throw new Error('走进小窗没有变回来：' + g.player.scale);
    });
    await shot('c8-38-back');
    // 2. 把方块端到窗前，顺着窗口推过去：它在东边会变成 2.5 倍
    await ev(() => {
      const pt = window.__pt;
      const g = window.__game;
      pt.walkTo(-4.6, 3.0, 12, 0.2);
      pt.face(-6.3, 3.0);
      g.player.pitch = -0.3;
      pt.run(0.2);
      if (!pt.use([-6.3, 0.4, 3.0])) throw new Error('没拿到方块');
      pt.walkTo(-4.2, 2.0, 5, 0.15);
      g.player.yaw = Math.PI / 2;
      g.player.pitch = -0.75;
      pt.run(0.2);
      for (let i = 0; i < 160 && g.player.position.x > -6.9; i++) g.debugRun(1 / 60, { x: 0, y: 1 });
      for (let q = 0; q < 8; q++) { pt.run(0.1); pt.log.push('q' + q + ' ' + g.cubes[0].position.toArray().map((v) => +v.toFixed(2)) + ' ' + g.player.pitch.toFixed(2)); }
      const k = g.cubes[0];
      pt.log.push('scale ' + g.player.scale + ' held K ' + k.position.toArray().map((v) => +v.toFixed(2)) + ' P ' + g.player.position.toArray().map((v) => +v.toFixed(2)));
      if (!g.player.held || k.scale < 2) throw new Error('方块没有变大：' + k.scale + ' ' + g.player.held);
    });
    await shot('c8-38-giant');
    await ev(() => {
      const pt = window.__pt;
      pt.use();
      pt.run(3);
    });
    const s1 = await ev(() => window.__pt.state());
    if (!s1.signals.hb) throw new Error('重型按钮没压上：' + JSON.stringify(s1));
    // 3. 绕过巨大的方块，再走进东墙大门，从西窗出来变成 0.4 倍，钻进老鼠洞
    await ev(() => {
      const pt = window.__pt;
      const g = window.__game;
      const kp = () => g.cubes[0].position.toArray().map((v) => +v.toFixed(2));
      pt.log?.push('K0 ' + kp());
      pt.walkTo(-4, 2.6, 8, 0.4);
      pt.log?.push('K1 ' + kp());
      pt.walkTo(3, 3, 8, 0.4);
      pt.log?.push('K2 ' + kp() + ' p ' + g.player.position.toArray().map((v) => +v.toFixed(1)));
      pt.walkTo(6.6, 0.6, 5, 0.3);
      pt.log?.push('K3 ' + kp());
      pt.walkTo(7.2, -1.0, 4, 0.15);
      pt.walkDir(-90, 3, (gg) => gg.player.scale < 0.5 || gg.state !== 'playing');
      pt.run(0.4);
      if (g.player.scale > 0.45) throw new Error('第二次走进大门没有变小：' + g.player.scale);
      pt.walkTo(-3.0, 2.4, 8, 0.2);
      pt.walkTo(-2, -4.2, 10, 0.12);
      pt.walkDir(0, 8, (gg) => gg.state !== 'playing');
    });
  },
};
