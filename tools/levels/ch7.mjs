// 第 7 章：星球与重力。反重力区、侧墙行走、绕着小行星走、低重力的跳跃、连通两颗星球的空间门。
// 这一章里“上”不再固定：站在哪里，脚下就是地面。
import { box, room, wallWithHoles, light, exit, sphere, spherePad } from '../levelkit.mjs';

const levels = [];
const L = (def, solve) => levels.push({ def, solve });
const SPACE = (extra = {}) => ({ kind: 'space', hemi: 0.4, ...extra });

// ---------------------------------------------------------------- 倒立之屋
L(
  {
    name: '倒立之屋',
    hint: '半透明的蓝色力场里重力是反的：踏进去，你会“掉”向天花板。墙上的缺口开在高处，沿着天花板走过去。',
    gun: 'none',
    spawn: { pos: [-7, 0, 0], yaw: -90 },
    brushes: [
      ...room([-9, 9], [0, 6], [-6, 6]),
      // 中间的隔墙，只在靠近天花板的地方留了个口子
      ...wallWithHoles('x', [-1, 0], [-6, 6], [0, 6], [[-1.5, 1.5, 4, 6]]),
    ],
    entities: [
      { type: 'gravity', shape: 'box', pos: [-5, 3, 0], size: [8, 6, 12], dir: [0, 1, 0] },
      exit(6, 0, 0),
      light(-5, 5.8, 0, 40, { shadow: true }),
      light(5, 5.8, 0, 40),
    ],
  },
  async ({ ev, shot }) => {
    await ev(() => window.__pt.run(1.6)); // 往上掉
    await shot('c7-1-ceiling');
    await ev(() => {
      const pt = window.__pt;
      pt.walkWorld([-0.5, 5.0, 0], 6, 0.4);
      pt.walkWorld([3, 0.9, 0], 8, 0.6);
      pt.walkWorld([6, 0.9, 0], 8, 0.5);
    });
  }
);

// ---------------------------------------------------------------- 滚筒隧道
{
  // 沿 -z 方向的方形隧道，每一段的“地面”不一样：地板、右墙、天花板、左墙、再回到地板
  const zones = [
    { z: -16, dir: [1, 0, 0] },
    { z: -28, dir: [0, 1, 0] },
    { z: -40, dir: [-1, 0, 0] },
  ];
  L(
    {
      name: '滚筒隧道',
      hint: '每一段隧道的重力都转了 90°，脚下的“地面”会换到墙上、天花板上。酸液池躺在当前的地面上，从没有酸液的那一半走。',
      gun: 'none',
      spawn: { pos: [1.5, 0, 0], yaw: 0 },
      brushes: [...room([-2.5, 2.5], [0, 5], [-58, 2])],
      entities: [
        ...zones.map((q) => ({ type: 'gravity', shape: 'box', pos: [0, 2.5, q.z], size: [5, 5, 12], dir: q.dir })),
        { type: 'hazard', pool: true, pos: [-1, 0.5, -5], size: [3, 1, 3] },
        { type: 'hazard', pool: true, up: [-1, 0, 0], pos: [2, 1.5, -16], size: [1, 3, 3] },
        { type: 'hazard', pool: true, up: [0, -1, 0], pos: [1, 4.5, -28], size: [3, 1, 3] },
        { type: 'hazard', pool: true, up: [1, 0, 0], pos: [-2, 3.5, -40], size: [1, 3, 3] },
        exit(0, 0, -55.4, [3.4, 2.5, 2]),
        light(0, 4.8, -4, 22),
        light(0, 4.8, -16, 22, { color: 0xbfe6ff }),
        light(0, 4.8, -28, 22),
        light(0, 4.8, -40, 22, { color: 0xbfe6ff }),
        light(0, 4.8, -52, 22),
      ],
    },
    async ({ ev, shot }) => {
      await ev(() => {
        const pt = window.__pt;
        pt.walkWorld([1.5, 0.9, -2], 4, 0.4);
        pt.walkWorld([1.5, 0.9, -8], 6, 0.5);
      });
      await shot('c7-2-wall');
      await ev(() => {
        const pt = window.__pt;
        pt.walkWorld([1.6, 4.0, -13], 8, 0.5);
        pt.walkWorld([1.6, 4.0, -19], 8, 0.5);
        pt.walkWorld([1.6, 4.0, -23], 6, 0.5);
      });
      await shot('c7-2-ceiling');
      await ev(() => {
        const pt = window.__pt;
        pt.walkWorld([-1.5, 4.1, -25], 6, 0.5);
        pt.walkWorld([-1.5, 4.1, -31], 8, 0.5);
        pt.walkWorld([-1.5, 4.1, -35], 6, 0.5);
        pt.walkWorld([-1.6, 1.0, -38], 6, 0.5);
        pt.walkWorld([-1.6, 1.0, -43], 8, 0.5);
        pt.walkWorld([-1.6, 1.0, -47], 6, 0.5);
        pt.walkWorld([0, 0.9, -53], 12, 0.6);
        pt.walkWorld([0, 0.9, -55.4], 6, 0.4);
      });
    }
  );
}

