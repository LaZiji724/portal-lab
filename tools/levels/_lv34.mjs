// 第 34 关「引力电梯」和第 35 关「三个直角」（第 7 章）。
import { box, cyl, sphere, light, exit, panelX, panelZ, wallWithHoles, T, P } from '../levelkit.mjs';

const levels = [];
const L = (def, solve) => levels.push({ def, solve });
const DEG = Math.PI / 180;
const r2 = (v) => Math.round(v * 100) / 100;

/**
 * 正 n 边形的竖直管壁：第 i 面朝向 i * 360 / n 度（0 = +x，90 = +z），apothem 是内切圆半径。
 * cut = { 面号: [[y0, y1], …] } 在那一面上留出门洞（只切高度，宽度是整面）。
 */
function ngon(cx, cz, ap, n, [y0, y1], mat, { cut = {}, thick = 0.2, extra = {} } = {}) {
  const len = 2 * ap * Math.tan(Math.PI / n) + 0.14;
  const out = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    const rc = ap + thick / 2;
    // 把 [y0, y1] 减去这一面的门洞
    let segs = [[y0, y1]];
    for (const [h0, h1] of cut[i] ?? []) {
      segs = segs.flatMap(([s0, s1]) => {
        if (h1 <= s0 || h0 >= s1) return [[s0, s1]];
        const o = [];
        if (h0 > s0) o.push([s0, h0]);
        if (h1 < s1) o.push([h1, s1]);
        return o;
      });
    }
    for (const [s0, s1] of segs) {
      out.push({
        pos: [r2(cx + Math.cos(a) * rc), r2((s0 + s1) / 2), r2(cz + Math.sin(a) * rc)],
        size: [r2(len), r2(s1 - s0), thick],
        mat,
        rot: [0, r2(-(a / DEG + 90)), 0],
        ...extra,
      });
    }
  }
  return out;
}

/** 悬浮的圆盘平台：深色的底座、一圈发光的边、浅色的台面，下面倒挂着几层逐渐变细的岩柱 */
function disc(cx, y, cz, rad, { rim = 0x58d8ff, top = 0xe4dcc8, base = 0x2f3850, spire = 11 } = {}) {
  const out = [
    cyl(cx, y - 1.5, cz, rad, y, 'plate', { color: base }),
    { ...cyl(cx, y + 0.0, cz, rad, y + 0.02, 'glow', { color: rim, intensity: 1.8 }), deco: true },
    cyl(cx, y - 0.02, cz, rad - 0.35, y + 0.04, 'concrete', { color: top }),
    { ...cyl(cx, y - 1.9, cz, rad * 0.62, y - 1.5, 'glow', { color: rim, intensity: 1.1 }), deco: true },
  ];
  const steps = [
    [0.5, 2.8],
    [0.28, 3.2],
    [0.12, spire - 6],
  ];
  let yy = y - 1.9;
  for (const [k, h] of steps) {
    out.push({ ...cyl(cx, yy - h, cz, rad * k, yy, 'plate', { color: base }), deco: true });
    yy -= h;
  }
  return out;
}

/** 平台边上的灯柱：深色的细柱，顶上一颗发光的球 */
const lamp = (x, y, z, c, h = 2.6) => [
  cyl(x, y, z, 0.12, y + h, 'plate', { color: 0x39425a }),
  { pos: [r2(x), r2(y + h + 0.25), r2(z)], size: [0.42, 0.42, 0.42], mat: 'glow', shape: 'sphere', color: c, intensity: 2.4, deco: true },
];

/** 台面上的装饰：中央一块深色的圆垫，外面一圈发光的线 */
const pad = (cx, y, cz, rad, c) => [
  { ...cyl(cx, y + 0.0, cz, rad + 0.22, y + 0.052, 'glow', { color: c, intensity: 1.5 }), deco: true },
  cyl(cx, y + 0.0, cz, rad, y + 0.056, 'plate', { color: 0x39425a }),
];

/** 地上的一条发光细线（沿 x 或 z），deco */
const strip = (x0, z0, x1, z1, y, c, w = 0.22, k = 1.5) => ({
  pos: [r2((x0 + x1) / 2), y, r2((z0 + z1) / 2)],
  size: [r2(Math.abs(x1 - x0) + (x1 === x0 ? w : 0)), 0.03, r2(Math.abs(z1 - z0) + (z1 === z0 ? w : 0))],
  mat: 'glow',
  color: c,
  intensity: k,
  deco: true,
});

