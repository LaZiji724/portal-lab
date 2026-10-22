// 第 6 章：错觉。看上去什么都对，其实哪里都不对——
// 窗只是遮住出口的画，销毁是回家，影子能搬着走，光幕可以躺下，视线要比身体先低下来。
import { box, room, wallWithHoles, panelX, panelY, panelZ, light, exit } from '../levelkit.mjs';
import { strip, planter } from './ch6/helpers.mjs';

const levels = [];
// 截图失败（机器忙时偶尔超时）不算关卡失败；截图前降低画质，减轻无头浏览器负担
const add = (def, solve) =>
  levels.push({
    def,
    solve: async (H) => {
      await H.ev(() => window.__game.setQuality('low'));
      await H.page.waitForTimeout(600); // 等上一关的“关卡完成”弹窗出现过，免得挡住截图
      const shot = async (name) => {
        try {
          await H.shot(name);
        } catch (e) {
          console.log('截图失败', name, e.message.split('\n')[0]);
        }
      };
      await solve({ ...H, shot });
    },
  });

const AMBER = 0xffb347;
const COLD = 0x7fd8ff;

// ================================================================ 28 空门
// 北墙的壁龛里一直立着出口，可一踩圆台，壁龛就变成一扇窗，通向一间走不进去的冷色金库。
// 人进不去，手可以：踩着圆台把方块递到金库里的按钮上，再松脚——窗消失，壁龛还在，出口亮了。
{
  add(
    {
      name: '空门',
      hint: '圆台一踩，壁龛就变成了窗。可窗只在你踩着的时候才存在——这时候，出口去哪儿了？',
      gun: 'none',
      spawn: { pos: [0, 0, 5.5], yaw: 0 },
      brushes: [
        // 大厅
        ...room([-7, 7], [0, 4.5], [-4, 7], {}, ['zn']),
        ...wallWithHoles('z', [-4.5, -4], [-7.5, 7.5], [0, 4.5], [[-1.1, 1.1, 0, 2.6]]),
        // 真实的壁龛：宽 2.2、高 2.6、深 2.6，里面立着出口
        box(-1.6, 0, -7.1, -1.1, 3.1, -4.5),
        box(1.1, 0, -7.1, 1.6, 3.1, -4.5),
        box(-1.1, 2.6, -7.1, 1.1, 3.1, -4.5),
        box(-1.1, 0, -7.1, 1.1, 2.6, -6.6),
        box(-1.6, -0.5, -7.1, 1.6, 0, -4.5, 'concrete'),
        strip(-1.1, 0.05, -6.55, 1.1, 0.12, -6.5, AMBER, 1.8),
        strip(-1.08, 0.1, -6.5, -1.03, 2.5, -6.45, AMBER, 1.2),
        strip(1.03, 0.1, -6.5, 1.08, 2.5, -6.45, AMBER, 1.2),
        // 大厅里的陈设：踢脚灯带、盆栽、长凳
        ...planter(-6.2, -3.2, 0, 1.1),
        ...planter(6.2, -3.2, 0, 1.1),
        ...planter(6.4, 6.2, 0, 0.9),
        box(3.4, 0, 0.6, 5.6, 0.45, 1.4, 'concrete'),
        // 圆台周围的一圈装饰光环（只是装饰，按钮本体在 entities 里）
        { pos: [0, 0.01, -2.2], size: [2.1, 0.02, 2.1], mat: 'glow', shape: 'cyl', color: AMBER, intensity: 0.7, deco: true },
        // 金库（偏移 x=+100）：冷色、空旷，只有一个按钮
        ...room([94, 106], [0, 4.5], [-8, 4], {}, ['zp']),
        ...wallWithHoles('z', [4, 4.5], [93.5, 106.5], [0, 4.5], [[98.9, 101.1, 0, 2.6]]),
        box(98.4, 0, 4.5, 98.9, 3.1, 6.6),
        box(101.1, 0, 4.5, 101.6, 3.1, 6.6),
        box(98.9, 2.6, 4.5, 101.1, 3.1, 6.6),
        box(98.9, 0, 6.1, 101.1, 2.6, 6.6),
        box(98.4, -0.5, 4.5, 101.6, 0, 6.6, 'concrete'),
        box(95.5, 0, -6.5, 96.5, 4.5, -5.5),
        box(103.5, 0, -6.5, 104.5, 4.5, -5.5),
        box(95.5, 0, -1.5, 96.5, 4.5, -0.5),
        box(103.5, 0, -1.5, 104.5, 4.5, -0.5),
        { pos: [100, 0.01, 3.1], size: [2.1, 0.02, 2.1], mat: 'glow', shape: 'cyl', color: AMBER, intensity: 0.7, deco: true },
      ],
      entities: [
        { type: 'cube', pos: [-4, 0.3, 2] },
        { type: 'button', id: 'p', pos: [0, 0, -2.2] },
        { type: 'button', id: 'pv', pos: [100, 0, 3.1] },
        { type: 'gateway', a: { pos: [0, 1.3, -4], normal: [0, 0, 1] }, b: { pos: [100, 1.3, 4], normal: [0, 0, -1] }, size: [2.2, 2.6], when: ['p'] },
        { ...exit(0, 0, -5.3, [1.8, 2.0, 1.8]), when: ['pv'] },
        light(-3, 4.2, 1, 40, { color: 0xffe9c8 }),
        light(3, 4.2, 4, 34, { color: 0xffe9c8 }),
        light(0, 2.3, -5.6, 9, { color: AMBER, fixture: false, distance: 7 }),
        light(100, 4.2, -2, 46, { color: 0xcdeaff, distance: 26 }),
        light(100, 2.6, 2.6, 8, { color: AMBER, fixture: false, distance: 6 }),
      ],
    },
    async ({ ev, shot }) => {
      await shot('c6-1-start');
      await ev(() => {
        const pt = window.__pt;
        const g = window.__game;
        pt.run(0.3);
        pt.walkTo(-3.3, 2.7, 6, 0.2);
        const c = g.cubes[0].position.clone();
        if (!pt.use([c.x, c.y, c.z])) throw new Error('没拿到方块');
        pt.walkTo(0, -2.9, 8, 0.1);
        pt.run(0.3);
        if (!g.signals.get('p')) throw new Error('圆台没踩上');
        g.player.yaw = 0;
        g.player.pitch = -0.12;
        g.player.updateCamera();
        pt.run(0.4);
      });
      await shot('c6-1-window');
      await ev(() => {
        const pt = window.__pt;
        const g = window.__game;
        pt.use();
        pt.run(1.2);
        if (!g.signals.get('pv')) throw new Error('方块没落到金库的按钮上 ' + JSON.stringify(g.cubes[0].position.toArray()));
        g.player.pitch = 0;
        pt.walkTo(0, -0.5, 4, 0.2);
        pt.run(0.6);
      });
      await shot('c6-1-niche');
      await ev(() => {
        const pt = window.__pt;
        pt.walkTo(0, -5.3, 6, 0.2);
        pt.run(0.3);
      });
    }
  );
}

