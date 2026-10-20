// 第 5 章：综合难关。把前面所有机制组合起来，每关都要规划好先后顺序。
// 每关后面跟着它的自动通关脚本（solve），用来证明这一关能解。
import { T, box, room, panelX, panelY, panelZ, light, exit, wallWithHoles } from '../levelkit.mjs';

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

/** 沿 -z 方向的出口走廊：门洞在 z 处，x∈[-hw,hw]，高 h */
function exitCorridorNZ(z, hw = 1.5, h = 3, len = 6, x = 0, y = 0) {
  const z1 = z - len;
  return {
    brushes: [
      box(x - hw - T, y - T, z1 - T, x + hw + T, y, z, 'concrete'),
      box(x - hw - T, y + h, z1 - T, x + hw + T, y + h + T, z),
      box(x - hw - T, y, z1, x - hw, y + h, z),
      box(x + hw, y, z1, x + hw + T, y + h, z),
      box(x - hw, y, z1 - T, x + hw, y + h, z1),
    ],
    entities: [exit(x, y, z1 + 1.6, [hw * 2 - 0.4, 2.5, 2]), light(x, y + h - 0.15, z1 + len / 2, 6)],
  };
}

// ================================================================ 1 倒计时
// 限时开关在起点，出口门在消散力场后面很远的地方；平台慢悠悠地过酸液池，时间根本不够。
// 解法：先坐平台过去，穿过力场后再开门——在门边的隔墙背面开橙门，隔着栅格窗把蓝门开回起点旁边；
// 然后不能走回头路（会穿过力场把门清掉），而是钻进橙门回到起点，按下开关，再钻蓝门冲向出口。
{
  const ex = exitCorridorNZ(-34.5, 1.5, 3, 6);
  add(
    {
      name: '倒计时',
      hint: '开关只能让大门开 6 秒。力场会抹掉你身上的传送门——但传送门本身也是一条不经过力场的路。',
      gun: 'both',
      spawn: { pos: [0, 0, 5], yaw: 0 },
      brushes: [
        // 外壳
        box(-10.5, -3.5, -34, -10, 10, 8),
        box(10, -3.5, -34, 10.5, 10, 8),
        box(-10.5, -3.5, 8, 10.5, 10, 8.5),
        box(-10.5, 10, -34.5, 10.5, 10.5, 8.5),
        ...wallWithHoles('z', [-34.5, -34], [-10.5, 10.5], [-3.5, 10], [[-1.5, 1.5, 0, 3]]),
        // 起点平台、酸液池底、对岸
        box(-10, -3.5, -4, 10, 0, 8, 'concrete'),
        box(-10, -3.5, -16, 10, -3, -4, 'concrete'),
        box(-10, -3.5, -34, 10, 0, -16, 'concrete'),
        // 隔墙：中间是门洞（力场），右边是栅格窗
        ...wallWithHoles('z', [-21.5, -21], [-10, 10], [0, 10], [
          [-1.5, 1.5, 0, 3],
          [3, 8, 1, 3],
        ]),
        box(3, 1, -21.3, 8, 3, -21.2, 'grate'),
        // 白板：起点左墙（开关旁边）、隔墙背面
        panelX(-10, 1, [1, 5], [0, 2.6]),
        panelZ(-21.5, -1, [-8, -4], [0, 2.6]),
        ...ex.brushes,
      ],
      entities: [
        { type: 'switch', id: 's1', pos: [-7, 0, 6.5], yaw: 0, timer: 6 },
        { type: 'door', pos: [0, 1.5, -34.25], size: [3, 3, 0.3], requires: ['s1'] },
        { type: 'platform', pos: [0, -0.2, -5.5], to: [0, -0.2, -14.5], size: [3, 0.4, 3], period: 8 },
        { type: 'hazard', pos: [0, -2.2, -10], size: [20, 1.6, 12] },
        { type: 'fizzler', pos: [0, 1.5, -21.25], size: [3, 3, 0.5] },
        ...ex.entities,
        light(0, 9.8, 3, 55, { shadow: true }),
        light(0, 9.8, -10, 45),
        light(0, 9.8, -27, 55, { shadow: true }),
        light(-7, 3, 7.6, 6, { fixture: false, color: 0xbfe0ff }),
      ],
    },
    async ({ ev, shot }) => {
      // 坐平台过酸液池
      await ev(() => {
        const pt = window.__pt;
        const g = window.__game;
        const pl = g.platforms[0];
        pt.walkTo(0, -3.4, 4, 0.2);
        for (let i = 0; i < 900; i++) {
          const f = (pl.t / pl.period) % 1;
          if (f < 0.05 && pl.u < 0.001) break;
          pt.run(1 / 60);
        }
        pt.walkTo(0, -5.5, 2, 0.3);
        for (let i = 0; i < 900 && pl.u < 0.999; i++) pt.run(1 / 60);
        pt.walkTo(0, -17.5, 3, 0.4);
      });
      await shot('c5-1-platform');
      // 穿过力场，在隔墙背面开橙门，隔着栅格把蓝门开回起点
      await ev(() => {
        const pt = window.__pt;
        pt.walkTo(0, -24, 4, 0.3);
        pt.walkTo(0, -28, 4, 0.3);
        pt.fire('orange', [-6, 1.3, -21.5]);
        pt.walkTo(5.5, -24, 4, 0.2);
        pt.fire('blue', [-10, 1.3, 3]);
      });
      await shot('c5-1-portals');
      // 钻进橙门回到起点，按开关，再钻蓝门冲向出口
      await ev(() => {
        const pt = window.__pt;
        pt.walkTo(-6, -23.5, 4, 0.2);
        pt.walkDir(180, 3, (g) => g.player.position.z > -5);
        pt.run(0.3);
        pt.walkTo(-7, 5.1, 3, 0.25);
        pt.use([-7, 1.0, 6.5]);
        pt.walkTo(-8.4, 3, 3, 0.25);
        pt.walkDir(90, 3, (g) => g.player.position.z < -15);
        pt.walkTo(0, -32, 5, 0.4);
      });
      await shot('c5-1-door');
      await ev(() => window.__pt.walkTo(0, -38.5, 4));
    }
  );
}

