// 第 6 章：云海奇境。白天与黄昏的天空，脚下是云海；房子不再是方盒子，重力也不再只朝下。
import { box, cyl, sphere, slab, ringWalls, ringPanel, ringPoint, light, exit, panelX, P, tubeWalls, tubePanel, tubePoint, tubeBox, tubeCap, tubeLawn, tubeTree, ringSlabs, tree, isle, mirrorY, room, wallWithHoles, doorWallAndCorridor, planetTree, planetPoint, planetBox } from '../levelkit.mjs';

const levels = [];
const L = (def, solve) => levels.push({ def, solve });
const DEG = Math.PI / 180;
const r2 = (v) => Math.round(v * 100) / 100;

// ---------------------------------------------------------------- 旋转的世界
{
  const R = 13;
  const N = 24;
  const Z0 = -44;
  const Z1 = 44;
  const gap = [-7, 7];
  const FLOOR = 18; // 第 18 面墙正对着 270°（脚下）
  const CEIL = 6; // 第 6 面墙在 90°（头顶）
  const lawnRange = [[Z0 + 0.5, gap[0]], [gap[1], Z1 - 0.5]];
  const trees = [];
  let seed = 11;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  for (let i = 0; i < 30; i++) {
    const side = rnd() < 0.55 ? 0 : 1; // 脚下的草地多一些，头顶也有树
    const ang = side ? 60 + rnd() * 60 : 215 + rnd() * 110;
    const z = (rnd() < 0.5 ? -1 : 1) * (10 + rnd() * 30);
    // 避开出生点、传送门面板和出口
    if (side === 0 && Math.abs(ang - 270) < 14 && ((z > 9 && z < 24) || z > 34 || z < -31)) continue;
    if (side === 1 && Math.abs(ang - 90) < 14 && z < -14 && z > -34) continue;
    trees.push(...tubeTree(0, 0, R, ang, Math.round(z), 0.5 + rnd() * 0.45, [0x4aa05a, 0x5bb06a, 0x3f9a4f][i % 3]));
  }
  // 草地上的小花：几十个发光的小圆点，粉的、黄的、白的
  const flowers = [];
  for (let i = 0; i < 80; i++) {
    const ang = rnd() < 0.7 ? 215 + rnd() * 110 : 40 + rnd() * 100;
    const z = (rnd() < 0.5 ? -1 : 1) * (8 + rnd() * 34);
    const a = ang * DEG;
    const k = R - 0.12;
    flowers.push({ pos: [r2(Math.cos(a) * k), r2(Math.sin(a) * k), r2(z)], size: [0.22, 0.22, 0.22], mat: 'glow', shape: 'sphere', color: [0xff9ec4, 0xffe27a, 0xffffff, 0xb6a4ff][i % 4], intensity: 1, deco: true });
  }
  L(
    {
      name: '旋转的世界',
      hint: '这是一座旋转的太空圆筒：离心力把你按在内壁上，“地面”在你脚下一路弯上去，对面的墙就在你头顶。中间断了一大截，但头顶那边的墙上有块白板。',
      gun: 'both',
      killY: -60,
      sky: { kind: 'day', hemi: 0.62, exposure: 0.92, env: 0.4, bloom: 0.24, sea: { y: -80, kind: 'cloud' }, sun: { dir: [0.5, 0.6, -0.4], intensity: 2.2 }, fogNear: 120, fogFar: 600 },
      spawn: { pos: [0, -R, 40], yaw: 0 },
      brushes: [
        ...tubeWalls(0, 0, R, N, [Z0, Z1], 'concrete', { skip: [0, 12], gaps: [gap] }),
        // 两侧的长窗：能看到外面的云海
        ...tubeWalls(0, 0, R, N, [Z0, Z1], 'glass', { only: [0, 12], gaps: [gap] }),
        tubeCap(0, 0, Z0 - 0.25, R, 'metal'),
        tubeCap(0, 0, Z1 + 0.25, R, 'metal'),
        // 草地、小溪
        ...lawnRange.flatMap((rg) => tubeLawn(0, 0, R, N, [15, 16, 17, 19, 20, 21, 22, 23, 1, 2, 3, 4, 5, 6, 7, 8, 9], rg, 0xa9c892, 'grass')),
        ...lawnRange.flatMap((rg) => tubeLawn(0, 0, R, N, [20], rg, 0x6fd0ff, 'glow', { intensity: 0.9 })),
        // 两块白板：脚下一块，头顶一块（比溪水高一点，免得叠在一起）
        tubePanel(0, 0, R, N, FLOOR, 3, [13, 21]),
        tubePanel(0, 0, R, N, CEIL, 3, [-30, -18]),
        ...trees,
        ...flowers,
        // 出口的拱门
        tubeBox(0, 0, R, 270 - 7.5, -38, [0.7, 5.4, 0.7], 'concrete', { color: 0xf2e6c8 }),
        tubeBox(0, 0, R, 270 + 7.5, -38, [0.7, 5.4, 0.7], 'concrete', { color: 0xf2e6c8 }),
        { pos: [0, -R + 5.4, -38], size: [r2(2 * 13 * Math.sin(7.5 * DEG) + 0.7), 0.7, 0.9], mat: 'glow', color: 0xffd36b, intensity: 2.2, deco: true },
        // 轴线上的“太阳灯管”
        { pos: [0, 0, 0], size: [0.8, 0.8, 88], mat: 'glow', color: 0xfff3d6, intensity: 2, deco: true },
      ],
      entities: [
        { type: 'gravity', shape: 'axis', pos: [0, 0, (Z0 + gap[0]) / 2], axis: [0, 0, 1], radius: R - 0.1, length: gap[0] - Z0 },
        { type: 'gravity', shape: 'axis', pos: [0, 0, (Z1 + gap[1]) / 2], axis: [0, 0, 1], radius: R - 0.1, length: Z1 - gap[1] },
        exit(0, -R, -38, [3, 2.5, 3]),
        ...[-36, -22, -12, 12, 22, 36].map((z) => light(0, 0, z, 150, { distance: 50, fixture: false, color: 0xfff1d8 })),
      ],
    },
    async ({ ev, shot }) => {
      await shot('c6-1-start');
      await ev(() => window.__pt.walkWorld([0, -12, 9.5], 8, 0.4));
      await shot('c6-1-edge');
      await ev(() => {
        const pt = window.__pt;
        pt.fire('blue', [0, -13, 17]);
        pt.fire('orange', [0, 12.9, -24]);
      });
      await shot('c6-1-portals');
      await ev(() => {
        const pt = window.__pt;
        pt.walkWorld([0, -12, 17], 10, 0.1, 1, 0, (g) => g.player.position.y > 3);
        pt.run(0.8);
      });
      await shot('c6-1-ceiling');
      await ev(() => window.__pt.walkWorld([0, 12, -36], 14, 0.5));
      await shot('c6-1-far');
      // 沿着内壁绕半圈：从头顶走到脚下
      await ev(() => {
        const pt = window.__pt;
        for (let a = 105; a <= 270; a += 15) pt.walkWorld([12 * Math.cos((a * Math.PI) / 180), 12 * Math.sin((a * Math.PI) / 180), -33], 6, 0.4);
        pt.walkWorld([0, -12, -38.5], 6, 0.4);
      });
    }
  );
}

