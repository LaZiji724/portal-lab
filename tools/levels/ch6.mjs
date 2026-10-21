// 第 6 章：异形空间。房间不再是方盒子：圆形大厅、螺旋塔、起伏的大陆、漂浮的群岛。
// 墙可以斜着放（ringWalls、slab），地面可以是圆盘和山丘（cyl、sphere），传送门照样能开在斜放的白色面板上。
import { box, cyl, sphere, slab, ringWalls, ringPanel, ringPoint, light, exit, panelX, P } from '../levelkit.mjs';

const levels = [];
const L = (def, solve) => levels.push({ def, solve });
const DEG = Math.PI / 180;
const pt3 = (v) => v.map((x) => Math.round(x * 100) / 100);

// ---------------------------------------------------------------- 圆厅
{
  const N = 16;
  const AP = 10;
  const spawnAt = ringPoint(0, 0, AP, N, 12, 2);
  const ledge = 6; // 高台靠着第 6 面墙
  const [lx, lz] = ringPoint(0, 0, AP, N, ledge, 1.8);
  const la = ((ledge + 0.5) / N) * 360;
  const exitAt = ringPoint(0, 0, AP, N, ledge, 2.4);
  const yawTo = (p) => (Math.atan2(p[0], p[1]) / DEG) | 0;
  const A = ringPoint(0, 0, AP, N, 13, 0.06); // 低处的白板（出生点旁边）
  const B = ringPoint(0, 0, AP, N, ledge, 0.06); // 高台后墙上的白板
  L(
    {
      name: '圆厅',
      hint: '十六面墙围成的圆形大厅，墙是斜着的，传送门也能开在上面。对面高台上有出口，可你跳不上去。',
      gun: 'both',
      spawn: { pos: [spawnAt[0], 0, spawnAt[1]], yaw: yawTo(spawnAt) },
      brushes: [
        cyl(0, -0.5, 0, 11.6, 0, 'concrete'),
        cyl(0, 7, 0, 11.6, 7.5, 'metal'),
        cyl(0, 0, 0, 1.8, 7, 'metal'),
        ...ringWalls(0, 0, AP, N, [0, 7], 'metal'),
        // 高台：贴着第 6 面墙的一块斜放的方块
        { pos: [Math.round(lx * 100) / 100, 2.25, Math.round(lz * 100) / 100], size: [6.6, 4.5, 3.6], mat: 'concrete', rot: [0, Math.round(-(la + 90) * 100) / 100, 0] },
        ringPanel(0, 0, AP, N, 13, 4.2, [0.2, 3.6]),
        ringPanel(0, 0, AP, N, ledge, 4.2, [4.6, 7.0]),
      ],
      entities: [
        exit(exitAt[0], 4.5, exitAt[1], [2.2, 2.5, 2.2]),
        light(0, 6.6, 0, 90, { shadow: true, distance: 30 }),
        ...[1, 4, 8, 11, 14].map((i) => {
          const p = ringPoint(0, 0, AP, N, i, 1);
          return light(p[0], 6.4, p[1], 16, { distance: 14 });
        }),
        light(exitAt[0], 8.5 - 2, exitAt[1], 20, { distance: 12, color: 0xbfffd0 }),
      ],
    },
    async ({ ev, shot }) => {
      await shot('c6-1-start');
      await ev(
        ([a, b]) => {
          const pt = window.__pt;
          pt.fire('blue', [a[0], 1.9, a[1]]);
          pt.fire('orange', [b[0], 5.8, b[1]]);
        },
        [A, B]
      );
      await ev(
        ([a]) => {
          const pt = window.__pt;
          // 走进蓝门，从高台后墙的橙门出来
          pt.walkWorld([a[0] * 1.2, 1.0, a[1] * 1.2], 8, 0.1, 1, 0, (g) => g.player.position.y > 3.5);
          pt.run(0.4);
        },
        [A]
      );
      await shot('c6-1-ledge');
      await ev(([e]) => window.__pt.walkWorld([e[0], 4.5, e[1]], 8, 0.4), [exitAt]);
    }
  );
}