// ================================================================ 2 光与影
// 三道激光像栅栏一样拦在房间中间，人过不去。最低的一道离地 0.6 米：
// 普通白板只能把人缩到 0.45 倍（还是太高），要从「大白板」进、「小白板」出，缩到 0.2 倍才钻得过去。
// 钻过去以后在隔墙背面的大白板开门，再钻回来走小门，就能以正常体型出现在对面；
// 最后把折射方块放到栅栏边的小台子上，把最低那道激光折回去照亮起点墙上的接收器。
{
  const ex = exitCorridorNZ(-16.5, 1.5, 3, 6, -4);
  add(
    {
      name: '光与影',
      hint: '最低的那道激光离地 0.6 米。门的大小决定你的大小——一次缩得不够，就缩得更狠一点。',
      gun: 'both',
      spawn: { pos: [0, 0, 7], yaw: 0 },
      brushes: [
        ...room([-8, 8], [0, 8], [-16, 10], {}, ['zn']),
        ...wallWithHoles('z', [-16.5, -16], [-8.5, 8.5], [0, 8], [[-5.5, -2.5, 0, 3]]),
        // 激光栅栏上方的玻璃
        box(-8, 2.4, -2.05, 8, 8, -1.95, 'glass'),
        // 放折射方块的小台子
        box(4.4, 0, -2.6, 5.6, 0.3, -1.4, 'metal'),
        // 对面房间的隔墙（右侧留出通道）
        box(-8, 0, -6.5, 4, 8, -6),
        // 白板
        panelX(-8, 1, [1, 8], [0, 5.6], 'whiteL'),
        panelX(8, -1, [4, 6], [0, 1.2], 'whiteS'),
        panelZ(-6.5, -1, [-7, -2], [0, 5.6], 'whiteL'),
        ...ex.brushes,
      ],
      entities: [
        { type: 'laser', pos: [-7.7, 0.6, -2], dir: [1, 0, 0] },
        { type: 'laser', pos: [-7.7, 1.25, -2], dir: [1, 0, 0] },
        { type: 'laser', pos: [-7.7, 1.9, -2], dir: [1, 0, 0] },
        { type: 'catcher', id: 'c1', pos: [5, 0.6, 9.75], normal: [0, 0, -1] },
        { type: 'cube', kind: 'prism', pos: [0, 0.31, -11], yaw: 0 },
        { type: 'door', pos: [-4, 1.5, -16.25], size: [3, 3, 0.3], requires: ['c1'] },
        ...ex.entities,
        light(0, 7.8, 5, 45, { shadow: true }),
        light(0, 7.8, -3, 30),
        light(-1, 7.8, -11, 40, { shadow: true }),
        light(7.5, 1.6, 5, 4, { fixture: false, color: 0xbfe0ff }),
      ],
    },
    async ({ ev, shot }) => {
      await ev(() => {
        const pt = window.__pt;
        pt.fire('blue', [-8, 2.8, 4.5]);
        pt.fire('orange', [8, 0.5, 5]);
        pt.walkTo(-6, 4.5, 6, 0.2);
        pt.walkDir(90, 3, (g) => g.player.scale < 0.5);
        pt.run(1);
      });
      await shot('c5-2-tiny');
      const s1 = await ev(() => window.__pt.state());
      if (s1.scale > 0.25) throw new Error('没有缩到 0.2 倍：' + s1.scale);
      // 从激光底下钻过去，在隔墙背面开蓝门
      await ev(() => {
        const pt = window.__pt;
        pt.walkTo(2, 0, 10, 0.15);
        pt.walkTo(2, -4.5, 10, 0.15);
        pt.walkTo(6, -5.5, 10, 0.15);
        pt.walkTo(6, -11, 10, 0.2);
        pt.fire('blue', [-4.5, 2.8, -6.5]);
      });
      await shot('c5-2-under');
      // 钻回来，走进小门，从对面的大门出来，恢复正常体型
      await ev(() => {
        const pt = window.__pt;
        pt.walkTo(6, -5.5, 10, 0.15);
        pt.walkTo(2, -4.5, 10, 0.15);
        pt.walkTo(2, 0, 10, 0.15);
        pt.walkTo(7, 5, 10, 0.15);
        pt.walkDir(-90, 5, (g) => g.player.scale > 0.8);
        pt.run(1);
      });
      const s2 = await ev(() => window.__pt.state());
      if (Math.abs(s2.scale - 1) > 0.05 || s2.pos[2] > -6) throw new Error('没有正常体型地到对面：' + JSON.stringify(s2));
      // 拿折射方块放到台子上，让最低那道激光折回去
      await ev(() => {
        const pt = window.__pt;
        pt.walkTo(0, -9.8, 5, 0.2);
        pt.use([0, 0.31, -11]);
        pt.run(0.4);
        pt.walkTo(6, -8.5, 5, 0.3);
        pt.walkTo(5, -3.57, 5, 0.1);
        pt.aim([5, 0.95, -2]);
        pt.run(0.8);
        pt.use();
        pt.run(1.5);
      });
      await shot('c5-2-prism');
      const s3 = await ev(() => window.__pt.state());
      if (!s3.signals.c1) throw new Error('接收器没亮：' + JSON.stringify(s3.cubes));
      await ev(() => {
        const pt = window.__pt;
        pt.walkTo(6, -8.5, 5, 0.3);
        pt.walkTo(-4, -14, 6, 0.3);
        pt.walkTo(-4, -21, 6);
      });
    }
  );
}

