// 第 2 章：非欧空间。空间门（gateway）把相距很远的地方无缝接在一起：
// 小屋里面比外面大、同一扇门通往不同的房间、小窗户只能伸手和开枪……
import { box, room, wallWithHoles, panelX, panelZ, light, doorWallAndCorridor } from '../levelkit.mjs';

const levels = [];
const L = (def, solve) => levels.push({ def, solve });

// ---------------------------------------------------------------- 小屋大有乾坤
{
  const d = doorWallAndCorridor(10, [-10, 10], [0, 7], 1.5, 3, 6, ['b1', 'b2']);
  L(
    {
      name: '小屋大有乾坤',
      hint: '实验室正中间那间小屋，走进去看看。两个按钮都要压上方块才能开门。传送门也能隔着空间门打出去。',
      gun: 'both',
      spawn: { pos: [0, 0, 7], yaw: 0 },
      brushes: [
        ...room([-10, 10], [0, 7], [-10, 10], {}, ['xp']),
        ...d.brushes,
        // 左边的高架子，上面放着一个方块
        box(-10, 0, -6, -7, 4, 0),
        panelX(-10, 1, [-5.5, -0.5], [4.05, 6.95]),
        panelZ(10, -1, [-4, 4], [0, 4]),
        // 小屋：外面只有 3 米见方
        box(-1.6, 0, -3.2, 1.6, 3.4, -2.9),
        box(-1.6, 0, -2.9, -1.3, 3.4, -0.3),
        box(1.3, 0, -2.9, 1.6, 3.4, -0.3),
        box(-1.3, 3.1, -2.9, 1.3, 3.4, -0.3),
        ...wallWithHoles('z', [-0.3, 0], [-1.6, 1.6], [0, 3.4], [[-1, 1, 0, 2.6]]),
        // 小屋里面：一座大厅
        ...room([88, 112], [0, 14], [-30, 0], {}, ['zp']),
        ...wallWithHoles('z', [0, 0.5], [87.5, 112.5], [0, 14], [[99, 101, 0, 2.6]]),
        box(98.5, 0, 0.5, 101.5, 3, 1.5),
        box(88, 0, -30, 112, 8, -24),
        panelZ(-30, 1, [96, 104], [8.05, 13.5]),
        box(88, 0, -24, 89, 8, -23.6, 'concrete'),
      ],
      entities: [
        { type: 'gateway', a: { pos: [0, 1.3, 0], normal: [0, 0, 1] }, b: { pos: [100, 1.3, 0], normal: [0, 0, -1] }, size: [2, 2.6] },
        { type: 'cube', pos: [-8.3, 4.35, -5] },
        { type: 'cube', pos: [105, 8.35, -27] },
        { type: 'button', id: 'b1', pos: [6, 0, -3.5] },
        { type: 'button', id: 'b2', pos: [6, 0, 3.5] },
        ...d.entities,
        light(0, 6.8, 3, 55, { shadow: true }),
        light(-6, 6.8, -5, 30),
        light(100, 13.7, -12, 140, { shadow: true, distance: 40 }),
        light(100, 13.7, -27, 70, { distance: 30 }),
        light(100, 6, -3, 25, { distance: 18 }),
      ],
    },
    async ({ ev, shot }) => {
      await shot('c2-1-start');
      // 1. 先拿架子上的方块
      await ev(() => {
        const pt = window.__pt;
        pt.fire('blue', [-10, 5.5, -3]);
        pt.fire('orange', [0, 1.5, 10]);
        pt.walkTo(0, 8.6, 5, 0.2);
        pt.walkDir(180, 3, (g) => g.player.position.y > 3);
        pt.run(0.6);
        pt.walkTo(-8.3, -3.6, 4, 0.2);
        if (!pt.use([-8.3, 4.3, -5])) throw new Error('没拿到架子上的方块');
        pt.walkTo(-4, -3, 4);
        pt.run(1);
        pt.drop(6, -3.5);
      });
      // 2. 走进小屋，在大厅里把蓝门开到高台上
      await ev(() => {
        const pt = window.__pt;
        pt.walkTo(0, 2.5, 6, 0.2);
        pt.walkDir(0, 3, (g) => g.player.position.x > 50);
        pt.run(0.5);
      });
      await shot('c2-1-hall');
      await ev(() => {
        const pt = window.__pt;
        pt.fire('blue', [100, 10, -30]);
        pt.walkTo(100, -2, 4, 0.2);
        pt.walkDir(180, 3, (g) => g.player.position.x < 50);
        pt.walkTo(0, 8.6, 5, 0.2);
        pt.walkDir(180, 3, (g) => g.player.position.y > 5);
        pt.run(0.6);
        pt.walkTo(104, -25.6, 4, 0.2);
        if (!pt.use([105, 8.3, -27])) throw new Error('没拿到大厅里的方块');
        pt.walkTo(100, -18, 5);
        pt.run(1.2);
        pt.walkTo(100, -2, 6, 0.2);
        pt.walkDir(180, 3, (g) => g.player.position.x < 50);
        pt.run(0.3);
        pt.drop(6, 3.5);
      });
      await shot('c2-1-buttons');
      await ev(() => {
        const pt = window.__pt;
        pt.walkTo(8, 0, 5);
        pt.walkTo(15, 0, 6);
      });
    }
  );
}