// ---------------------------------------------------------------- 引力电梯
{
  const AP = 2.8; // 电梯井（八边形）的内切半径
  const R = 9.5; // 平台半径
  const GR = 11; // 地面平台半径
  const H = 22; // 每段电梯升高 22 米
  const L1X = 11.5;
  const GX = L1X - AP - GR + 0.1; // 地面平台的圆心：东沿刚好碰到井壁
  const M1X = L1X + AP - 0.1 + R;
  const M2X = M1X + 2 * R + 12; // 两座平台之间隔着 12 米的虚空
  const L2X = M2X + R - 0.1 + AP;
  const TR = 10;
  const TX = L2X + AP - 0.1 + TR;
  const TOP = 0.04; // 台面高出平台基准的高度
  const DOOR_H = 2.9;
  const DOOR_W = 2.46;
  const ZONE1 = 14.93; // 加速段的长度（从站台往上）
  const ZONE_TOP = 6.4; // 减速段之上还留出的空间
  const cA = 0x7ae8ff; // 青
  const cB = 0xb58cff; // 紫
  const cC = 0x7af0b0; // 绿
  const cD = 0xffc85a; // 金
  const lift = (cx, y0, tint) => {
    // y0 是站台高度；井从 y0 - 2 到 y0 + H + 4.7
    const cut = { 4: [[y0, y0 + DOOR_H]], 0: [[y0 + H, y0 + H + DOOR_H]] };
    const out = [];
    out.push(...ngon(cx, 0, AP, 8, [y0 - 2, y0 + H + 4.2], 'glass', { cut, extra: { color: tint } }));
    // 发光的圈：每 3.5 米一道
    for (let y = y0 + 1.5; y < y0 + H + 4; y += 3.5) {
      out.push(...ngon(cx, 0, AP + 0.2, 8, [y, y + 0.22], 'glow', { thick: 0.16, cut, extra: { color: tint, intensity: 1.25, deco: true } }));
    }
    // 八个角上的光柱
    for (let k = 0; k < 8; k++) {
      const a = ((k + 0.5) / 8) * Math.PI * 2;
      const rv = (AP + 0.1) / Math.cos(Math.PI / 8);
      out.push({ ...cyl(cx + Math.cos(a) * rv, y0 - 2, Math.sin(a) * rv, 0.07, y0 + H + 4.2, 'glow', { color: tint, intensity: 1.2 }), deco: true });
    }
    // 井顶的盖子
    out.push(cyl(cx, y0 + H + 4.2, 0, AP + 0.7, y0 + H + 4.7, 'plate', { color: 0x2f3850 }));
    out.push({ ...cyl(cx, y0 + H + 4.7, 0, AP + 0.2, y0 + H + 4.76, 'glow', { color: tint, intensity: 2.2 }), deco: true });
    return out;
  };
  const liftZones = (cx, y0, id) => {
    const yc = y0 + 0.92;
    const y1 = yc + ZONE1;
    const bot = y0 - 3;
    const top = y0 + H + ZONE_TOP;
    const when = id ? { when: [id] } : {};
    return [
      { type: 'gravity', shape: 'box', pos: [cx, r2((bot + y1) / 2), 0], size: [5, r2(y1 - bot), 5], dir: [0, -1, 0], g: -0.3, ...when, hidden: true },
      { type: 'gravity', shape: 'box', pos: [cx, r2((y1 + top) / 2), 0], size: [5, r2(top - y1), 5], dir: [0, -1, 0], g: 0.6, ...when, hidden: true },
    ];
  };
  const B0 = [2.4, TOP, -3.6]; // 地面的按钮
  const B1 = [M2X + 4.6, H + TOP, -3.9]; // 第二座平台的按钮
  const C1 = [-1.2, 0.35, 5.6]; // 第一个方块
  const C2 = [M1X - 4.2, H + 0.35, 5.2]; // 第二个方块（在第一座平台上）
  const btnRing = (b, c) => ({ ...cyl(b[0], b[1] - 0.02, b[2], 1.15, b[1] + 0.01, 'glow', { color: c, intensity: 1.5 }), deco: true });
  const brushes = [
    ...disc(GX, 0, 0, GR, { rim: cA }),
    ...disc(M1X, H, 0, R, { rim: cB }),
    ...disc(M2X, H, 0, R, { rim: cC }),
    ...disc(TX, 2 * H, 0, TR, { rim: cD }),
    ...lift(L1X, 0, cA),
    ...lift(L2X, H, cB),
    // 第一座平台北边的墙，上面一块白板；第二座平台西边的石碑，也有一块白板（面朝第一座平台）
    box(M1X - 5.6, H, -8.5, M1X + 5.6, H + 6.5, -8, 'plate'),
    { ...box(M1X - 5.6, H + 6.5, -8.5, M1X + 5.6, H + 6.62, -8, 'glow'), color: cB, intensity: 1.8, deco: true },
    panelZ(-8, 1, [M1X - 3.6, M1X + 3.6], [H + TOP, H + 5.4]),
    box(M2X - 4.7, H, -5.5, M2X - 3.7, H + 6.5, 5.5, 'plate'),
    { ...box(M2X - 4.7, H + 6.5, -5.5, M2X - 3.7, H + 6.62, 5.5, 'glow'), color: cC, intensity: 1.8, deco: true },
    panelX(M2X - 4.7, -1, [-4.3, 4.3], [H + TOP, H + 5.4]),
    btnRing(B0, cA),
    btnRing(B1, cC),
    // 地面平台：中央的圆垫、通往电梯的光带、灯柱
    ...pad(GX + 1, 0, 0, 5.4, cA),
    strip(GX + 6.4, 0, L1X - AP - 0.3, 0, 0.055, cA),
    ...[[-8, -7], [-8, 7], [2, 9.6], [2, -9.6]].flatMap(([x, z]) => lamp(GX + x + 1, 0, z, cA)),
    // 第一座平台
    ...pad(M1X + 1, H, 3, 2.6, cB),
    strip(M1X - R + 0.4, 0, M1X - 3.5, 0, H + 0.055, cB),
    ...[[4, 7.6], [4, -6.5], [-4, 8], [8.2, 0]].flatMap(([x, z]) => lamp(M1X + x, H, z, cB)),
    // 第二座平台
    ...pad(M2X + 1, H, 0, 3.4, cC),
    strip(M2X + 4, 0, M2X + R - 0.6, 0, H + 0.055, cC),
    ...[[-3, 8.6], [-3, -8.6], [5, 7.6], [5, -7.6]].flatMap(([x, z]) => lamp(M2X + x, H, z, cC)),
    // 终点平台
    ...pad(TX + 1.5, 2 * H, 0, 6, cD),
    strip(TX - TR + 0.5, 0, TX - 3.2, 0, 2 * H + 0.055, cD),
    ...[[-4, 8.2], [-4, -8.2], [4, 8.4], [4, -8.4]].flatMap(([x, z]) => lamp(TX + x, 2 * H, z, cD)),
    // 远处：脚下的气态巨行星，和几块漂浮的岩石
    { ...sphere(40, -330, -60, 250, 'concrete', 0xd6a064), deco: true },
    { ...sphere(-90, -60, -230, 30, 'concrete', 0xb8a8c8), deco: true },
    { ...sphere(130, 60, -140, 14, 'concrete', 0xa8b8d0), deco: true },
    { ...sphere(95, 90, 150, 22, 'concrete', 0xb0c0e0), deco: true },
  ];
  const entities = [
    ...liftZones(L1X, 0, 'b0'),
    ...liftZones(L2X, H, 'b1'),
    { type: 'door', pos: [L1X - AP - 0.1, DOOR_H / 2, 0], size: [0.3, DOOR_H, DOOR_W], requires: ['b0'] },
    { type: 'door', pos: [L2X - AP - 0.1, H + DOOR_H / 2, 0], size: [0.3, DOOR_H, DOOR_W], requires: ['b1'] },
    { type: 'button', id: 'b0', pos: B0, up: [0, 1, 0] },
    { type: 'button', id: 'b1', pos: B1, up: [0, 1, 0] },
    { type: 'cube', pos: C1 },
    { type: 'cube', pos: C2 },
    exit(TX + 3, 2 * H + TOP, 0, [2.4, 2.5, 2.4]),
    { type: 'light', pos: [GX + 2, 7, 0], intensity: 60, distance: 30, fixture: false, color: 0xcfeeff },
    { type: 'light', pos: [L1X, 11, 0], intensity: 70, distance: 14, fixture: false, color: cA },
    { type: 'light', pos: [M1X, H + 6, 0], intensity: 50, distance: 26, fixture: false, color: 0xe4d6ff },
    { type: 'light', pos: [M2X, H + 6, 0], intensity: 50, distance: 26, fixture: false, color: 0xd6ffe8 },
    { type: 'light', pos: [L2X, H + 11, 0], intensity: 70, distance: 14, fixture: false, color: cB },
    { type: 'light', pos: [TX, 2 * H + 6, 0], intensity: 60, distance: 28, fixture: false, color: 0xfff0d0 },
  ];
  L(
    {
      name: '引力电梯',
      hint: '电梯井里有一股向上的引力，可井口的玻璃门要等按钮被压住才会打开。',
      gun: 'both',
      killY: -30,
      look: { hemi: 0.35, exposure: 1.0, env: 0.4, bloom: 0.5 },
      sky: { kind: 'space', hemi: 0.35, exposure: 1.0, sun: { dir: [-0.5, 0.55, -0.45], intensity: 2.2 }, nebA: 0x4a1f9a, nebB: 0x0f6aa5 },
      spawn: { pos: [-6, 0.96, 4], yaw: -90 },
      brushes,
      entities,
    },
    async ({ ev, shot }) => {
      await shot('f2-34-start');
      // 1) 把方块搬到地面的按钮上，井口的门就开了
      await ev(
        ([c, b]) => {
          const pt = window.__pt;
          pt.walkWorld([c[0] + 0.3, c[1], c[2] + 1.7], 8, 0.3);
          if (!pt.use(c)) throw new Error('没拿到方块');
          pt.drop(b[0], b[2]);
        },
        [C1, B0]
      );
      await shot('f2-34-door');
      // 2) 走进井口，被托到第一座平台
      await ev(
        ([l1x, m1x]) => {
          const pt = window.__pt;
          const g = window.__game;
          pt.walkWorld([l1x - 1.2, 0.9, 0], 10, 0.3);
          pt.walkWorld([m1x - 2, 0.9, 0], 12, 0.3, 1, 0, (g) => g.player.position.y > 20 && g.player.grounded);
          pt.run(0.6);
          if (g.player.position.y < 22) throw new Error('没上去：' + g.player.position.toArray());
        },
        [L1X, M1X]
      );
      await shot('f2-34-m1');
      // 3) 站在第一座平台上，开两道传送门：蓝的在脚边的白墙上，橙的在对岸的石碑上
      await ev(
        ([m1x, m2x, h]) => {
          const pt = window.__pt;
          const g = window.__game;
          pt.walkWorld([m1x + 2, h + 0.9, -1], 8, 0.4);
          if (!pt.fire('orange', [m2x - 4.72, h + 1.2, 0])) throw new Error('橙门开不了');
          if (!pt.fire('blue', [m1x, h + 1.2, -8.0])) throw new Error('蓝门开不了');
          window.__pp = g.portals.list.filter((p) => p.placed).map((p) => [p.color, p.position.toArray().map((v) => +v.toFixed(2)), p.normal.toArray().map((v) => +v.toFixed(2)), p.linked]);
        },
        [M1X, M2X, H]
      );
      console.log(JSON.stringify(await ev(() => window.__pp)));
      await shot('f2-34-portals');
      // 4) 抱起第二个方块，走进蓝门，从对岸石碑的橙门里出来
      await ev(
        ([c, m1x, m2x]) => {
          const pt = window.__pt;
          const g = window.__game;
          pt.walkWorld([c[0] + 0.3, c[1], c[2] - 1.7], 8, 0.3);
          if (!pt.use(c)) throw new Error('没拿到第二个方块');
          pt.walkWorld([m1x, 23, -5], 8, 0.3);
          pt.walkWorld([m1x, 23, -12], 8, 0.1, 1, 0, (g) => g.player.position.x > 40);
          pt.run(0.6);
          if (g.player.position.x < 40) throw new Error('没传过去：' + g.player.position.toArray());
        },
        [C2, M1X, M2X]
      );
      await shot('f2-34-ledge');
      // 5) 绕过石碑，把方块放在第二座平台的按钮上
      await ev(
        ([b, m2x, h]) => {
          const pt = window.__pt;
          for (const w of [[m2x - 6.2, h + 0.9, 3.5], [m2x - 5.2, h + 0.9, 6.0], [m2x - 2.7, h + 0.9, 6.9], [m2x + 0.5, h + 0.9, 4.5]]) pt.walkWorld(w, 6, 0.5);
          pt.drop(b[0], b[2]);
        },
        [B1, M2X, H]
      );
      await shot('f2-34-b1');
      // 6) 走进第二口井，被托到终点平台，走进出口
      await ev(
        ([l2x, tx, h]) => {
          const pt = window.__pt;
          const g = window.__game;
          pt.walkWorld([l2x - 1.2, h + 0.9, 0], 12, 0.3);
          pt.walkWorld([tx - 2, 2 * h + 0.9, 0], 12, 0.3, 1, 0, (g) => g.player.position.y > 42 && g.player.grounded);
          pt.run(0.6);
          if (g.player.position.y < 44) throw new Error('没上去：' + g.player.position.toArray());
        },
        [L2X, TX, H]
      );
      await shot('f2-34-top');
      await ev((ex) => window.__pt.walkWorld(ex, 12, 0.3), [TX + 3, 2 * H + 0.9, 0]);
    }
  );
}