// ================================================================ 3 迷途回廊
// 深渊对面是出口，这边一块白板都没有。后墙上三个门洞：两个互相连通、怎么走都回到原地，
// 只有最左边那个通往一间“不存在”的屋子。屋里有光桥发射器，但要先用传送门把力场后面的方块取出来压住按钮；
// 然后用两扇传送门把光桥拐进那个门洞——光桥会从深渊这边的墙里伸出来，一直铺到对岸。
{
  const DOORS = [-6, 0, 6];
  const closet = (x) => [
    box(x - 1.5, -0.5, 8.5, x + 1.5, 0, 10.5, 'concrete'),
    box(x - 1.5, 3, 8.5, x + 1.5, 3.5, 10.5),
    box(x - 1.5, 0, 10, x + 1.5, 3, 10.5),
    box(x - 1.5, 0, 8.5, x - 1, 3, 10),
    box(x + 1, 0, 8.5, x + 1.5, 3, 10),
  ];
  add(
    {
      name: '迷途回廊',
      hint: '这边没有一块白板，所以桥只能从“别的地方”伸过来。力场挡住了方块，却挡不住传送门。',
      gun: 'both',
      spawn: { pos: [0, 0, 2], yaw: 180 },
      killY: -12,
      brushes: [
        // 大厅：起点平台、深渊、对岸
        box(-10.5, -6.5, -32.5, -10, 10, 8.5),
        box(10, -6.5, -32.5, 10.5, 10, 8.5),
        box(-10.5, 10, -32.5, 10.5, 10.5, 8.5),
        box(-10.5, -6.5, -32.5, 10.5, 10, -32),
        ...wallWithHoles('z', [8, 8.5], [-10, 10], [0, 10], DOORS.map((x) => [x - 1, x + 1, 0, 3])),
        ...DOORS.flatMap(closet),
        box(-10, -6.5, -6, 10, 0, 8, 'concrete'),
        box(-10, -6.5, -22, 10, -6, -6, 'concrete'),
        box(-10, -6.5, -32, 10, 0, -22, 'concrete'),
        // 隐藏的屋子 X（远处，只能通过门洞到达）
        ...room([50, 62], [0, 6], [-6, 6], {}, ['xn', 'xp']),
        ...wallWithHoles('x', [49.5, 50], [-6.5, 6.5], [0, 6], [[-1, 1, 0, 3]]),
        box(48, -0.5, -1.5, 49.5, 0, 1.5, 'concrete'),
        box(48, 3, -1.5, 49.5, 3.5, 1.5),
        box(48, 0, -1.5, 48.5, 3, 1.5),
        box(48.5, 0, -1.5, 49.5, 3, -1),
        box(48.5, 0, 1, 49.5, 3, 1.5),
        ...wallWithHoles('x', [62, 62.5], [-6.5, 6.5], [0, 6], [[2.5, 5.5, 0, 3]]),
        // 力场后面的小隔间
        box(62.5, -0.5, 2, 65.5, 0, 6, 'concrete'),
        box(62.5, 3, 2, 65.5, 3.5, 6),
        box(62.5, 0, 2, 65.5, 3, 2.5),
        box(62.5, 0, 5.5, 65.5, 3, 6),
        box(65, 0, 2.5, 65.5, 3, 5.5),
        panelX(65, -1, [2.7, 5.3], [0, 2.3]),
        panelZ(-6, 1, [54.5, 57.5], [0, 2.3]),
        panelX(62, -1, [-1.5, 1.5], [0, 2.3]),
      ],
      entities: [
        { type: 'gateway', a: { pos: [-6, 1.5, 8], normal: [0, 0, -1] }, b: { pos: [50, 1.5, 0], normal: [1, 0, 0] }, size: [2, 3] },
        { type: 'gateway', a: { pos: [0, 1.5, 8], normal: [0, 0, -1] }, b: { pos: [6, 1.5, 8], normal: [0, 0, -1] }, size: [2, 3] },
        { type: 'hazard', pos: [0, -5.2, -14], size: [20, 1.6, 16] },
        { type: 'bridge', pos: [56, 0.15, 5.7], dir: [0, 0, -1], when: ['b1'] },
        { type: 'button', id: 'b1', pos: [53, 0, 3] },
        { type: 'cube', pos: [63.2, 0.31, 3.1] },
        { type: 'fizzler', pos: [62.25, 1.5, 4], size: [0.5, 3, 3] },
        exit(0, 0, -28.5, [2.4, 2.5, 2.4]),
        light(0, 9.8, 2, 50, { shadow: true }),
        light(0, 9.8, -14, 35),
        light(0, 9.8, -27, 45, { shadow: true }),
        light(56, 5.8, 0, 40, { shadow: true, color: 0xd8e6ff }),
        light(63.8, 2.85, 4, 5),
      ],
    },
    async ({ ev, shot }) => {
      // 走进最左边的门洞，到达隐藏屋子
      await ev(() => {
        const pt = window.__pt;
        pt.walkTo(-6, 6.5, 6, 0.2);
        pt.walkDir(180, 3, (g) => g.player.position.x > 40);
        pt.run(0.4);
      });
      await shot('c5-3-room');
      const s0 = await ev(() => window.__pt.state());
      if (s0.pos[0] < 40) throw new Error('没进到隐藏屋子：' + s0.pos);
      // 隔着力场在隔间里开蓝门，在右墙开橙门，钻进去拿方块再钻回来
      await ev(() => {
        const pt = window.__pt;
        pt.walkTo(57, 3, 5, 0.3);
        pt.fire('blue', [65, 1.2, 4]);
        pt.fire('orange', [62, 1.2, 0]);
        pt.walkTo(60, 0, 5, 0.2);
        pt.walkDir(-90, 3, (g) => g.player.position.z > 2);
        pt.run(0.5);
        pt.use([63.2, 0.31, 3.1]);
        pt.run(0.4);
        pt.face(66, 4);
        pt.run(0.5);
        pt.walkDir(-90, 4, (g) => g.player.position.z < 1.6 && g.player.position.x < 61.5);
        pt.run(0.5);
      });
      const s1 = await ev(() => window.__pt.state());
      if (!s1.held) throw new Error('没带出方块：' + JSON.stringify(s1));
      // 方块压住按钮，光桥亮起；再把蓝门挪到光桥打到的白板上
      await ev(() => {
        const pt = window.__pt;
        pt.walkTo(54.6, 3, 5, 0.2);
        pt.face(52, 3);
        window.__game.player.pitch = -0.6;
        pt.run(1);
        pt.use();
        pt.run(1.5);
        pt.walkTo(58, 4, 4, 0.3);
        pt.fire('blue', [56, 1.15, -6]);
        pt.run(0.3);
      });
      await shot('c5-3-bridge');
      const end = await ev(() => {
        const ps = window.__game.bridges[0].parts;
        return ps.length ? ps[ps.length - 1].mesh.position.toArray() : null;
      });
      if (!end || end[0] > 0 || end[2] > -5) throw new Error('光桥没有拐进门洞：' + end);
      // 穿过门洞回到大厅，顺着光桥走过深渊
      await ev(() => {
        const pt = window.__pt;
        pt.walkTo(52.5, 0, 5, 0.25);
        pt.walkDir(90, 3, (g) => g.player.position.x < 20);
        pt.run(0.2);
        pt.walkDir(0, 8, (g) => g.player.position.z < -24);
      });
      await shot('c5-3-cross');
      await ev(() => window.__pt.walkTo(0, -28.5, 5));
    }
  );
}