// ---------------------------------------------------------------- 小行星
{
  const R = 6;
  const sup = (dir, d) => dir.map((v) => v * d);
  L(
    {
      name: '小行星',
      hint: '在球形的小行星上，“地面”永远是脚下的那一面，你可以一直走到背面。把方块带到南极的按钮上，北极的出口才会打开。',
      gun: 'none',
      killR: 80,
      gravityMag: 0,
      sky: SPACE({ sun: { dir: [0.5, 0.45, -0.75] } }),
      spawn: { pos: [0, R, 2], yaw: 0 },
      brushes: [sphere(0, 0, 0, R, 'concrete', 0xc9a27a)],
      entities: [
        { type: 'gravity', shape: 'sphere', pos: [0, 0, 0], radius: 11 },
        { type: 'cube', pos: [0, R + 1.5, -1.5] },
        { type: 'button', id: 'b1', pos: [0, -R, 0], up: [0, -1, 0] },
        { type: 'exit', pos: [0, R + 0.3, -3.2], size: [2.4, 2.4, 2.4], when: ['b1'] },
        // 赤道上的四摊酸液
        ...[
          [1, 0, 0],
          [-1, 0, 0],
          [0, 0, 1],
          [0, 0, -1],
        ].map((d) => ({ type: 'hazard', pool: true, up: d, pos: sup(d, R + 0.4), size: Math.abs(d[0]) ? [1.6, 3, 3] : [3, 3, 1.6] })),
        light(9, 12, 6, 150, { distance: 60, fixture: false }),
        light(-8, -10, -6, 60, { distance: 50, fixture: false, color: 0x9fb4ff }),
      ],
    },
    async ({ ev, shot }) => {
      await shot('c7-3-start');
      await ev(() => {
        const pt = window.__pt;
        pt.run(0.5);
        const c = window.__game.cubes[0].position;
        pt.walkWorld([c.x, c.y, c.z], 5, 1.7);
        if (!pt.use([c.x, c.y, c.z])) throw new Error('没拿到方块');
        // 绕到南极，避开赤道上的酸液
        pt.walkWorld([4.2, 0, 4.2], 12, 0.8);
        pt.walkWorld([0.5, -5.9, 3.5], 12, 0.8);
        pt.walkWorld([0, -5.9, 1.4], 6, 0.3);
        window.__game.player.pitch = -0.6;
        pt.run(0.8);
        pt.use();
        pt.run(1.5);
      });
      await shot('c7-3-south');
      await ev(() => {
        const pt = window.__pt;
        window.__game.player.pitch = 0;
        pt.walkWorld([4.2, 0, 4.2], 12, 0.8);
        pt.walkWorld([0, 6.9, -3.2], 14, 0.5);
      });
    }
  );
}

// ---------------------------------------------------------------- 双星跳
{
  const A = [0, 0, 0];
  const B = [11.5, 2.5, 0];
  const C = [23, -1.5, 3];
  const g = 0.3;
  L(
    {
      name: '双星跳',
      hint: '小行星的重力很弱，一跳就能飞出很远。从一颗星的边缘冲出去，在空中靠近另一颗星，就会被它的引力接住。别跳歪了，宇宙里没有地板。',
      gun: 'none',
      killR: 70,
      gravityMag: 0,
      sky: SPACE({ sun: { dir: [-0.3, 0.6, -0.7] }, nebA: 0x7a1f5a, nebB: 0x1f4f8c }),
      spawn: { pos: [0, 4, 0], yaw: -90 },
      brushes: [sphere(...A, 4, 'concrete', 0xd6a77a), sphere(...B, 3.2, 'concrete', 0x7fb88f), sphere(...C, 4, 'concrete', 0xb98fd6)],
      entities: [
        { type: 'gravity', shape: 'sphere', pos: A, radius: 8.2, g },
        { type: 'gravity', shape: 'sphere', pos: B, radius: 7.4, g },
        { type: 'gravity', shape: 'sphere', pos: C, radius: 8.2, g },
        { type: 'exit', pos: [C[0] + 4.3, C[1], C[2]], size: [2.4, 2.4, 2.4], up: [1, 0, 0] },
        light(5, 12, 10, 160, { distance: 60, fixture: false }),
        light(20, 10, -8, 100, { distance: 60, fixture: false, color: 0xffd9a8 }),
      ],
    },
    async ({ ev, shot }) => {
      await ev(() => {
        const pt = window.__pt;
        pt.run(0.4);
        // 转到 A 的“赤道”上（朝着 B 的方向），再助跑
        pt.walkWorld([4, 0, 0], 4, 0.3);
      });
      await shot('c7-4-a');
      await ev(() => {
        const pt = window.__pt;
        const g = window.__game;
        const pl = g.player;
        const B = [11.5, 2.5, 0];
        for (let k = 0; k < 90 && g.state === 'playing'; k++) {
          pt.lookAtWorld(B);
          pl.pitch = 0;
          g.debugRun(1 / 20, { x: 0, y: 1 }, k === 6);
        }
        pt.run(0.4);
      });
      await shot('c7-4-b');
      await ev(() => {
        const pt = window.__pt;
        const g = window.__game;
        const pl = g.player;
        const C = [23, -1.5, 3];
        pt.walkWorld([11.5 + 3.2, 2.5, 0], 4, 0.3);
        for (let k = 0; k < 90 && g.state === 'playing'; k++) {
          pt.lookAtWorld(C);
          pl.pitch = 0;
          g.debugRun(1 / 20, { x: 0, y: 1 }, k === 6);
        }
        pt.run(0.4);
        pt.walkWorld([27.3, -1.5, 3], 8, 0.4);
      });
    }
  );
}