// ---------------------------------------------------------------- 同一扇门
{
  const d = doorWallAndCorridor(126, [-6, 6], [0, 5], 1.5, 3, 6, ['b2']);
  const alcove = (x, z0, z1) => box(x - 1.5, 0, z0, x + 1.5, 3.3, z1);
  L(
    {
      name: '同一扇门',
      hint: '这扇门通往哪里，取决于门边的按钮有没有被压住。你自己开的传送门可不管这些。',
      gun: 'both',
      spawn: { pos: [3, 0, 2], yaw: 0 },
      brushes: [
        // 起点房间
        ...room([-6, 6], [0, 5], [-6, 6], {}, ['zn']),
        ...wallWithHoles('z', [-6.5, -6], [-6.5, 6.5], [0, 5], [[-1, 1, 0, 2.8]]),
        alcove(0, -7.5, -6.5),
        panelZ(6, -1, [-2.5, 2.5], [0, 3.4]),
        // 仓库
        ...room([54, 66], [0, 6], [-6, 6], {}, ['zp']),
        ...wallWithHoles('z', [6, 6.5], [53.5, 66.5], [0, 6], [[59, 61, 0, 2.8]]),
        alcove(60, 6.5, 7.5),
        box(54, 0, -6, 66, 3.5, -2),
        panelZ(-6, 1, [57, 63], [3.6, 5.95]),
        // 出口房间
        ...room([114, 126], [0, 5], [-6, 6], {}, ['zp', 'xp']),
        ...wallWithHoles('z', [6, 6.5], [113.5, 126.5], [0, 5], [[119, 121, 0, 2.8]]),
        alcove(120, 6.5, 7.5),
        ...d.brushes,
        panelX(114, 1, [-3, 3], [0, 3.4]),
      ],
      entities: [
        { type: 'gateway', a: { pos: [0, 1.4, -6], normal: [0, 0, 1] }, b: { pos: [60, 1.4, 6], normal: [0, 0, -1] }, size: [2, 2.8], when: ['!b1'] },
        { type: 'gateway', a: { pos: [0, 1.4, -6], normal: [0, 0, 1] }, b: { pos: [120, 1.4, 6], normal: [0, 0, -1] }, size: [2, 2.8], when: ['b1'] },
        { type: 'button', id: 'b1', pos: [0, 0, 4.9] },
        { type: 'cube', pos: [64, 3.85, -4] },
        { type: 'button', id: 'b2', pos: [121, 0, -3] },
        ...d.entities,
        light(0, 4.8, 0, 40, { shadow: true }),
        light(60, 5.8, 0, 45, { shadow: true, color: 0xd8e6ff }),
        light(120, 4.8, 0, 40, { shadow: true, color: 0xffe2c0 }),
      ],
    },
    async ({ ev, shot }) => {
      // 1. 门通往仓库：在仓库里把蓝门开到高台上，橙门隔着门开到起点房间
      await ev(() => {
        const pt = window.__pt;
        pt.walkTo(0, -4, 5, 0.2);
        pt.walkDir(0, 3, (g) => g.player.position.x > 30);
        pt.run(0.4);
        pt.fire('blue', [60, 4.8, -6]);
        pt.walkTo(60, 3.2, 3, 0.2);
        pt.fireVia('orange', [0, 1.4, -6], [0, 1.4, 6]);
      });
      await shot('c2-2-store');
      await ev(() => {
        const pt = window.__pt;
        pt.walkTo(60, 4.6, 3, 0.2);
        pt.walkDir(180, 3, (g) => g.player.position.x < 30);
        pt.walkTo(0, 4.4, 5, 0.2);
        pt.walkDir(180, 3, (g) => g.player.position.x > 30);
        pt.run(0.6);
        pt.walkTo(63, -3.2, 3, 0.2);
        if (!pt.use([64, 3.8, -4])) throw new Error('没拿到方块');
        pt.walkTo(60, 1, 4);
        pt.run(1);
        pt.walkTo(60, 4.6, 4, 0.2);
        pt.walkDir(180, 3, (g) => g.player.position.x < 30);
        pt.run(0.2);
        pt.drop(0, 4.9);
      });
      const s = await ev(() => window.__pt.state());
      if (!s.signals.b1) throw new Error('按钮没压上');
      // 2. 门现在通往出口房间。在那里开橙门，蓝门隔着门开回起点房间，伸手把方块拿过来
      await ev(() => {
        const pt = window.__pt;
        pt.walkTo(0, -4, 5, 0.2);
        pt.walkDir(0, 3, (g) => g.player.position.x > 90);
        pt.run(0.4);
        pt.fire('orange', [114, 1.5, 0]);
        pt.walkTo(120, 3.5, 3, 0.2);
        pt.fireVia('blue', [0, 1.4, -6], [0, 1.4, 6]);
      });
      await shot('c2-2-exitroom');
      await ev(() => {
        const pt = window.__pt;
        pt.walkTo(115.1, 0, 5, 0.15);
        const b = window.__game.portals.blue.position.toArray();
        if (!pt.useVia(b, [0, 0.35, 4.9])) throw new Error('没能隔着门拿到方块');
        pt.walkTo(118, 0, 3);
        pt.drop(121, -3);
        pt.walkTo(124, 0, 4);
        pt.walkTo(131, 0, 6);
      });
    }
  );
}