// ---------------------------------------------------------------- 倒悬之城
{
  const AP = 12; // 八角大厅的内切半径
  const H = 16;
  const HOLE = 3.6; // 穹顶中央的圆洞
  const PX = 9; // 两座石台离中心的距离
  const stainColors = [0xffb870, 0x9ad0ff, 0xff9ec4, 0xb6f0a8, 0xffb870, 0x9ad0ff, 0xff9ec4, 0xb6f0a8];
  const corner = (i, rad) => {
    const a = (i / 8) * Math.PI * 2; // 墙的顶点在两面墙之间
    const rc = AP / Math.cos(Math.PI / 8) + 0.1;
    return [r2(Math.cos(a) * rc), r2(Math.sin(a) * rc)];
  };
  L(
    {
      name: '倒悬之城',
      hint: '地面是酸液湖，两座石台隔得太远。扳下开关，大厅的重力会倒转 10 秒：你会“掉”上穹顶。穹顶中央有个大洞，别掉出去；时间一到，重力恢复，你得正好落在对面的石台上。',
      gun: 'none',
      killR: 44,
      killY: -8,
      sky: { kind: 'dusk', hemi: 0.5, exposure: 0.95, sun: { dir: [0.2, 0.9, 0.2], intensity: 2.2 }, fogNear: 100, fogFar: 520 },
      spawn: { pos: [-PX, 0, 0], yaw: -90 },
      brushes: [
        cyl(0, -3.5, 0, 14, -3, 'concrete', { color: 0xb9a98c }),
        ...ringWalls(0, 0, AP, 8, [-3.5, H], 'concrete', [], 0.8),
        // 穹顶：圆环形，中央留一个洞
        ...ringSlabs(0, 0, HOLE, 15, 24, [H, H + 0.7], 'concrete'),
        // 八根廊柱
        ...Array.from({ length: 8 }, (_, i) => {
          const [x, z] = corner(i);
          return cyl(x, -3.5, z, 0.75, H + 0.7, 'concrete', { color: 0xf0e4cc });
        }),
        // 彩色玻璃窗（只是装饰）
        ...Array.from({ length: 8 }, (_, i) => ({ ...ringPanel(0, 0, AP - 0.05, 8, i, 3.2, [3, 11]), mat: 'glow', color: stainColors[i], intensity: 1.6, deco: true })),
        // 两座石台
        cyl(-PX, -3.2, 0, 3.4, 0, 'concrete', { color: 0xe8dcc4 }),
        cyl(PX, -3.2, 0, 3.4, 0, 'concrete', { color: 0xe8dcc4 }),
        // 台上的小装饰：发光的水晶
        { pos: [PX + 2, 0.7, 1.8], size: [0.5, 1.4, 0.5], mat: 'glow', color: 0x9ae6ff, intensity: 2.2, deco: true, rot: [0, 30, 12] },
        { pos: [PX + 2.4, 0.5, 0.6], size: [0.35, 1.0, 0.35], mat: 'glow', color: 0xff9ec4, intensity: 2.2, deco: true, rot: [8, 10, -14] },
      ],
      entities: [
        // 重力场从湖面往上一直延伸到穹顶之上，掉出穹顶洞口的人会飞出界外
        { type: 'gravity', shape: 'box', pos: [0, 15, 0], size: [30, 60, 30], dir: [0, 1, 0], when: ['s1'], hidden: true },
        { type: 'hazard', pool: true, pos: [0, -2.2, 0], size: [26, 1.6, 26] },
        { type: 'switch', id: 's1', pos: [-PX - 2, 0, 1.5], yaw: 90, timer: 10 },
        exit(PX, 0, 0, [2.4, 2.5, 2.4]),
        light(0, 7, 0, 70, { distance: 34, fixture: false, color: 0xfff0d0 }),
        light(-PX, 4, 0, 30, { distance: 14, fixture: false }),
        light(PX, 4, 0, 30, { distance: 14, fixture: false, color: 0xcfe6ff }),
        light(0, 14, 0, 40, { distance: 28, fixture: false, color: 0xffd8a8 }),
      ],
    },
    async ({ ev, shot }) => {
      await shot('c6-2-start');
      await ev(() => {
        const pt = window.__pt;
        pt.use([-11, 1.0, 1.5]);
        pt.run(2.4); // 掉上穹顶
      });
      await shot('c6-2-dome');
      await ev(() => {
        const pt = window.__pt;
        for (const w of [[-5, 16, 5.2], [0, 16, 6.2], [5, 16, 5.2], [9, 16, 0.5]]) pt.walkWorld(w, 5, 0.5);
        // 等重力恢复，掉到右边的石台上
        pt.run(12, { x: 0, y: 0 }, false);
      });
    }
  );
}

