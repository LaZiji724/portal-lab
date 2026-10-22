// 41 登楼借影：一块方块要先当砝码、再当影子、最后当钥匙。踏板在楼下，你却要在楼上。
import { box, room, wallWithHoles, panelZ, light, exit } from '../../levelkit.mjs';
import { glow, orb, plant, frameZ, slab, WALLS, STONE, tint, FLOOR, dress } from './deco.mjs';

const TOP = 7.8; // 阳台、出口台的高度
const LIFT_TOP = 7.05; // 升降台升到顶时台面的高度：比阳台低 0.75 米，要跳一下才上得去（平台刚停下时玩家会被卡住，跳起来就好了）

const brushes = [
  // ---- 大厅（13 米高）。北墙在出口门的位置开一个洞
  ...room([-10, 13], [0, 13], [-12, 12], WALLS, ['zn']),
  ...wallWithHoles('z', [-12.5, -12], [-10.5, 13.5], [0, 13.5], [[9, 12, TOP, TOP + 3]], STONE),
  // 阳台块 W：南面留一个 3x3 的升降井（x -7.5..-4.5，z -7..-4），井里的升降台载你上楼
  box(-10, 0, -12, -7.5, TOP, -4, STONE),
  box(-4.5, 0, -12, -3, TOP, -4, STONE),
  box(-7.5, 0, -12, -4.5, TOP, -7, STONE),
  // 升降井的门楣：把井口 2.6 米以上封死（否则站在大厅里就能隔着井口打到高处的白板 PT，整个“先上楼”就被绕过去了）
  box(-7.5, 2.6, -4.0, -4.5, TOP, -3.7, STONE),
  // 出口台 E
  box(7, 0, -12, 13, TOP, -4, STONE),
  // 仅有的两块白板：PB 在升降井旁边的立柱南面（楼下），PT 在阳台上方的北墙高处
  panelZ(-4, 1, [-4.4, -3.1], [0.15, 2.5]),
  panelZ(-12, 1, [-9.9, -7.7], [8.0, 10.4]),
  // 阳台的玻璃栏杆（1.4 米）：子弹过不去，所以站在大厅里（哪怕踩着方块跳起来）也打不到阳台上的白板 PT，只能先上楼；栏杆在桥头留一个口
  box(-10, TOP, -4.0, -3.0, TOP + 1.4, -3.96, 'glass'),
  box(-3.0, TOP, -12, -2.96, TOP + 1.4, -8.5, 'glass'),
  box(-3.0, TOP, -7.5, -2.96, TOP + 1.4, -4.0, 'glass'),
  // 光桥通道：两道玻璃把桥夹在中间（桥面 1.6 宽，通道 1.0 宽，方块只能顺着光走）
  box(-3, 4.5, -8.55, 7, 11.5, -8.5, 'glass'),
  box(-3, 4.5, -7.5, 7, 11.5, -7.45, 'glass'),
  // 出口门后的走廊
  ...room([9, 12], [TOP, TOP + 3], [-17.5, -12.5], WALLS, ['zp']),
  // ---- 装饰：升降井的光、踏板的“电线”、台边的金线、盆栽
  glow(-7.5, 0.02, -6.96, -7.46, TOP, -6.9, 0xffd36b, 0.8),
  glow(-4.54, 0.02, -6.96, -4.5, TOP, -6.9, 0xffd36b, 0.8),
  glow(-7.5, 0.02, -6.96, -4.5, 0.06, -6.9, 0xffd36b, 0.8),
  // 踏板 h 到升降台的发光线
  glow(-4.05, 0.012, -4.1, -3.95, 0.03, -2.7, 0xffd36b, 1.0),
  glow(-5.6, 0.012, -4.1, -3.95, 0.03, -4.0, 0xffd36b, 1.0),
  // 台边的金线
  glow(-3.04, TOP - 0.02, -12, -3.0, TOP + 0.02, -4.2, 0xffd36b, 1.2),
  glow(7.0, TOP - 0.02, -12, 7.04, TOP + 0.02, -4.2, 0xffd36b, 1.2),
  glow(-10, TOP - 0.02, -4.04, -3, TOP + 0.02, -4, 0xffd36b, 0.8),
  glow(7, TOP - 0.02, -4.04, 13, TOP + 0.02, -4, 0xffd36b, 0.8),
  ...plant(-9.2, -5.2, 1.2, TOP),
  ...plant(-9.0, -11.0, 1.0, TOP),
  ...plant(12.0, -5.2, 1.2, TOP),
  ...plant(-9.3, 9.6, 1.4),
  ...plant(11.8, 9.8, 1.4),
  ...frameZ(-12, 1, [9, 12], [TOP, TOP + 3], 0xffd36b, 0.1, 1.3, 0.05),
  ...frameZ(-3.7, 1, [-7.5, -4.5], [0, 2.6], 0xffd36b, 0.1, 1.3, 0.05),
  // 地面中央一圈淡金色的地毯
  slab(-4, 0, -1, 8, 0.02, 9, 0xd9c79a, 'plate'),
];