// ---------------------------------------------------------------- 窥视孔
{
  const d = doorWallAndCorridor(7, [-7, 7], [0, 6], 1.5, 3, 6, ['b1']);
  L(
    {
      name: '窥视孔',
      hint: '小窗户太小，人钻不过去，但手能伸进去，传送门也能打过去。',
      gun: 'both',
      spawn: { pos: [4, 0, 4], yaw: 0 },
      brushes: [
        ...room([-7, 7], [0, 6], [-7, 7], {}, ['xp']),
        ...d.brushes,
        panelX(-7, 1, [-3, 3], [0, 3.4]),
        // 玻璃小隔间，方块关在里面
        box(-1.3, 0, 0.9, 1.1, 2.2, 1, 'glass'),
        box(-1.3, 0, 3, 1.1, 2.2, 3.1, 'glass'),
        box(1, 0, 1, 1.1, 2.2, 3, 'glass'),
        box(-1.3, 0, 1, -1, 2.2, 3),
        box(-1.3, 2.2, 0.9, 1.1, 2.3, 3.1, 'glass'),
        // 远处的房间
        ...room([94, 106], [0, 6], [-7, 7]),
        panelZ(-7, 1, [97, 103], [0, 3.5]),
      ],
      entities: [
        { type: 'gateway', a: { pos: [0, 1.8, -7], normal: [0, 0, 1] }, b: { pos: [100, 1.8, 7], normal: [0, 0, -1] }, size: [1, 1], frame: true },
        { type: 'gateway', a: { pos: [3, 0.65, 7], normal: [0, 0, -1] }, b: { pos: [-1, 0.65, 2], normal: [1, 0, 0] }, size: [1, 1], frame: true },
        { type: 'cube', pos: [-0.3, 0.35, 2] },
        { type: 'button', id: 'b1', pos: [97, 0, -2] },
        ...d.entities,
        light(0, 5.8, 0, 45, { shadow: true }),
        light(0, 2.1, 2, 4, { fixture: false, distance: 4 }),
        light(100, 5.8, 0, 45, { shadow: true, color: 0xd8e6ff }),
      ],
    },
    async ({ ev, shot }) => {
      await ev(() => {
        const pt = window.__pt;
        pt.walkTo(3, 6.2, 5, 0.15);
        if (!pt.useVia([-1, 0.65, 2], [-0.3, 0.35, 2])) throw new Error('手没伸进窗户');
        pt.walkTo(2, 3, 3);
        pt.walkTo(-3, -2, 4);
        pt.run(0.5);
        pt.use();
        pt.run(0.5);
      });
      await shot('c2-3-cube');
      await ev(() => {
        const pt = window.__pt;
        pt.fire('blue', [-7, 1.5, 0]);
        pt.walkTo(0, 3, 4, 0.15);
        pt.fireVia('orange', [100, 1.8, 7], [100, 1.5, -7]);
      });
      await shot('c2-3-portals');
      await ev(() => {
        const pt = window.__pt;
        const c = window.__game.cubes[0].position;
        pt.walkTo(c.x + 1.2, c.z, 5, 0.2);
        if (!pt.use([c.x, c.y, c.z])) throw new Error('没拿起方块');
        pt.walkTo(-5.5, 0, 5, 0.2);
        pt.walkDir(90, 3, (g) => g.player.position.x > 50);
        pt.run(0.4);
        pt.drop(97, -2);
        pt.walkTo(100, -5.6, 5, 0.2);
        pt.walkDir(0, 3, (g) => g.player.position.x < 50);
        pt.run(0.4);
        pt.walkTo(9, 0, 6);
        pt.walkTo(12, 0, 6);
      });
    }
  );
}