// ================================================================ 29 归巢
// 出口门认的是那块板，不是你；可是方块一离开板子，通向出口的门就会合上或打开……
// 窗外看得见一切：拿起方块，A 室的门变绿、出口门变红。方块被销毁会回到出生的位置——
// 酸池是回家的门：带着方块跳下去，把它扔进酸里，它回到板上，出口就开了。
{
  add(
    {
      name: '归巢',
      hint: '出口门只认那块板。方块一旦拿走，得想个办法让它回到出生的地方。',
      gun: 'none',
      spawn: { pos: [0, 0, 10], yaw: 0 },
      brushes: [
        // A 室（暖色）：地面 y=0
        box(-8.5, -0.5, 0, 8.5, 0, 12.5, 'concrete'),
        box(-8.5, 5, -0.5, 8.5, 5.5, 12.5),
        box(-8.5, 0, 0, -8, 5, 12.5),
        box(8, 0, 0, 8.5, 5, 12.5),
        box(-8.5, 0, 12, 8.5, 5, 12.5),
        // B 室（冷色）：地面 y=-4，在 A 室北墙的另一侧，4 米落差
        box(-8.5, -4.5, -22.5, 8.5, -4, -0.5, 'concrete'),
        box(-8.5, 5, -22.5, 8.5, 5.5, -0.5),
        box(-8.5, -4, -22.5, -8, 5, -0.5),
        box(8, -4, -22.5, 8.5, 5, -0.5),
        // 中间那面墙：左边一道门（DG），右边一扇玻璃窗
        ...wallWithHoles('z', [-0.5, 0], [-8.5, 8.5], [-4, 5], [
          [-1.5, 1.5, -4, 3],
          [4, 7.5, 0, 3],
        ]),
        box(4, 0, -0.5, 7.5, 3, 0, 'glass'),
        box(-1.5, -4, -0.5, 1.5, 0, 0, 'concrete'),
        // 门外的平台：和 A 室一样高，伸进 B 室，北端是悬崖
        box(-3, -4, -6, 3, 0, -0.5, 'concrete'),
        // B 室北墙，通向出口的走廊
        ...wallWithHoles('z', [-22.5, -22], [-8.5, 8.5], [-4, 5], [[-1.5, 1.5, -4, -1]]),
        box(-2, -4.5, -28.5, 2, -4, -22, 'concrete'),
        box(-2, -1, -28.5, 2, -0.5, -22),
        box(-2, -4, -28.5, -1.5, -1, -22),
        box(1.5, -4, -28.5, 2, -1, -22),
        box(-1.5, -4, -28.5, 1.5, -1, -28),
        // 酸池
        { pos: [5, -3.88, -12.25], size: [5, 0.24, 5.5], mat: 'acid', color: 0x2f9a6a, intensity: 0.12, deco: true },
        { ...box(2.35, -4, -15.15, 7.65, -3.78, -14.9, 'concrete'), deco: true },
        { ...box(2.35, -4, -9.6, 7.65, -3.78, -9.35, 'concrete'), deco: true },
        { ...box(2.35, -4, -14.9, 2.6, -3.78, -9.6, 'concrete'), deco: true },
        { ...box(7.4, -4, -14.9, 7.65, -3.78, -9.6, 'concrete'), deco: true },
        // 陈设
        ...planter(-6.8, 1.2, 0, 1.1),
        ...planter(6.8, 1.2, 0, 1.1),
        ...planter(-6.8, 10.8, 0, 1),
        ...planter(-6.6, -2, -4, 1.2, 0x3c9f78),
        ...planter(-6.6, -18, -4, 1.2, 0x3c9f78),
        ...planter(6.6, -18, -4, 1.2, 0x3c9f78),
        { pos: [-5, 0.01, 8], size: [2.1, 0.02, 2.1], mat: 'glow', shape: 'cyl', color: AMBER, intensity: 0.7, deco: true },
      ],
      entities: [
        { type: 'button', id: 'p', pos: [-5, 0, 8] },
        { type: 'cube', pos: [-5, 0.46, 8] },
        { type: 'door', pos: [0, 1.5, -0.25], size: [3, 3, 0.3], requires: ['!p'] },
        { type: 'door', pos: [0, -2.5, -22.25], size: [3, 3, 0.3], requires: ['p'] },
        { type: 'hazard', pos: [5, -3.4, -12.25], size: [5, 1.2, 5.5], hidden: true },
        exit(0, -4, -26.4, [2, 2.5, 2]),
        light(-3, 4.7, 7, 44, { color: 0xffe3bd }),
        light(3, 4.7, 2, 34, { color: 0xffe3bd }),
        light(-2, 4.7, -4, 40, { color: 0xbfe8ff, distance: 26 }),
        light(0, 4.7, -14, 44, { color: 0xbfe8ff, distance: 26 }),
        light(5, -3.2, -12.25, 14, { color: 0x6dffa8, fixture: false, distance: 12 }),
        light(0, -1.3, -26, 8, { fixture: false, distance: 8 }),
      ],
    },
    async ({ ev, shot }) => {
      await shot('c6-2-start');
      await ev(() => {
        const pt = window.__pt;
        const g = window.__game;
        pt.run(0.3);
        pt.walkTo(-5, 6.4, 6, 0.2);
        if (!pt.use([-5, 0.46, 8])) throw new Error('没拿到方块');
        pt.walkTo(0, 2, 6, 0.3);
        pt.run(1.2);
        if (g.signals.get('p')) throw new Error('方块拿起后板子还在被压着');
        pt.walkTo(0, -3, 6, 0.3);
        // 从平台北端跳下去（方块如果掉了就再拿起来）
        pt.walkDir(0, 4, (gg) => gg.player.position.y < -1);
        pt.run(1.2);
      });
      await shot('c6-2-below');
      await ev(() => {
        const pt = window.__pt;
        const g = window.__game;
        if (!g.player.held) {
          const c = g.cubes[0].position.clone();
          pt.walkTo(c.x, c.z + 1.5, 6, 0.3);
          if (!pt.use([c.x, c.y, c.z])) throw new Error('方块掉了，也没能再拿起来');
        }
        pt.walkTo(0, -8, 6, 0.3);
        pt.walkTo(5, -8.8, 6, 0.15);
        pt.face(5, -12.5);
        g.player.pitch = -0.6;
        pt.run(0.8);
        pt.use();
        pt.run(1.5);
        g.player.pitch = 0;
        if (!g.signals.get('p')) throw new Error('方块没回到板上 ' + JSON.stringify(g.cubes[0].position.toArray()));
        pt.walkTo(0, -8, 6, 0.4);
        pt.walkTo(0, -19, 6, 0.4);
        pt.run(0.5);
      });
      await shot('c6-2-door');
      await ev(() => {
        const pt = window.__pt;
        pt.walkTo(0, -26.4, 8, 0.2);
        pt.run(0.3);
      });
    }
  );
}

