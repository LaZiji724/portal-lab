// 第 7 章：因果。光、门、方块互相牵着：每一关都有一个“先有因、后有果”的圈，要先看出这个圈，再亲手把它剪断。
import { T, box, room, wallWithHoles, panelX, panelY, panelZ, light, exit } from '../levelkit.mjs';
import { AMBER, CYAN, WARM, COOL, glow, floorFrame, wallFrameZ, plant, corridorNZ, wrapSolve } from './ch7/helpers.mjs';

const levels = [];
const add = (def, solve) => levels.push({ def, solve: wrapSolve(solve) });

// ================================================================ 33 自断后路
// 踏板只是一点火星：压一下，空间门打开，激光穿过门洞照亮对面的接收器，接收器和踏板是同一个信号，
// 所以松开踏板门也不会关。可出口的门偏偏“怕光”：信号一直亮着，它就一直关着。
// 要出去，就得亲手把光掐灭——身后的门也跟着关上。
{
  const X = 100;
  const ex = corridorNZ(X + 6, -24.5, 1.5, 3, 5);
  add(
    {
      name: '自断后路',
      hint: '松开踏板，门依然开着。是谁在撑着它？而出口的大门，似乎有自己的脾气。',
      gun: 'none',
      killY: -20,
      spawn: { pos: [-4, 0, 11], yaw: 0 },
      brushes: [
        // 起点实验室 S
        ...room([-7, 7], [0, 5], [0, 14], {}, ['zn']),
        ...wallWithHoles('z', [-0.5, 0], [-7.5, 7.5], [0, 5.5], [[-1, 1, 0, 3.2]]),
        // S 的壁龛（空间门关着时，激光打在龛后壁上）
        box(-1.5, -0.5, -2.5, 1.5, 0, -0.5, 'concrete'),
        box(-1.5, 0, -2.5, -1, 3.7, -0.5),
        box(1, 0, -2.5, 1.5, 3.7, -0.5),
        box(-1.5, 3.2, -2.5, 1.5, 3.7, -0.5),
        box(-1.5, 0, -2.5, 1.5, 3.7, -2),
        // 远处的房间 X
        ...room([X - 12, X + 12], [0, 5], [-24, 0], {}, ['zn', 'zp']),
        ...wallWithHoles('z', [0, 0.5], [X - 12.5, X + 12.5], [0, 5.5], [[X - 1, X + 1, 0, 3.2]]),
        box(X - 1.5, -0.5, 0.5, X + 1.5, 0, 2.5, 'concrete'),
        box(X - 1.5, 0, 0.5, X - 1, 3.7, 2.5),
        box(X + 1, 0, 0.5, X + 1.5, 3.7, 2.5),
        box(X - 1.5, 3.2, 0.5, X + 1.5, 3.7, 2.5),
        box(X - 1.5, 0, 2, X + 1.5, 3.7, 2.5),
        ...wallWithHoles('z', [-24.5, -24], [X - 12.5, X + 12.5], [0, 5.5], [[X + 4.5, X + 7.5, 0, 3]]),
        ...ex.brushes,
        // 光束线上的小石台：放方块的位置（也是个提示）
        box(X - 0.4, 0, -12.4, X + 0.4, 1.9, -11.6, 'concrete'),
        // 琥珀色 = 同一个信号：踏板的方框、空间门的门框、接收器的方框、出口门上的灯带
        ...floorFrame(-4, 5, 0.95),
        glow(-1.12, 0, 0.02, -1.04, 3.28, 0.06, AMBER, 1.6),
        glow(1.04, 0, 0.02, 1.12, 3.28, 0.06, AMBER, 1.6),
        glow(-1.12, 3.2, 0.02, 1.12, 3.28, 0.06, AMBER, 1.6),
        ...wallFrameZ(X, 2.3, 0.72, -24, 1, AMBER, 0.1, 2.4),
        glow(X + 4.5, 3.1, -23.98, X + 7.5, 3.17, -23.94, AMBER, 1.6),
        glow(X - 0.5, 1.9, -12.5, X + 0.5, 1.93, -11.5, AMBER, 1.2),
        // 激光发射器
        { ...box(-0.3, 1.9, 13.7, 0.3, 2.7, 14), mat: 'plate' },
        ...plant(-6.2, 12.6, 1),
        ...plant(6.2, 12.6, 1),
        ...plant(X - 10.8, -22.6, 1.1),
        ...plant(X + 10.8, -22.6, 1.1),
      ],
      entities: [
        { type: 'gateway', a: { pos: [0, 1.5, 0], normal: [0, 0, 1] }, b: { pos: [X, 1.5, 0], normal: [0, 0, -1] }, size: [2, 3], frame: false, when: ['s'] },
        { type: 'button', id: 's', pos: [-4, 0, 5] },
        { type: 'cube', pos: [3, 0.31, 9] },
        { type: 'laser', pos: [0, 2.3, 13.55], dir: [0, 0, -1] },
        { type: 'catcher', id: 's', pos: [X, 2.3, -23.95], normal: [0, 0, 1] },
        { type: 'door', pos: [X + 6, 1.5, -24.25], size: [3, 3, 0.3], requires: ['!s'] },
        ...ex.entities,
        light(-3.2, 4.6, 8, 24, { color: WARM, shadow: true }),
        light(3.2, 4.6, 3, 14, { color: WARM }),
        light(-4, 1.2, 5, 5, { color: AMBER, fixture: false, distance: 7 }),
        light(X - 5, 4.6, -8, 22, { color: 0xa8d8ff, shadow: true }),
        light(X, 4.6, -18, 20, { color: COOL }),
        light(X + 6, 2.2, -22.5, 8, { color: AMBER, fixture: false, distance: 10 }),
        light(X, 2.2, -21.8, 6, { color: AMBER, fixture: false, distance: 8 }),
      ],
    },
    async ({ ev, shot }) => {
      await shot('c7-1-start');
      // 1. 拿起方块，踩上踏板，让门打开
      await ev(() => {
        const pt = window.__pt;
        pt.walkTo(3, 7.6, 6, 0.25);
        if (!pt.use([3, 0.4, 9])) throw new Error('没拿到方块');
        pt.walkTo(-4, 5.1, 6, 0.2);
        pt.run(0.8);
        const s = pt.state();
        if (!s.signals.s) throw new Error('踏板没有踩下去');
      });
      // 2. 松开踏板：光在撑着，门还开着
      await ev(() => {
        const pt = window.__pt;
        pt.walkTo(-4, 3, 4, 0.2);
        pt.run(1.2);
        const s = pt.state();
        if (!s.signals.s) throw new Error('松开踏板后门关了（光没有撑住）');
      });
      await shot('c7-1-latched');
      // 3. 穿过门洞到达另一个房间（激光在头顶 2.3 米，贴着它下面走）
      await ev(() => {
        const pt = window.__pt;
        const g = window.__game;
        pt.walkTo(0, 3.5, 6, 0.2);
        g.player.pitch = 0;
        pt.walkDir(0, 4, (gg) => gg.player.position.x > 50);
        if (g.player.position.x < 50) throw new Error('没有穿过空间门');
        pt.run(0.4);
      });
      await shot('c7-1-farroom');
      // 4. 在光束里放下/举着方块，把光掐断
      await ev(() => {
        const pt = window.__pt;
        const g = window.__game;
        const s0 = pt.state();
        if (!s0.signals.s) throw new Error('到了对面信号却灭了');
        pt.walkTo(100, -10.4, 6, 0.15);
        g.player.yaw = 0;
        g.player.pitch = 0.43;
        pt.run(1.0);
        const s = pt.state();
        if (s.signals.s) throw new Error('光没有被方块挡住：' + JSON.stringify(s.signals));
        if (!g.player.held) throw new Error('方块不在手里');
        pt.use(); // 放下，落在石台上
        pt.run(1.0);
      });
      await shot('c7-1-cut');
      // 5. 门开了，走出去
      await ev(() => {
        const pt = window.__pt;
        const g = window.__game;
        g.player.pitch = 0;
        const d = g.doors[0];
        if (d.open < 0.9) pt.run(1.5);
        pt.walkTo(106, -20, 6, 0.3);
        pt.walkTo(106, -27.5, 6, 0.3);
      });
    }
  );
}