// ---------------------------------------------------------------- 无底洞
{
  L(
    {
      name: '无底洞',
      hint: '地上那个洞通往哪里，取决于开关。开关亮着的几秒钟里，洞会接到正上方的天花板。',
      gun: 'both',
      spawn: { pos: [0, 0, 4], yaw: 90 },
      fog: { color: 0x07090b, near: 14, far: 70 },
      brushes: [
        ...room([-6, 6], [0, 8], [-6, 6], {}, ['floor']),
        ...wallWithHoles('y', [-0.5, 0], [-6.5, 6.5], [-6.5, 6.5], [[-4.2, -1.8, -1.2, 1.2]], 'concrete'),
        // 洞底下留一圈空隙，人掉进去不会卡在边上
        box(-5.2, -3, -2.2, -0.8, -2.5, 2.2, 'concrete'),
        box(-5.2, -2.5, -2.2, -4.7, -0.5, 2.2),
        box(-1.3, -2.5, -2.2, -0.8, -0.5, 2.2),
        box(-4.7, -2.5, -2.2, -1.3, -0.5, -1.7),
        box(-4.7, -2.5, 1.7, -1.3, -0.5, 2.2),
        // 东边的高台和开关
        box(3, 0, -6, 6, 5, 6),
        panelX(6, -1, [-2, 2], [5.05, 7.95]),
        panelX(-6, 1, [-2, 2], [0, 3.4]),
        // 洞的另一头：一间横着的大房间，下面是酸液
        ...room([100, 140], [0, 10], [-5, 5], {}, ['floor']),
        box(99.5, -2, -5.5, 118, -1.5, 5.5, 'concrete'),
        box(118, -2, -5.5, 140.5, 0, 5.5, 'concrete'),
        box(99.5, -1.5, -5.5, 100, 0, 5.5),
        box(100, -1.5, -5.5, 118, 0, -5),
        box(100, -1.5, 5, 118, 0, 5.5),
        // 洞口罩着一圈玻璃，只能从西边钻进去
        box(-4.1, 0.02, -1.1, -1.9, 8, -1, 'glass'),
        box(-4.1, 0.02, 1, -1.9, 8, 1.1, 'glass'),
        box(-2, 0.02, -1, -1.9, 8, 1, 'glass'),
        box(-4.1, 2.4, -1, -4, 8, 1, 'glass'),
      ],
      entities: [
        { type: 'gateway', a: { pos: [-3, 0, 0], normal: [0, 1, 0], up: [0, 0, -1] }, b: { pos: [-3, 8, 0], normal: [0, -1, 0], up: [0, 0, -1] }, size: [2.4, 2.4], when: ['s1'] },
        { type: 'gateway', a: { pos: [-3, 0, 0], normal: [0, 1, 0], up: [0, 0, -1] }, b: { pos: [100, 6, 0], normal: [1, 0, 0] }, size: [2.4, 2.4], when: ['!s1'] },
        { type: 'switch', id: 's1', pos: [4.5, 5, -3], yaw: 90, timer: 4 },
        { type: 'hazard', pos: [109, -0.9, 0], size: [18, 1.2, 10] },
        { type: 'exit', pos: [136, 1.25, 0], size: [4, 2.5, 9] },
        light(0, 7.8, 0, 45, { shadow: true }),
        light(4.5, 7.8, -3, 15),
        light(108, 9.8, 0, 80, { distance: 30 }),
        light(130, 9.8, 0, 80, { distance: 30, shadow: true }),
      ],
    },
    async ({ ev, shot }) => {
      // 先试一下：开关没开时走进洞，会从侧面掉进酸液
      await ev(() => {
        const pt = window.__pt;
        pt.walkTo(-5, 2.5, 4, 0.2);
        pt.fire('orange', [6, 7, 0]);
        pt.fire('blue', [-6, 1.2, 0]);
        pt.walkTo(-5, 0, 3, 0.15);
        pt.walkDir(90, 3, (g) => g.player.position.y > 4);
        pt.run(0.5);
        pt.walkTo(4.6, -1.7, 3, 0.15);
      });
      await shot('c2-4-switch');
      await ev(() => {
        const pt = window.__pt;
        pt.use([4.5, 6, -3]);
        pt.run(0.05);
        if (!window.__game.signals.get('s1')) throw new Error('开关没打开');
        pt.walkTo(5.2, 0, 2, 0.2);
        pt.walkDir(-90, 3, (g) => !g.player.grounded && g.player.position.x > -4.3);
        pt.run(0.8);
      });
      await shot('c2-4-loop');
      await ev(() => {
        const pt = window.__pt;
        const g = window.__game;
        for (let i = 0; i < 600 && g.player.position.x < 50; i++) pt.run(1 / 60);
        for (let i = 0; i < 300 && !g.player.grounded; i++) pt.run(1 / 60);
      });
      await shot('c2-4-landed');
      await ev(() => window.__pt.walkTo(136, 0, 6));
    }
  );
}