// ================================================================ 4 重力陷阱
// 高台在酸液池对岸，前面有一块弹跳凝胶——可普通人弹不了那么高，冲过去只会掉进酸液。
// 先抱着方块穿过“普通门 → 大门”，方块和自己都变成巨人；巨人弹得更高，能飞上高台。
// 高台上的重型按钮要巨型方块才压得动：在隔墙背面的大白板开门，和下面的大门连通，回去把方块搬上来。
// 最后巨人钻不过出口的门——用“大门 → 普通门”把自己变回原样。
{
  const ex = exitCorridorNZ(-34.5, 1.5, 3, 6, 0, 5);
  add(
    {
      name: '重力陷阱',
      hint: '体型越大，弹得越高，也越重。可是太大了，有的门就钻不过去。',
      gun: 'both',
      spawn: { pos: [0, 0, 7], yaw: 0 },
      brushes: [
        box(-10.5, -2.5, -34, -10, 14, 10),
        box(10, -2.5, -34, 10.5, 14, 10),
        box(-10.5, -2.5, 10, 10.5, 14, 10.5),
        box(-10.5, 14, -34.5, 10.5, 14.5, 10.5),
        ...wallWithHoles('z', [-34.5, -34], [-10.5, 10.5], [-2.5, 14], [[-1.5, 1.5, 5, 8]]),
        // 起点地面，中间一块弹跳凝胶
        box(-10, -2.5, -4, 10, 0, 10, 'concrete'),
        box(-10, -2.5, -8, -3, 0, -4, 'concrete'),
        box(3, -2.5, -8, 10, 0, -4, 'concrete'),
        box(-3, -2.5, -8, 3, 0, -4, 'bounce'),
        // 酸液池底、高台
        box(-10, -2.5, -14, 10, -2, -8, 'concrete'),
        box(-10, -2.5, -34, 10, 5, -14, 'concrete'),
        // 高台上的隔墙（门洞够巨人通过）
        ...wallWithHoles('z', [-20.5, -20], [-10, 10], [5, 14], [[-2, 2, 5, 9.5]]),
        // 白板：起点左墙普通、右墙大号；隔墙背面一大一小
        panelX(-10, 1, [2, 6], [0, 2.6]),
        panelX(10, -1, [0, 6], [0, 5.6], 'whiteL'),
        panelZ(-20.5, -1, [3, 9], [5, 10.6], 'whiteL'),
        panelZ(-20.5, -1, [-9, -5], [5, 7.6]),
        ...ex.brushes,
      ],
      entities: [
        { type: 'cube', pos: [-4, 0.31, 4] },
        { type: 'hazard', pos: [0, -1.2, -11], size: [20, 1.6, 6] },
        { type: 'button', id: 'hb', pos: [0, 5, -27], heavy: true },
        { type: 'door', pos: [0, 6.5, -34.25], size: [3, 3, 0.3], requires: ['hb'] },
        ...ex.entities,
        light(0, 13.8, 4, 70, { shadow: true }),
        light(0, 13.8, -11, 50),
        light(0, 13.8, -27, 60, { shadow: true }),
        light(0, 13.8, -17, 35),
      ],
    },
    async ({ ev, shot }) => {
      // 抱着方块穿过 普通门 → 大门，一起变成巨人
      await ev(() => {
        const pt = window.__pt;
        pt.fire('blue', [-10, 1.3, 4]);
        pt.fire('orange', [10, 2.8, 3]);
        pt.walkTo(-2.4, 4, 5, 0.2);
        pt.use([-4, 0.31, 4]);
        pt.run(0.4);
        pt.walkDir(90, 5, (g) => g.player.scale > 1.5);
        pt.run(1);
        pt.use();
        pt.run(1);
      });
      await shot('c5-4-giant');
      const s1 = await ev(() => window.__pt.state());
      if (s1.scale < 2 || s1.cubes[0][3] < 2) throw new Error('没有一起变大：' + JSON.stringify(s1));
      // 巨人冲上弹跳凝胶，飞上高台
      await ev(() => {
        const pt = window.__pt;
        pt.walkTo(0, 7, 5, 0.3);
        pt.walkDir(0, 5, (g) => g.player.position.z < -16 && g.player.grounded);
        pt.run(0.5);
      });
      await shot('c5-4-landed');
      const s2 = await ev(() => window.__pt.state());
      if (s2.pos[1] < 5 || s2.state !== 'playing') throw new Error('没飞上高台：' + JSON.stringify(s2));
      // 隔墙背面的大白板开蓝门，回到下面把巨型方块搬上来
      await ev(() => {
        const pt = window.__pt;
        pt.walkTo(0, -25, 5, 0.3);
        pt.fire('blue', [6, 7.6, -20.5]);
        pt.walkTo(6, -23, 5, 0.3);
        pt.walkDir(180, 4, (g) => g.player.position.z > -5);
        pt.run(0.5);
      });
      const c = await ev(() => window.__game.cubes[0].position.toArray());
      await ev((c) => {
        const pt = window.__pt;
        const g = window.__game;
        pt.walkTo(c[0] + 3.2, c[2], 5, 0.3);
        pt.use([c[0], c[1], c[2]]);
        pt.run(0.4);
        pt.walkTo(5, 3, 5, 0.3);
        pt.walkDir(-90, 5, (g) => g.player.position.z < -15);
        pt.run(0.5);
        if (!g.player.held) throw new Error('方块没搬上来');
        pt.walkTo(0, -24.27, 5, 0.1);
        pt.aim([0, 5.96, -27]);
        pt.run(0.8);
        pt.use();
        pt.run(1.5);
      }, c);
      await shot('c5-4-button');
      const s3 = await ev(() => window.__pt.state());
      if (!s3.buttons[0]) throw new Error('重型按钮没压下：' + JSON.stringify(s3.cubes));
      // 大门 → 普通门，变回原样，从出口离开
      await ev(() => {
        const pt = window.__pt;
        pt.walkTo(0, -26, 5, 0.3);
        pt.fire('orange', [-7, 6.3, -20.5]);
        pt.walkTo(6, -22.8, 5, 0.3);
        pt.walkDir(180, 4, (g) => g.player.scale < 1.5);
        pt.run(1);
        pt.walkTo(0, -32, 6, 0.3);
        pt.walkTo(0, -39, 6);
      });
    }
  );
}

