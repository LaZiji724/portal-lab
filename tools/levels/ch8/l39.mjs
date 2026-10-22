// 39 矮人之光：棱镜的光从方块正中心射出，缝只有两指高；而唯一能把东西变小的那对门，还要带你去对面。
import { box, room, wallWithHoles, panelX, panelZ, light, exit } from '../../levelkit.mjs';
import { glow, orb, rug, plant, frameZ, WALLS, STONE, tint, FLOOR, dress } from './deco.mjs';

const brushes = [
  // ---- 大厅
  ...room([-7, 7], [0, 5], [-6, 3], WALLS, ['zn']),
  // 石墙：一道两指高的缝（贴地的窄缝，只有矮子的视线才对得上）+ 一扇玻璃窗
  ...wallWithHoles('z', [-8, -6], [-7.5, 7.5], [0, 5], [[-0.5, 0.5, 0.55, 0.9], [-5, 5, 0.95, 3.2]], STONE),
  box(-5, 0.95, -6.06, 5, 3.2, -6, 'glass'),
  // 大厅里仅有的两块可开门的白板：一大一小
  panelX(-7, 1, [-4, 0], [0, 3]),
  panelX(7, -1, [-2, -0.8], [0, 1.5], 'whiteS'),
  // ---- 金库
  ...room([-7, 7], [0, 5], [-20, -8], WALLS, ['zp']),
  panelZ(-20, 1, [-3, 3], [0, 4]),
  // 隔墙：脚边一条 0.2 米高的缝，缝后面是接收器
  ...wallWithHoles('x', [5.0, 5.4], [-20.5, -7.5], [0, 5.2], [[-17.6, -14.4, 0, 0.2]]),
  // ---- 装饰：大厅
  rug(0, -1.5, 9, 5, 0x3a4a78, 0, 'grass'),
  glow(-4.4, 0.012, -3.98, 4.4, 0.03, -3.94, 0xffd36b, 0.9),
  ...frameZ(-6, 1, [-0.5, 0.5], [0.55, 0.9], 0xffd36b, 0.06, 1.5, 0.05),
  ...frameZ(-6.06, 1, [-5, 5], [0.95, 3.2], 0xffd36b, 0.12, 1.2, 0.05),
  ...plant(-6.2, 2.2, 1.2),
  ...plant(6.2, 2.2, 1.0),
  ...plant(-6.2, -5.2, 1.0),
  ...plant(6.3, -5.3, 1.1),
  // ---- 装饰：金库（地面镶金，激光贴着金色地面扫过去）
  rug(0, -14, 13.6, 11.6, 0xc9a85a, 0, 'plate', 0.012),
  glow(-6.9, 0.016, -19.9, 6.9, 0.03, -19.8, 0xffd36b, 1.0),
  glow(-3.1, 0.016, -17.85, -2.9, 0.03, -9, 0xffd36b, 0.8),
  // 光落在这块镶金的小垫子上最合适（激光线正好穿过它）
  rug(2.5, -16, 0.9, 0.9, 0xfff0b0, 0, 'plate', 0.03),
  // 隔墙缝后面的小暗室，里面亮一点，让人看得出后面有东西
  glow(6.4, 0.02, -17.6, 6.9, 0.05, -14.4, 0xffb347, 0.9),
  // 出口门框
  ...frameZ(-17.5, 1, [-4.25, -1.75], [0, 2.5], 0xffd36b, 0.1, 1.2, 0.05),
  ...plant(-6.2, -19.2, 1.3),
  orb(2.5, 0.9, -16, 0.12, 0xff6a45, 1.6),
];