// ---------------------------------------------------------------- 单向镜
{
  const d = doorWallAndCorridor(106, [-6, 6], [0, 6], 1.5, 3, 6, ['b1']);
  const ROOM = (x, extraOmit = []) => [
    ...room([x - 6, x + 6], [0, 6], [-6, 6], {}, ['zn', 'zp', ...extraOmit]),
    ...wallWithHoles('z', [-6.5, -6], [x - 6.5, x + 6.5], [0, 6], [[x - 1, x + 1, 0, 2.8]]),
    box(x - 1.5, 0, -7.5, x + 1.5, 3.3, -6.5),
    ...wallWithHoles('z', [6, 6.5], [x - 6.5, x + 6.5], [0, 6], [[x - 1, x + 1, 0, 2.8]]),
    box(x - 1.5, 0, 6.5, x + 1.5, 3.3, 7.5),
  ];
  const gate = (ax, bx) => ({ type: 'gateway', a: { pos: [ax, 1.4, -6], normal: [0, 0, 1] }, b: { pos: [bx, 1.4, 6], normal: [0, 0, -1] }, size: [2, 2.8], oneWay: 'ab' });
  L(
    {
      name: '单向镜',
      hint: '这几扇门只能往前走，走过去回头看，门洞已经封死了。往前看却能一直看下去，传送门也能一直打下去。力场会销毁方块。',
      gun: 'both',
      spawn: { pos: [0, 0, 3], yaw: 0 },
      brushes: [
        // 起点 S
        ...ROOM(0),
        // A：出口在东墙
        ...room([94, 106], [0, 6], [-6, 6], {}, ['zn', 'zp', 'xp']),
        ...wallWithHoles('z', [-6.5, -6], [93.5, 106.5], [0, 6], [[103, 105, 0, 2.8]]),
        box(102.5, 0, -7.5, 105.5, 3.3, -6.5),
        ...wallWithHoles('z', [6, 6.5], [93.5, 106.5], [0, 6], [[99, 101, 0, 2.8]]),
        box(98.5, 0, 6.5, 101.5, 3.3, 7.5),
        ...d.brushes,
        panelZ(-6, 1, [95.5, 101.5], [0, 3.4]),
        // B：方块在东边高台上
        ...ROOM(200),
        box(203, 0, -6, 206, 3.5, 6),
        panelX(194, 1, [-3, 3], [0, 3.4]),
        panelX(206, -1, [-3, 3], [3.6, 5.95]),
      ],
      entities: [
        gate(0, 100), // S → A
        { type: 'gateway', a: { pos: [104, 1.4, -6], normal: [0, 0, 1] }, b: { pos: [200, 1.4, 6], normal: [0, 0, -1] }, size: [2, 2.8], oneWay: 'ab' }, // A → B
        gate(200, 0), // B → S
        { type: 'fizzler', pos: [200, 1.5, -5.3], size: [2.4, 3, 0.1] },
        { type: 'button', id: 'b1', pos: [98, 0, 1] },
        { type: 'cube', pos: [204.5, 3.85, 3] },
        ...d.entities,
        light(0, 5.8, 0, 40, { shadow: true }),
        light(100, 5.8, 0, 40, { shadow: true, color: 0xd8e6ff }),
        light(200, 5.8, 0, 40, { shadow: true, color: 0xffe2c0 }),
      ],
    },
    async ({ ev, shot }) => {
      await ev(() => {
        const pt = window.__pt;
        pt.walkTo(0, -4.5, 5, 0.2);
        pt.walkDir(0, 3, (g) => g.player.position.x > 50);
        pt.walkTo(104, -4.5, 5, 0.2);
        pt.walkDir(0, 3, (g) => g.player.position.x > 150);
        pt.run(0.4);
        // 在 B 里先用两扇门上高台
        pt.walkTo(195.2, 0, 5, 0.15);
        pt.fire('orange', [206, 4.8, 0]);
        pt.fire('blue', [194, 1.2, 0]);
        pt.walkDir(90, 3, (g) => g.player.position.y > 3);
        pt.run(0.5);
        pt.walkTo(204.5, 1.6, 3, 0.15);
        if (!pt.use([204.5, 3.8, 3])) throw new Error('没拿到方块');
        pt.walkTo(199, 1, 4);
        pt.run(1);
        pt.use();
        pt.run(0.6);
      });
      await shot('c2-5-cube');
      // 橙门改到低处的面板上；蓝门隔着两扇单向门打到 A 的面板上
      await ev(() => {
        const pt = window.__pt;
        pt.fire('orange', [194, 1.2, 2.4]);
        pt.walkTo(200, 2, 4, 0.15);
        const inS = pt.via([100, 1.4, 6], [98.5, 1.3, -6]);
        const inB = pt.via([0, 1.4, 6], inS);
        if (!pt.fire('blue', inB)) throw new Error('蓝门没打过去');
      });
      await shot('c2-5-chain');
      await ev(() => {
        const pt = window.__pt;
        const c = window.__game.cubes[0].position;
        pt.walkTo(c.x + 1.2, c.z, 4, 0.2);
        if (!pt.use([c.x, c.y, c.z])) throw new Error('没拿起方块');
        const o = window.__game.portals.orange.position;
        pt.walkTo(o.x + 1, o.z, 5, 0.15);
        pt.walkDir(90, 3, (g) => g.player.position.x < 150);
        pt.run(0.3);
        pt.drop(98, 1);
        pt.walkTo(104, 0, 5);
        pt.walkTo(111, 0, 6);
      });
    }
  );
}

export default levels;