// ================================================================ 30 暗中成桥
// 深渊对面的接收器被一道激光照着，而光桥只在「没被照到」时才会出现——光一灭，桥才有。
// 墙边的架子正好够把方块放进光束里挡住它，可终点的按钮也要这块方块：
// 方块还会投下影子，把它举在光束里，一路走过去，影子到哪里，桥就到哪里。
{
  add(
    {
      name: '暗中成桥',
      hint: '桥只在对面没被照到时才存在。那块挡光的东西，不一定非要放着不动。',
      gun: 'none',
      killY: -20,
      spawn: { pos: [-10.5, 0, -2.5], yaw: -90 },
      brushes: [
        ...room([-12, 14], [-6, 5], [-4, 4], {}, ['floor', 'zn']),
        ...wallWithHoles('z', [-4.5, -4], [-12.5, 14.5], [-6, 5.5], [[9, 12, 0, 3]]),
        box(-12.5, -6.5, -4.5, 14.5, -6, 4.5, 'concrete'),
        // 起点平台和对岸平台
        box(-12, -6, -4, -6, 0, 4, 'concrete'),
        box(6, -6, -4, 14, 0, 4, 'concrete'),
        // 墙上的架子，正好在光束的高度
        box(-11.9, 1.6, -0.3, -10.7, 1.7, 0.3, 'concrete'),
        // 深渊上的两片玻璃：给桥围出一条 1.1 米宽的走廊
        box(-6, -6, -0.6, 6, 3, -0.55, 'glass'),
        box(-6, -6, 0.55, 6, 3, 0.6, 'glass'),
        // 酸池
        { pos: [0, -5.85, 0], size: [12, 0.3, 8], mat: 'acid', color: 0x2f9a6a, intensity: 0.12, deco: true },
        // 出口走廊
        box(8, -0.5, -9.5, 13, 0, -4.5, 'concrete'),
        box(8, 3, -9.5, 13, 3.5, -4.5),
        box(7.5, 0, -9.5, 8, 3.5, -4.5),
        box(13, 0, -9.5, 13.5, 3.5, -4.5),
        box(7.5, 0, -10, 13.5, 3.5, -9.5),
        // 陈设
        ...planter(-11.2, -3.2, 0, 1),
        ...planter(13.2, 3.2, 0, 1),
        ...planter(7, 3.2, 0, 0.9),
        strip(-11.95, 0, -0.8, -11.45, 0.012, 0.8, COLD, 1.4),
        { pos: [10.5, 0.01, 2.4], size: [2.1, 0.02, 2.1], mat: 'glow', shape: 'cyl', color: COLD, intensity: 0.7, deco: true },
      ],
      entities: [
        { type: 'bridge', pos: [-11.7, 0.02, 0], dir: [1, 0, 0], when: ['!c'] },
        { type: 'laser', pos: [-11.7, 2.0, 0], dir: [1, 0, 0] },
        { type: 'catcher', id: 'c', pos: [13.95, 2.0, 0], normal: [-1, 0, 0] },
        { type: 'cube', pos: [-10.5, 0.31, 2.5] },
        { type: 'button', id: 'f', pos: [10.5, 0, 2.4] },
        { type: 'door', pos: [10.5, 1.5, -4.25], size: [3, 3, 0.3], requires: ['f'] },
        exit(10.5, 0, -7.5, [2, 2.5, 2]),
        light(-8.5, 4.6, 0, 36, { color: 0xcfe6ff, distance: 24 }),
        light(0, 4.6, 0, 40, { color: 0xb8dcff, distance: 28 }),
        light(10.5, 4.6, 0, 36, { color: 0xcfe6ff, distance: 24 }),
        light(0, -4.6, 0, 14, { color: 0x6dffa8, fixture: false, distance: 14 }),
        light(10.5, 2.6, -7.5, 8, { fixture: false, distance: 8 }),
      ],
    },
    async ({ ev, shot }) => {
      await shot('c6-3-start');
      await ev(() => {
        const pt = window.__pt;
        const g = window.__game;
        pt.run(0.4);
        if (!g.signals.get('c')) throw new Error('接收器一开始应该被照亮');
        pt.walkTo(-10.5, 1.3, 6, 0.2);
        const c = g.cubes[0].position.clone();
        if (!pt.use([c.x, c.y, c.z])) throw new Error('没拿到方块');
        pt.walkTo(-10.2, 0, 4, 0.1);
        g.player.yaw = (-90 * Math.PI) / 180;
        g.player.pitch = (12 * Math.PI) / 180;
        g.player.updateCamera();
        pt.run(0.6);
        if (g.signals.get('c')) throw new Error('方块没挡住光束');
      });
      await shot('c6-3-shadow');
      await ev(() => {
        const pt = window.__pt;
        const g = window.__game;
        for (let i = 0; i < 400 && g.state === 'playing' && g.player.position.x < 7.4; i++) {
          g.debugRun(1 / 30, { x: 0, y: 1 });
          if (g.player.position.y < -1) throw new Error('从桥上掉下去了 x=' + g.player.position.x);
          if (!g.player.held) throw new Error('方块在桥上掉了');
        }
        if (g.player.position.x < 7) throw new Error('没走过去 ' + g.player.position.x);
      });
      await shot('c6-3-across');
      await ev(() => {
        const pt = window.__pt;
        const g = window.__game;
        g.player.pitch = 0;
        pt.walkTo(9.0, 2.4, 5, 0.2);
        pt.drop(10.5, 2.4);
        pt.run(0.6);
        if (!g.signals.get('f')) throw new Error('方块没落在按钮上');
        pt.walkTo(10.5, -3, 6, 0.3);
        pt.walkTo(10.5, -7.5, 6, 0.2);
        pt.run(0.3);
      });
    }
  );
}