// ---------------------------------------------------------------- 镜湖
{
  const Y0 = -100; // 倒影世界所在的高度：真实世界里的 y，在倒影里是 Y0 - y
  const LAMP = (x, y, z, c = 0xffd9a0) => ({ pos: [x, y + 1.6, z], size: [0.3, 0.3, 0.3], mat: 'glow', shape: 'sphere', color: c, intensity: 2.4, deco: true });
  const post = (x, y, z) => cyl(x, y, z, 0.1, y + 1.5, 'metal', { color: 0x5a4a3a });
  // 真实世界：两座岛、两截桥头，中间 8 米是空的
  const real = [
    ...isle(-19, 0, 0, 9, { grass: 0xffffff }),
    ...isle(19, 0, 0, 9, { grass: 0xffffff }),
    box(-12, -0.4, -1.6, -4, 0, 1.6, 'concrete'), // 桥头 A
    box(4, -0.4, -1.6, 12, 0, 1.6, 'concrete'), // 桥头 B
    ...tree(-23, 0, 3.5, 1.2),
    ...tree(-21, 0, -5, 0.9),
    ...tree(-16, 0, 6, 1.0, 0x5bb06a),
    ...tree(23, 0, -3, 1.2, 0x5bb06a),
    ...tree(21, 0, 5.5, 0.9),
    ...tree(15, 0, -6.5, 1.0),
    ...[-11, -8].flatMap((x) => [post(x, 0, 1.8), post(x, 0, -1.8), LAMP(x, 0, 1.8), LAMP(x, 0, -1.8)]),
    ...[8, 11].flatMap((x) => [post(x, 0, 1.8), post(x, 0, -1.8), LAMP(x, 0, 1.8), LAMP(x, 0, -1.8)]),
    // 远处的小山，做地平线
    { pos: [-60, -14, -70], size: [60, 60, 60], mat: 'concrete', shape: 'sphere', color: 0x6a5b7a, deco: true },
    { pos: [50, -18, -90], size: [80, 80, 80], mat: 'concrete', shape: 'sphere', color: 0x7a5b6a, deco: true },
    { pos: [90, -10, 40], size: [50, 50, 50], mat: 'concrete', shape: 'sphere', color: 0x5b5b7a, deco: true },
  ];
  // 倒影世界：缺的那一段桥在这里，头朝下走
  const mir = [
    ...mirrorY([box(-9, -0.4, -1.6, 9, 0, 1.6, 'concrete'), ...isle(-19, 0, 0, 9), ...isle(19, 0, 0, 9)], Y0),
    ...mirrorY([...tree(-14, 0, 6, 1.0, 0x6a8cd0, 0x3a3a6a), ...tree(14, 0, -6.5, 1.0, 0x8c6ad0, 0x3a3a6a)], Y0),
    ...mirrorY([...[-8, 0, 8].flatMap((x) => [post(x, 0, 1.8), post(x, 0, -1.8), LAMP(x, 0, 1.8, 0x9fd8ff), LAMP(x, 0, -1.8, 0x9fd8ff)])], Y0),
  ];
  const arch = (x, y, z, nx, ay) => [
    cyl(x, ay > 0 ? y : y - 3.4, z + 1.7, 0.3, ay > 0 ? y + 3.4 : y, 'concrete', { color: 0xf2e6c8 }),
    cyl(x, ay > 0 ? y : y - 3.4, z - 1.7, 0.3, ay > 0 ? y + 3.4 : y, 'concrete', { color: 0xf2e6c8 }),
  ];
  L(
    {
      name: '镜湖',
      hint: '桥断了一截，湖里的倒影里却有一座完整的桥。穿过桥头的拱门，你会掉进倒影世界，在那里头朝下走：倒影里的桥刚好补上了断口。',
      gun: 'none',
      killY: -300,
      sky: { kind: 'dusk', hemi: 0.75, exposure: 1.0, sea: { y: -4, kind: 'water', color: 0x2a6f9a, shade: 0x0c2a48 }, sun: { dir: [0.75, 0.14, -0.55], intensity: 2.6 }, fogNear: 70, fogFar: 420 },
      spawn: { pos: [-20, 0, 0], yaw: -90 },
      brushes: [
        ...real,
        ...arch(-5.5, 0, 0, -1, 1),
        ...arch(5.5, 0, 0, 1, 1),
        ...mir,
        ...arch(-7.5, Y0, 0, 1, -1).map((b) => ({ ...b, pos: [b.pos[0], Y0 - 1.7, b.pos[2]] })),
        ...arch(7.5, Y0, 0, -1, -1).map((b) => ({ ...b, pos: [b.pos[0], Y0 - 1.7, b.pos[2]] })),
      ],
      entities: [
        // 湖水：掉下去就淹死（看不见的酸液，水面是天空里画的）
        { type: 'hazard', hidden: true, pos: [0, -10, 0], size: [400, 10, 400] },
        // 倒影世界里重力朝上；“倒影的湖面”（头顶）是酸液，从桥上掉下去就掉进去
        { type: 'gravity', shape: 'box', pos: [0, Y0 - 2, 0], size: [70, 14, 30], dir: [0, 1, 0], hidden: true },
        { type: 'hazard', pool: true, up: [0, -1, 0], pos: [0, Y0 + 3.2, 0], size: [70, 1.2, 30] },
        // 桥头 A 的拱门通向倒影桥的西端，倒影桥的东端通向桥头 B
        {
          type: 'gateway',
          a: { pos: [-5.5, 1.6, 0], normal: [-1, 0, 0], up: [0, 1, 0] },
          b: { pos: [-7.5, Y0 - 1.6, 0], normal: [1, 0, 0], up: [0, -1, 0] },
          size: [2.4, 3.2],
          frame: true,
        },
        {
          type: 'gateway',
          a: { pos: [7.5, Y0 - 1.6, 0], normal: [-1, 0, 0], up: [0, -1, 0] },
          b: { pos: [5.5, 1.6, 0], normal: [1, 0, 0], up: [0, 1, 0] },
          size: [2.4, 3.2],
          frame: true,
        },
        exit(19, 0, 0, [2.4, 2.5, 2.4]),
        light(-12, 6, 0, 90, { distance: 40, fixture: false, color: 0xffc890 }),
        light(12, 6, 0, 90, { distance: 40, fixture: false, color: 0xffc890 }),
        light(0, Y0 - 6, 0, 120, { distance: 36, fixture: false, color: 0x9fc8ff }),
        light(-14, Y0 - 5, 0, 60, { distance: 26, fixture: false, color: 0xb6a4ff }),
        light(14, Y0 - 5, 0, 60, { distance: 26, fixture: false, color: 0xb6a4ff }),
      ],
    },
    async ({ ev, shot }) => {
      await shot('c6-3-start');
      await ev(() => {
        const pt = window.__pt;
        pt.walkWorld([-8, 0.92, 0], 8, 0.4);
      });
      await shot('c6-3-arch');
      await ev(() => {
        const pt = window.__pt;
        pt.walkWorld([-3, 0.92, 0], 6, 0.1, 1, 0, (g) => g.player.position.y < -50);
        pt.run(0.6);
      });
      await shot('c6-3-mirror');
      await ev(() => {
        const pt = window.__pt;
        pt.walkWorld([6.5, -101, 0], 8, 0.1, 1, 0, (g) => g.player.position.y > -50);
        pt.run(0.4);
      });
      await shot('c6-3-back');
      await ev(() => window.__pt.walkWorld([19, 0.92, 0], 10, 0.4));
    }
  );
}