// ================================================================ 34 画后之室
// 拉杆（10 秒）让出口亮起来，却同时把出口所在的壁龛变成一幅“画”：空间门盖在真壁龛上，
// 你走不进去。可你自己开的传送门不认这幅画——趁壁龛还开着，把一扇门打在壁龛后墙上，
// 拉下拉杆，再从大厅另一面墙的白板走进去，就会从“画”的背后出现在亮着的出口里。
{
  const V = 100;
  add(
    {
      name: '画后之室',
      hint: '拉杆让出口亮了，壁龛却成了一幅画。画盖住的房间，真的不在了吗？',
      gun: 'both',
      killY: -20,
      spawn: { pos: [0, 0, 5.5], yaw: 0 },
      brushes: [
        // 大厅
        ...room([-7, 7], [0, 4.5], [-4, 7], {}, ['zn']),
        ...wallWithHoles('z', [-4.5, -4], [-7.5, 7.5], [0, 5], [[-1.1, 1.1, 0, 2.6]]),
        // 壁龛（深 3.4 米），后墙贴一块白板
        ...room([-1.1, 1.1], [0, 2.8], [-7.4, -4], {}, ['zp', 'ceil']),
        box(-1.6, 2.8, -7.9, 1.6, 3.3, -4), // 天花板不要伸出墙面
        { ...panelZ(-7.4, 1, [-1.1, 1.1], [0.2, 2.6]), color: 0xd2cdc2 },
        // 大厅东墙的白板
        { ...panelX(7, -1, [0, 3], [0.2, 2.6]), color: 0xd2cdc2 },
        // 蓝色大厅（“画”里的房间）：一块白板都没有
        ...room([V - 6, V + 6], [0, 4.5], [-8, 4], {}),
      ],
      entities: [
        { type: 'switch', id: 't', pos: [-4.2, 0, -3.4], yaw: 0, timer: 10 },
        { type: 'gateway', a: { pos: [0, 1.3, -4], normal: [0, 0, 1] }, b: { pos: [V, 1.3, 4], normal: [0, 0, -1] }, size: [2.2, 2.6], frame: false, when: ['t'] },
        // 画里的房间有一扇后门：画消失之后（拉杆的 10 秒过去）才开，把误入的人放回大厅西墙
        { type: 'gateway', a: { pos: [V - 5.98, 1.3, -2], normal: [1, 0, 0] }, b: { pos: [-6.98, 1.3, 3], normal: [1, 0, 0] }, size: [2, 2.6], frame: true, color: 0xffb347, oneWay: 'ab', when: ['!t'] },
        { ...exit(0, 0, -6.3, [2, 2.5, 2.2]), when: ['t'] },
        light(0, 4.2, 2, 34, { color: WARM, shadow: true }),
        light(0, 2.3, -5.6, 3, { color: AMBER, fixture: false, distance: 6 }),
        light(V, 4.2, -2, 24, { color: 0x6aa8ff }),
      ],
    },
    async ({ ev, shot }) => {
      await shot('c7-2-start');
      // 1. 趁壁龛还开着：蓝门打在龛后墙上，橙门打在东墙
      await ev(() => {
        const pt = window.__pt;
        if (!pt.fire('blue', [0, 1.4, -7.4])) throw new Error('蓝门没打上龛后墙');
        pt.walkTo(5, 1.5, 6, 0.3);
        if (!pt.fire('orange', [7, 1.4, 1.5])) throw new Error('橙门没打上东墙');
      });
      await shot('c7-2-portals');
      // 2. 拉杆：出口亮了，壁龛变成了画
      await ev(() => {
        const pt = window.__pt;
        pt.walkTo(-3.6, -1.5, 8, 0.3);
        pt.use([-4.2, 0.6, -3.4]);
        pt.run(0.5);
        if (!pt.state().signals.t) throw new Error('拉杆没有生效');
      });
      await shot('c7-2-lever');
      // 3. 从东墙的门走进去，从“画”的背后出来
      await ev(() => {
        const pt = window.__pt;
        pt.walkTo(5, 1.5, 6, 0.3);
        pt.walkDir(-90, 3, (g) => g.state !== 'playing');
        pt.run(0.5);
      });
    }
  );
}