// ================================================================ 31 侧身的桥
// 深渊中央的小岛上立着一道从天花板垂下来的光幕，像一堵毫无用处的墙。
// 光桥只是一张固体的光片，竖着就是墙：用传送门把它「放倒」——
// 光幕落进岛上的门，从墙上的门里横着长出来，就成了一条通向对岸的路。
{
  add(
    {
      name: '侧身的桥',
      hint: '那道光幕是实心的，可它立在了没用的地方。光桥能穿过传送门，出来时朝向哪边？',
      gun: 'both',
      killY: -20,
      spawn: { pos: [-10, 1.2, 3], yaw: -90 },
      brushes: [
        ...room([-14, 16], [-6, 6], [-5, 5], {}, ['floor']),
        box(-14.5, -6.5, -5.5, 16.5, -6, 5.5, 'concrete'),
        // 起点：一座 1.2 米高的台子，台边离西墙 0.6 米
        box(-14, -6, -5, -8, 0, 5, 'concrete'),
        box(-13.4, 0, -5, -9, 1.2, 5, 'concrete'),
        // 对岸，和台子一样高
        box(8, -6, -5, 16, 1.2, 5, 'concrete'),
        // 深渊中央的小岛
        box(-1, -6, -1.5, 1, 0, 1.5, 'concrete'),
        // 白板：岛上的、西墙上的，以及三块「看上去一样」的
        panelY(0, 1, [-0.65, 0.65], [-1.15, 1.15]),
        panelX(-14, 1, [-0.65, 0.65], [0.1, 2.4]),
        panelZ(-5, 1, [-12.2, -10.9], [2.0, 4.3]),
        panelY(6, -1, [-12.5, -11.2], [-1.15, 1.15]),
        panelY(1.2, 1, [-12.2, -10.9], [-3.9, -1.6]),
        // 岛上白板外的一圈光框：光幕要落在这里
        strip(-0.78, 0, -1.3, -0.7, 0.02, 1.3, COLD, 1.6),
        strip(0.7, 0, -1.3, 0.78, 0.02, 1.3, COLD, 1.6),
        strip(-0.7, 0, -1.3, 0.7, 0.02, -1.22, COLD, 1.6),
        strip(-0.7, 0, 1.22, 0.7, 0.02, 1.3, COLD, 1.6),
        { pos: [0, -5.85, 0], size: [16, 0.3, 10], mat: 'acid', color: 0x2f9a6a, intensity: 0.12, deco: true },
        ...planter(-13.2, 4.2, 0, 0.9),
        ...planter(-13.2, -4.2, 0, 0.9),
        ...planter(15.3, 4.2, 1.2, 0.9),
        ...planter(15.3, -4.2, 1.2, 0.9),
        strip(-13.95, 0.2, 4.0, -13.9, 1.1, 4.05, COLD, 1.2),
      ],
      entities: [
        { type: 'bridge', pos: [0, 5.85, 0], dir: [0, -1, 0], up: [0, 0, -1] },
        { type: 'hazard', pos: [0, -5, 0], size: [16, 1.5, 10], hidden: true },
        exit(14, 1.2, 0, [2, 2.5, 2]),
        light(-10, 5.6, 0, 40, { color: 0xcfe6ff, distance: 26 }),
        light(0, 5.6, 0, 34, { color: 0xb8dcff, distance: 26 }),
        light(12, 5.6, 0, 34, { color: 0xcfe6ff, distance: 24 }),
        light(0, -4.4, 0, 14, { color: 0x6dffa8, fixture: false, distance: 14 }),
        light(14, 3.4, 0, 8, { fixture: false, distance: 8 }),
      ],
    },
    async ({ ev, shot }) => {
      await shot('c6-4-start');
      await ev(() => {
        const pt = window.__pt;
        const g = window.__game;
        pt.walkTo(-10, 0, 5, 0.2);
        pt.face(0, 0);
        if (!pt.fire('blue', [0, 0, 0])) throw new Error('岛上的白板没能开门');
        if (!pt.fire('orange', [-14, 1.25, 0])) throw new Error('西墙的白板没能开门');
        pt.run(0.8);
        const parts = g.bridges[0].parts.length;
        if (parts < 2) throw new Error('光桥没有被折过去 parts=' + parts);
      });
      await shot('c6-4-bridge');
      await ev(() => {
        const pt = window.__pt;
        const g = window.__game;
        g.player.pitch = 0;
        pt.walkDir(-90, 10, (gg) => gg.player.position.x > 13 || gg.player.position.y < -1);
        pt.walkTo(14, 0, 4, 0.3);
        pt.run(0.3);
      });
    }
  );
}