// ---------------------------------------------------------------- 三个直角
{
  // 三间一模一样的屋子：局部坐标里 x 向右、y 向上、z 向前，中间横着一条 8 米宽的深渊。
  // 屋子 B、C 是把坐标轮换一下摆进世界的：B 的“下”是世界的 -x，C 的“下”是世界的 -z。
  const XW = 7; // 半宽
  const ZH = 10; // 半长
  const YH = 8; // 高
  const RV = 4; // 深渊的半宽
  const DEP = 2.4; // 深渊的深度
  const DOOR_Z = 6; // 出门（东墙）的位置
  const DX = -2.5; // 进门（南墙）的位置
  const EXIT_X = 4.5; // 出口门（北墙）的位置
  const DW = 2.4; // 门洞的宽、高
  const DH = 3.2;
  const BTN_AT = [1, 8.5]; // 按钮的位置（北岸）
  const EMX = -6.4; // 光桥发射器在西墙上，朝东射向出门
  const ROOMS = {
    A: { o: [0, 0, 0], mp: ([x, y, z]) => [x, y, z] },
    B: { o: [100, 0, 0], mp: ([x, y, z]) => [y, z, x] },
    C: { o: [0, 0, 100], mp: ([x, y, z]) => [z, x, y] },
  };
  const wp = (k, p) => {
    const q = ROOMS[k].mp(p);
    const o = ROOMS[k].o;
    return [r2(q[0] + o[0]), r2(q[1] + o[1]), r2(q[2] + o[2])];
  };
  const wv = (k, v) => ROOMS[k].mp(v);
  const lb = (k, b) => ({ ...b, pos: wp(k, b.pos), size: ROOMS[k].mp(b.size) });
  const lbox = (k, x0, y0, z0, x1, y1, z1, mat, extra = {}) => lb(k, { ...box(x0, y0, z0, x1, y1, z1, mat), ...extra });
  const glowBox = (k, c, i, ...a) => lbox(k, ...a, 'glow', { color: c, intensity: i, deco: true });
  const KEYS = ['A', 'B', 'C'];
  const STYLE = {
    A: { accent: 0x58d8ff, light: 0xdff4ff, wallMat: 'metal', wall: 0xd2deee, floor: 0x26304a, ceil: 0x39435c, acid: 0x4aa890, planet: 0x8fb4e8, planetR: 30 },
    B: { accent: 0xffb257, light: 0xffe6c4, wallMat: 'concrete', wall: 0xd2ac84, floor: 0x3a2c24, ceil: 0x4a382c, acid: 0xb88a3a, planet: 0xd9774a, planetR: 34 },
    C: { accent: 0xc08cff, light: 0xeadcff, wallMat: 'metal', wall: 0x9684cc, floor: 0x2a2440, ceil: 0x3a3258, acid: 0xa05ad0, planet: 0xa588e0, planetR: 28 },
  };
  const BTN = { A: 'bA', B: 'bB', C: 'bC' };
  const brushes = [];
  const entities = [];
  for (const k of KEYS) {
    const c = STYLE[k];
    const add = (...b) => brushes.push(...b);
    const wm = c.wallMat;
    const wall = (b) => lb(k, { ...b, color: c.wall });
    // 墙：西、东（出门）、南（进门）、北（A 里是出口门），天花板
    add(...wallWithHoles('x', [-XW - T, -XW], [-ZH - T, ZH + T], [-DEP - 0.5, YH + T], [[-3.2, 3.2, 1.3, 6.5]], wm).map(wall));
    // 西墙上的大窗：窗外是星空和一颗大行星
    add(lbox(k, -XW - 0.3, 1.3, -3.2, -XW - 0.2, 6.5, 3.2, 'glass', { color: 0x203040 }));
    for (const z of [-3.2, 0, 3.2]) add(lbox(k, -XW - 0.32, 1.3, z - 0.08, -XW, 6.5, z + 0.08, 'plate', { color: 0x39425a }));
    for (const y of [1.3, 3.9, 6.5]) add(glowBox(k, c.accent, 1.6, -XW - 0.1, y - 0.06, -3.2, -XW + 0.02, y + 0.06, 3.2));
    // 行星：发光的球前面挡一颗稍微错开的黑球，只露出一弯亮边
    const PR = c.planetR;
    add({ ...lb(k, { pos: [-80, 20, 0], size: [PR * 2, PR * 2, PR * 2] }), mat: 'glow', shape: 'sphere', color: c.planet, intensity: 0.85, deco: true });
    add({ ...lb(k, { pos: [-80 + PR * 0.3, 20 + PR * 0.22, PR * 0.22], size: [PR * 2.02, PR * 2.02, PR * 2.02] }), mat: 'glow', shape: 'sphere', color: 0x000000, intensity: 1, deco: true });
    add(...wallWithHoles('x', [XW, XW + T], [-ZH - T, ZH + T], [-DEP - 0.5, YH + T], [[DOOR_Z - DW / 2, DOOR_Z + DW / 2, 0, DH]], wm).map(wall));
    add(...wallWithHoles('z', [-ZH - T, -ZH], [-XW - T, XW + T], [-DEP - 0.5, YH + T], [[DX - DW / 2, DX + DW / 2, 0, DH]], wm).map(wall));
    add(...wallWithHoles('z', [ZH, ZH + T], [-XW - T, XW + T], [-DEP - 0.5, YH + T], k === 'A' ? [[EXIT_X - DW / 2, EXIT_X + DW / 2, 0, DH]] : [], wm).map(wall));
    add(lbox(k, -XW - T, YH, -ZH - T, XW + T, YH + T, ZH + T, 'plate', { color: c.ceil }));
    // 两岸和深渊的底
    add(lbox(k, -XW, -DEP, -ZH, XW, 0, -RV, 'plate', { color: c.floor }));
    add(lbox(k, -XW, -DEP, RV, XW, 0, ZH, 'plate', { color: c.floor }));
    add(lbox(k, -XW, -DEP - 0.5, -RV, XW, -DEP, RV, 'plate', { color: 0x15181f }));
    // 深渊里的酸液：发光的薄板，加上一个看不见的致死范围
    add(lbox(k, -XW, -DEP, -RV, XW, -DEP + 0.14, RV, 'acid', { color: c.acid, intensity: 0.5, deco: true }));
    entities.push({ type: 'hazard', hidden: true, ...lb(k, { pos: [0, -1.5, 0], size: [XW * 2, 2.4, RV * 2] }) });
    // 河岸边的发光线，墙顶的灯带，天花板的灯条
    add(glowBox(k, c.accent, 1.7, -XW, 0, -RV - 0.14, XW, 0.035, -RV - 0.02));
    add(glowBox(k, c.accent, 1.7, -XW, 0, RV + 0.02, XW, 0.035, RV + 0.14));
    add(glowBox(k, c.accent, 1.5, -XW, YH - 0.7, -ZH, XW, YH - 0.58, -ZH + 0.1));
    add(glowBox(k, c.accent, 1.5, -XW, YH - 0.7, ZH - 0.1, XW, YH - 0.58, ZH));
    add(glowBox(k, c.accent, 1.5, -XW, YH - 0.7, -ZH, -XW + 0.1, YH - 0.58, ZH));
    add(glowBox(k, c.accent, 1.5, XW - 0.1, YH - 0.7, -ZH, XW, YH - 0.58, ZH));
    for (const x of [-4.5, 0, 4.5]) add(glowBox(k, c.light, 1.3, x - 0.18, YH - 0.06, -ZH + 0.6, x + 0.18, YH, ZH - 0.6));
    // 光桥发射器的底座
    add(lbox(k, -XW, 0, DOOR_Z - 0.8, EMX - 0.3, 1.0, DOOR_Z + 0.8, 'plate', { color: 0x39425a }));
    add(glowBox(k, c.accent, 1.8, -XW, 1.0, DOOR_Z - 0.8, EMX - 0.3, 1.06, DOOR_Z + 0.8));
    // 门洞两侧的灯
    entities.push(light(...wp(k, [0, 6.6, 0]), 70, { distance: 26, fixture: false, color: c.light }));
    entities.push(light(...wp(k, [0, 4.5, ZH - 4]), 30, { distance: 14, fixture: false, color: c.accent }));
  }
  const button = (k, x, z) => ({ type: 'button', id: BTN[k], pos: wp(k, [x, 0, z]), up: wv(k, [0, 1, 0]) });
  const bridge = (k) => ({ type: 'bridge', pos: wp(k, [EMX, 0.1, DOOR_Z]), dir: wv(k, [1, 0, 0]), up: wv(k, [0, 1, 0]), when: [BTN[k]] });
  const inDoor = (k) => ({ pos: wp(k, [DX, DH / 2, -ZH - T / 2]), normal: wv(k, [0, 0, 1]), up: wv(k, [0, 1, 0]) });
  const outDoor = (k) => ({ pos: wp(k, [XW + T / 2, DH / 2, DOOR_Z]), normal: wv(k, [-1, 0, 0]), up: wv(k, [0, 1, 0]) });
  const gate = (ka, kb) => ({ type: 'gateway', a: outDoor(ka), b: inDoor(kb), size: [DW, DH], frame: true });
  // 重力：B、C 的场比房间大一圈，门洞外面一点也算屋里
  for (const k of ['B', 'C']) {
    const dir = wv(k, [0, -1, 0]);
    entities.push({ type: 'gravity', shape: 'box', hidden: true, dir, ...lb(k, { pos: [0, 2.5, 0], size: [XW * 2 + 5, YH + DEP + 3, ZH * 2 + 5] }) });
  }
  entities.push(gate('A', 'B'), gate('B', 'C'), gate('C', 'A'));
  for (const k of KEYS) entities.push(button(k, ...BTN_AT), bridge(k));
  // A 里的出口：北墙上的门，门后一条短走廊
  brushes.push(
    lbox('A', EXIT_X - DW / 2 - 0.5, -0.5, ZH + T, EXIT_X + DW / 2 + 0.5, 0, ZH + T + 6, 'plate', { color: 0x26304a }),
    lbox('A', EXIT_X - DW / 2 - 0.5, DH, ZH + T, EXIT_X + DW / 2 + 0.5, DH + 0.5, ZH + T + 6.5, 'metal', { color: 0xb4c4dc }),
    lbox('A', EXIT_X - DW / 2 - 0.5, 0, ZH + T, EXIT_X - DW / 2, DH, ZH + T + 6.5, 'metal', { color: 0xb4c4dc }),
    lbox('A', EXIT_X + DW / 2, 0, ZH + T, EXIT_X + DW / 2 + 0.5, DH, ZH + T + 6.5, 'metal', { color: 0xb4c4dc }),
    lbox('A', EXIT_X - DW / 2 - 0.5, -0.5, ZH + T + 6, EXIT_X + DW / 2 + 0.5, DH + 0.5, ZH + T + 6.5, 'metal', { color: 0xb4c4dc })
  );
  entities.push({ type: 'door', pos: wp('A', [EXIT_X, DH / 2, ZH + T / 2]), size: [DW, DH, 0.3], requires: ['bA', 'bB', 'bC'] });
  entities.push({ ...exit(EXIT_X, 0, ZH + T + 4, [2, 2.5, 2]), pos: wp('A', [EXIT_X, 1.25, ZH + T + 4]) });
  entities.push(light(...wp('A', [EXIT_X, 2.8, ZH + T + 3]), 14, { distance: 8, fixture: false, color: 0xb8ffd0 }));
  // 方块：两个在 A 的北岸，一个在 B 的南岸
  const CUBES = { c1: wp('A', [-5.6, 0.35, 8.2]), c2: wp('A', [-5.2, 0.35, 4.7]), c3: wp('B', [3, 0.35, -8]) };
  for (const p of Object.values(CUBES)) entities.push({ type: 'cube', pos: p });
  L(
    {
      name: '三个直角',
      hint: '三间屋子各有各的“下方”，每道门都会把世界拧转 90°。屋里横着一道深渊，只能走光桥——可光桥是从上一间屋子里射过来的，要有方块压住那边的按钮，它才会亮。',
      gun: 'none',
      killY: -30,
      look: { hemi: 0.4, exposure: 1.05, env: 0.45, bloom: 0.5 },
      sky: { kind: 'space', sun: { intensity: 0 }, nebA: 0x4a1f9a, nebB: 0x0f6aa5 },
      spawn: { pos: process.env.DBGROOM ? wp(process.env.DBGROOM, [-3.6, 0.96, 8.2]) : [-3.6, 0.96, 8.2], yaw: 0 }, // DBGROOM
      brushes,
      entities,
    },
    async ({ ev, shot }) => {
      const at = (k, x, z, y = 0.9) => wp(k, [x, y, z]);
      /** 依次走过 k 屋里的几个点（局部坐标 x、z） */
      const go = (k, pts, tol = 0.45) => ev(([ws, tol]) => ws.forEach((w) => window.__pt.walkWorld(w, 12, tol)), [pts.map(([x, z]) => at(k, x, z)), tol]);
      /** 走到离方块 1.6 米的地方（从 from 那一侧），把它抱起来 */
      const pick = (k, cube, from) =>
        ev(
          ([stand, c]) => {
            const pt = window.__pt;
            pt.walkWorld(stand, 12, 0.3);
            pt.run(0.3);
            if (!pt.use(c)) throw new Error('没拿到方块 ' + c);
          },
          [at(k, from[0], from[1]), cube]
        );
      /** 走到离按钮 1.7 米处，低头把手里的方块放下 */
      const put = (k, x, z) =>
        ev(
          ([btn, tgt]) => {
            const pt = window.__pt;
            const g = window.__game;
            pt.walkWorld(tgt, 12, 0.3);
            g.debugAimAt(btn);
            pt.run(0.6);
            pt.use();
            pt.run(1.5);
          },
          [at(k, x, z, 0), at(k, x - 1.5, z + (z > 8 ? -0.2 : 0.2))]
        );
      /** 朝门走过去，一直走到被传到别的屋子里 */
      const through = (k, beyond) =>
        ev(
          (w) => {
            const pt = window.__pt;
            const g = window.__game;
            const p0 = g.player.position.clone();
            pt.walkWorld(w, 12, 0.05, 1, 0, (g) => g.player.position.distanceTo(p0) > 20);
            if (g.player.position.distanceTo(p0) < 20) throw new Error('没传过去：' + g.player.position.toArray());
            pt.run(0.5);
          },
          at(k, XW + 3, DOOR_Z)
        );
      await shot('f2-35-start');
      // A：把第一个方块压在按钮上（光桥会射进 B），再抱起第二个方块
      await pick('A', CUBES.c1, [-4.0, 8.2]);
      await put('A', ...BTN_AT);
      await shot('f2-35-bA');
      await pick('A', CUBES.c2, [-3.6, 4.7]);
      await go('A', [[2, 6], [5.5, 6]]);
      await through('A');
      await shot('f2-35-B');
      // B：沿着光桥走过深渊，把第二个方块压在按钮上
      await go('B', [[DX, -7], [DX, 6.5]]);
      await shot('f2-35-Bbridge');
      await put('B', ...BTN_AT);
      // 回南岸取第三个方块，再抱着它走过光桥
      await go('B', [[DX, 6], [DX, -6.5]]);
      await pick('B', CUBES.c3, [1.4, -8]);
      await go('B', [[DX, -6.5], [DX, 6], [5.5, 6]]);
      await through('B');
      await shot('f2-35-C');
      // C：同样过桥，把第三个方块压在按钮上，再从 C 的出门回到 A
      await go('C', [[DX, -7], [DX, 6.5]]);
      await put('C', ...BTN_AT);
      await go('C', [[DX, 6], [5.5, 6]]);
      await through('C');
      await shot('f2-35-A2');
      // A：光桥铺到了对岸，走过去，进出口
      await go('A', [[DX, -7], [DX, 6.5], [EXIT_X, 7.5], [EXIT_X, ZH + T + 4]]);
    }
  );
}

export default levels;