// ---------------------------------------------------------------- 螺旋塔
{
  const RC = 6.55; // 坡道中心线半径
  const W = 4.4;
  const K = 32;
  const GAP = [14, 15, 16]; // 缺掉的三段
  const ang = (k) => k * 22.5 * DEG;
  const yk = (k) => Math.round((0.5 + k * 0.3) * 100) / 100;
  const pk = (k, y = yk(k)) => [Math.round(RC * Math.cos(ang(k)) * 100) / 100, y, Math.round(RC * Math.sin(ang(k)) * 100) / 100];
  const slabs = [];
  for (let k = 0; k < K; k++) {
    if (GAP.includes(k)) continue;
    const a = pk(k, yk(k) - 0.2);
    const b = pk(k + 1, yk(k + 1) - 0.2);
    slabs.push(slab(a, b, W, 0.4, 'concrete', { extend: W * Math.tan(11.25 * DEG) }));
  }
  const N = 24;
  const AP = 8.6;
  const wall = (i) => ringPoint(0, 0, AP, N, i, 0.06);
  const P1 = wall(20); // 缺口前（第 13 段旁边）
  const P2 = wall(2); // 缺口后
  const yAt = (i) => {
    const a = ((i + 0.5) / N) * 360;
    return yk(a / 22.5);
  };
  const yP1 = yAt(20);
  const yP2 = yAt(2) + 16 * 0 + 0; // 缺口后，已经转过一圈：见下
  // 第 2 面墙在第二圈里的高度：角度 +360°
  const yP2b = yk(((2 + 0.5) / N) * 16 + 16);
  const top = pk(K - 1);
  L(
    {
      name: '螺旋塔',
      hint: '螺旋坡道一路向上，但中间断了一大截。墙上有两块白色面板：一块在断口前，一块在断口后。',
      gun: 'both',
      spawn: { pos: [pk(0)[0], 0.5, pk(0)[2]], yaw: 0 },
      brushes: [
        cyl(0, -0.5, 0, 9.4, 0, 'concrete'),
        cyl(0, 13.5, 0, 9.4, 14, 'metal'),
        cyl(0, 0, 0, 2.8, 14, 'metal'),
        ...ringWalls(0, 0, AP, N, [0, 14], 'metal'),
        ...slabs,
        ringPanel(0, 0, AP, N, 20, 4.4, [yP1 + 0.0, yP1 + 3.0]),
        ringPanel(0, 0, AP, N, 2, 4.4, [yP2b + 0.0, yP2b + 3.0]),
      ],
      entities: [
        exit(top[0] * 0.78, top[1], top[2] * 0.78, [2, 2.5, 2]),
        ...[2, 5, 8, 11].flatMap((h, j) =>
          [0, 120, 240].map((deg) => {
            const a = (deg + j * 40) * DEG;
            return light(Math.cos(a) * 7.4, h + 3, Math.sin(a) * 7.4, 16, { distance: 11, ...(j === 1 ? { color: 0xffe2b8 } : {}) });
          })
        ),
        light(0, 13.2, 0, 60, { distance: 25 }),
      ],
    },
    async ({ ev, shot }) => {
      await shot('c6-2-start');
      await ev(
        ([wps]) => {
          const pt = window.__pt;
          for (const w of wps) pt.walkWorld(w, 4, 0.7);
        },
        [Array.from({ length: 13 }, (_, i) => pk(i + 1, yk(i + 1) + 0.92))]
      );
      await shot('c6-2-gap');
      await ev(
        ([p1, p2, y1, y2]) => {
          const pt = window.__pt;
          pt.fire("blue", [p1[0], y1 + 1.2, p1[1]]);
          pt.fire("orange", [p2[0], y2 + 1.2, p2[1]]);
        },
        [P1, P2, yP1, yP2b]
      );
      await ev(
        ([p1, y1]) => {
          const pt = window.__pt;
          pt.walkWorld([p1[0] * 1.15, y1 + 0.9, p1[1] * 1.15], 8, 0.1, 1, 0, (g) => g.player.position.y > y1 + 1.6);
          pt.run(0.4);
        },
        [P1, yP1]
      );
      await shot('c6-2-across');
      await ev(
        ([wps, e]) => {
          const pt = window.__pt;
          for (const w of wps) pt.walkWorld(w, 4, 0.7);
          pt.walkWorld(e, 6, 0.4);
        },
        [Array.from({ length: 14 }, (_, i) => pk(i + 18, yk(i + 18) + 0.92)), [top[0] * 0.78, top[1] + 0.9, top[2] * 0.78]]
      );
    }
  );
}

