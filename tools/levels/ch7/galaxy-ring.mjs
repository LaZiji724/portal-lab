// 第 33 关「银河漫步」和第 36 关「环形世界」（第 7 章，由 ch7.mjs 汇总）。
import * as THREE from 'three';
import { box, cyl, sphere, light, exit, tree, planetTree, planetPoint } from '../../levelkit.mjs';

const levels = [];
const L = (def, solve) => levels.push({ def, solve });
const DEG = Math.PI / 180;
const r2 = (v) => Math.round(v * 100) / 100;
const v3 = {
  sub: (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]],
  len: (a) => Math.hypot(a[0], a[1], a[2]),
  norm: (a) => {
    const l = Math.hypot(a[0], a[1], a[2]) || 1;
    return [a[0] / l, a[1] / l, a[2] / l];
  },
  dot: (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2],
  add: (a, b, k = 1) => [a[0] + b[0] * k, a[1] + b[1] * k, a[2] + b[2] * k],
  scale: (a, k) => [a[0] * k, a[1] * k, a[2] * k],
};

const Y = new THREE.Vector3(0, 1, 0);
/** 让一个方块的 y 轴指向 dir（可以再绕自己的轴转 spin 度），返回 rot 欧拉角（度，YXZ） */
const radialRot = (dir, spin = 0) => {
  const q = new THREE.Quaternion().setFromUnitVectors(Y, new THREE.Vector3(...dir).normalize());
  if (spin) q.multiply(new THREE.Quaternion().setFromAxisAngle(Y, spin * DEG));
  const e = new THREE.Euler().setFromQuaternion(q, 'YXZ');
  return [r2(e.x / DEG), r2(e.y / DEG), r2(e.z / DEG)];
};
/** 立在球面上的东西：底面离球心 R + lift，高度沿半径方向。shape 默认 box */
const onSphere = (c, R, dir, size, { lift = -0.1, spin = 0, ...extra } = {}) => {
  const d = v3.norm(dir);
  const h = R + size[1] / 2 + lift;
  return { pos: [r2(c[0] + d[0] * h), r2(c[1] + d[1] * h), r2(c[2] + d[2] * h)], size: size.map(r2), rot: radialRot(d, spin), ...extra };
};
/** 球面上的一个小发光点（花、萤火虫） */
const speck = (c, R, dir, rad, color, intensity = 2.4, lift = 0.15) => {
  const d = v3.norm(dir);
  const h = R + lift;
  return { pos: [r2(c[0] + d[0] * h), r2(c[1] + d[1] * h), r2(c[2] + d[2] * h)], size: [rad * 2, rad * 2, rad * 2], mat: 'glow', color, intensity, shape: 'sphere', deco: true };
};
const tint = (hex, k) => (Math.round(((hex >> 16) & 255) * k) << 16) | (Math.round(((hex >> 8) & 255) * k) << 8) | Math.round((hex & 255) * k);


// 页面里用的小工具（以源码形式传进去）：沿着球面走、助跑起跳
const HELP = `
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
  const len = (a) => Math.hypot(a[0], a[1], a[2]);
  const norm = (a) => { const l = len(a) || 1; return [a[0] / l, a[1] / l, a[2] / l]; };
  const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const add = (a, b, k = 1) => [a[0] + b[0] * k, a[1] + b[1] * k, a[2] + b[2] * k];
  const scale = (a, k) => [a[0] * k, a[1] * k, a[2] * k];
  const pl = g.player;
  const cur = (c) => norm(sub(pl.position.toArray(), c));
  const slerp = (a, b, t) => {
    const w = Math.acos(Math.max(-1, Math.min(1, dot(a, b))));
    if (w < 1e-3) return b;
    const s = Math.sin(w);
    return norm([0, 1, 2].map((k) => (Math.sin((1 - t) * w) * a[k] + Math.sin(t * w) * b[k]) / s));
  };
  /** 沿着球面（大圆）走到某个方向上，每 3 米一个路点 */
  const walkArc = (c, R, dir, off = 0.9, tol = 0.45) => {
    const a = cur(c);
    const w = Math.acos(Math.max(-1, Math.min(1, dot(a, dir))));
    const n = Math.max(1, Math.ceil((w * R) / 3));
    for (let i = 1; i <= n; i++) pt.walkWorld(add(c, slerp(a, dir, i / n), R + off), 8, i === n ? tol : 0.8);
  };
  const onPlanet = (P) => Math.abs(len(sub(pl.position.toArray(), P.c)) - P.r - 0.92) < 1.6 && pl.grounded;
  const launchDir = (A, B, theta) => {
    const d = norm(sub(B.c, A.c));
    let u = sub([0, 1, 0], scale(d, d[1]));
    if (len(u) < 0.2) u = sub([1, 0, 0], scale(d, d[0]));
    u = norm(u);
    const t = (theta * Math.PI) / 180;
    return norm(add(scale(u, Math.sin(t)), d, Math.cos(t)));
  };
  /** 走到 A 星上的起跳点，朝 B 星助跑、第 6 步起跳，在空中一直朝它飞 */
  const hop = (A, B, theta) => {
    walkArc(A.c, A.r, launchDir(A, B, theta));
    pt.run(0.3);
    for (let k = 0; k < 110 && g.state === 'playing'; k++) {
      pt.lookAtWorld(B.c);
      pl.pitch = 0;
      g.debugRun(1 / 20, { x: 0, y: 1 }, k === 6);
      if (k > 25 && onPlanet(B)) break;
    }
    pt.run(0.8);
  };
  return { H: { sub, len, norm, dot, add, scale, cur, walkArc, onPlanet, hop, launchDir }, pt, g };
`;