// ---------------------------------------------------------------- 窗外的行星
{
  const C = [100, 0, 0];
  const PR = 12;
  const door = doorWallAndCorridor(8, [-8, 8], [0, 6], 1.5, 3, 6, ['b1']);
  const poolAt = (d) => ({
    type: 'hazard',
    pool: true,
    up: d,
    pos: planetPoint(C, PR, d, 0.4),
    size: d[0] ? [1.6, 3, 3] : [3, 3, 1.6],
  });
  const trees = [];
  let seed = 5;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  for (let i = 0; i < 40 && trees.length < 22; i++) {
    const th = rnd() * Math.PI * 2;
    const ph = Math.acos(rnd() * 2 - 1);
    const d = [Math.sin(ph) * Math.cos(th), Math.cos(ph), Math.sin(ph) * Math.sin(th)];
    // 避开两个极点、赤道上的酸液和从北极到南极的那条斜线路
    if (Math.abs(d[1]) > 0.78) continue;
    if (Math.abs(d[1]) < 0.28) continue;
    if (d[0] > 0.35 && d[2] > 0.35) continue;
    trees.push(...planetTree(C, PR, d, 0.6 + rnd() * 0.5, [0x4aa05a, 0x5bb06a, 0x7ab85a][i % 3]));
  }
  L(
    {
      name: '窗外的行星',
      hint: '空间站的舷窗不是玻璃，是一扇通往行星表面的门。出口的门要等行星另一头南极的按钮被压住才会开：把方块带过去。',
      gun: 'none',
      killY: -60,
      sky: { kind: 'space', hemi: 0.22, exposure: 0.8, nebA: 0x1f6a7a, nebB: 0x4a1f7a, sun: { dir: [0.4, 0.55, 0.7], intensity: 2.4 } },
      spawn: { pos: [-4, 0, 4], yaw: -30 },
      brushes: [
        ...room([-8, 8], [0, 6], [-8, 8], { floor: 'concrete', ceil: 'metal' }, ['zn', 'xp']),
        // 带舷窗的前墙：窗洞和空间门一样大
        ...wallWithHoles('z', [-8.5, -8], [-8.5, 8.5], [0, 6], [[-2.5, 2.5, 0, 3.8]], 'metal'),
        ...door.brushes,
        // 星球
        { pos: C, size: [PR * 2, PR * 2, PR * 2], mat: 'grass', shape: 'sphere' },
        ...trees,
        // 北极的石门框
        cyl(97, PR - 0.2, 0, 0.35, PR + 4.2, 'concrete', { color: 0xf2e6c8 }),
        cyl(103, PR - 0.2, 0, 0.35, PR + 4.2, 'concrete', { color: 0xf2e6c8 }),
        { pos: [100, PR + 4.2, 0], size: [6.7, 0.5, 0.7], mat: 'glow', color: 0xffd36b, intensity: 2.2, deco: true },
      ],
      entities: [
        ...door.entities.filter((e) => e.type !== 'light'),
        { type: 'gravity', shape: 'sphere', pos: C, radius: 22, g: 0.65 },
        {
          type: 'gateway',
          a: { pos: [0, 1.9, -8.25], normal: [0, 0, 1], up: [0, 1, 0] },
          b: { pos: [100, PR + 1.9, 0], normal: [0, 0, 1], up: [0, 1, 0] },
          size: [5, 3.8],
          frame: true,
        },
        { type: 'cube', pos: [-3.2, 0.35, 1.5] },
        { type: 'button', id: 'b1', pos: planetPoint(C, PR, [0, -1, 0], 0), up: [0, -1, 0] },
        poolAt([1, 0, 0]),
        poolAt([-1, 0, 0]),
        poolAt([0, 0, 1]),
        poolAt([0, 0, -1]),
        light(0, 5.7, 2, 32, { distance: 18 }),
        light(-5, 5.7, -4, 18, { distance: 14, color: 0xbfe6ff }),
        light(6, 3, -2, 12, { distance: 10, color: 0xfff0d0 }),
        light(114, 16, 12, 150, { distance: 70, fixture: false }),
        light(86, -16, -12, 100, { distance: 70, fixture: false, color: 0xffd9c0 }),
      ],
    },
    async ({ ev, shot }) => {
      await shot('c6-4-start');
      await ev(() => {
        const pt = window.__pt;
        const c = window.__game.cubes[0].position;
        pt.walkWorld([c.x + 0.5, c.y, c.z + 1.6], 6, 0.3);
        if (!pt.use([c.x, c.y, c.z])) throw new Error('没拿到方块');
        pt.walkWorld([0, 0.9, -12], 8, 0.1, 1, 0, (g) => g.player.position.x > 50);
        pt.run(0.6);
      });
      await shot('c6-4-planet');
      await ev(() => {
        const pt = window.__pt;
        const g = window.__game;
        if (g.player.position.x < 50) throw new Error('没过去：' + g.player.position.toArray());
        // 沿着斜线从北极走到南极，绕开赤道上的酸液
        const wps = [[108.5, 8.5, 0], [108.5, -1, 8.5], [100, -12.9, 8]];
        pt.walkWorld([100, 14, 3], 4, 0.4);
        pt.walkWorld([104.2, 11.2, 4.2], 6, 0.6);
        pt.walkWorld([108.5, 0, 8.5], 12, 0.8);
        pt.walkWorld([104, -11, 4], 10, 0.8);
        pt.walkWorld([100, -12.9, 1.4], 8, 0.3);
        g.debugAimAt([100, -12, 0]);
        g.player.pitch = -0.6;
        pt.run(0.8);
        pt.use();
        pt.run(1.5);
        g.player.pitch = 0;
      });
      await shot('c6-4-south');
      await ev(() => {
        const pt = window.__pt;
        // 回到北极的窗前（从正面穿回去）
        pt.walkWorld([108.5, 0, 8.5], 14, 0.8);
        pt.walkWorld([104.2, 11.2, 4.2], 8, 0.6);
        pt.walkWorld([100, 12.9, 4], 6, 0.3);
        pt.walkWorld([100, 13.5, -3], 6, 0.1, 1, 0, (g) => g.player.position.x < 50);
        pt.run(0.6);
        if (window.__game.player.position.x > 50) throw new Error('没回来');
        pt.walkWorld([8, 0.9, 0], 8, 0.4);
        pt.walkWorld([13, 0.9, 0], 8, 0.4);
      });
    }
  );
}