const entities = [
  light(0, 4.2, 0, 34, { color: 0xfff1d8, shadow: true }),
  light(0, 3.2, -4.5, 8, { color: 0xffe2b0, distance: 8 }),
  light(0, 4.3, -14, 40, { color: 0xffe7b8, shadow: true, distance: 26 }),
  light(6.2, 1.4, -16, 4, { color: 0xffb347, distance: 5 }),
  { type: 'cube', kind: 'prism', pos: [-3, 0.31, 0.5], yaw: 0 },
  { type: 'laser', pos: [2.5, 0.1, -8.3], dir: [0, 0, -1] },
  { type: 'catcher', id: 'c', pos: [6.95, 0.45, -16], normal: [-1, 0, 0] },
  { ...exit(-3, 0, -17.5, [2.5, 2.5, 3]), when: ['c'] },
];

export default {
  def: {
    name: '矮人之光',
    hint: '光从棱镜的正中心射出，而缝只有两指高：这块棱镜够矮吗？还有，你自己是怎么到缝那一头去的？',
    gun: 'both',
    killY: -20,
    look: { hemi: 0.7, exposure: 0.95, bloom: 0.28 },
    spawn: { pos: [0, 0, 2], yaw: 0 },
    brushes: dress(brushes),
    entities,
  },
  solve: async ({ ev, shot }) => {
    await shot('c8-39-start');
    await ev(() => {
      const pt = window.__pt;
      const g = window.__game;
      g.debugRun(0.3);
      if (!pt.fire('blue', [-7, 1.5, -2])) throw new Error('蓝门没打上');
      if (!pt.fire('orange', [7, 0.75, -1.4])) throw new Error('橙门没打上');
      pt.walkTo(-2.2, 0.5, 6, 0.25);
      if (!pt.use([-3, 0.4, 0.5])) throw new Error('没拿到棱镜');
      pt.walkTo(-5.5, -2, 6, 0.3);
      pt.walkDir(90, 3, (gg) => gg.player.scale < 0.9 || gg.state !== 'playing');
      g.debugRun(0.4);
      if (g.player.scale > 0.5 || !g.player.held) throw new Error('没有和棱镜一起变小：' + g.player.scale + ' ' + !!g.player.held);
    });
    await shot('c8-39-tiny');
    await ev(() => {
      const pt = window.__pt;
      const g = window.__game;
      // 在小门这一侧把棱镜放下，贴着缝口把橙门打到金库的墙上
      pt.walkTo(0, -3, 8, 0.3);
      g.use();
      g.debugRun(0.6);
      pt.walkTo(0, -5.3, 8, 0.2);
      if (!pt.fire('orange', [0, 0.72, -20])) throw new Error('橙门没有穿过缝打到金库：' + JSON.stringify(pt.why('orange', [0, 0.72, -20])));
      const k = g.cubes[0].position.clone();
      pt.walkTo(k.x + 0.1, k.z + 1.0, 6, 0.2);
      if (!pt.use([k.x, k.y, k.z])) throw new Error('矮个子没能把缩小的棱镜捡起来：' + g.cubes[0].scale);
      pt.walkTo(-5, -2, 8, 0.3);
      pt.walkDir(90, 3, (gg) => gg.player.position.z < -15 || gg.state !== 'playing');
      g.debugRun(0.4);
      if (g.player.position.z > -15) throw new Error('没有通过传送门到金库：' + g.player.position.toArray());
    });
    await shot('c8-39-vault');
    await ev(() => {
      const pt = window.__pt;
      const g = window.__game;
      // 走到激光线旁边，朝东，把棱镜放进光里
      pt.walkTo(2.08, -16, 10, 0.05);
      g.player.yaw = -Math.PI / 2;
      g.player.pitch = -0.9;
      g.debugRun(0.4);
      g.use();
      g.debugRun(1.2);
      if (!g.catchers[0].lit) throw new Error('接收器没亮：' + g.cubes[0].position.toArray());
    });
    await shot('c8-39-lit');
    await ev(() => {
      const pt = window.__pt;
      pt.walkTo(-3, -17.5, 8, 0.3);
      window.__game.debugRun(0.5);
    });
  },
};