// ================================================================ 35 清场
// 方块锁在栅栏笼里的踏板上，出口门要它“在笼里”才开；可过深渊的光桥要它压在对岸这边的踏板上才有。
// 同一个方块，得同时在两个地方。解法：先用后还——桥搭好、人过去之后，踩一下远岸的踏板，
// 消散力场就会把还压在桥头踏板上的方块销毁，它自己回到笼里的踏板上，大门随之打开。
{
  const ex = corridorNZ(0, -26.5, 1.5, 3, 5.5);
  const post = (x, z, h = 3) => glow(x - 0.05, 0, z - 0.05, x + 0.05, h, z + 0.05, CYAN, 1.5);
  add(
    {
      name: '清场',
      hint: '桥要方块压着才在，出口门却要方块回到笼子里。一个方块，怎么同时在两处？',
      gun: 'both',
      killY: -12,
      spawn: { pos: [0, 0, 12], yaw: 0 },
      brushes: [
        // 外壳（没有地板：近岸、深渊、远岸各自铺）
        ...room([-9, 9], [0, 6], [-26, 14], {}, ['floor', 'zn']),
        ...wallWithHoles('z', [-26.5, -26], [-9.5, 9.5], [0, 6.5], [[-1.5, 1.5, 0, 3]]),
        box(-9.5, -4.5, -6, 9.5, 0, 14.5, 'concrete'),
        box(-9.5, -4.5, -26.5, 9.5, 0, -14, 'concrete'),
        box(-9.5, -4.5, -14, 9.5, -4, -6, 'concrete'),
        box(-9.5, -4.5, -14, -9, 0, -6),
        box(9, -4.5, -14, 9.5, 0, -6),
        // 酸液（只是样子）
        { ...box(-9, -4, -14, 9, -1.0, -6, 'acid'), color: 0x2f9a6a, intensity: 0.1, deco: true },
        // 深渊边缘的警示灯带
        glow(-9, 0.005, -6.12, 9, 0.02, -6, 0x5ef0a0, 1.4),
        glow(-9, 0.005, -14, 9, 0.02, -13.88, 0x5ef0a0, 1.4),
        // 栅栏笼：东面是栅栏，顶上也是栅栏；后墙（x=-9）上有一块白板，子弹能穿过栅栏打到它
        box(-9, 0, 5.9, -5, 3.5, 6, 'metal'),
        box(-9, 0, 10, -5, 3.5, 10.1, 'metal'),
        box(-5.05, 0, 6, -5, 3.5, 10, 'grate'),
        box(-9, 3.5, 6, -5, 3.56, 10, 'grate'),
        panelX(-9, 1, [6.9, 9.1], [0.2, 2.6]),
        // 东墙上的白板
        panelX(9, -1, [5, 7.4], [0.2, 2.6]),
        ...ex.brushes,
        // 暖色 = 方块和大门；青色 = 桥、踏板、消散力场
        ...floorFrame(-7.6, 8, 0.7, AMBER),
        ...floorFrame(4, -3, 1.0, CYAN),
        ...floorFrame(0, -17, 1.0, CYAN),
        post(2.4, -4.6),
        post(5.6, -4.6),
        post(2.4, -1.4),
        post(5.6, -1.4),
        glow(-1.6, 3.1, -25.98, 1.6, 3.17, -25.94, AMBER, 1.6),
        // 桥的发射器
        { ...box(-0.9, 0, -5.9, 0.9, 0.12, -5.55), mat: 'plate' },
        glow(-0.9, 0.12, -5.9, 0.9, 0.15, -5.85, CYAN, 1.8),
        ...plant(-8.2, 12.8, 1.1),
        ...plant(8.2, 12.8, 1.1),
        ...plant(-8.2, -24.6, 1.1),
        ...plant(8.2, -24.6, 1.1),
      ],
      entities: [
        { type: 'button', id: 'p', pos: [-7.6, 0, 8] },
        { type: 'cube', pos: [-7.6, 0.46, 8] },
        { type: 'button', id: 'q', pos: [4, 0, -3] },
        { type: 'button', id: 'f', pos: [0, 0, -17] },
        { type: 'bridge', pos: [0, 0.15, -5.8], dir: [0, 0, -1], when: ['q'] },
        { type: 'fizzler', pos: [4, 1.5, -3], size: [3.2, 3, 3.2], when: ['f'] },
        { type: 'hazard', pos: [0, -1.5, -10], size: [18, 1.2, 8], hidden: true },
        { type: 'door', pos: [0, 1.5, -26.25], size: [3, 3, 0.3], requires: ['p'] },
        ...ex.entities,
        light(0, 5.8, 9, 30, { color: WARM, shadow: true }),
        light(0, 5.8, -2, 26, { color: WARM }),
        light(0, 5.8, -19, 30, { color: COOL, shadow: true }),
        light(-7, 2.8, 8, 7, { color: AMBER, fixture: false }),
        light(4, 2.4, -3, 7, { color: CYAN, fixture: false }),
        light(0, 2.4, -17, 6, { color: CYAN, fixture: false }),
        light(0, 2.6, -24.8, 8, { color: AMBER, fixture: false }),
      ],
    },
    async ({ ev, shot }) => {
      await shot('c7-3-start');
      // 1. 隔着栅栏把蓝门打到笼子后墙上，橙门打到东墙上
      await ev(() => {
        const pt = window.__pt;
        pt.walkTo(3, 9, 8, 0.3);
        if (!pt.fire('blue', [-9, 1.4, 8])) throw new Error('蓝门没打上笼子后墙');
        if (!pt.fire('orange', [9, 1.4, 6.2])) throw new Error('橙门没打上东墙');
      });
      await shot('c7-3-portals');
      // 2. 站在橙门前，把手伸进去，把笼子里的方块拽出来
      await ev(() => {
        const pt = window.__pt;
        const g = window.__game;
        pt.walkTo(7.9, 6.2, 8, 0.15);
        pt.face(9, 6.2);
        pt.run(0.3);
        const b = g.portals.blue.position.toArray();
        if (!pt.useVia(b, [-7.6, 0.5, 8])) throw new Error('没有把方块拽出来');
        pt.run(0.5);
        if (pt.state().signals.p) throw new Error('方块离开后踏板还亮着');
      });
      await shot('c7-3-pulled');
      // 3. 把方块带到桥头的踏板上放下，桥出现
      await ev(() => {
        const pt = window.__pt;
        const g = window.__game;
        pt.walkTo(5, 4, 8, 0.3);
        pt.drop(4, -3);
        pt.run(1.2);
        const s = pt.state();
        if (!s.signals.q) throw new Error('方块没压住桥头踏板：' + JSON.stringify(s.cubes));
        if (g.player.held) throw new Error('方块还在手里');
      });
      await shot('c7-3-bridge');
      // 4. 过桥，踩上远岸的踏板：力场启动，方块被销毁，回到笼子里
      await ev(() => {
        const pt = window.__pt;
        pt.walkTo(0, -3.5, 5, 0.3);
        pt.walkTo(0, -7, 5, 0.25);
        pt.walkTo(0, -13, 6, 0.3);
        pt.walkTo(0, -17, 6, 0.2);
        pt.run(1.2);
        const s = pt.state();
        if (!s.signals.f) throw new Error('远岸的踏板没踩住');
        if (!s.signals.p) throw new Error('方块没有回到笼子里：' + JSON.stringify(s.cubes));
      });
      await shot('c7-3-home');
      // 5. 大门开了
      await ev(() => {
        const pt = window.__pt;
        pt.run(1.2);
        pt.walkTo(0, -26, 6, 0.3);
        pt.walkTo(0, -30.4, 4, 0.3);
      });
    }
  );
}