// ---------------------------------------------------------------- 星门
{
  const R = 6;
  const A = [0, 0, 0];
  const B = [40, 0, 0];
  const pool = (c, d) => ({ type: 'hazard', pool: true, up: d, pos: [c[0] + d[0] * (R + 0.4), c[1] + d[1] * (R + 0.4), c[2] + d[2] * (R + 0.4)], size: d[0] ? [1.6, 3, 3] : [3, 3, 1.6] });
  L(
    {
      name: '星门',
      hint: '两颗星球之间隔着很远，但有一扇门连着它们：从这颗星的北极进去，从那颗星的南极出来——头朝下，别慌，重力会把你转过来。出口要等另一颗星上的按钮被压住才开。',
      gun: 'none',
      killR: 120,
      gravityMag: 0,
      sky: SPACE({ sun: { dir: [0.2, 0.6, 0.75] }, nebA: 0x1f6a7a, nebB: 0x4a1f7a }),
      spawn: { pos: [0, 5.4, 2.6], yaw: 0 },
      brushes: [sphere(...A, R, 'concrete', 0x9cc2d6), sphere(...B, R, 'concrete', 0xd69c9c)],
      entities: [
        { type: 'gravity', shape: 'sphere', pos: A, radius: 11 },
        { type: 'gravity', shape: 'sphere', pos: B, radius: 11 },
        {
          type: 'gateway',
          a: { pos: [0, R + 1.5, 0], normal: [0, 0, 1], up: [0, 1, 0] },
          b: { pos: [40, -(R + 1.5), 0], normal: [0, 0, -1], up: [0, -1, 0] },
          size: [2.2, 3],
          frame: true,
        },
        { type: 'cube', pos: [2.4, 5.4, 2.6] },
        { type: 'button', id: 'b1', pos: [40, R, 0], up: [0, 1, 0] },
        { type: 'exit', pos: [0, 4.7, 5.0], size: [2.4, 2.4, 2.4], when: ['b1'] },
        pool(A, [1, 0, 0]),
        pool(A, [-1, 0, 0]),
        pool(B, [1, 0, 0]),
        pool(B, [-1, 0, 0]),
        pool(B, [0, 0, 1]),
        pool(B, [0, 0, -1]),
        light(10, 14, 10, 160, { distance: 70, fixture: false }),
        light(48, 14, -10, 160, { distance: 70, fixture: false, color: 0xffd9c0 }),
      ],
    },
    async ({ ev, shot }) => {
      await ev(() => {
        const pt = window.__pt;
        pt.run(0.5);
        const c = window.__game.cubes[0].position;
        pt.walkWorld([c.x, c.y, c.z], 5, 1.7);
        if (!pt.use([c.x, c.y, c.z])) throw new Error('没拿到方块');
        pt.walkWorld([0, 6, 1.5], 4, 0.4);
        pt.walkWorld([0, 6, -6], 5, 0.1, 1, 0, (g) => g.player.position.x > 20);
        pt.run(1.0);
      });
      await shot('c7-5-arrive');
      await ev(() => {
        const pt = window.__pt;
        const g = window.__game;
        if (g.player.position.x < 20) throw new Error('没过去：' + g.player.position.toArray());
        // 在 B 星上绕过赤道上的酸液，走到北极，把方块放到按钮上
        pt.walkWorld([40, -6.9, -3.5], 4, 0.3);
        pt.walkWorld([44.2, 0, -4.2], 14, 0.9);
        pt.walkWorld([40, 5.9, 1.4], 14, 0.3);
        g.debugAimAt([40, 6.0, 0]);
        g.player.pitch = -0.6;
        pt.run(0.8);
        pt.use();
        pt.run(1.6);
        g.player.pitch = 0;
      });
      await shot('c7-5-button');
      await ev(() => {
        const pt = window.__pt;
        pt.walkWorld([44.2, 0, -4.2], 14, 0.9);
        // 回到南极的门前，从正面穿回去
        pt.walkWorld([40, -6.9, -3.5], 14, 0.4);
        pt.walkWorld([40, -6.9, 3], 6, 0.1, 1, 0, (g) => g.player.position.x < 20);
        pt.run(0.8);
        if (window.__game.player.position.x > 20) throw new Error('没回来');
        pt.walkWorld([0, 4.4, 5.0], 14, 0.5);
      });
    }
  );
}

export default levels;