// ---------------------------------------------------------------- 大陆
{
  // 起伏的山丘 = 大半埋进地里的球：露出的部分坡度不到 35°，能一直走上去
  const hill = (x, z, R, capH, color = 0x7fae62) => sphere(x, capH - R, z, R, 'concrete', color);
  const ROCK = 0xb08a6a;
  const GRASS = 0x79a85c;
  const mesa = [45, -10];
  const MR = 9;
  const MT = 9.6;
  const RAMP_R = 10.5;
  const mk = (k) => {
    const a = (180 + k * 22.5) * DEG;
    return [Math.round((mesa[0] + RAMP_R * Math.cos(a)) * 100) / 100, Math.round(k * 0.6 * 100) / 100, Math.round((mesa[1] + RAMP_R * Math.sin(a)) * 100) / 100];
  };
  const ramp = [];
  for (let k = 0; k < 16; k++) {
    const a = mk(k);
    const b = mk(k + 1);
    ramp.push(slab([a[0], a[1] - 0.2, a[2]], [b[0], b[1] - 0.2, b[2]], 3.2, 0.4, 'concrete', { color: ROCK, extend: 3.2 * Math.tan(11.25 * DEG) }));
  }
  // 路线：树不能挡路
  const route = [
    [-70, 0],
    [-12, 0],
    [-8, 3],
    [14, 6],
    [34, -4],
    [mesa[0], mesa[1]],
  ];
  const near = (x, z) =>
    route.some((p, i) => {
      const q = route[i + 1];
      if (!q) return Math.hypot(x - p[0], z - p[1]) < 7;
      const dx = q[0] - p[0];
      const dz = q[1] - p[1];
      const t = Math.max(0, Math.min(1, ((x - p[0]) * dx + (z - p[1]) * dz) / (dx * dx + dz * dz)));
      return Math.hypot(x - (p[0] + dx * t), z - (p[1] + dz * t)) < 7;
    });
  let seed = 7;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  const trees = [];
  for (let i = 0; i < 70 && trees.length < 44; i++) {
    const x = -85 + rnd() * 170;
    const z = -55 + rnd() * 110;
    if (Math.abs(x) < 12 || near(x, z) || Math.hypot(x - mesa[0], z - mesa[1]) < 16) continue;
    if ([[-50, 18, 14], [-30, -30, 11], [30, 30, 12], [70, -20, 12]].some(([hx, hz, hr]) => Math.hypot(x - hx, z - hz) < hr)) continue;
    const s = 0.8 + rnd() * 0.7;
    trees.push(cyl(x, 0, z, 0.32 * s, 3.2 * s, 'concrete', { color: 0x6b4a2f }), sphere(x, 4.3 * s, z, 2.1 * s, 'concrete', 0x3f9a4f + (i % 3) * 0x080400));
  }
  // 四周的山脊：陡得爬不上去，当作世界的边
  const ridge = [];
  for (let x = -110; x <= 110; x += 38) ridge.push(sphere(x, -26, -92, 50, 'concrete', ROCK), sphere(x + 19, -30, 92, 50, 'concrete', ROCK));
  for (let z = -76; z <= 76; z += 38) ridge.push(sphere(-122, -28, z, 50, 'concrete', ROCK), sphere(122, -28, z + 19, 50, 'concrete', ROCK));
  L(
    {
      name: '大陆',
      hint: '一整片大陆：山丘、树林、一条深深的河谷，远处的岛上有座灯塔。河谷两岸各立着一块白色面板。',
      gun: 'both',
      killY: -12,
      sky: { kind: 'day', hemi: 0.95, exposure: 1.0, sun: { dir: [0.45, 0.62, -0.5], intensity: 2.4 }, fogNear: 90, fogFar: 520 },
      spawn: { pos: [-72, 0, 0], yaw: -90 },
      brushes: [
        // 西岸、东岸、河床
        box(-125, -8, -95, -7, 0, 95, 'concrete'),
        box(7, -8, -95, 125, 0, 95, 'concrete'),
        box(-7, -8, -95, 7, -5, 95, 'concrete'),
        // 地形
        hill(-50, 18, 30, 4.5),
        hill(-30, -30, 22, 3.3),
        hill(-72, -20, 26, 4),
        hill(30, 30, 24, 3.6),
        hill(75, 0, 34, 5.2),
        hill(70, -40, 22, 3.3),
        ...ridge,
        ...trees,
        // 河谷两岸的白色面板（各立在一块石碑上）
        box(-10.3, 0, -4, -9.7, 7, 4, 'metal'),
        panelX(-9.7, 1, [-3, 3], [0.2, 5.6]),
        box(16, 0, -4, 16.6, 7, 4, 'metal'),
        panelX(16, -1, [-3, 3], [0.2, 5.6]),
        // 远处的山丘上的石台和灯塔
        cyl(mesa[0], -8, mesa[1], MR, MT, 'concrete', { color: ROCK }),
        ...ramp,
        cyl(mesa[0] + 2, MT, mesa[1] + 2, 1.5, MT + 9, 'white', { color: 0xf4f0e8 }),
        cyl(mesa[0] + 2, MT + 9, mesa[1] + 2, 1.7, MT + 10, 'metal', { color: 0xc8483a }),
        cyl(mesa[0] + 2, MT + 10, mesa[1] + 2, 1.1, MT + 12, 'glass'),
        cyl(mesa[0] + 2, MT + 12, mesa[1] + 2, 1.5, MT + 12.6, 'metal', { color: 0xc8483a }),
      ],
      entities: [
        { type: 'hazard', pool: true, pos: [0, -4.2, 0], size: [14, 1.6, 190] },
        exit(mesa[0] - 3.2, MT, mesa[1] - 1, [2.4, 2.5, 2.4]),
        light(mesa[0] + 2, MT + 11, mesa[1] + 2, 600, { distance: 90, fixture: false, color: 0xfff1c8 }),
      ],
    },
    async ({ ev, shot }) => {
      await shot('c6-3-start');
      await ev(() => {
        const pt = window.__pt;
        pt.walkWorld([-30, 0.92, 0], 14, 1.2);
        pt.walkWorld([-14, 0.92, 7], 10, 0.8);
        pt.walkWorld([-8.2, 0.92, 6], 5, 0.4);
        pt.walkWorld([-8.2, 0.92, 2.6], 4, 0.3);
      });
      await shot('c6-3-bank');
      await ev(() => {
        const pt = window.__pt;
        pt.fire('blue', [-9.7, 1.8, 0]);
        pt.fire('orange', [16, 1.8, 0]);
        pt.walkWorld([-8.2, 0.92, 0], 4, 0.2);
        pt.walkWorld([-13, 0.92, 0], 6, 0.1, 1, 0, (g) => g.player.position.x > 12);
        pt.run(0.3);
      });
      await shot('c6-3-across');
      await ev(
        ([wps, start, e]) => {
          const pt = window.__pt;
          pt.walkWorld([14.5, 0.92, 6], 6, 0.5);
          pt.walkWorld([30, 0.92, 4], 10, 1);
          pt.walkWorld(start, 12, 0.8);
          for (const w of wps) pt.walkWorld(w, 5, 0.8);
          pt.walkWorld(e, 8, 0.5);
        },
        [Array.from({ length: 16 }, (_, i) => [mk(i + 1)[0], mk(i + 1)[1] + 0.92, mk(i + 1)[2]]), [mk(0)[0], 0.92, mk(0)[2]], [mesa[0] - 3.2, MT + 0.9, mesa[1] - 1]]
      );
    }
  );
}