// ================================================================ 36 扳机
// 弹射板对着一个 4.4 米高的石台，可它没有一点反应。站上弹射板，板子底下的踏板就把墙上的壁龛变成一扇窗，
// 窗里横着一道激光，更远的墙上挂着接收器——弹射板的电源就是它。手里的棱镜伸进窗去，截住激光，
// 光会顺着你的视线射出去：瞄准接收器，它一亮，弹射板就把站在上面的你自己弹上高台。
{
  const V = 100;
  const ex = exit(5.5, 4.4, -1, [2, 2.5, 2]);
  add(
    {
      name: '扳机',
      hint: '弹射板毫无反应。站上去，墙上的窗开了：窗里那道光，要照到哪儿才算数？',
      gun: 'none',
      killY: -20,
      spawn: { pos: [0, 0, 5.5], yaw: 0 },
      brushes: [
        // 大厅与壁龛
        ...room([-7, 7], [0, 9], [-4, 8], {}, ['zn']),
        ...wallWithHoles('z', [-4.5, -4], [-7.5, 7.5], [0, 9.5], [[-1.1, 1.1, 0, 2.6]]),
        // （自带的天花板会向大厅里多探出 0.5 米，起跳时会磕到头，所以天花板单独做，不伸出墙面）
        ...room([-1.1, 1.1], [0, 2.8], [-6.6, -4], {}, ['zp', 'ceil']),
        box(-1.6, 2.8, -7.1, 1.6, 3.3, -4),
        // 4.4 米的石台
        box(4.5, 0, -4, 7, 4.4, 2, 'concrete'),
        // 光束房间
        ...room([V - 6, V + 6], [0, 4.5], [-6, 4], {}),
        // 激光线下的地面灯带
        glow(V - 6, 0.01, 3.2, V + 6, 0.03, 3.3, AMBER, 1.2),
        // 琥珀色 = 同一路电：弹射板的圈、通向窗口的线、接收器的方框、激光的发射口
        ...floorFrame(0, -3, 0.98, AMBER),
        glow(-0.03, 0.01, -3.9, 0.03, 0.03, -3.0, AMBER, 1.5),
        glow(-1.18, 0, -3.97, -1.12, 2.68, -3.93, AMBER, 1.6),
        glow(1.12, 0, -3.97, 1.18, 2.68, -3.93, AMBER, 1.6),
        glow(-1.18, 2.62, -3.97, 1.18, 2.68, -3.93, AMBER, 1.6),
        ...wallFrameZ(V + 3.5, 1.6, 0.62, -6, 1, AMBER),
        { ...box(V - 6, 1.2, 3.0, V - 5.7, 2.0, 3.5), mat: 'plate' },
        ...plant(-6, 6.8, 1.2),
        ...plant(6, 6.8, 1.2),
        ...plant(6, -3.4, 0.8, 4.4),
      ],
      entities: [
        { type: 'cube', kind: 'prism', pos: [-3, 0.31, 3], yaw: 0 },
        { type: 'button', id: 'p', pos: [0, 0, -3.0] },
        { type: 'launcher', pos: [0, 0, -3.0], target: [5.5, 4.4, -1.0], time: 1.5, when: ['c'] },
        { type: 'gateway', a: { pos: [0, 1.3, -4], normal: [0, 0, 1] }, b: { pos: [V, 1.3, 4], normal: [0, 0, -1] }, size: [2.2, 2.6], frame: false, when: ['p'] },
        { type: 'laser', pos: [V - 5.55, 1.6, 3.25], dir: [1, 0, 0] },
        { type: 'catcher', id: 'c', pos: [V + 3.5, 1.6, -5.75], normal: [0, 0, 1] },
        ex,
        light(0, 8.6, 2, 52, { color: WARM, shadow: true }),
        light(0, 2.4, -6, 8, { color: AMBER, fixture: false }),
        light(5.5, 6.4, -1, 12, { color: WARM, fixture: false }),
        light(V, 4.2, -1, 26, { color: 0x8fc0ff }),
        light(V + 3.5, 2.6, -4.8, 7, { color: AMBER, fixture: false }),
      ],
    },
    async ({ ev, shot }) => {
      await shot('c7-4-start');
      // 1. 拿起棱镜，走上弹射板，窗打开了
      await ev(() => {
        const pt = window.__pt;
        const g = window.__game;
        pt.walkTo(-2.3, 3, 6, 0.3);
        if (!pt.use([-3, 0.4, 3])) throw new Error('没拿到棱镜');
        pt.walkTo(0, -3.0, 8, 0.1);
        g.player.yaw = 0;
        g.player.pitch = 0;
        pt.run(0.6);
        if (!pt.state().signals.p) throw new Error('窗没有打开');
      });
      await shot('c7-4-window');
      // 2. 一边转动视线一边看接收器：亮了，弹射板就把人弹上高台
      await ev(() => {
        const pt = window.__pt;
        const g = window.__game;
        let lit = null;
        for (let a = 0; a >= -50 && lit === null; a -= 0.5) {
          g.player.yaw = (a * Math.PI) / 180;
          g.debugRun(0.15);
          if (g.catchers[0].lit) lit = a;
        }
        if (lit === null) throw new Error('接收器没有被照亮');
        pt.run(2.5);
        if (g.state !== 'complete') throw new Error('没有飞上高台：' + JSON.stringify(pt.state()));
      });
    }
  );
}