// ---------------------------------------------------------------- 魔方屋
{
  const HALF = 13;
  const STRIP = 4.5; // 每个面四周的酸河宽度
  const SH = 1.2; // 酸河的致死高度
  const FACES = {
    F: { n: [0, 1, 0], color: 0xf2d9a8, edge: 0xffd36b },
    C: { n: [0, -1, 0], color: 0xbfd8ff, edge: 0x7ac8ff },
    W: { n: [1, 0, 0], color: 0xffc7a3, edge: 0xff9a6b },
    E: { n: [-1, 0, 0], color: 0xc4eebc, edge: 0x7be08a },
    N: { n: [0, 0, 1], color: 0xdcc4ff, edge: 0xb48cff },
    S: { n: [0, 0, -1], color: 0xffc4dc, edge: 0xff8fbd },
  };
  const axisOf = (n) => (n[0] ? 0 : n[1] ? 1 : 2);
  /** 面 f 上的一点：u、v 是沿面的两个方向，h 是离开墙面的高度 */
  const at = (f, u, v, h = 0) => {
    const n = FACES[f].n;
    const a = axisOf(n);
    const p = [0, 0, 0];
    p[a] = -HALF * n[a] + n[a] * h;
    p[(a + 1) % 3] = u;
    p[(a + 2) % 3] = v;
    return p.map(r2);
  };
  /** 贴着面 f 的一块方块：u、v 范围，高度从 h0 到 h1 */
  const onFace = (f, [u0, u1], [v0, v1], h0, h1, extra = {}) => {
    const n = FACES[f].n;
    const a = axisOf(n);
    const lo = [0, 0, 0];
    const hi = [0, 0, 0];
    const s0 = -HALF * n[a] + n[a] * h0;
    const s1 = -HALF * n[a] + n[a] * h1;
    lo[a] = Math.min(s0, s1);
    hi[a] = Math.max(s0, s1);
    lo[(a + 1) % 3] = u0;
    hi[(a + 1) % 3] = u1;
    lo[(a + 2) % 3] = v0;
    hi[(a + 2) % 3] = v1;
    const out = box(...lo, ...hi, extra.mat ?? 'metal');
    return { ...out, ...extra, mat: extra.mat ?? 'metal' };
  };
  const brushes = [];
  const entities = [];
  // 六面墙：各染一种颜色
  const dim = (hex, k) => (Math.round(((hex >> 16) & 255) * k) << 16) | (Math.round(((hex >> 8) & 255) * k) << 8) | Math.round((hex & 255) * k);
  const walls = room([-HALF, HALF], [-HALF, HALF], [-HALF, HALF], { floor: 'metal', ceil: 'metal', xn: 'metal', xp: 'metal', zn: 'metal', zp: 'metal' });
  ['F', 'C', 'W', 'E', 'N', 'S'].forEach((f, i) => brushes.push({ ...walls[i], color: dim(FACES[f].color, 0.42) }));
  const PL = HALF - STRIP;
  for (const f of Object.keys(FACES)) {
    const { edge } = FACES[f];
    // 四周的酸河：发光的绿色薄板 + 看不见的致死范围
    const strips = [
      [[PL, HALF], [-HALF, HALF]],
      [[-HALF, -PL], [-HALF, HALF]],
      [[-PL, PL], [PL, HALF]],
      [[-PL, PL], [-HALF, -PL]],
    ];
    for (const [uu, vv] of strips) {
      brushes.push(onFace(f, uu, vv, 0, 0.12, { mat: 'acid', color: 0x2f9a6a, intensity: 0.12, deco: true }));
      const b = onFace(f, uu, vv, 0, SH);
      entities.push({ type: 'hazard', hidden: true, pos: b.pos, size: b.size });
    }
    // 小岛：浅色的石板，边上一圈发光的线
    brushes.push(onFace(f, [-PL, PL], [-PL, PL], 0, 0.04, { mat: 'plate', color: FACES[f].color }));
    for (const s of [-1, 1]) {
      brushes.push(onFace(f, [s * PL - 0.1, s * PL + 0.1], [-PL - 0.1, PL + 0.1], 0.04, 0.09, { mat: 'glow', color: edge, intensity: 1.9, deco: true }));
      brushes.push(onFace(f, [-PL, PL], [s * PL - 0.1, s * PL + 0.1], 0.04, 0.09, { mat: 'glow', color: edge, intensity: 1.9, deco: true }));
    }
    // 每座岛中央一块白板，用来开门
    brushes.push(onFace(f, [-4, 4], [-4, 4], 0.04, 0.04 + P, { mat: 'white' }));
    // 每座岛一盏带颜色的灯
    entities.push(light(...at(f, 0, 0, 6), 70, { distance: 26, fixture: false, color: edge }));
  }
  // 十二条棱上的光带，把魔方的轮廓勾出来
  for (const a of [-1, 1]) for (const b of [-1, 1]) {
    const o = HALF - 0.12;
    brushes.push({ pos: [a * o, b * o, 0], size: [0.24, 0.24, HALF * 2], mat: 'glow', color: 0xe8f6ff, intensity: 1.7, deco: true });
    brushes.push({ pos: [a * o, 0, b * o], size: [0.24, HALF * 2, 0.24], mat: 'glow', color: 0xe8f6ff, intensity: 1.7, deco: true });
    brushes.push({ pos: [0, a * o, b * o], size: [HALF * 2, 0.24, 0.24], mat: 'glow', color: 0xe8f6ff, intensity: 1.7, deco: true });
  }
  // 正中央的水晶：挡住正对面的视线和子弹
  brushes.push(sphere(0, 0, 0, 4.5, 'glass', 0x9ee6ff));
  brushes.push({ pos: [0, 0, 0], size: [2.8, 2.8, 2.8], mat: 'glow', shape: 'sphere', color: 0xfff0c0, intensity: 2.6, deco: true });
  entities.push(light(0, 0, 0, 240, { distance: 48, fixture: false, color: 0xfff1d8 }));
  // 重力：离哪面墙最近，哪面墙就是地面
  // 重力场比房间大一圈：从墙上的门出来时身体的一半还在墙里，不能掉到场外
  entities.push({ type: 'gravity', shape: 'cube', pos: [0, 0, 0], size: [HALF * 2 + 8, HALF * 2 + 8, HALF * 2 + 8] });
  // 方块、按钮、出口
  const A = at('E', 6.5, 0, 0.4);
  const B = at('S', -6.5, 0, 0.4);
  entities.push({ type: 'cube', pos: A });
  entities.push({ type: 'cube', pos: B });
  entities.push({ type: 'button', id: 'b1', pos: at('W', 0, 6.5, 0.04), up: FACES.W.n });
  entities.push({ type: 'button', id: 'b2', pos: at('N', 0, -6.5, 0.04), up: FACES.N.n });
  entities.push({ ...exit(...at('C', 6, -6, 1.3), [2.6, 2.6, 2.6]), up: [0, -1, 0], when: ['b1', 'b2'] });
  entities.push({ ...light(...at('C', 6, -6, 2.2), 18, { distance: 8, fixture: false, color: 0xb8ffd0 }) });
  L(
    {
      name: '魔方屋',
      hint: '这座魔方里，离你最近的那面墙就是“地面”：六面墙是六座孤岛，岛与岛之间隔着酸河。中央的水晶挡住了正对面的视线，只能先到相邻的岛上，再用传送门一座岛一座岛地跳。把两个方块送到两个按钮上，头顶那座岛上的出口才会亮。',
      gun: 'both',
      killY: -80,
      killR: 60,
      look: { hemi: 0.22, exposure: 0.85, env: 0.3, bloom: 0.34 },
      spawn: { pos: at('F', -6, 6.5, 0.92), yaw: 180 },
      brushes,
      entities,
    },
    async ({ ev, shot }) => {
      const center = (f, h = 0) => at(f, 0, 0, h);
      // 站位：沿着门的长轴（墙上的门是竖着的椭圆）离门口 4 米处，和自己同一侧，朝门口走时不会踩过门
      const axisOf2 = (f) => (f === 'F' || f === 'C' ? [0, 0, 1] : [0, 1, 0]);
      /** 站在 stand 处开枪（fires），可以顺手拿起 carry 处的方块（拿着东西开不了枪），再慢慢走进 enter 处的门，出来后顺着冲劲走开 */
      const hop = (from, fires, to, label, carry) =>
        ev(
          ([ax, fires, enter, label, carry]) => {
            const pt = window.__pt;
            const g = window.__game;
            const standPoint = () => {
              const p = g.player.position;
              const s = (p.x - enter[0]) * ax[0] + (p.y - enter[1]) * ax[1] + (p.z - enter[2]) * ax[2] >= 0 ? 1 : -1;
              return [enter[0] + ax[0] * 4 * s, enter[1] + ax[1] * 4 * s, enter[2] + ax[2] * 4 * s];
            };
            pt.walkWorld(standPoint(), 10, 0.35);
            pt.run(0.8);
            for (const [color, target] of fires) if (!pt.fire(color, target)) throw new Error('开枪失败 ' + target + ' ' + label);
            if (carry) {
              const c = g.cubes.reduce((a, b) => (a.position.distanceTo({ x: carry[0], y: carry[1], z: carry[2] }) < b.position.distanceTo({ x: carry[0], y: carry[1], z: carry[2] }) ? a : b));
              pt.walkWorld([c.position.x, c.position.y, c.position.z], 8, 1.3);
              if (!pt.use([c.position.x, c.position.y, c.position.z])) throw new Error('没拿到方块 ' + label);
              pt.walkWorld(standPoint(), 10, 0.35);
              pt.run(0.4);
            }
            const p0 = g.player.position.clone();
            // 以 2 米/秒的速度从长轴方向走进门口：既不会越过门洞，出来时也带着冲劲能离开门
            pt.walkWorld(enter, 16, 0.05, 0.4, 0, (g) => g.player.position.distanceTo(p0) > 8);
            if (g.player.position.distanceTo(p0) < 8) throw new Error('没传过去：' + g.player.position.toArray() + ' ' + label);
            const pl = g.player;
            // 出来时是“往外飞”，门洞边缘像一圈看不见的墙：顺着横向的冲劲走开，免得又掉回门里
            const v = pl.velocity.clone();
            v.addScaledVector(pl.up, -v.dot(pl.up));
            if (v.length() > 0.5) {
              v.normalize().multiplyScalar(4);
              pt.walkWorld([pl.position.x + v.x, pl.position.y + v.y, pl.position.z + v.z], 0.7, 0.2);
            }
            pt.run(0.6);
          },
          [axisOf2(from), fires, center(from), label, carry ?? null]
        );
      const put = (btn) =>
        ev((btn) => {
          const pt = window.__pt;
          const g = window.__game;
          // 走到离按钮 1.7 米以内，朝按钮看过去，低头放下
          pt.walkWorld(btn, 8, 1.7);
          g.debugAimAt(btn);
          pt.run(0.6);
          pt.use();
          pt.run(1.5);
        }, btn);
      await shot('c6-5-start');
      // 1) 地板 → 东墙：蓝门开在脚下的岛上，橙门开在东墙
      await hop('F', [['orange', center('E')], ['blue', center('F')]], 'E', 'F→E');
      await shot('c6-5-east');
      // 2) 东墙 → 北墙：先开好门，再拿方块，带去北墙的按钮
      await hop('E', [['blue', center('N')]], 'N', 'E→N', A);
      await shot('c6-5-north');
      await put(at('N', 0, -6.5));
      // 3) 北墙 → 西墙 → 南墙
      await hop('N', [['orange', center('W')]], 'W', 'N→W');
      await hop('W', [['blue', center('S')]], 'S', 'W→S');
      await shot('c6-5-south');
      // 4) 南墙取第二个方块 → 西墙，放在西墙的按钮上
      await hop('S', [], 'W', 'S→W', B);
      await put(at('W', 0, 6.5));
      await shot('c6-5-west');
      // 5) 西墙 → 头顶那座岛，走进出口
      await hop('W', [['blue', center('C')]], 'C', 'W→C');
      await shot('c6-5-ceiling');
      await ev((ex) => window.__pt.walkWorld(ex, 12, 0.3), at('C', 6, -6, 0.92));
    }
  );
}

export default levels;
