// 42 小人国：终章。大厅大得不合常理——不是大厅变大了，是你变小了。
// 东墙的小门 b 和西墙的大门 a 是同一对空间门（高度比 2:1）：从小门进、大门出，你长大一倍；反过来缩小一半。
import { box, room, wallWithHoles, light, exit } from '../../levelkit.mjs';
import { glow, orb, plant, frameX, slab } from './deco.mjs';

const CYAN = 0x66e0ff;
const WARM = 0xfff0d6;

// 一支躺在地上的铅笔（对小人是一根十几米长的巨木）
const pencil = (x, z, len = 1.6, yawDeg = 0) => {
  const rot = [0, yawDeg, 90];
  const c = Math.cos((yawDeg * Math.PI) / 180);
  const s = Math.sin((yawDeg * Math.PI) / 180);
  const at = (t, y) => [x + c * t, y, z - s * t];
  const cyl = (t, l, d, color, mat = 'concrete') => ({ pos: at(t, 0.045), size: [d, l, d], mat, shape: 'cyl', color, rot, deco: true });
  return [
    cyl(0, len, 0.09, 0xf2c230),
    cyl(-len / 2 - 0.05, 0.1, 0.09, 0xd98a96),
    cyl(-len / 2 + 0.07, 0.06, 0.092, 0xb8bcc4, 'plate'),
    cyl(len / 2 + 0.04, 0.08, 0.05, 0x3a3a3a),
  ];
};

const brushes = [
  // ---- 大厅：9 x 10 米，4.5 米高（对 0.25 倍的人来说是 36 x 40 米的庞然大物）
  ...room([-4.5, 4.5], [0, 4.5], [-5, 5], {}, ['xn', 'xp', 'zn', 'floor']),
  box(-6, -0.5, -5.5, 6, 0, 5.5, 'concrete'),
  // 西墙：大门 a（2 x 3）；东墙：小门 b（1 x 1.5）。门洞后都留 1 米深的壁龛
  ...wallWithHoles('x', [-5.5, -4.5], [-5.5, 5.5], [0, 4.5], [[1.5, 3.5, 0, 3]]),
  box(-6, 0, -5.5, -5.5, 4.5, 5.5, 'concrete'),
  ...wallWithHoles('x', [4.5, 5.5], [-5.5, 5.5], [0, 4.5], [[-3, -2, 0, 1.5]]),
  box(5.5, 0, -5.5, 6, 4.5, 5.5, 'concrete'),
  // 北墙：踢脚线高度的老鼠洞（0.7 米高），洞口上方留着墙，门往上缩进去
  ...wallWithHoles('z', [-5.5, -5], [-5.5, 5.5], [0, 4.5], [[2.5, 3.5, 0, 0.7]]),
  // ---- 老鼠洞：一条 4 米长、0.75 米高的小走廊，通到一间暖暖的小屋
  box(2.5, -0.5, -10, 3.5, 0, -5.5, 'concrete'),
  box(2.4, 0, -10, 2.5, 0.75, -5.5),
  box(3.5, 0, -10, 3.6, 0.75, -5.5),
  box(2.4, 0.75, -10, 3.6, 1.0, -5.5),
  ...room([1.0, 5.0], [0, 1.0], [-13, -10], {}, ['zp']),
  box(0.5, 0, -10, 2.5, 1.0, -9.5),
  box(3.5, 0, -10, 5.5, 1.0, -9.5),
  // ---- 装饰：门框的青色光、地上的东西（铅笔、硬币、书）、墙上的东西（画框、开关、插座）
  ...frameX(-4.5, 1, [1.5, 3.5], [0, 3], CYAN, 0.12, 1.5, 0.06),
  ...frameX(4.5, -1, [-3, -2], [0, 1.5], CYAN, 0.12, 1.5, 0.06),
  ...pencil(-0.8, 3.7, 1.7, 8),
  { pos: [1.9, 0.011, -1.6], size: [0.34, 0.02, 0.34], mat: 'plate', shape: 'cyl', color: 0xe0b84a, deco: true },
  { pos: [1.9, 0.0125, -1.6], size: [0.26, 0.02, 0.26], mat: 'plate', shape: 'cyl', color: 0xf0d27a, deco: true },
  slab(-4.1, 0, -4.8, -3.3, 0.12, -4.2, 0x6a8fb8),
  slab(-4.05, 0.12, -4.75, -3.25, 0.24, -4.15, 0xb85a4a),
  slab(-4.0, 0.24, -4.7, -3.3, 0.34, -4.2, 0x7aa86a),
  // 北墙上的画框和开关、南墙上的插座
  glow(-3.0, 1.9, -4.97, -1.2, 2.0, -4.93, 0xffd36b, 0.9),
  glow(-3.0, 3.0, -4.97, -1.2, 3.1, -4.93, 0xffd36b, 0.9),
  glow(-3.0, 1.9, -4.97, -2.9, 3.1, -4.93, 0xffd36b, 0.9),
  glow(-1.3, 1.9, -4.97, -1.2, 3.1, -4.93, 0xffd36b, 0.9),
  slab(-2.9, 2.0, -4.98, -1.3, 3.0, -4.95, 0xbfd4e8),
  slab(-0.7, 1.1, -4.98, -0.4, 1.5, -4.95, 0xf4efe2),
  slab(-0.58, 1.28, -4.95, -0.52, 1.4, -4.92, 0xd9d2c0),
  slab(-1.2, 0.3, 4.95, -0.9, 0.62, 4.98, 0xf4efe2),
  slab(-1.12, 0.36, 4.94, -1.08, 0.44, 4.95, 0x303030),
  slab(-1.02, 0.36, 4.94, -0.98, 0.44, 4.95, 0x303030),
  ...plant(-3.9, 4.0, 1.3),
  ...plant(4.0, 4.2, 1.0),
  // 吊灯：对小人来说是高高在上的太阳
  orb(0, 4.15, 0, 0.5, WARM, 1.8),
  glow(-0.01, 4.15, -0.01, 0.01, 4.5, 0.01, WARM, 0.4),
  // 小屋里的软地毯和暖光
  slab(2.6, 0, -12.6, 4.6, 0.015, -10.2, 0xe6c88a, 'concrete'),
  orb(1.4, 0.8, -12.3, 0.12, 0xffc870, 2.2),
  orb(4.6, 0.8, -12.3, 0.12, 0xffc870, 2.2),
  glow(2.55, 0.62, -9.9, 3.45, 0.66, -9.8, 0xffd36b, 1.2),
];