// ---------------------------------------------------------------- 浮空群岛
{
  const ROCK = 0x9a7a62;
  const isle = (x, y, z, r, color = 0x79a85c) => [
    cyl(x, y - 2.5, z, r, y, 'concrete', { color }),
    sphere(x, y - 2.5 - r * 0.55, z, r * 1.02, 'concrete', ROCK),
  ];
  const A = [0, 0, 0];
  const B = [24, 3, -6];
  const C = [44, 6, 6];
  const D = [66, 9, -2];
  const tree = (x, y, z, s = 1) => [cyl(x, y, z, 0.3 * s, y + 3 * s, 'concrete', { color: 0x6b4a2f }), sphere(x, y + 4 * s, z, 1.9 * s, 'concrete', 0x3f9a4f)];
  L(
    {
      name: '浮空群岛',
      hint: '天上的小岛之间隔着很远。踩上黄色箭头的弹射板能飞到下一座岛；最后一段落差太大，要靠传送门。掉下去就没有地面了。',
      gun: 'both',
      killY: -30,
      sky: { kind: 'dusk', hemi: 0.75, exposure: 1.1, sun: { dir: [0.8, 0.16, -0.5], intensity: 2.6 }, fogNear: 60, fogFar: 380 },
      spawn: { pos: [-3, 0, 0], yaw: -90 },
      brushes: [
        ...isle(...A, 8, 0x86b868),
        ...isle(...B, 5.4),
        ...isle(...C, 6.4, 0x8ec070),
        ...isle(...D, 8.4, 0x86b868),
        // 第三座岛上的石碑（蓝门）、第四座岛上的石碑（橙门）
        box(41, 6, 3, 41.6, 13, 9, 'metal'),
        panelX(41.6, 1, [4, 8], [6.1, 11.6]),
        box(60.4, 9, -4.2, 61, 16, 0, 'metal'),
        panelX(60.4, -1, [-3.8, -0.4], [9.1, 14.6]),
        // 装饰：小树和远处漂浮的碎岩
        ...tree(-4, 0, 4, 1),
        ...tree(3, 0, -5.5, 0.9),
        ...tree(21, 3, -9, 0.8),
        ...tree(41, 6, 10, 0.9),
        ...tree(70, 9, 3, 1.1),
        ...tree(64, 9, -6, 0.9),
        sphere(12, -14, 20, 3.4, 'concrete', ROCK),
        sphere(34, -8, -22, 5, 'concrete', ROCK),
        sphere(56, 16, 22, 3, 'concrete', ROCK),
        sphere(-16, 10, -18, 4, 'concrete', ROCK),
        sphere(84, -4, 18, 4.5, 'concrete', ROCK),
      ],
      entities: [
        { type: 'launcher', pos: [4.4, 0, -1.2], target: [B[0] - 1, B[1], B[2] + 1], time: 1.7 },
        { type: 'launcher', pos: [B[0] + 1.6, B[1], B[2] + 0.6], target: [C[0] + 3, C[1], C[2] - 1], time: 1.8 },
        exit(D[0] + 3.5, D[1], D[2] + 1, [2.4, 2.5, 2.4]),
        light(10, 10, 5, 60, { distance: 40, fixture: false, color: 0xffd9a8 }),
        light(66, 18, 4, 100, { distance: 50, fixture: false, color: 0xffd9a8 }),
      ],
    },
    async ({ ev, shot }) => {
      await shot('c6-4-start');
      await ev(() => {
        const pt = window.__pt;
        pt.walkWorld([4.4, 0.92, -1.2], 6, 0.1, 1, 0, (g) => g.player.launched);
        pt.run(2.4);
      });
      await shot('c6-4-b');
      await ev(() => {
        const pt = window.__pt;
        pt.walkWorld([25.6, 3.92, -5.4], 6, 0.1, 1, 0, (g) => g.player.launched);
        pt.run(2.4);
      });
      await shot('c6-4-c');
      await ev(() => {
        const pt = window.__pt;
        pt.walkWorld([47.5, 6.92, 6], 6, 0.5);
        pt.fire('blue', [41.6, 7.6, 6]);
        pt.fire('orange', [60.4, 10.3, -2.1]);
        pt.walkWorld([39, 6.92, 6], 8, 0.1, 1, 0, (g) => g.player.position.x > 55);
        pt.run(0.3);
      });
      await shot('c6-4-d');
      await ev(() => {
        const pt = window.__pt;
        pt.walkWorld([59.6, 9.92, 1.5], 6, 0.4);
        pt.walkWorld([64, 9.92, 1.5], 6, 0.5);
        pt.walkWorld([69.5, 9.92, -1], 6, 0.5);
      });
    }
  );
}

export default levels;