// ---------------------------------------------------------------- 银河漫步
{
  const G = 0.3; // 小行星上的重力倍数
  // 行星：翠星（出发）→ 冰星 → 沙星 → 紫晶星（有按钮和光桥）→ 终点星
  const PL = [
    { name: '翠星', c: [0, 0, 0], r: 6, mat: 'grass', color: 0x9cc890, aura: 0x7ad8ff },
    { name: '冰星', c: [17, 5, 3], r: 4, mat: 'concrete', color: 0xcfe8ff, aura: 0x9fe6ff },
    { name: '沙星', c: [25, 14, 15], r: 4.5, mat: 'concrete', color: 0xe3b27a, aura: 0xffc890 },
    { name: '紫晶星', c: [17, 6, 31], r: 5, mat: 'concrete', color: 0x9a6ad8, aura: 0xc89cff },
    { name: '终点星', c: [49, 4, 31], r: 7, mat: 'concrete', color: 0xf0c070, aura: 0xffe6a0 },
  ];
  const [P0, P1, P2, P3, P4] = PL;
  const AURA = 5.5; // 重力场比星球大这么多
  const YB = P3.c[1] + P3.r; // 光桥所在的高度 = 紫晶星北极
  const BZ = P3.c[2];
  const BR = YB + 0.15; // 光桥的桥面
  const PYLON_X = 14.9; // 光桥发射塔的东面（塔在北极的西侧，桥从北极上面走过）
  const PAD_X = 43.6; // 终点星桥头平台的西面
  const dirTo = (a, b) => v3.norm(v3.sub(b.c, a.c));

  // 伪随机
  let seed = 7;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  const randDir = () => {
    const th = rnd() * Math.PI * 2;
    const ph = Math.acos(rnd() * 2 - 1);
    return [Math.sin(ph) * Math.cos(th), Math.cos(ph), Math.sin(ph) * Math.sin(th)];
  };
  const angleBetween = (a, b) => Math.acos(Math.max(-1, Math.min(1, v3.dot(a, b))));
  // 这些方向上不放实心的东西（出生点、方块、按钮、起跳点、落地点、桥头……）
  const keep = PL.map(() => []);
  /** 在星球 i 上随机撒 n 个东西，避开 keep 里的方向 */
  const scatter = (i, n, make, { sep = 0.45, ang = 0.5, ok = () => true } = {}) => {
    const out = [];
    const mine = [];
    for (let t = 0; t < n * 60 && mine.length < n; t++) {
      const d = randDir();
      if (!ok(d)) continue;
      if (keep[i].some((k) => angleBetween(d, k) < ang)) continue;
      if (mine.some((m) => angleBetween(d, m) < sep)) continue;
      mine.push(d);
      out.push(...make(d, mine.length - 1));
    }
    return out;
  };

  const brushes = [];
  const entities = [];

  // 起跳 / 落地方向要空出来
  keep[0].push([0, 1, 0], dirTo(P0, P1));
  keep[1].push(dirTo(P1, P0), dirTo(P1, P2));
  keep[2].push(dirTo(P2, P1), dirTo(P2, P3));
  const DIR_BUTTON = v3.norm([-0.3, 0.64, -0.7]);
  keep[3].push(dirTo(P3, P2), [0, 1, 0], DIR_BUTTON);
  keep[4].push([0, 1, 0], dirTo(P4, P3));

  // ---------------- 星球
  PL.forEach((p) => brushes.push({ ...sphere(p.c[0], p.c[1], p.c[2], p.r, p.mat, p.color) }));

  // ---------------- 重力场
  PL.forEach((p) => entities.push({ type: 'gravity', shape: 'sphere', pos: p.c, radius: p.r + AURA, g: G, color: tint(p.aura, 0.35) }));
  // 光桥走廊：从紫晶星北极到终点星北极，重力朝下（和两颗星的北极方向一致）
  const corX0 = PYLON_X - 0.1;
  const corX1 = P4.c[0] + 2.5;
  entities.push({ type: 'gravity', shape: 'box', pos: [r2((corX0 + corX1) / 2), YB + 2.9, BZ], size: [r2(corX1 - corX0), 6.2, 7], dir: [0, -1, 0], g: G, hidden: true });
  // 虚空：紫晶星和终点星之间是一道“重力瀑布”，朝下 2.5 倍重力。直接跳过去会被它拽下深渊
  // （看不见的超大一块，从任何方向都绕不过去）
  const FALL = { x0: 30, x1: 42 };
  entities.push({ type: 'gravity', shape: 'box', pos: [(FALL.x0 + FALL.x1) / 2, 0, BZ], size: [FALL.x1 - FALL.x0, 500, 500], dir: [0, -1, 0], g: 2.5, hidden: true });
  // 桥下的死亡带（桥没亮的时候从紫晶星往终点星走会掉下去）
  entities.push({ type: 'hazard', hidden: true, pos: [34.25, YB - 4.5, BZ], size: [15.5, 10, 7] });

  // ---------------- 光桥：发射塔、桥头平台
  brushes.push({ ...box(PYLON_X - 1.6, YB - 1.9, BZ - 1.4, PYLON_X, YB + 1.5, BZ + 1.4, 'white'), color: 0xd8d0f0 });
  brushes.push({ ...box(PYLON_X - 1.6, YB + 1.5, BZ - 1.4, PYLON_X, YB + 1.62, BZ + 1.4, 'glow'), color: 0x7ad8ff, intensity: 2.4, deco: true });
  // 北极上的两级台阶（一级一级走上桥面）
  brushes.push(cyl(P3.c[0], YB - 1.2, BZ, 2.3, YB - 0.44, 'white', { color: 0xc8bce8 }));
  brushes.push(cyl(P3.c[0], YB - 1.2, BZ, 1.6, YB - 0.15, 'white', { color: 0xd8d0f0 }));
  brushes.push({ ...cyl(P3.c[0], YB - 0.16, BZ, 1.66, YB - 0.12, 'glow'), color: 0x7ad8ff, intensity: 2.2, deco: true });
  brushes.push({ ...box(PAD_X, YB - 3, BZ - 1.5, PAD_X + 3.2, YB + 0.3, BZ + 1.5, 'white'), color: 0xf2e6c8 });
  // 桥头的两根发光柱
  for (const dz of [-1.9, 1.9]) {
    brushes.push(cyl(PAD_X + 2.6, YB - 1, BZ + dz, 0.22, YB + 3.1, 'concrete', { color: 0xf2e6c8 }));
    brushes.push({ pos: [PAD_X + 2.6, YB + 3.25, BZ + dz], size: [0.55, 0.5, 0.55], mat: 'glow', color: 0xffd36b, intensity: 2.4, shape: 'sphere', deco: true });
  }

  entities.push({ type: 'bridge', pos: [PYLON_X + 0.05, BR, BZ], dir: [1, 0, 0], up: [0, 1, 0], width: 2.4, when: ['b1'] });
  entities.push({ type: 'button', id: 'b1', pos: planetPoint(P3.c, P3.r, DIR_BUTTON, 0), up: DIR_BUTTON });
  entities.push({ type: 'cube', pos: planetPoint(P0.c, P0.r, v3.norm([0.25, 0.95, 0.38]), 0.4) });
  entities.push(exit(P4.c[0], P4.c[1] + P4.r, P4.c[2], [2.4, 2.8, 2.4]));

  // ---------------- 灯
  entities.push(light(-5, 13, -9, 150, { distance: 42, fixture: false, color: 0xffe2b8 }));
  entities.push(light(15, 13, 0, 90, { distance: 30, fixture: false, color: 0x9fd8ff }));
  entities.push(light(31, 21, 11, 100, { distance: 30, fixture: false, color: 0xffc890 }));
  entities.push(light(10, 16, 38, 110, { distance: 32, fixture: false, color: 0xc89cff }));
  entities.push(light(32, 16, 31, 90, { distance: 26, fixture: false, color: 0x7ad8ff }));
  entities.push(light(49, 20, 31, 150, { distance: 40, fixture: false, color: 0xffe6a0 }));

  // ---------------- 装饰：翠星
  const greens = [0x4aa05a, 0x5bb06a, 0x7ab85a, 0x3f9a6a];
  brushes.push(...scatter(0, 12, (d, i) => planetTree(P0.c, P0.r, d, 0.45 + rnd() * 0.4, greens[i % greens.length]), { ang: 0.8 }));
  brushes.push(...scatter(0, 26, (d, i) => [speck(P0.c, P0.r, d, 0.1 + rnd() * 0.06, [0xff9ac8, 0xffe27a, 0xffffff, 0x9affc8][i % 4])], { sep: 0.22, ang: 0.3 }));
  brushes.push(...scatter(0, 6, (d) => [onSphere(P0.c, P0.r, d, [0.9 + rnd() * 0.8, 0.55 + rnd() * 0.4, 0.9 + rnd() * 0.8], { mat: 'concrete', color: 0x8d9aa8, spin: rnd() * 90 })], { sep: 0.6 }));

  // ---------------- 装饰：冰星
  // 雪松：树冠是白的
  brushes.push(...scatter(1, 6, (d) => planetTree(P1.c, P1.r, d, 0.4 + rnd() * 0.25, 0xeaf6ff, 0x6d7f95).map((b) => (b.deco ? { ...b, mat: 'concrete', color: 0xf4f8ff } : b))));
  brushes.push(...scatter(1, 9, (d) => {
    const s = 0.8 + rnd() * 1.4;
    return [0, 33, -33].map((sp, k) => onSphere(P1.c, P1.r, v3.norm(v3.add(d, [0.14 * k - 0.14, 0, 0.12 * k - 0.12])), [0.28, s * (1.2 - k * 0.2), 0.28], { mat: 'glow', color: 0xa8ecff, intensity: 1.5, spin: sp * 2, deco: true }));
  }, { sep: 0.55 }));

  // ---------------- 装饰：沙星
  brushes.push(...scatter(2, 7, (d) => {
    const s = 0.9 + rnd() * 1.6;
    return [0, 1, 2].map((k) => onSphere(P2.c, P2.r, v3.norm(v3.add(d, [0.16 * (k - 1), 0.1 * (k % 2), -0.1 * (k - 1)])), [0.3, s * (1.1 - k * 0.22), 0.3], { mat: 'glow', color: 0xffb257, intensity: 1.8, spin: 40 * k, deco: true }));
  }, { sep: 0.7 }));
  brushes.push(...scatter(2, 6, (d) => {
    const rr = 0.6 + rnd() * 0.7;
    const q = v3.add(P2.c, d, P2.r + rr * 0.35);
    return [{ ...sphere(q[0], q[1], q[2], rr, 'concrete', tint(0xc98a58, 0.75 + rnd() * 0.3)) }];
  }, { sep: 0.8 }));

  // ---------------- 装饰：紫晶星
  brushes.push(...scatter(3, 10, (d) => {
    const s = 0.9 + rnd() * 1.6;
    return [0, 1, 2].map((k) => onSphere(P3.c, P3.r, v3.norm(v3.add(d, [0.15 * (k - 1), -0.1 * (k % 2), 0.12 * (k - 1)])), [0.34, s * (1.1 - k * 0.25), 0.34], { mat: 'glow', color: k === 1 ? 0xd9b6ff : 0xa87aff, intensity: 1.8, spin: 30 * k, deco: true }));
  }, { sep: 0.5, ang: 0.45 }));

  // ---------------- 装饰：终点星
  const golds = [0xffd36b, 0xffb347, 0xf0e08a];
  brushes.push(...scatter(4, 10, (d, i) => planetTree(P4.c, P4.r, d, 0.55 + rnd() * 0.4, golds[i % 3], 0x6b4a2f), { sep: 0.4, ang: 0.45 }));
  brushes.push(...scatter(4, 30, (d, i) => [speck(P4.c, P4.r, d, 0.1 + rnd() * 0.07, [0xffd36b, 0xffffff, 0xffa8d8][i % 3])], { sep: 0.2, ang: 0.3 }));

  // ---------------- 远景：气态巨行星和它的环、月亮、小行星带
  const GIANT = [120, 70, 400];
  brushes.push({ ...sphere(GIANT[0], GIANT[1], GIANT[2], 110, 'concrete', 0xe0905a), deco: true });
  for (const [rad, h, color] of [[190, 0.6, 0xf0d2a2], [160, 0.9, 0xc89a6a]]) {
    brushes.push({ ...cyl(GIANT[0], GIANT[1] - h / 2, GIANT[2], rad, GIANT[1] + h / 2, 'glass', { color, rot: [22, 0, 16] }), deco: true });
  }
  brushes.push({ ...sphere(-90, 70, -170, 34, 'concrete', 0x6a82d8), deco: true });
  // 冰星的环（半透明）
  brushes.push({ ...cyl(P1.c[0], P1.c[1] - 0.04, P1.c[2], 7.4, P1.c[1] + 0.04, 'glass', { color: 0xbfe4ff, rot: [20, 0, 12] }), deco: true });
  // 小行星
  {
    const segs = PL.slice(0, 4).map((p, i) => [p.c, PL[i + 1].c]);
    const distSeg = (q, [a, b]) => {
      const ab = v3.sub(b, a);
      const t = Math.max(0, Math.min(1, v3.dot(v3.sub(q, a), ab) / v3.dot(ab, ab)));
      return v3.len(v3.sub(q, v3.add(a, ab, t)));
    };
    const rocks = [0x8a7a96, 0x9a8a80, 0x7a8098];
    let n = 0;
    for (let t = 0; t < 400 && n < 22; t++) {
      const q = [-35 + rnd() * 120, -22 + rnd() * 62, -45 + rnd() * 120];
      if (PL.some((p) => v3.len(v3.sub(q, p.c)) < p.r + AURA + 3)) continue;
      if (segs.some((sg) => distSeg(q, sg) < 4)) continue;
      if (q[0] > 28 && q[0] < 44 && Math.abs(q[2] - BZ) < 12) continue;
      const rr = 0.3 + rnd() * rnd() * 2.2;
      brushes.push({ ...sphere(q[0], q[1], q[2], rr, 'concrete', rocks[n % 3]), deco: true });
      n++;
    }
  }
  // 路标：沿着跳跃的方向飘着几颗小星星
  [[0, 1], [1, 2], [2, 3]].forEach(([a, b]) => {
    const d = dirTo(PL[a], PL[b]);
    const gap = v3.len(v3.sub(PL[b].c, PL[a].c)) - PL[a].r - PL[b].r;
    [0.3, 0.5, 0.7].forEach((f, k) => {
      const q = v3.add(PL[a].c, d, PL[a].r + gap * f);
      brushes.push({ pos: [r2(q[0]), r2(q[1] + 0.9 + (k === 1 ? 0.5 : 0)), r2(q[2])], size: [0.5, 0.5, 0.5], mat: 'glow', color: 0xffe08a, intensity: 2.6, shape: 'sphere', deco: true });
    });
  });
  // 终点星：出口的光柱和一圈发光的石头
  brushes.push({ ...cyl(P4.c[0], YB, P4.c[2], 0.22, YB + 46, 'glow'), color: 0xffe6a0, intensity: 1.6, deco: true });
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * Math.PI * 2;
    brushes.push({ pos: [r2(P4.c[0] + Math.cos(a) * 2.3), r2(YB - 0.05), r2(P4.c[2] + Math.sin(a) * 2.3)], size: [0.34, 0.34, 0.34], mat: 'glow', color: 0xffd36b, intensity: 2.4, shape: 'sphere', deco: true });
  }

  L(
    {
      name: '银河漫步',
      hint: '小行星的重力很弱，一跳就能飞很远：朝下一颗星跳过去，它的引力会接住你。最后一段太宽了，光桥要靠按钮点亮：把方块一路带到紫晶星上，放在按钮上。',
      gun: 'none',
      killR: 160,
      killY: -50,
      gravityMag: 0,
      sky: { kind: 'space', hemi: 0.4, exposure: 1.0, sun: { dir: [0.15, 0.45, -0.88], intensity: 2.4 }, nebA: 0x6a2f9a, nebB: 0x1f6aa5 },
      spawn: { pos: planetPoint(P0.c, P0.r, [0, 1, 0.12], 0), yaw: -90 },
      brushes,
      entities,
    },
    async ({ ev, shot }) => {
      const PLD = PL.map((p) => ({ c: p.c, r: p.r }));
      const BTN = planetPoint(P3.c, P3.r, DIR_BUTTON, 0);
      await shot('c7-1-start');
      // 拿起出生点旁边的方块，一路带着走
      await ev(({ HELP, PLD }) => {
        const { H, pt } = new Function('pt', 'g', HELP)(window.__pt, window.__game);
        const g = window.__game;
        const c = g.cubes[0].position.toArray();
        H.walkArc(PLD[0].c, PLD[0].r, H.norm(H.sub(c, PLD[0].c)), 0.5, 1.4);
        if (!pt.use(c)) throw new Error('没拿到方块');
        pt.run(0.2);
      }, { HELP, PLD });
      // 翠星 → 冰星 → 沙星 → 紫晶星：朝下一颗星助跑起跳，被它的引力接住
      for (const [a, b] of [[0, 1], [1, 2], [2, 3]]) {
        await ev(({ HELP, PLD, a, b }) => {
          const { H } = new Function('pt', 'g', HELP)(window.__pt, window.__game);
          H.hop(PLD[a], PLD[b], 70);
          if (!H.onPlanet(PLD[b])) throw new Error(`没落到第 ${b} 颗星上：` + window.__game.player.position.toArray());
        }, { HELP, PLD, a, b });
        await shot(`c7-1-hop${b}`);
      }
      // 把方块放在紫晶星的按钮上：站到离按钮 1.5 米的地方，低头松手
      await ev(({ HELP, PLD, BTN, DB }) => {
        const { H, pt, g } = new Function('pt', 'g', HELP)(window.__pt, window.__game);
        const A = PLD[3];
        const a = H.cur(A.c);
        const w = Math.acos(H.dot(a, DB));
        const stand = H.norm(H.add(H.scale(DB, Math.sin(w - 1.5 / A.r) / Math.sin(w)), a, Math.sin(1.5 / A.r) / Math.sin(w)));
        H.walkArc(A.c, A.r, stand, 0.9, 0.25);
        pt.lookAtWorld(BTN);
        g.player.pitch = -0.7;
        pt.run(0.6);
        pt.use();
        pt.run(1.8);
        g.player.pitch = 0;
        if (!g.buttons[0].pressed) throw new Error('方块没压住按钮：' + g.cubes[0].position.toArray());
      }, { HELP, PLD, BTN, DB: DIR_BUTTON });
      await shot('c7-1-button');
      // 光桥亮了：绕过发射塔，走上桥，过虚空，到终点星的出口
      await ev(({ HELP, PLD }) => {
        const { H, pt, g } = new Function('pt', 'g', HELP)(window.__pt, window.__game);
        const A = PLD[3];
        H.walkArc(A.c, A.r, H.norm([0, 4.3, -2.5]), 0.9, 0.4);
        pt.run(0.3);
        pt.walkWorld([17, 12.1, 31], 6, 0.3);
        pt.walkWorld([19, 12.1, 31], 6, 0.4);
        pt.walkWorld([44.5, 12.1, 31], 12, 0.5);
      }, { HELP, PLD });
      await shot('c7-1-bridge');
      await ev(() => {
        const pt = window.__pt;
        pt.walkWorld([49, 12, 31], 6, 0.4);
        pt.run(0.6);
      });
    }
  );
}

