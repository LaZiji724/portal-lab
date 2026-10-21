// 终章「万象」（第 37 关，由 ch7.mjs 汇总）：一座漂浮在星空里的圆形广场，四周立着四扇星门，每扇门后是一个小世界。
// 从每个世界里各取回一个方块，放到广场上对应颜色的按钮上，中央的出口才会亮。
import { box, cyl, sphere, light, exit, tubeWalls, tubePanel, tubeBox, tubeCap, tubeLawn, tubeTree, planetTree, planetBox, planetPoint, isle, tree, mirrorY } from '../../levelkit.mjs';

const levels = [];
const L = (def, solve) => levels.push({ def, solve });
const DEG = Math.PI / 180;
const r2 = (v) => Math.round(v * 100) / 100;
const shift = (list, [dx, dy, dz]) => list.map((b) => ({ ...b, pos: [r2(b.pos[0] + dx), r2(b.pos[1] + dy), r2(b.pos[2] + dz)] }));
const add3 = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];

{
  // ------------------------------------------------------------ 广场
  const RING = 9; // 星门离广场中心的距离
  const GATE = [2.8, 4.2]; // 星门尺寸
  const accent = [0x58d8ff, 0x7be08a, 0xffc85a, 0xc08cff];
  const th = (i) => i * 90 * DEG;
  const ringPos = (i, rad = RING, y = GATE[1] / 2) => [r2(Math.cos(th(i)) * rad), y, r2(Math.sin(th(i)) * rad)];
  const ringNormal = (i) => [r2(-Math.cos(th(i))), 0, r2(-Math.sin(th(i)))];
  const btnPos = (i) => [r2(Math.cos(th(i) + Math.PI / 4) * 5.2), 0.03, r2(Math.sin(th(i) + Math.PI / 4) * 5.2)];

  // 小世界的位置（离广场很远，各在一个方向上）
  const C1 = [250, 0, 0]; // 旋转圆筒
  const C2 = [0, 0, 250]; // 小行星
  const C3 = [-250, 0, 0]; // 魔方屋
  const C4 = [0, 0, -250]; // 镜湖

  const brushes = [];
  const entities = [];

  // 广场：深色的盘子，上面一层浅色的石板，边上一圈发光的线
  brushes.push(cyl(0, -1.2, 0, 15, 0, 'plate', { color: 0x2a3350 }));
  brushes.push({ pos: [0, 0.01, 0], size: [23.2, 0.02, 23.2], mat: 'glow', shape: 'cyl', color: 0x7ae8ff, intensity: 1.7, deco: true });
  brushes.push(cyl(0, -0.02, 0, 11.3, 0.04, 'plate', { color: 0x6c7898 }));
  // 两圈细细的光环
  brushes.push({ pos: [0, 0.043, 0], size: [14.4, 0.006, 14.4], mat: 'glow', shape: 'cyl', color: 0x7ae8ff, intensity: 1.2, deco: true });
  brushes.push({ pos: [0, 0.049, 0], size: [14.1, 0.006, 14.1], mat: 'plate', shape: 'cyl', color: 0x6c7898, deco: true });
  // 地面上的四道光带：从每扇门通向中心，颜色和门、按钮一致
  for (let i = 0; i < 4; i++) {
    const a = th(i);
    const mid = RING / 2 + 0.5;
    brushes.push({
      pos: [r2(Math.cos(a) * mid), 0.05, r2(Math.sin(a) * mid)],
      size: [r2(Math.abs(Math.cos(a)) * 8 + Math.abs(Math.sin(a)) * 0.35), 0.02, r2(Math.abs(Math.sin(a)) * 8 + Math.abs(Math.cos(a)) * 0.35)],
      mat: 'glow',
      color: accent[i],
      intensity: 1.5,
      deco: true,
    });
  }
  // 星门两侧的立柱和门楣
  for (let i = 0; i < 4; i++) {
    const a = th(i);
    const side = [-Math.sin(a), Math.cos(a)];
    for (const s of [-1, 1]) {
      const x = Math.cos(a) * (RING + 0.5) + side[0] * s * (GATE[0] / 2 + 0.45);
      const z = Math.sin(a) * (RING + 0.5) + side[1] * s * (GATE[0] / 2 + 0.45);
      brushes.push(cyl(x, 0, z, 0.3, GATE[1] + 0.9, 'plate', { color: 0x39425a }));
      brushes.push({ pos: [r2(x), GATE[1] + 1.15, r2(z)], size: [0.5, 0.5, 0.5], mat: 'glow', shape: 'sphere', color: accent[i], intensity: 2.4, deco: true });
    }
  }
  // 按钮：每个按钮底下一圈同色的光
  for (let i = 0; i < 4; i++) {
    const p = btnPos(i);
    brushes.push({ pos: [p[0], 0.05, p[2]], size: [3.2, 0.02, 3.2], mat: 'glow', shape: 'cyl', color: accent[i], intensity: 0.9, deco: true });
    entities.push({ type: 'button', id: `b${i + 1}`, pos: p, up: [0, 1, 0] });
  }
  // 中央的出口：四个按钮都亮了才会打开
  brushes.push({ pos: [0, 0.05, 0], size: [5.2, 0.02, 5.2], mat: 'glow', shape: 'cyl', color: 0xd8f4ff, intensity: 0.75, deco: true });
  entities.push({ type: 'exit', pos: [0, 1.4, 0], size: [3, 2.8, 3], when: ['b1', 'b2', 'b3', 'b4'] });
  // 外圈的八根灯柱
  for (let k = 0; k < 8; k++) {
    const a = ((k + 0.5) / 8) * Math.PI * 2;
    const x = r2(Math.cos(a) * 13.6);
    const z = r2(Math.sin(a) * 13.6);
    brushes.push(cyl(x, 0, z, 0.22, 3.2, 'plate', { color: 0x39425a }));
    brushes.push({ pos: [x, 3.5, z], size: [0.55, 0.55, 0.55], mat: 'glow', shape: 'sphere', color: accent[k % 4], intensity: 2.2, deco: true });
  }
  entities.push({ type: 'hazard', hidden: true, pos: [0, -12, 0], size: [80, 10, 80] });
  entities.push(light(0, 7, 0, 90, { distance: 34, fixture: false, color: 0xfff1d8 }));
  entities.push(light(9, 3, 9, 26, { distance: 20, fixture: false, color: 0x7ad8ff }));
  entities.push(light(-9, 3, -9, 26, { distance: 20, fixture: false, color: 0xffc85a }));

  // ------------------------------------------------------------ 四个小世界
  // 1) 旋转圆筒：方块在头顶那一面的尽头
  {
    const R = 7;
    const N = 16;
    const [Z0, Z1] = [-14, 14];
    brushes.push(...tubeWalls(C1[0], C1[1], R, N, [Z0, Z1], 'plate', { skip: [0, 8], extra: { color: 0xcfc4a8 } }));
    brushes.push(...tubeWalls(C1[0], C1[1], R, N, [Z0, Z1], 'glass', { only: [0, 8] }));
    brushes.push(tubeCap(C1[0], C1[1], Z0 - 0.25, R, 'metal'), tubeCap(C1[0], C1[1], Z1 + 0.25, R, 'metal'));
    brushes.push(...tubeLawn(C1[0], C1[1], R, N, [11, 12, 13, 14, 10], [Z0 + 0.5, Z1 - 0.5], 0xa9c892, 'grass'));
    brushes.push(...tubeLawn(C1[0], C1[1], R, N, [4, 5, 6, 7, 3], [Z0 + 0.5, Z1 - 0.5], 0xa9c892, 'grass'));
    brushes.push(...tubeTree(C1[0], C1[1], R, 235, 2, 0.6, 0x4aa05a), ...tubeTree(C1[0], C1[1], R, 305, 6, 0.55, 0x5bb06a), ...tubeTree(C1[0], C1[1], R, 120, 0, 0.55, 0x3f9a4f));
    brushes.push({ pos: [...C1], size: [0.5, 0.5, 28], mat: 'glow', color: 0xfff3d6, intensity: 1.9, deco: true });
    entities.push({ type: 'gravity', shape: 'axis', pos: C1, axis: [0, 0, 1], radius: R - 0.1, length: Z1 - Z0 });
    entities.push(light(C1[0], 0, 0, 80, { distance: 22, fixture: false, color: 0xfff3d8 }));
    entities.push({ type: 'cube', pos: [C1[0], R - 0.38, 8] });
    entities.push({
      type: 'gateway',
      a: { pos: ringPos(0), normal: ringNormal(0), up: [0, 1, 0] },
      b: { pos: [C1[0], -R + GATE[1] / 2, -10], normal: [0, 0, 1], up: [0, 1, 0] },
      size: GATE,
      frame: true,
    });
  }

  // 2) 小行星：方块在南极，赤道上有四摊酸液
  {
    const R = 6;
    brushes.push({ pos: [...C2], size: [R * 2, R * 2, R * 2], mat: 'grass', shape: 'sphere', color: 0xa9c892 });
    const dirs = [[1, 0, 0], [-1, 0, 0], [0, 0, 1], [0, 0, -1]];
    for (const d of dirs) {
      brushes.push(planetBox(C2, R, d, [d[0] ? 1.6 : 3, 0.14, d[0] ? 3 : 1.6].map((v, k) => v), 'acid', { deco: true, color: 0x2f9a6a, intensity: 0.12 }));
      entities.push({ type: 'hazard', hidden: true, pos: planetPoint(C2, R, d, 0.4), size: d[0] ? [1.6, 3, 3] : [3, 3, 1.6] });
    }
    let seed = 3;
    const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    for (let i = 0, n = 0; i < 40 && n < 7; i++) {
      const t = rnd() * Math.PI * 2;
      const ph = Math.acos(rnd() * 2 - 1);
      const d = [Math.sin(ph) * Math.cos(t), Math.cos(ph), Math.sin(ph) * Math.sin(t)];
      if (Math.abs(d[1]) > 0.8 || Math.abs(d[1]) < 0.25) continue;
      if (d[0] > 0.2 && d[2] > 0.2) continue; // 走的那条斜线
      brushes.push(...planetTree(C2, R, d, 0.5 + rnd() * 0.3, [0x4aa05a, 0x5bb06a, 0x7ab85a][n % 3]));
      n++;
    }
    entities.push({ type: 'gravity', shape: 'sphere', pos: C2, radius: 14 });
    entities.push({ type: 'cube', pos: planetPoint(C2, R, [0, -1, 0], 0.38) });
    entities.push({
      type: 'gateway',
      a: { pos: ringPos(1), normal: ringNormal(1), up: [0, 1, 0] },
      b: { pos: [C2[0], C2[1] + R + GATE[1] / 2, C2[2]], normal: [0, 0, 1], up: [0, 1, 0] },
      size: GATE,
      frame: true,
    });
  }

  // 3) 魔方屋：方块在东面的岛上，岛与岛之间隔着酸河，只能用传送门跳过去
  {
    const HALF = 9;
    const STRIP = 3.5;
    const PL = HALF - STRIP;
    const FACES = {
      F: { n: [0, 1, 0], color: 0xf2d9a8, edge: 0xffd36b },
      C: { n: [0, -1, 0], color: 0xbfd8ff, edge: 0x7ac8ff },
      W: { n: [1, 0, 0], color: 0xffc7a3, edge: 0xff9a6b },
      E: { n: [-1, 0, 0], color: 0xc4eebc, edge: 0x7be08a },
      N: { n: [0, 0, 1], color: 0xdcc4ff, edge: 0xb48cff },
      S: { n: [0, 0, -1], color: 0xffc4dc, edge: 0xff8fbd },
    };
    const axisOf = (n) => (n[0] ? 0 : n[1] ? 1 : 2);
    const at = (f, u, v, h = 0) => {
      const n = FACES[f].n;
      const a = axisOf(n);
      const p = [0, 0, 0];
      p[a] = -HALF * n[a] + n[a] * h;
      p[(a + 1) % 3] = u;
      p[(a + 2) % 3] = v;
      return add3(p, C3).map(r2);
    };
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
      const out = box(...add3(lo, C3), ...add3(hi, C3), extra.mat ?? 'metal');
      return { ...out, ...extra, mat: extra.mat ?? 'metal' };
    };
    const dim = (hex, k) => (Math.round(((hex >> 16) & 255) * k) << 16) | (Math.round(((hex >> 8) & 255) * k) << 8) | Math.round((hex & 255) * k);
    const T = 0.5;
    const wall = (lo, hi, f) => ({ ...box(...add3(lo, C3), ...add3(hi, C3), 'metal'), color: dim(FACES[f].color, 0.42) });
    brushes.push(
      wall([-HALF - T, -HALF - T, -HALF - T], [HALF + T, -HALF, HALF + T], 'F'),
      wall([-HALF - T, HALF, -HALF - T], [HALF + T, HALF + T, HALF + T], 'C'),
      wall([-HALF - T, -HALF, -HALF], [-HALF, HALF, HALF], 'W'),
      wall([HALF, -HALF, -HALF], [HALF + T, HALF, HALF], 'E'),
      wall([-HALF - T, -HALF, -HALF - T], [HALF + T, HALF, -HALF], 'N'),
      wall([-HALF - T, -HALF, HALF], [HALF + T, HALF, HALF + T], 'S')
    );
    for (const f of Object.keys(FACES)) {
      const { edge, color } = FACES[f];
      for (const [uu, vv] of [[[PL, HALF], [-HALF, HALF]], [[-HALF, -PL], [-HALF, HALF]], [[-PL, PL], [PL, HALF]], [[-PL, PL], [-HALF, -PL]]]) {
        brushes.push(onFace(f, uu, vv, 0, 0.12, { mat: 'acid', color: 0x2f9a6a, intensity: 0.12, deco: true }));
        const b = onFace(f, uu, vv, 0, 1.2);
        entities.push({ type: 'hazard', hidden: true, pos: b.pos, size: b.size });
      }
      brushes.push(onFace(f, [-PL, PL], [-PL, PL], 0, 0.04, { mat: 'plate', color }));
      for (const s of [-1, 1]) {
        brushes.push(onFace(f, [s * PL - 0.1, s * PL + 0.1], [-PL - 0.1, PL + 0.1], 0.04, 0.09, { mat: 'glow', color: edge, intensity: 1.9, deco: true }));
        brushes.push(onFace(f, [-PL, PL], [s * PL - 0.1, s * PL + 0.1], 0.04, 0.09, { mat: 'glow', color: edge, intensity: 1.9, deco: true }));
      }
      brushes.push(onFace(f, [-2.5, 2.5], [-2.5, 2.5], 0.04, 0.08, { mat: 'white' }));
    }
    for (const a of [-1, 1]) for (const b of [-1, 1]) {
      const o = HALF - 0.12;
      brushes.push(
        { pos: add3([a * o, b * o, 0], C3), size: [0.24, 0.24, HALF * 2], mat: 'glow', color: 0xe8f6ff, intensity: 1.7, deco: true },
        { pos: add3([a * o, 0, b * o], C3), size: [0.24, HALF * 2, 0.24], mat: 'glow', color: 0xe8f6ff, intensity: 1.7, deco: true },
        { pos: add3([0, a * o, b * o], C3), size: [HALF * 2, 0.24, 0.24], mat: 'glow', color: 0xe8f6ff, intensity: 1.7, deco: true }
      );
    }
    brushes.push({ ...sphere(...C3, 3.2, 'glass', 0x9ee6ff) });
    brushes.push({ pos: [...C3], size: [1.8, 1.8, 1.8], mat: 'glow', shape: 'sphere', color: 0xfff0c0, intensity: 2.6, deco: true });
    entities.push(light(...C3, 60, { distance: 34, fixture: false, color: 0xfff1d8 }));
    entities.push({ type: 'gravity', shape: 'cube', pos: C3, size: [HALF * 2 + 8, HALF * 2 + 8, HALF * 2 + 8] });
    entities.push({ type: 'cube', pos: at('E', 4, 0, 0.4) });
    entities.push({
      type: 'gateway',
      a: { pos: ringPos(2), normal: ringNormal(2), up: [0, 1, 0] },
      b: { pos: add3([0, -HALF + 0.04 + GATE[1] / 2, -3.9], C3), normal: [0, 0, 1], up: [0, 1, 0] },
      size: GATE,
      frame: true,
    });
    C3.hall = { at, FACES };
  }

  // 4) 镜湖：两座小岛、一段断桥，倒影世界里的桥是完整的；方块在对岸
  {
    const Y0 = -100;
    const LAMP = (x, y, z, c = 0xffd9a0) => ({ pos: [x, y + 1.6, z], size: [0.3, 0.3, 0.3], mat: 'glow', shape: 'sphere', color: c, intensity: 2.4, deco: true });
    const post = (x, y, z) => cyl(x, y, z, 0.1, y + 1.5, 'metal', { color: 0x5a4a3a });
    const arch = (x, y, z, ay) => [
      cyl(x, ay > 0 ? y : y - 3.4, z + 1.7, 0.3, ay > 0 ? y + 3.4 : y, 'concrete', { color: 0xf2e6c8 }),
      cyl(x, ay > 0 ? y : y - 3.4, z - 1.7, 0.3, ay > 0 ? y + 3.4 : y, 'concrete', { color: 0xf2e6c8 }),
    ];
    const real = [
      ...isle(-19, 0, 0, 9),
      ...isle(19, 0, 0, 9),
      box(-12, -0.4, -1.6, -4, 0, 1.6, 'concrete'),
      box(4, -0.4, -1.6, 12, 0, 1.6, 'concrete'),
      ...tree(-23, 0, 3.5, 1.2),
      ...tree(-21, 0, -5, 0.9),
      ...tree(23, 0, -3, 1.2, 0x5bb06a),
      ...tree(21, 0, 5.5, 0.9),
      ...[-11, -8, 8, 11].flatMap((x) => [post(x, 0, 1.8), post(x, 0, -1.8), LAMP(x, 0, 1.8), LAMP(x, 0, -1.8)]),
    ];
    const mir = [
      ...mirrorY([box(-9, -0.4, -1.6, 9, 0, 1.6, 'concrete'), ...isle(-19, 0, 0, 9), ...isle(19, 0, 0, 9)], Y0),
      ...mirrorY([...tree(-14, 0, 6, 1.0, 0x6a8cd0, 0x3a3a6a), ...tree(14, 0, -6.5, 1.0, 0x8c6ad0, 0x3a3a6a)], Y0),
      ...mirrorY([-8, 0, 8].flatMap((x) => [post(x, 0, 1.8), post(x, 0, -1.8), LAMP(x, 0, 1.8, 0x9fd8ff), LAMP(x, 0, -1.8, 0x9fd8ff)]), Y0),
    ];
    brushes.push(
      ...shift(real, C4),
      ...shift([...arch(-5.5, 0, 0, 1), ...arch(5.5, 0, 0, 1)], C4),
      ...shift(mir, C4),
      ...shift([...arch(-7.5, Y0, 0, -1), ...arch(7.5, Y0, 0, -1)].map((b) => ({ ...b, pos: [b.pos[0], Y0 - 1.7, b.pos[2]] })), C4),
      // 倒影世界的“湖面”（头顶）：酸液的样子
      ...shift([{ pos: [0, Y0 + 3.1, 0], size: [70, 0.12, 30], mat: 'acid', color: 0x2f9a6a, intensity: 0.12, deco: true }], C4)
    );
    entities.push({ type: 'hazard', hidden: true, pos: add3([0, -10, 0], C4), size: [100, 10, 50] });
    entities.push({ type: 'gravity', shape: 'box', pos: add3([0, Y0 - 2, 0], C4), size: [70, 14, 30], dir: [0, 1, 0], hidden: true });
    entities.push({ type: 'hazard', hidden: true, pos: add3([0, Y0 + 3.2, 0], C4), size: [70, 1.2, 30] });
    entities.push({
      type: 'gateway',
      a: { pos: add3([-5.5, 1.6, 0], C4), normal: [-1, 0, 0], up: [0, 1, 0] },
      b: { pos: add3([-7.5, Y0 - 1.6, 0], C4), normal: [1, 0, 0], up: [0, -1, 0] },
      size: [2.4, 3.2],
      frame: true,
    });
    entities.push({
      type: 'gateway',
      a: { pos: add3([7.5, Y0 - 1.6, 0], C4), normal: [-1, 0, 0], up: [0, -1, 0] },
      b: { pos: add3([5.5, 1.6, 0], C4), normal: [1, 0, 0], up: [0, 1, 0] },
      size: [2.4, 3.2],
      frame: true,
    });
    entities.push({ type: 'cube', pos: add3([21, 0.4, 2], C4) });
    entities.push({
      type: 'gateway',
      a: { pos: ringPos(3), normal: ringNormal(3), up: [0, 1, 0] },
      b: { pos: add3([-21.5, GATE[1] / 2, 0], C4), normal: [1, 0, 0], up: [0, 1, 0] },
      size: GATE,
      frame: true,
    });
  }

  const hall = C3.hall;
  delete C3.hall;

  L(
    {
      name: '万象',
      hint: '广场上四扇发光的星门，各通向一个小世界：旋转的圆筒、小行星、酸河围成的魔方、镜湖。从每个世界里带回一个方块，放在广场上同色的按钮上，中央的出口就会打开。',
      gun: 'both',
      killY: -300,
      killR: 700,
      sky: { kind: 'space', sun: { dir: [0.5, 0.5, -0.45], intensity: 1.9 }, nebA: 0x2a6a8a, nebB: 0x7a2a8a },
      look: { hemi: 0.26, exposure: 0.88, env: 0.35, bloom: 0.42 },
      spawn: { pos: [6.4, 0.92, 6.4], yaw: 45 },
      brushes,
      entities,
    },
    async ({ ev, shot }) => {
      // ---- 公共的小工具（都在页面里跑）
      await ev(() => {
        // cube.position 是共用的临时向量，必须立刻拷贝
        window.nearestCube = (g) => {
          let best = null;
          let bd = Infinity;
          for (const q of g.cubes) {
            const p = q.position.clone();
            const d = p.distanceTo(g.player.position);
            if (d < bd) { bd = d; best = p; }
          }
          return best;
        };
      });
      const through = (i, label) =>
        ev(
          ([from, normal, label]) => {
            const pt = window.__pt;
            const g = window.__game;
            const p0 = g.player.position.clone();
            // 走到星门前 3 米，再笔直地走进去
            const stand = [from[0] + normal[0] * 3, 0.92, from[2] + normal[2] * 3];
            pt.walkWorld(stand, 14, 0.4);
            const beyond = [from[0] - normal[0] * 4, 0.92, from[2] - normal[2] * 4];
            pt.walkWorld(beyond, 8, 0.1, 1, 0, (g) => g.player.position.distanceTo(p0) > 60);
            pt.run(0.8);
            if (g.player.position.distanceTo(p0) < 60) throw new Error('没穿过星门 ' + label + '：' + g.player.position.toArray());
          },
          [ringPos(i), ringNormal(i), label]
        );
      const putOnButton = (i) =>
        ev(
          ([btn, id, k]) => {
            const pt = window.__pt;
            const g = window.__game;
            pt.walkWorld(btn, 10, 1.0);
            pt.run(0.8);
            g.debugAimAt(btn);
            pt.run(0.8);
            pt.use();
            pt.run(1.6);
            const q = g.buttons.find((b) => b.id === id);
            if (!q || !q.pressed) throw new Error('按钮没按下 ' + id);
            // 绕开方块走：先退到外圈，再沿圆周挪到下一扇门的轴线上
            const A = (deg, r) => [Math.cos((deg * Math.PI) / 180) * r, 0.92, Math.sin((deg * Math.PI) / 180) * r];
            pt.walkWorld(A(k * 90 + 45, 8), 6, 0.4);
            pt.walkWorld(A((k + 1) * 90, 8), 8, 0.4);
          },
          [btnPos(i), `b${i + 1}`, i]
        );

      const look = (t) => ev(([t]) => { window.__game.debugAimAt(t); window.__pt.run(0.3); }, [t]);
      await shot('c7-5-hub');
      // ---- 1 旋转圆筒
      await through(0, '圆筒');
      await look([C1[0], 1, 14]);
      await shot('c7-5-tube');
      await ev(
        ([C, R]) => {
          const pt = window.__pt;
          const g = window.__game;
          const wp = (a, z) => [C[0] + (R - 1) * Math.cos((a * Math.PI) / 180), (R - 1) * Math.sin((a * Math.PI) / 180), z];
          const up = [];
          for (let a = 255; a >= 90; a -= 15) up.push(wp(a, 3));
          pt.walkWorld(wp(270, 3), 8, 0.5);
          for (const w of up) pt.walkWorld(w, 6, 0.5);
          const c = window.nearestCube(g);
          pt.walkWorld([c.x, c.y, c.z], 8, 1.5);
          if (!pt.use([c.x, c.y, c.z])) throw new Error('没拿到方块（圆筒）');
          for (const w of [...up].reverse()) pt.walkWorld(w, 6, 0.5);
          pt.walkWorld(wp(270, 3), 8, 0.5);
        },
        [C1, 7]
      );
      await ev(([C]) => {
        const pt = window.__pt;
        const g = window.__game;
        pt.walkWorld([C[0], -6, -6], 8, 0.5);
        pt.walkWorld([C[0], -6, -13], 8, 0.1, 1, 0, (g) => g.player.position.x < 100);
        pt.run(0.8);
        if (g.player.position.x > 100) throw new Error('没从圆筒回来');
      }, [C1]);
      await putOnButton(0);
      // ---- 2 小行星
      await through(1, '小行星');
      await look([C2[0] + 4, C2[1] + 4.5, C2[2] + 14]);
      await shot('c7-5-planet');
      await ev(([C]) => {
        const pt = window.__pt;
        const g = window.__game;
        const way = [
          [C[0], C[1] + 7, C[2] + 1.5],
          [C[0] + 2.1, C[1] + 5.6, C[2] + 2.1 + 0],
          [C[0] + 4.25, C[1], C[2] + 4.25],
          [C[0] + 2, C[1] - 5.5, C[2] + 2],
          [C[0], C[1] - 6.4, C[2] + 0.8],
        ];
        for (const w of way) pt.walkWorld(w, 10, 0.6);
        const c = window.nearestCube(g);
        pt.walkWorld([c.x, c.y, c.z], 6, 1.5);
        if (!pt.use([c.x, c.y, c.z])) throw new Error('没拿到方块（小行星）');
        for (const w of [...way].reverse().slice(1)) pt.walkWorld(w, 10, 0.6);
      }, [C2]);
      await ev(([C]) => {
        const pt = window.__pt;
        const g = window.__game;
        pt.walkWorld([C[0], C[1] + 6.9, C[2] + 3], 8, 0.4);
        pt.walkWorld([C[0], C[1] + 6.9, C[2] - 3], 8, 0.1, 1, 0, (g) => g.player.position.z < 100);
        pt.run(0.8);
        if (g.player.position.z > 100) throw new Error('没从小行星回来');
      }, [C2]);
      await putOnButton(1);
      // ---- 3 魔方屋
      await through(2, '魔方屋');
      await look([C3[0] + 6, C3[1] - 2, C3[2] + 6]);
      await shot('c7-5-cube');
      const { at } = hall;
      const hopRoom = (stand, fires, enterPt, carry) =>
        ev(
          ([st, fires, enter, carry]) => {
            const pt = window.__pt;
            const g = window.__game;
            pt.walkWorld(st, 10, 0.35);
            pt.run(0.8);
            for (const [color, target] of fires) if (!pt.fire(color, target)) throw new Error('开枪失败（魔方屋）' + target);
            if (carry) {
              const c = window.nearestCube(g);
              pt.walkWorld([c.x, c.y, c.z], 8, 1.3);
              if (!pt.use([c.x, c.y, c.z])) throw new Error('没拿到方块（魔方屋）');
              pt.walkWorld(st, 10, 0.35);
              pt.run(0.4);
            }
            const p0 = g.player.position.clone();
            pt.walkWorld(enter, 16, 0.05, 0.4, 0, (g) => g.player.position.distanceTo(p0) > 6);
            if (g.player.position.distanceTo(p0) < 6) throw new Error('没传过去（魔方屋）：' + g.player.position.toArray());
            const pl = g.player;
            const v = pl.velocity.clone();
            v.addScaledVector(pl.up, -v.dot(pl.up));
            if (v.length() > 0.5) {
              v.normalize().multiplyScalar(4);
              pt.walkWorld([pl.position.x + v.x, pl.position.y + v.y, pl.position.z + v.z], 0.7, 0.2);
            }
            pt.run(0.6);
          },
          [stand, fires, enterPt, carry ?? false]
        );
      // 蓝门开在地板岛中央，橙门开在东面的岛上
      await hopRoom(at('F', 0, 4, 0.92), [['orange', at('E', 0, 0)], ['blue', at('F', 0, 0)]], at('F', 0, 0));
      await shot('c7-5-cube-east');
      // 拿起方块，从东面的岛走回地板岛
      await hopRoom(at('E', 4, 0, 0.92), [], at('E', 0, 0), true);
      await ev(([C]) => {
        const pt = window.__pt;
        const g = window.__game;
        // 回到门前（门在 z = -3.9，朝 +z）
        pt.walkWorld([C[0] + 3.8, C[1] - 8, C[2] - 2.5], 8, 0.5);
        pt.walkWorld([C[0], C[1] - 8, C[2] - 2.5], 8, 0.4);
        pt.walkWorld([C[0], C[1] - 8, C[2] - 8], 8, 0.1, 1, 0, (g) => g.player.position.x > -150);
        pt.run(0.8);
        if (g.player.position.x < -150) throw new Error('没从魔方屋回来');
      }, [C3]);
      await putOnButton(2);
      // ---- 4 镜湖
      await through(3, '镜湖');
      await look([C4[0] + 6, 1, C4[2]]);
      await shot('c7-5-lake');
      await ev(([C]) => {
        const pt = window.__pt;
        const g = window.__game;
        // 去桥头 A 的拱门，穿过去：掉进倒影世界
        pt.walkWorld([C[0] - 8, 0.92, C[2]], 12, 0.4);
        pt.walkWorld([C[0] - 3, 0.92, C[2]], 6, 0.1, 1, 0, (g) => g.player.position.y < -50);
        pt.run(0.6);
        pt.walkWorld([C[0] + 6.5, -101, C[2]], 12, 0.1, 1, 0, (g) => g.player.position.y > -50);
        pt.run(0.6);
        pt.walkWorld([C[0] + 21, 0.92, C[2] + 2], 12, 1.5);
        const c = window.nearestCube(g);
        if (!pt.use([c.x, c.y, c.z])) throw new Error('没拿到方块（镜湖）');
        // 原路回去：桥头 B 的拱门 → 倒影桥 → 桥头 A
        pt.walkWorld([C[0] + 8, 0.92, C[2]], 12, 0.4);
        pt.walkWorld([C[0] + 3, 0.92, C[2]], 6, 0.1, 1, 0, (g) => g.player.position.y < -50);
        pt.run(0.6);
        pt.walkWorld([C[0] - 6.5, -101, C[2]], 12, 0.1, 1, 0, (g) => g.player.position.y > -50);
        pt.run(0.6);
        pt.walkWorld([C[0] - 17, 0.92, C[2]], 12, 0.4);
        pt.walkWorld([C[0] - 24, 0.92, C[2]], 8, 0.1, 1, 0, (g) => g.player.position.z > -100);
        pt.run(0.8);
        if (g.player.position.z < -100) throw new Error('没从镜湖回来');
      }, [C4]);
      await putOnButton(3);
      // ---- 出口
      await shot('c7-5-open');
      await ev(() => {
        window.__pt.walkWorld([0, 0.92, 0], 12, 0.3);
        window.__pt.run(1.5);
        const g = window.__game;
        if (g.state !== 'complete') throw new Error('出口没触发：' + g.buttons.map((b) => b.id + (b.pressed ? '按下' : '没按下')).join('，'));
      });
    }
  );
}

export default levels;