const entities = [
  { type: 'gateway', a: { pos: [-4.5, 1.5, 2.5], normal: [1, 0, 0] }, b: { pos: [4.5, 0.75, -2.5], normal: [-1, 0, 0] }, size: [2, 3], sizeB: [1, 1.5], frame: true, color: CYAN },
  { type: 'cube', pos: [0.5, 0.31, 0] },
  { type: 'button', id: 'p', pos: [-2.0, 0, -2.5] },
  { type: 'door', pos: [3.0, 0.35, -5.25], size: [1.0, 0.7, 0.3], requires: ['p'] },
  exit(3.0, 0, -11.6, [1.4, 0.7, 1.6]),
  light(0, 3.9, 0, 40, { color: WARM, shadow: true }),
  light(-3, 3.2, 3, 16, { color: 0xffe6c0, distance: 14 }),
  light(3, 0.7, -7.5, 2.5, { color: 0xffd9a0, distance: 5 }),
  light(3, 0.8, -11.5, 3.5, { color: 0xffc870, distance: 5 }),
];

export default {
  def: {
    name: '小人国',
    hint: '你有没有想过，是房间太大了，还是你太小了？那两扇发光的门，值得都走一遍。',
    gun: 'none',
    killY: -20,
    look: { hemi: 0.6, exposure: 1.0, bloom: 0.34 },
    fog: { color: 0xe6dcc6, near: 7, far: 70 },
    spawn: { pos: [3.5, 0, 3.5], yaw: 90, scale: 0.25 },
    brushes,
    entities,
  },
  solve: async ({ ev, shot }) => {
    await shot('c8-42-start');
    // 1. 走进东墙的小门 b：从西墙大门出来变成 0.5 倍；再走一遍，变回 1.0（大厅其实只是一间普通的屋子）
    await ev(() => {
      const pt = window.__pt;
      const g = window.__game;
      pt.walkTo(3.9, -2.5, 8, 0.2);
      pt.walkDir(-90, 3, (gg) => gg.player.scale > 0.4 || gg.state !== 'playing');
      pt.run(0.3);
      if (Math.abs(g.player.scale - 0.5) > 0.02) throw new Error('第一次穿过 b 应该是 0.5：' + g.player.scale);
    });
    await shot('c8-42-half');
    await ev(() => {
      const pt = window.__pt;
      const g = window.__game;
      pt.walkTo(3.9, -2.5, 12, 0.25);
      pt.walkDir(-90, 3, (gg) => gg.player.scale > 0.9 || gg.state !== 'playing');
      pt.run(0.4);
      if (Math.abs(g.player.scale - 1) > 0.02) throw new Error('第二次穿过 b 应该是 1.0：' + g.player.scale);
    });
    await shot('c8-42-reveal');
    // 2. 恢复原样后搬得动方块了：端到踏板上，老鼠洞的门开了
    await ev(() => {
      const pt = window.__pt;
      const g = window.__game;
      pt.walkTo(0.5, 1.0, 8, 0.25);
      if (!pt.use([0.5, 0.4, 0])) throw new Error('恢复原样后还是搬不动方块');
      pt.drop(-2.0, -2.5, 8);
      if (!g.signals.get('p')) throw new Error('踏板没压下：' + g.cubes[0].position.toArray());
    });
    // 3. 反方向穿过大门 a 两次：1.0 -> 0.5 -> 0.25，才钻得进老鼠洞
    await ev(() => {
      const pt = window.__pt;
      const g = window.__game;
      pt.walkTo(-3.8, 2.5, 8, 0.2);
      pt.walkDir(90, 3, (gg) => gg.player.scale < 0.6 || gg.state !== 'playing');
      pt.run(0.3);
      if (Math.abs(g.player.scale - 0.5) > 0.02) throw new Error('穿过 a 应该是 0.5：' + g.player.scale);
      pt.walkTo(-3.8, 2.5, 12, 0.25);
      pt.walkDir(90, 3, (gg) => gg.player.scale < 0.3 || gg.state !== 'playing');
      pt.run(0.3);
      if (Math.abs(g.player.scale - 0.25) > 0.02) throw new Error('再穿过 a 应该是 0.25：' + g.player.scale);
    });
    await shot('c8-42-tiny-again');
    await ev(() => {
      const pt = window.__pt;
      pt.walkTo(3.0, -4.4, 12, 0.2);
      pt.walkDir(0, 8, (gg) => gg.state !== 'playing');
    });
  },
};