// ---------------------------------------------------------------- 环形世界
{
  const H = 15; // 平台半宽，空间门就在边缘上
  const FL = 16.2; // 地板比空间门多出一圈，穿门的时候脚下不会空
  const GH = 6; // 空间门的高度：比最高的树（约 4.8 米）高一点就够了，门越矮，远处要画的东西越少
  const LANE = -8; // 激光栅栏所在的 z
  const KX = 3; // 方块底座所在的 x：激光绕一圈回来正好打在这条线上
  const KZ = 5.75; // 接收器所在的 z
  const brushes = [];
  const entities = [];
  const tinted = (b, color, extra = {}) => ({ ...b, color, ...extra });
  const glowBox = (x0, y0, z0, x1, y1, z1, color, intensity = 2.2) => ({ ...box(x0, y0, z0, x1, y1, z1, 'glow'), color, intensity, deco: true });
  const CREAM = 0xf4ead6;
  const STONE = 0xe9dcc2;

  // ---------------- 地面：整块奶油色的石板 + 两半不同颜色的草地
  brushes.push(tinted(box(-FL, -1.6, -FL, FL, 0, FL, 'white'), CREAM));
  brushes.push(tinted(box(-14.6, 0, -14.6, -0.7, 0.1, 14.6, 'grass'), 0xdff6d0));
  brushes.push(tinted(box(0.7, 0, -14.6, 14.6, 0.1, 14.6, 'grass'), 0xfff0c4));
  // 铺在草地上的石径（只是好看）：沿着出门的路
  for (const [x0, z0, x1, z1] of [
    [-4.7, -14.6, -3.3, 14.6],
    [-14.6, -10.7, -3.3, -9.3],
    [0.7, -10.7, 14.6, -9.3],
    [0.8, -14.6, 2.2, 14.6],
    [5.4, 6.0, 8.0, 14.6],
  ]) {
    brushes.push(tinted(box(x0, 0.1, z0, x1, 0.12, z1, 'white'), STONE, { deco: true }));
  }
  // 边缘的发光线：提醒你这里是空间门
  for (const [x0, z0, x1, z1] of [
    [-FL, -H - 0.12, FL, -H + 0.12],
    [-FL, H - 0.12, FL, H + 0.12],
    [-H - 0.12, -FL, -H + 0.12, FL],
    [H - 0.12, -FL, H + 0.12, FL],
  ]) {
    brushes.push(glowBox(x0, 0, z0, x1, 0.05, z1, 0x7ad8ff, 1.8));
  }

  // ---------------- 中间的玻璃墙：看得见、过不去，激光可以穿过去
  brushes.push(tinted(box(-0.1, 0, -H + 0.1, 0.1, 3.4, H - 0.1, 'glass'), 0xbfe4ff));
  brushes.push(tinted(box(-0.2, 3.4, -H + 0.1, 0.2, 3.56, H - 0.1, 'white'), CREAM));
  for (const z of [-14.7, -9.8, -4.9, 0, 4.9, 9.8, 14.7]) {
    brushes.push(tinted(box(-0.25, 0, z - 0.22, 0.25, 3.7, z + 0.22, 'white'), CREAM));
    brushes.push({ pos: [0, 3.95, z], size: [0.42, 0.42, 0.42], mat: 'glow', color: 0xffd36b, intensity: 2.4, shape: 'sphere', deco: true });
  }

  // ---------------- 西半边：出发的地方、激光发射塔
  // 发射塔朝西，激光穿过西边的空间门，从东边的空间门出来，再往西穿过整个东半边，隔着玻璃墙回到塔的背后
  brushes.push(tinted(box(-13.0, 0, LANE - 0.7, -11.4, 2.6, LANE + 0.7, 'white'), CREAM));
  brushes.push(glowBox(-13.02, 2.6, LANE - 0.7, -11.4, 2.68, LANE + 0.7, 0xff6a5a, 2.2));
  entities.push({ type: 'laser', pos: [-13.1, 1.3, LANE], dir: [-1, 0, 0] });
  entities.push({ type: 'cube', kind: 'prism', pos: [-6.5, 0.31, -10.5], yaw: 0 });

  // ---------------- 东半边：方块底座、接收器、出口小屋
  brushes.push(tinted(box(KX - 0.45, 0, LANE - 0.45, KX + 0.45, 0.99, LANE + 0.45, 'white'), STONE));
  brushes.push(glowBox(KX - 0.5, 0.99, LANE - 0.5, KX + 0.5, 1.03, LANE + 0.5, 0xff6a5a, 2.0));
  brushes.push(tinted(box(KX - 1.2, 0, KZ - 0.75, KX + 1.2, 2.7, KZ, 'white'), CREAM));
  entities.push({ type: 'catcher', id: 'c1', pos: [KX, 1.3, KZ], normal: [0, 0, 1] });
  // 出口小屋
  const wall = (x0, z0, x1, z1) => brushes.push(tinted(box(x0, 0, z0, x1, 3.2, z1, 'white'), CREAM));
  wall(8, 6.5, 14.4, 7);
  wall(8, 14, 14.4, 14.5);
  wall(14, 6.5, 14.5, 14.5);
  wall(7.85, 6.5, 8.35, 8.75);
  wall(7.85, 11.75, 8.35, 14.5);
  brushes.push(tinted(box(7.85, 3.2, 8.75, 8.35, 3.5, 11.75, 'white'), CREAM));
  brushes.push(glowBox(7.8, 3.5, 6.5, 8.4, 3.62, 14.5, 0x7affb0, 2.0));
  entities.push({ type: 'door', pos: [8.1, 1.6, 10.25], size: [0.3, 3.2, 3], requires: ['c1'] });
  entities.push(exit(11.5, 0, 10.25, [2.4, 2.8, 2.4]));

  // ---------------- 酸液池塘（掉进去就没了，别走进去）
  const pond = (x0, z0, x1, z1) => {
    brushes.push(tinted(box(x0 - 0.3, 0, z0 - 0.3, x1 + 0.3, 0.28, z1 + 0.3, 'white'), STONE));
    brushes.push({ ...box(x0, 0.2, z0, x1, 0.3, z1, 'acid'), color: 0x9aff8a, intensity: 0.8, deco: true });
    entities.push({ type: 'hazard', hidden: true, pos: [(x0 + x1) / 2, 0.6, (z0 + z1) / 2], size: [x1 - x0, 1.2, z1 - z0] });
  };
  pond(-13.8, 9.5, -10.2, 13.5);
  pond(-13.5, -14.5, -9, -11.6);
  pond(5, -14.5, 11, -11.6);

  // ---------------- 树、树篱、石凳
  const BLOSSOM = [0xffb6c8, 0xffd0a8, 0xffc0e0];
  const MINT = [0xa8e8b8, 0x8fd8a0, 0xb8f0c0];
  const addTree = (x, z, s, color) => brushes.push(...tree(x, 0.1, z, s, color, 0x8a6a50));
  [[-13, 3, 0.75], [-9, 5.5, 0.6], [-2, 8, 0.7], [-12, -3, 0.8], [-2, -4, 0.6], [-12.5, 7.3, 0.6]].forEach(([x, z, s], i) => addTree(x, z, s, MINT[i % 3]));
  [[13, -3, 0.75], [9.5, 2, 0.7], [12, 5, 0.65], [5.5, -5, 0.6], [13.5, -13, 0.7], [2.2, -13, 0.55]].forEach(([x, z, s], i) => addTree(x, z, s, BLOSSOM[i % 3]));
  const hedge = (x0, z0, x1, z1, color = 0x8fce7a) => brushes.push(tinted(box(x0, 0.1, z0, x1, 1.0, z1, 'grass'), color));
  hedge(-9, 1.5, -5.6, 2.1);
  hedge(-9, -1.4, -5.6, -0.8);
  hedge(5.5, 7.5, 5.9, 11);
  hedge(9, -7.2, 13, -6.6, 0xb6e08a);
  const bench = (x, z, alongX = true) => {
    brushes.push(tinted(box(alongX ? x - 0.8 : x - 0.25, 0.1, alongX ? z - 0.25 : z - 0.8, alongX ? x + 0.8 : x + 0.25, 0.5, alongX ? z + 0.25 : z + 0.8, 'white'), CREAM));
  };
  bench(-12.5, 14.0);
  bench(12.5, 0.5, false);

  // ---------------- 空中的云和浮岛
  const cloud = (x, y, z, s) => {
    for (const [dx, dy, dz, k] of [[0, 0, 0, 1], [0.9, -0.2, 0.3, 0.8], [-0.9, -0.15, -0.2, 0.75], [0.2, 0.25, -0.6, 0.7]]) {
      brushes.push({ pos: [r2(x + dx * s), r2(y + dy * s), r2(z + dz * s)], size: [r2(s * 1.9 * k), r2(s * 1.3 * k), r2(s * 1.9 * k)], mat: 'glow', color: 0xe6f0ff, intensity: 0.95, shape: 'sphere', deco: true });
    }
  };
  // 云和浮岛都放在平台正上方（不越过四条边）：从空间门里看到的是隔壁那一格的同一朵云，不会被门的上沿切开
  cloud(5, 56, 8, 4);
  cloud(-6, 62, -4, 4.5);
  const farIsle = (x, y, z, rad, color) => {
    brushes.push({ ...cyl(x, y - 2, z, rad, y, 'grass'), color, deco: true });
    brushes.push({ pos: [x, r2(y - 2 - rad * 0.9), z], size: [rad * 1.9, rad * 1.9, rad * 1.9], mat: 'concrete', shape: 'sphere', color: 0xffdcb4, deco: true });
    brushes.push({ pos: [x, r2(y + 2.4), z], size: [rad * 0.9, 4, rad * 0.9], mat: 'grass', shape: 'sphere', color: 0xffc0d8, deco: true });
  };
  farIsle(-8, 30, 5, 4.5, 0xdff6d0);
  farIsle(8.5, 36, -7, 5, 0xfff0c4);
  farIsle(-5, 42, -9.5, 3.5, 0xdff6d0);

  // ---------------- 空间门：四条边各一扇，整条边那么大
  entities.push({
    type: 'gateway',
    a: { pos: [H, GH / 2, 0], normal: [-1, 0, 0], up: [0, 1, 0] },
    b: { pos: [-H, GH / 2, 0], normal: [1, 0, 0], up: [0, 1, 0] },
    size: [2 * H, GH],
  });
  entities.push({
    type: 'gateway',
    a: { pos: [0, GH / 2, -H], normal: [0, 0, 1], up: [0, 1, 0] },
    b: { pos: [0, GH / 2, H], normal: [0, 0, -1], up: [0, 1, 0] },
    size: [2 * H, GH],
  });

  // ---------------- 灯
  entities.push(light(-7, 8, 6, 90, { distance: 30, fixture: false, color: 0xfff0d8 }));
  entities.push(light(7, 8, 6, 90, { distance: 30, fixture: false, color: 0xfff0d8 }));
  entities.push(light(-7, 8, -9, 80, { distance: 28, fixture: false, color: 0xfff0d8 }));
  entities.push(light(7, 8, -9, 80, { distance: 28, fixture: false, color: 0xfff0d8 }));
  entities.push(light(KX, 3.8, 8, 40, { distance: 12, fixture: false, color: 0xffc89a }));
  entities.push(light(11.5, 4.5, 10.25, 50, { distance: 12, fixture: false, color: 0xb0ffd0 }));

  L(
    {
      name: '环形世界',
      hint: '这个世界首尾相连：从一侧的边缘走出去，会从对面的边缘走回来，激光也一样。方块被激光拦在了对面？那就走出边缘绕一圈。接收器朝着南方，光得从它的南面打过来。',
      gun: 'none',
      killY: -30,
      // 雾的颜色贴近地平线：远处一格一格重复的世界会慢慢化进天空里
      fog: { color: 0xc8def6, near: 16, far: 90 },
      sky: { kind: 'day', hemi: 0.8, exposure: 1.0, bloom: 0.2, sun: { dir: [-0.4, 0.75, 0.5], intensity: 2.4 }, sea: { y: -34, kind: 'cloud' } },
      spawn: { pos: [-4, 0, 11], yaw: 180 },
      brushes,
      entities,
    },
    async ({ ev, shot }) => {
      await shot('c7-2-start');
      // 1. 往南走出南边的空间门，从北边回来：北半边（激光那边）的方块够得着了
      await ev(() => {
        const pt = window.__pt;
        pt.walkWorld([-4, 0.92, 16.5], 10, 0.2, 1, 0, (g) => g.player.position.z < 0);
        pt.run(0.3);
        if (window.__game.player.position.z > 0) throw new Error('没从南门穿过去');
      });
      await shot('c7-2-north');
      // 2. 拿起折射方块，穿过西边的空间门，从东边回来
      await ev(() => {
        const pt = window.__pt;
        const g = window.__game;
        const c = g.cubes[0].position.toArray();
        pt.walkWorld([c[0] + 1.2, 0.92, c[2] - 0.3], 8, 0.3);
        if (!pt.use(c)) throw new Error('没拿到方块');
        pt.walkWorld([-6, 0.92, -10], 6, 0.3);
        pt.walkWorld([-16.5, 0.92, -10], 12, 0.2, 1, 0, (g) => g.player.position.x > 0);
        pt.run(0.3);
        if (g.player.position.x < 0) throw new Error('没从西门穿过去：' + g.player.position.toArray());
      });
      await shot('c7-2-east');
      // 3. 往西走到玻璃墙边，往北走出北边的空间门，回到南半边
      await ev(() => {
        const pt = window.__pt;
        const g = window.__game;
        pt.walkWorld([1.5, 0.92, -10], 14, 0.3);
        pt.walkWorld([1.5, 0.92, -16.5], 8, 0.2, 1, 0, (g) => g.player.position.z > 0);
        pt.run(0.3);
        if (g.player.position.z < 0) throw new Error('没从北门穿过去');
      });
      // 4. 走到底座南边，面朝北把方块放在底座上：激光被它折向北边，绕一圈从南边回来，打在接收器的南面
      await ev(() => {
        const pt = window.__pt;
        const g = window.__game;
        pt.walkWorld([1.5, 0.92, -4], 20, 0.3);
        pt.walkWorld([3, 0.92, -6.25], 6, 0.12);
        g.player.yaw = 0;
        g.player.pitch = 0;
        g.player.updateCamera();
        pt.run(0.6);
        pt.use();
        pt.run(1.5);
        if (g.player.held) throw new Error('方块没放下');
      });
      await shot('c7-2-lit');
      await ev(() => {
        const pt = window.__pt;
        const s = pt.state();
        if (!(s.doors[0] > 0.5)) throw new Error('门没开：' + JSON.stringify(s.doors) + JSON.stringify(s.cubes));
        pt.walkWorld([5, 0.92, -2], 8, 0.4);
        pt.walkWorld([6.5, 0.92, 10.25], 12, 0.4);
        pt.walkWorld([11.5, 0.92, 10.25], 8, 0.4);
        pt.run(0.6);
      });
    }
  );
}

export default levels;
