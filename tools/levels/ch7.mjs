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
      hint: '松开踏板，门依然开着——是谁在替你撑着？出口那扇门，似乎有它自己的脾气。',
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
        ...wallFrameZ(X, 2.3, 0.72, -24, 1, AMBER),
        glow(X + 4.5, 3.1, -23.98, X + 7.5, 3.17, -23.94, AMBER, 1.6),
        glow(X - 0.5, 1.9, -12.5, X + 0.5, 1.93, -11.5, AMBER, 1.2),
        // 激光发射器
        { ...box(-0.3, 1.9, 13.55, 0.3, 2.7, 14), mat: 'plate' },
        ...plant(-6.2, 12.6, 1),
        ...plant(6.2, 12.6, 1),
        ...plant(X - 10.8, -22.6, 1.1),
        ...plant(X + 10.8, -22.6, 1.1),
      ],
      entities: [
        { type: 'gateway', a: { pos: [0, 1.5, 0], normal: [0, 0, 1] }, b: { pos: [X, 1.5, 0], normal: [0, 0, -1] }, size: [2, 3], frame: false, when: ['s'] },
        { type: 'button', id: 's', pos: [-4, 0, 5] },
        { type: 'cube', pos: [3, 0.31, 9] },
        { type: 'laser', pos: [0, 2.3, 13.7], dir: [0, 0, -1] },
        { type: 'catcher', id: 's', pos: [X, 2.3, -23.95], normal: [0, 0, 1] },
        { type: 'door', pos: [X + 6, 1.5, -24.25], size: [3, 3, 0.3], requires: ['!s'] },
        ...ex.entities,
        light(0, 4.6, 8, 26, { color: WARM, shadow: true }),
        light(0, 4.6, 2, 16, { color: WARM }),
        light(-4, 1.2, 5, 5, { color: AMBER, fixture: false, distance: 7 }),
        light(X, 4.6, -8, 26, { color: COOL, shadow: true }),
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

export default levels;