// ================================================================ 32 窥缝
// 金库只有一扇挡子弹的玻璃窗，和墙脚一条三指高的细缝。窗里能看见金库深处的白墙，可子弹打不过去。
// 缩小的不是身体，是眼睛：子弹是从眼睛里射出的，眼睛矮下来，才能顺着细缝一直飞到白墙上。
{
  add(
    {
      name: '窥缝',
      hint: '透过玻璃能看见金库里的白墙，可子弹穿不过去。墙脚那条缝，要多低的视线才望得进去？',
      gun: 'both',
      spawn: { pos: [0, 0, 2], yaw: 0 },
      brushes: [
        // 大厅
        ...room([-7, 7], [0, 5], [-6, 3], {}, ['zn']),
        // 石墙：6 米厚，窗口 + 墙脚的细缝（宽 1 米、高 0.35 米、深 6 米）
        ...wallWithHoles(
          'z',
          [-12, -6],
          [-7.5, 7.5],
          [0, 5],
          [
            [-0.5, 0.5, 0.55, 0.9],
            [-5.5, -1.5, 1.0, 2.6],
          ],
          'concrete'
        ),
        box(-5.5, 1.0, -6.3, -1.5, 2.6, -6.2, 'glass'),
        strip(-0.5, 0.55, -11.98, 0.5, 0.565, -6.02, COLD, 1.3),
        // 细缝口和窗口的细框
        strip(-0.58, 0.47, -6.02, -0.5, 0.98, -6, COLD, 1.1),
        strip(0.5, 0.47, -6.02, 0.58, 0.98, -6, COLD, 1.1),
        strip(-0.5, 0.9, -6.02, 0.5, 0.98, -6, COLD, 1.1),
        strip(-0.5, 0.47, -6.02, 0.5, 0.55, -6, COLD, 1.1),
        strip(-5.6, 0.92, -6.02, -1.4, 1.0, -6, AMBER, 1.0),
        strip(-5.6, 2.6, -6.02, -1.4, 2.68, -6, AMBER, 1.0),
        strip(-5.6, 1.0, -6.02, -5.5, 2.6, -6, AMBER, 1.0),
        strip(-1.5, 1.0, -6.02, -1.4, 2.6, -6, AMBER, 1.0),
        // 金库：北墙整面是白板
        ...room([-7, 7], [0, 5], [-20, -12], {}, ['zp']),
        panelZ(-20, 1, [-3, 3], [0, 4]),
        strip(-3.1, 0.05, -19.9, -3.05, 3.95, -19.85, AMBER, 1.2),
        strip(3.05, 0.05, -19.9, 3.1, 3.95, -19.85, AMBER, 1.2),
        ...planter(5.8, -14, 0, 1),
        ...planter(-6, -19, 0, 0.9),
        // 大厅里的两块白板：西墙一块大的，东墙一块小的（浅蓝色）
        panelX(-7, 1, [-4, 0], [0, 3]),
        panelX(7, -1, [-2, -0.8], [0, 1.5], 'whiteS'),
        ...planter(-6.2, 2.2, 0, 1),
        ...planter(6.2, 2.2, 0, 1),
      ],
      entities: [
        exit(-3.5, 0, -16, [2, 2.5, 2]),
        light(-2, 4.6, 0, 40, { color: 0xe4f6ff }),
        light(3, 4.6, -3, 28, { color: 0xe4f6ff }),
        light(0, 4.4, -16, 60, { color: 0xffe9c4, distance: 26 }),
        light(0, 1.8, -18.6, 12, { color: 0xffe9c4, fixture: false, distance: 10 }),
      ],
    },
    async ({ ev, shot }) => {
      await shot('c6-5-start');
      await ev(() => {
        const pt = window.__pt;
        const g = window.__game;
        // 1. 蓝门开在西墙的大白板上，橙门开在东墙的小白板上：钻进去，缩成 0.45 倍
        if (!pt.fire('blue', [-7, 1.5, -2])) throw new Error('西墙的白板没能开门');
        if (!pt.fire('orange', [7, 0.75, -1.4])) throw new Error('东墙的小白板没能开门');
        pt.walkTo(-5.5, -2, 8, 0.2);
        pt.walkDir(90, 4, (gg) => gg.player.position.x > 3 || gg.player.scale < 0.9);
        pt.run(0.8);
        if (g.player.scale > 0.5) throw new Error('没缩小 ' + g.player.scale);
      });
      await shot('c6-5-small');
      await ev(() => {
        const pt = window.__pt;
        const g = window.__game;
        // 2. 走到细缝前，视线对着缝里发光的那条线开枪：橙门飞到金库的白墙上
        pt.walkTo(0, -4.4, 8, 0.15);
        pt.face(0, -20);
        const eye = g.player.eye(g.player.position.clone());
        if (!pt.fire('orange', [0, eye.y, -20])) throw new Error('子弹没能顺着细缝飞进金库');
        const o = g.portals.orange.position;
        if (o.z > -19.5) throw new Error('橙门没落在金库的白墙上 ' + o.toArray());
      });
      await shot('c6-5-shot');
      await ev(() => {
        const pt = window.__pt;
        const g = window.__game;
        // 3. 钻回蓝门，从金库的白墙里出来，走向出口
        pt.walkTo(-5.5, -2, 8, 0.2);
        pt.walkDir(90, 4, (gg) => gg.player.position.z < -15);
        pt.run(0.5);
        pt.walkTo(-3.5, -16, 8, 0.3);
        pt.run(0.3);
      });
    }
  );
}

export default levels;