// ================================================================ 5 终极试炼
// 四个房间串成一条线，每个房间一道关：
// A 光：折射方块挡住地面激光照亮左墙接收器，再用一对窄窄的传送门把高处激光拐到前墙接收器——两个都亮才开门。
// B 缩：墙上的空间门通往一间迷你小屋，人缩到 1/4；小屋里的方块在高台上，要用小白板开门上去拿，抱回来就变回正常大小，压住按钮。
// C 力：弹射板把人笔直弹向天花板。天花板开蓝门、背后高墙开橙门，向上的速度变成水平速度，飞过酸液池和消散力场。
// D 升：升降台由笼子里的限时开关控制，人站在台子上够不着开关——隔着传送门伸手去按。
{
  const ZC = -66; // C 房间尽头
  const D0 = ZC - 0.5;
  const closetX = (x0, x1, z0, z1, h) => [
    box(x0, -0.5, z0, x1, 0, z1, 'concrete'),
    box(x0, h, z0, x1, h + 0.5, z1),
    box(x0, 0, z0, x1, h, z0 + 0.5),
    box(x0, 0, z1 - 0.5, x1, h, z1),
    box(x0, 0, z0 + 0.5, x0 + 0.5, h, z1 - 0.5),
  ];
  add(
    {
      name: '终极试炼',
      hint: '四个房间，四道考验：光、缩、力、升。每一关都用得上你学过的东西——包括隔着传送门伸手。',
      gun: 'both',
      spawn: { pos: [0, 0, 4], yaw: 0 },
      killY: -10,
      brushes: [
        // ---------- A 光
        ...room([-8, 8], [0, 7], [-14, 6], {}, ['zn']),
        ...wallWithHoles('z', [-14.5, -14], [-8.5, 8.5], [0, 7], [[-1.5, 1.5, 0, 3]]),
        box(-8, 0, 3, -2, 4, 6, 'metal'), // 放折射方块的高台
        panelZ(6, -1, [-7, -3], [4, 6.6]), // 高台上方
        panelX(8, -1, [0, 4], [0, 2.6]), // 右墙落地
        panelX(8, -1, [-4.65, -3.35], [1.2, 3.8]), // 右墙窄条（接高处激光）
        panelZ(6, -1, [4.35, 5.65], [1.2, 3.8]), // 后墙窄条（把激光送往前墙）
        // ---------- B 缩
        box(-8.5, -0.5, -34, 8.5, 0, -14.5, 'concrete'),
        box(-8.5, 6, -34, 8.5, 6.5, -14.5),
        box(8, 0, -34, 8.5, 6, -14.5),
        ...wallWithHoles('x', [-8.5, -8], [-34, -14.5], [0, 6], [[-25, -23, 0, 3]]),
        ...closetX(-10, -8.5, -25.5, -22.5, 3.5).map((b) => b),
        ...wallWithHoles('z', [-34.5, -34], [-8.5, 8.5], [0, 16], [[-1.5, 1.5, 0, 3]]),
        // 迷你小屋（远处）
        ...room([60, 64], [0, 1.8], [-2, 2], { floor: 'concrete' }, ['xn']),
        ...wallWithHoles('x', [59.5, 60], [-2.5, 2.5], [0, 1.8], [[-0.25, 0.25, 0, 0.75]]),
        box(58.5, -0.5, -0.75, 59.5, 0, 0.75, 'concrete'),
        box(58.5, 1, -0.75, 59.5, 1.2, 0.75),
        box(58.5, 0, -0.75, 58.7, 1, 0.75),
        box(58.7, 0, -0.75, 59.5, 1, -0.5),
        box(58.7, 0, 0.5, 59.5, 1, 0.75),
        box(62.5, 0, -2, 64, 0.6, 2, 'metal'), // 小屋里的高台
        panelZ(-2, 1, [60.5, 62], [0, 1.1], 'whiteS'),
        panelZ(2, -1, [62.6, 63.9], [0.6, 1.7], 'whiteS'),
        // ---------- C 力
        box(-8.5, -3, ZC, -8, 16, -34.5),
        box(8, -3, ZC, 8.5, 16, -34.5),
        box(-8.5, 16, ZC, 8.5, 16.5, -34.5),
        box(-8, -3, -44, 8, 0, -34.5, 'concrete'),
        box(-8, -3, -52, 8, -2.5, -44, 'concrete'),
        box(-8, -3, ZC, 8, 0, -52, 'concrete'),
        panelY(16, -1, [-2.5, 2.5], [-44, -37]),
        panelZ(-34.5, -1, [-2, 2], [11.4, 13.8]),
        ...wallWithHoles('z', [ZC - 0.5, ZC], [-8.5, 8.5], [0, 16], [[-1.5, 1.5, 0, 3]]),
        // ---------- D 升
        ...room([-8, 8], [0, 12], [D0 - 30, D0], {}, ['zp']),
        box(-8, 0, D0 - 30, 8, 6, D0 - 22, 'metal'), // 出口阳台
        panelZ(D0 - 22, 1, [-1.5, 1.5], [0, 2.6]), // 阳台正面
        // 开关笼子（栅格：子弹能过，人过不去）
        box(3, 0, D0 - 6, 3.1, 12, D0, 'grate'),
        box(3.1, 0, D0 - 6.1, 8, 12, D0 - 6, 'grate'),
        panelX(8, -1, [D0 - 3.8, D0 - 2.2], [0, 2.6]),
      ],
      entities: [
        // A
        { type: 'laser', pos: [-7.7, 2.2, -4], dir: [1, 0, 0] },
        { type: 'laser', pos: [-5, 0.31, -13.7], dir: [0, 0, 1] },
        { type: 'catcher', id: 'c1', pos: [5, 2.2, -13.75], normal: [0, 0, 1] },
        { type: 'catcher', id: 'c2', pos: [-7.75, 0.5, -8], normal: [1, 0, 0] },
        { type: 'cube', kind: 'prism', pos: [-3.6, 4.31, 4.2], yaw: 0 },
        { type: 'door', pos: [0, 1.5, -14.25], size: [3, 3, 0.3], requires: ['c1', 'c2'] },
        light(0, 6.8, 0, 40, { shadow: true }),
        light(0, 6.8, -10, 30),
        // B
        { type: 'gateway', a: { pos: [-8, 1.5, -24], normal: [1, 0, 0] }, b: { pos: [60, 0.375, 0], normal: [1, 0, 0] }, size: [2, 3], sizeB: [0.5, 0.75] },
        { type: 'cube', pos: [63.3, 0.675, -1.2], scale: 0.25 },
        { type: 'button', id: 'b2', pos: [0, 0, -28] },
        { type: 'door', pos: [0, 1.5, -34.25], size: [3, 3, 0.3], requires: ['b2'] },
        light(0, 5.8, -24, 40, { shadow: true }),
        light(62, 1.7, 0, 3, { distance: 6 }),
        // C
        { type: 'launcher', pos: [0, 0, -39.5], target: [0, 20, -40.5], time: 1.1 },
        { type: 'hazard', pos: [0, -1.7, -48], size: [16, 1.6, 8] },
        { type: 'fizzler', pos: [0, 8, -48], size: [16, 16, 0.1] },
        light(0, 15.8, -40, 50, { shadow: true }),
        light(0, 15.8, -59, 50),
        // D
        { type: 'switch', id: 's2', pos: [7, 0, D0 - 3], yaw: -90, timer: 5 },
        { type: 'platform', pos: [0, -0.2, D0 - 20.5], to: [0, 5.8, D0 - 20.5], size: [3, 0.4, 3], speed: 2, when: ['s2'] },
        exit(0, 6, D0 - 27),
        light(0, 11.8, D0 - 8, 45, { shadow: true }),
        light(0, 11.8, D0 - 24, 40),
      ],
    },
    async ({ ev, shot }) => {
      // ---- A：先上高台拿折射方块
      await ev(() => {
        const pt = window.__pt;
        pt.fire('blue', [8, 1.3, 2]);
        pt.walkTo(0, -6, 5, 0.3);
        pt.fire('orange', [-5, 6, 6]);
        pt.walkTo(6.6, 2, 5, 0.2);
        pt.walkDir(-90, 3, (g) => g.player.position.y > 3);
        pt.run(0.6);
        pt.use([-3.6, 4.31, 4.2]);
        pt.run(0.4);
        pt.walkTo(-3.6, 1.2, 4, 0.3);
        pt.run(1);
        // 折射方块放进地面激光里，朝左墙
        pt.walkTo(-3.45, -8, 6, 0.08);
        pt.aim([-5, 0.9, -8]);
        pt.run(0.8);
        pt.use();
        pt.run(1);
        // 一对窄门把高处激光送到前墙
        pt.fire('blue', [8, 2.5, -4]);
        pt.fire('orange', [5, 2.5, 6]);
        pt.run(1.5);
      });
      await shot('c5-5-A');
      const sa = await ev(() => window.__pt.state());
      if (!sa.signals.c1 || !sa.signals.c2) throw new Error('A 房间接收器没全亮：' + JSON.stringify(sa.signals) + JSON.stringify(sa.cubes));
      // ---- B：走进空间门变小，用小白板上高台拿方块，抱回来压按钮
      await ev(() => {
        const pt = window.__pt;
        pt.walkTo(0, -12, 5, 0.3);
        pt.walkTo(0, -17, 5, 0.3);
        pt.walkTo(-6, -24, 5, 0.2);
        pt.walkDir(90, 4, (g) => g.player.position.x > 50);
        pt.run(0.5);
        pt.fire('blue', [61.25, 0.5, -2]);
        pt.fire('orange', [63.25, 1.15, 2]);
        pt.walkTo(61.25, -1.2, 6, 0.08);
        pt.walkDir(0, 3, (g) => g.player.position.x > 62.6);
        pt.run(0.6);
        pt.walkTo(63.3, -0.3, 4, 0.1);
        pt.use([63.3, 0.675, -1.2]);
        pt.run(0.5); // 让方块先飞到手里再转身
      });
      await shot('c5-5-B-tiny');
      const sb = await ev(() => window.__pt.state());
      if (!sb.held || sb.scale > 0.3) throw new Error('迷你小屋里没拿到方块：' + JSON.stringify(sb));
      await ev(() => {
        const pt = window.__pt;
        pt.walkTo(61.5, 0, 6, 0.1);
        pt.walkTo(60.7, 0, 4, 0.08);
        pt.walkDir(90, 3, (g) => g.player.position.x < 0);
        pt.run(0.6);
      });
      // 穿门时方块可能脱手（体型突变），掉了就重新捡起来
      await ev(() => {
        const pt = window.__pt;
        const g = window.__game;
        if (!g.player.held) {
          const c = g.cubes[1].position.clone();
          pt.walkTo(c.x + 1.6, c.z, 4, 0.2);
          pt.use([c.x, c.y, c.z]);
          pt.run(0.4);
        }
        pt.walkTo(0, -26.3, 6, 0.15);
        pt.face(0, -28);
        window.__game.player.pitch = -0.6;
        pt.run(1);
        pt.use();
        pt.run(1.5);
      });
      const sb2 = await ev(() => window.__pt.state());
      if (!sb2.buttons[0]) throw new Error('B 房间按钮没压下：' + JSON.stringify(sb2));
      // ---- C：天花板蓝门 + 高墙橙门，借弹射板飞过酸液池
      await ev(() => {
        const pt = window.__pt;
        pt.walkTo(0, -32, 5, 0.3);
        pt.walkTo(0, -37, 5, 0.3);
        pt.fire('blue', [0, 16, -40.5]);
        pt.walkTo(0, -42, 5, 0.3);
        pt.fire('orange', [0, 12.6, -34.5]);
        pt.walkTo(0, -39.5, 5, 0.2);
        pt.run(1.2);
      });
      await shot('c5-5-C-fly');
      await ev(() => window.__pt.run(3));
      const sc = await ev(() => window.__pt.state());
      if (sc.state !== 'playing' || sc.pos[2] > -52) throw new Error('没飞过酸液池：' + JSON.stringify(sc));
      // ---- D：橙门开在笼子里的开关旁边，站上升降台，隔着蓝门按开关
      await ev((D0) => {
        const pt = window.__pt;
        const g = window.__game;
        pt.walkTo(0, D0 - 1.5, 6, 0.3);
        pt.fire('orange', [8, 1.3, D0 - 3]);
        pt.walkTo(0, D0 - 15, 6, 0.3);
        pt.fire('blue', [0, 1.3, D0 - 22]);
        pt.walkTo(0, D0 - 21.5, 4, 0.1);
        // 开关在橙门那边：把它的位置换算到蓝门这边再瞄准
        const e = g.portals.orange.teleport.elements;
        const [x, y, z] = [7, 1.0, D0 - 3];
        pt.aim([e[0] * x + e[4] * y + e[8] * z + e[12], e[1] * x + e[5] * y + e[9] * z + e[13], e[2] * x + e[6] * y + e[10] * z + e[14]]);
        pt.use();
      }, D0);
      const sd = await ev(() => window.__pt.state());
      if (!sd.signals.s2) throw new Error('隔着传送门没按到开关：' + JSON.stringify(sd));
      await ev(() => window.__pt.run(3.3));
      await shot('c5-5-D-up');
      await ev((D0) => window.__pt.walkTo(0, D0 - 27, 4), D0);
    }
  );
}

export default levels;