const entities = [
  // 升降台：踏板 h 被压住才上升（静止时台面与地面齐平，升到顶比阳台低一截）
  { type: 'platform', pos: [-6, -0.18, -5.6], to: [-6, LIFT_TOP - 0.2, -5.6], size: [2.9, 0.4, 2.6], speed: 1.5, when: ['h'] },
  { type: 'button', id: 'h', pos: [-4.0, 0, -2.7] },
  { type: 'button', id: 'f', pos: [10, TOP, -5.6] },
  { type: 'cube', pos: [-3.5, 0.31, 1.5] },
  // 阳台上的激光；光桥只在激光被挡住（接收器 c 暗着）时才有
  { type: 'laser', pos: [-9.7, 9.8, -8], dir: [1, 0, 0] },
  { type: 'catcher', id: 'c', pos: [12.95, 9.8, -8], normal: [-1, 0, 0] },
  { type: 'bridge', pos: [-9.7, TOP + 0.02, -8], dir: [1, 0, 0], when: ['!c'] },
  { type: 'door', pos: [10.5, TOP + 1.5, -12.25], size: [3, 3, 0.3], requires: ['f'] },
  exit(10.5, TOP, -15.5),
  light(2, 11.8, 2, 70, { color: 0xfff1da, shadow: true, distance: 30 }),
  light(-6.5, 5.5, -2.5, 26, { color: 0xffe0b0, distance: 16 }),
  light(-6, 11.2, -9, 40, { color: 0xffe9c8, distance: 18 }),
  light(10, 11.4, -8, 36, { color: 0xffe9c8, distance: 18 }),
  light(10.5, TOP + 2.7, -15, 6, { color: 0xffd9a0, distance: 7 }),
];

export default {
  def: {
    name: '登楼借影',
    hint: '一块方块要干好几件事，可它偏偏压在楼下的踏板上。想想怎么让它和你在同一层。',
    gun: 'both',
    killY: -30,
    look: { hemi: 0.7, exposure: 0.95, bloom: 0.3 },
    spawn: { pos: [-1, 0, 6], yaw: 0 },
    brushes: dress(brushes),
    entities,
  },
  solve: async ({ ev, shot }) => {
    await shot('c8-41-start');
    // 1. 先在楼下的白板 PB 上打蓝门（站到阳台以后就打不到它了），再把方块端到踏板 h 上
    await ev(() => {
      const pt = window.__pt;
      const g = window.__game;
      g.debugRun(0.6);
      pt.walkTo(-2, 1, 6, 0.3);
      if (!pt.fire('blue', [-3.75, 1.3, -4])) throw new Error('蓝门没打上 PB');
      pt.walkTo(-3.3, 0.3, 6, 0.3);
      if (!pt.use([-3.5, 0.4, 1.5])) throw new Error('没拿到方块');
      pt.walkTo(-5.0, -4.6, 8, 0.15);
      pt.face(-4.0, -2.7);
      g.player.pitch = -0.55;
      g.debugRun(0.3);
      g.use();
      g.debugRun(1.0);
      if (!g.signals.get('h')) throw new Error('踏板 h 没压下：' + g.cubes[0].position.toArray());
      g.player.pitch = 0;
    });
    // 2. 站在升降台上升到阳台
    await ev(() => window.__game.debugRun(7));
    await shot('c8-41-top');
    const top = await ev(() => window.__pt.state());
    if (top.pos[1] < 7.5) throw new Error('没升上阳台：' + JSON.stringify(top.pos));
    // 3. 阳台上：在高处的白板 PT 打橙门，隔着传送门把方块从踏板上"拉"上来
    await ev(() => {
      const pt = window.__pt;
      const g = window.__game;
      // 台面比阳台低 0.75 米：走到台边，朝阳台跳上去
      pt.walkTo(-5, -6.2, 4, 0.1);
      g.player.yaw = 0;
      g.debugRun(1 / 30, { x: 0, y: 1 }, true);
      for (let i = 0; i < 45; i++) g.debugRun(1 / 30, { x: 0, y: 1 });
      if (g.player.position.y < 8.5) throw new Error('没能跳上阳台：' + g.player.position.toArray());
      pt.walkTo(-8.8, -9, 6, 0.3);
      if (!pt.fire('orange', [-8.8, 9.2, -12])) throw new Error('橙门没打上 PT：' + JSON.stringify(pt.why('orange', [-8.8, 9.2, -12])));
      pt.walkTo(-8.8, -11.3, 6, 0.1);
      g.player.yaw = 0;
      g.player.pitch = -0.61;
      g.debugRun(0.2);
      g.use();
      g.debugRun(0.5);
      if (!g.player.held) throw new Error('没能把方块拉上来：' + g.cubes[0].position.toArray());
      g.debugRun(4);
    });
    await shot('c8-41-pulled');
    // 4. 举着方块（它挡住激光，光桥就出现了）走过光桥
    await ev(() => {
      const pt = window.__pt;
      const g = window.__game;
      pt.walkTo(-9, -8, 8, 0.2);
      g.player.yaw = -Math.PI / 2;
      g.player.pitch = 0.17;
      g.debugRun(0.6);
      if (g.signals.get('c')) throw new Error('方块没有挡住激光');
      for (let i = 0; i < 500 && g.player.position.x < 8.6 && g.state === 'playing'; i++) {
        g.debugRun(1 / 30, { x: 0, y: 1 });
        if (g.player.position.y < 5) throw new Error('从桥上掉下去了');
      }
      if (g.player.position.x < 8) throw new Error('没走过光桥：' + g.player.position.toArray());
    });
    await shot('c8-41-crossed');
    // 5. 方块放到出口台的踏板 f 上，门开了
    await ev(() => {
      const pt = window.__pt;
      const g = window.__game;
      g.player.pitch = -0.2;
      pt.walkTo(9.0, -6.6, 6, 0.2);
      pt.drop(10, -5.6, 6);
      g.debugRun(1.2);
      if (!g.signals.get('f')) throw new Error('出口台的踏板没压下：' + g.cubes[0].position.toArray());
      pt.walkTo(10.5, -11, 8, 0.3);
      pt.walkTo(10.5, -15.5, 8, 0.3);
      g.debugRun(0.5);
    });
  },
};