// ================================================================ 37 升降机
// 出口门只认一块重型踏板，踏板却在 14 米高的石台顶上；这边只有一小块普通白板和一大块奶油色白板。
// 传送门两端的大小比，不光改变体型，还会乘到速度上：小口进、大口出，冲出去的速度是掉进去时的两倍多，
// 人也跟着被放大成巨人。台顶上等着一个巨大的方块，只有巨人才搬得动、也只有它压得住重型踏板。
// 可巨人钻不过出口的小门：回程从大口进、小口出，就变回原样。两扇门，就是一台电梯。
{
  const ex = corridorNZ(3, -8.5, 1.5, 3, 6);
  const stairs = [];
  for (let i = 0; i < 10; i++) stairs.push(box(-14, 0, 3, -12 + 0.6 * (9 - i), 0.3 * (i + 1), 8, 'concrete'));
  const TX0 = 18;
  const TX1 = 33; // 石台顶够宽：一路按住前进，落点也还在台顶上
  add(
    {
      name: '升降机',
      hint: '重型踏板在十几米的半空。地上两块白板，一小一大——它们为什么要不一样大？',
      gun: 'both',
      spawn: { pos: [-12, 3, 0], yaw: -90 },
      brushes: [
        ...room([-14, 44], [0, 34], [-8, 8], {}, ['zn']),
        ...wallWithHoles('z', [-8.5, -8], [-14.5, 44.5], [0, 34.5], [[1.5, 4.5, 0, 3]]),
        // 起点平台和台阶
        box(-14, 0, -8, -6, 3, 3, 'concrete'),
        ...stairs,
        // 两块白板：小的贴着平台边，大的（奶油色）在大厅中间
        panelY(0, 1, [-6, 1.2], [-1.5, 1.5]),
        panelY(0, 1, [1.5, 13.5], [-3.5, 3.5], 'whiteL'),
        // 石台和路缘
        box(TX0, 0, -4, TX1, 14, 4, 'concrete'),
        // 台顶的矮墙：巨人一碰，巨大的方块就会被推下台去（再也搬不回来）。北、东、南三面封死，
        // 西面留一个 3 米宽的缺口，巨人从那里走出去、跳下去
        box(TX0, 14, -4, TX1, 15.5, -3.7, 'concrete'),
        box(TX0, 14, 3.7, TX1, 15.5, 4, 'concrete'),
        box(TX1 - 0.3, 14, -3.7, TX1, 15.5, 3.7, 'concrete'),
        box(TX0, 14, -3.7, TX0 + 0.3, 15.5, -1.5, 'concrete'),
        box(TX0, 14, 1.5, TX0 + 0.3, 15.5, 3.7, 'concrete'),
        glow(TX0, 15.5, -3.9, TX1, 15.52, -3.8, AMBER, 1.2),
        glow(TX0, 15.5, 3.8, TX1, 15.52, 3.9, AMBER, 1.2),
        box(TX0 - 0.5, 0, -4, TX0, 0.9, 4, 'concrete'),
        ...ex.brushes,
        // 琥珀色的“电缆”：从出口门沿墙脚爬到石台脚下，再顺着石台一路亮到顶上的重型踏板
        glow(4.8, 0.005, -7.95, TX0 - 0.03, 0.025, -7.85, AMBER, 1.5),
        glow(TX0 - 0.1, 0.005, -7.95, TX0 - 0.03, 0.025, -3.9, AMBER, 1.5),
        glow(TX0 - 0.06, 0.005, -3.95, TX0, 14, -3.85, AMBER, 1.5),
        glow(TX0 - 0.06, 0.005, 3.85, TX0, 14, 3.95, AMBER, 1.5),
        ...floorFrame(TX0 + 6, 2.6, 1.7, AMBER, 14.012, 0.1),
        ...plant(-13.2, 7.0, 1, 3),
        ...plant(30, 7.2, 1.3),
        ...plant(30, -7.2, 1.3),
      ],
      entities: [
        { type: 'button', id: 'hb1', pos: [TX0 + 6, 14, 2.6], heavy: true },
        { type: 'door', pos: [3, 1.5, -8.25], size: [3, 3, 0.3], requires: ['hb1'] },
        { type: 'cube', pos: [TX0 + 7.5, 14.67, -2.4], scale: 2.2 },
        ...ex.entities,
        light(0, 33, 0, 110, { color: WARM, shadow: true, distance: 60 }),
        light(-9, 6, 0, 22, { color: WARM }),
        light(TX0 + 5, 19, 0, 70, { color: 0xffd9a0, distance: 34 }),
        light(TX0 + 5, 16, 3, 10, { color: AMBER, distance: 12, fixture: false }),
        light(3, 2.6, -7, 8, { color: AMBER, fixture: false }),
      ],
    },
    async ({ ev, shot }) => {
      await shot('c7-5-start');
      // 1. 在平台边上把两扇门开好：蓝（小）贴着平台脚下，橙（大）在大厅中间
      await ev(() => {
        const pt = window.__pt;
        const g = window.__game;
        pt.walkTo(-6.6, 0, 4, 0.2);
        g.player.yaw = -Math.PI / 2;
        g.player.pitch = 0;
        if (!pt.fire('blue', [-1.0, 0, 0])) throw new Error('蓝门没打上小白板');
        if (!pt.fire('orange', [4.6, 0, 0])) throw new Error('橙门没打上大白板');
      });
      await shot('c7-5-portals');
      // 2. 从平台边跑下去，掉进蓝门，从橙门冲上天；空中自己控制落点（落在石台上）
      const r = await ev(() => {
        const pt = window.__pt;
        const g = window.__game;
        const p = g.player;
        pt.walkTo(-7.5, 0, 4, 0.2);
        p.yaw = -Math.PI / 2;
        p.pitch = 0;
        let flown = false;
        let maxY = 0;
        for (let i = 0; i < 1500 && g.state === 'playing'; i++) {
          let mv = 1;
          if (p.scale > 1.5) {
            flown = true;
            maxY = Math.max(maxY, p.position.y);
            // 预测什么时候回到石台顶的高度，再决定是向前还是向后收油门
            const yTop = 14 + 0.92 * p.scale;
            const vy = p.velocity.y;
            const disc = vy * vy + 2 * 9.81 * (p.position.y - yTop);
            const tRem = disc > 0 ? (vy + Math.sqrt(disc)) / 9.81 : 0;
            const xPred = p.position.x + p.velocity.x * tRem;
            mv = xPred < 22.5 ? 1 : -1;
            if (p.grounded) break;
          }
          g.debugRun(1 / 60, { x: 0, y: mv });
        }
        return { flown, maxY, pos: p.position.toArray(), scale: p.scale, grounded: p.grounded };
      });
      await shot('c7-5-top');
      if (!r.flown || r.scale < 2 || r.pos[1] < 15 || r.pos[0] < 18) throw new Error('没有落在石台上：' + JSON.stringify(r));
      // 3. 在台顶抱起巨大的方块，放到重型踏板上
      await ev(() => {
        const pt = window.__pt;
        const g = window.__game;
        const p = g.player;
        pt.walkTo(23.2, -0.6, 5, 0.3);
        pt.face(25.5, -2.4);
        pt.run(0.3);
        if (!pt.use([25.5, 14.9, -2.4])) throw new Error('抱不起巨大的方块');
        pt.walkTo(24, -1.2, 5, 0.15);
        pt.face(24, 2.6);
        p.pitch = -0.45;
        pt.run(0.8);
        pt.use();
        pt.run(1.5);
        if (!pt.state().signals.hb1) throw new Error('重型踏板没有被压住：' + JSON.stringify(pt.state().cubes));
      });
      await shot('c7-5-button');
      // 4. 跳下石台，掉进大的橙门，从小的蓝门出来，变回原样
      const r2 = await ev(() => {
        const pt = window.__pt;
        const g = window.__game;
        const p = g.player;
        pt.walkTo(20, 0, 6, 0.3);
        p.yaw = Math.PI / 2;
        p.pitch = 0;
        for (let i = 0; i < 400 && g.state === 'playing'; i++) {
          g.debugRun(1 / 60, { x: 0, y: 1 });
          if (p.scale < 1.3) break;
        }
        const out = { scale: p.scale, pos: p.position.toArray(), signals: pt.state().signals };
        // 出来以后落到地面，沿着北墙走向出口门，避开地上的传送门
        for (let i = 0; i < 300 && !p.grounded; i++) g.debugRun(1 / 60, { x: 0, y: 0 });
        return out;
      });
      if (r2.scale > 1.3) throw new Error('没有缩回原样：' + JSON.stringify(r2));
      await ev(() => {
        const pt = window.__pt;
        pt.walkTo(-5, 5, 6, 0.3);
        pt.walkTo(-3, -5.5, 8, 0.4);
        pt.walkTo(3, -6, 6, 0.4);
        pt.walkTo(3, -9.5, 4, 0.3);
        pt.walkTo(3, -12.9, 6, 0.3);
      });
    }
  );
}

export default levels;
