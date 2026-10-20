// 新机制的单项测试：每个机制搭一个最小的测试房间，用脚本验证行为。
// 用法：npm run build && node tools/mechtest.mjs
import { startHarness } from './harness.mjs';
import { box, room, panelX, panelY, panelZ, light, exit, wallWithHoles } from './levelkit.mjs';

const H = await startHarness({ shots: 'mechtest-shots' });
const { ev, shot, level } = H;
const base = (extra) => ({ version: 1, name: '测试', gun: 'both', spawn: { pos: [0, 0, 0], yaw: 0 }, brushes: [], entities: [], ...extra });

// ---- A：无缝空间门（同尺寸）
{
  const def = base({
    spawn: { pos: [0, 0, 2], yaw: 0 },
    brushes: [
      ...room([-5, 5], [0, 4], [-5, 5], {}, ['zn']),
      ...wallWithHoles('z', [-5.5, -5], [-5.5, 5.5], [0, 4], [[-1, 1, 0, 3]]),
      box(-1.5, 0, -7, 1.5, 3.5, -6.5), // 洞口后面的小隔间（看起来是死路）
      box(-1.5, -0.5, -7, 1.5, 0, -5),
      ...room([45, 55], [0, 4], [-5, 5], { floor: 'white' }, ['zp']),
      ...wallWithHoles('z', [5, 5.5], [44.5, 55.5], [0, 4], [[49, 51, 0, 3]]),
    ],
    entities: [
      { type: 'gateway', a: { pos: [0, 1.5, -5], normal: [0, 0, 1] }, b: { pos: [50, 1.5, 5], normal: [0, 0, -1] }, size: [2, 3] },
      light(0, 3.8, 0, 25),
      light(50, 3.8, 0, 25, { color: 0xbfd8ff }),
    ],
  });
  await level(def, 'A 无缝空间门', async () => {
    await shot('A-before');
    await ev(() => window.__pt.walkDir(0, 2.2));
    await shot('A-near');
    const s = await ev(() => window.__pt.walkDir(0, 2, (g) => g.player.position.x > 40));
    const st = await ev(() => window.__pt.state());
    if (st.pos[0] < 40) throw new Error('没有穿过空间门：' + st.pos);
    await ev(() => window.__pt.run(0.5));
    await shot('A-after');
    // 回头走回去
    await ev(() => window.__pt.walkDir(180, 3, (g) => g.player.position.x < 10));
    const st2 = await ev(() => window.__pt.state());
    if (st2.pos[0] > 10) throw new Error('回不去：' + st2.pos);
  }, { expect: 'ok' });
}

// ---- B：缩放空间门（大门 → 小门，缩小到 1/4）
{
  const def = base({
    spawn: { pos: [0, 0, 2], yaw: 0 },
    brushes: [
      ...room([-5, 5], [0, 4], [-5, 5], {}, ['zn']),
      ...wallWithHoles('z', [-5.5, -5], [-5.5, 5.5], [0, 4], [[-1, 1, 0, 3]]),
      box(-1.5, 0, -7, 1.5, 3.5, -6.5),
      box(-1.5, -0.5, -7, 1.5, 0, -5),
      ...room([47, 53], [0, 2], [-3, 3], {}, ['zp']),
      ...wallWithHoles('z', [3, 3.5], [46.5, 53.5], [0, 2], [[49.75, 50.25, 0, 0.75]]),
    ],
    entities: [
      { type: 'gateway', a: { pos: [0, 1.5, -5], normal: [0, 0, 1] }, b: { pos: [50, 0.375, 3], normal: [0, 0, -1] }, size: [2, 3], sizeB: [0.5, 0.75] },
      light(0, 3.8, 0, 25),
      light(50, 1.8, 0, 6),
    ],
  });
  await level(def, 'B 缩放空间门', async () => {
    await ev(() => window.__pt.walkDir(0, 5, (g) => g.player.position.x > 40));
    await ev(() => window.__pt.run(0.6, { x: 0, y: 1 }));
    await ev(() => window.__pt.run(0.4));
    const st = await ev(() => window.__pt.state());
    await shot('B-small');
    if (Math.abs(st.scale - 0.25) > 0.01) throw new Error('缩放不对：' + st.scale);
    if (!st.grounded) throw new Error('缩小后没有站稳');
    await ev(() => window.__pt.walkDir(180, 8, (g) => g.player.position.x < 10));
    await ev(() => window.__pt.run(0.4));
    const st2 = await ev(() => window.__pt.state());
    if (Math.abs(st2.scale - 1) > 0.01 || st2.pos[0] > 10) throw new Error('没变回来：' + JSON.stringify(st2));
  }, { expect: 'ok' });
}

// ---- C：大号/小号面板上的门
{
  const def = base({
    spawn: { pos: [0, 0, 4], yaw: 0 },
    brushes: [
      ...room([-10, 10], [0, 9], [-8, 8]),
      panelZ(-8, 1, [-9, -2], [0, 7], 'whiteL'),
      panelZ(-8, 1, [2, 6], [0, 3]),
      panelX(10, -1, [-2, 2], [0, 2], 'whiteS'),
      panelX(-10, 1, [-2, 2], [0, 3]),
    ],
    entities: [light(0, 8.8, 0, 50)],
  });
  await level(def, 'C 大号/小号面板', async () => {
    const a = await ev(() => window.__pt.fire('blue', [4, 1.2, -8]));
    const b = await ev(() => window.__pt.fire('orange', [-5.5, 2.5, -8]));
    if (!a || !b) throw new Error('开门失败');
    await shot('C-portals');
    // 走进蓝门（普通）→ 从大号橙门出来，变成巨人
    await ev(() => {
      const pt = window.__pt;
      pt.walkTo(4, -5.5, 6, 0.2);
      pt.walkDir(0, 3, (g) => g.player.scale > 1.5);
      pt.run(1.2);
    });
    const st = await ev(() => window.__pt.state());
    await shot('C-giant');
    if (st.scale < 2.1) throw new Error('没有变大：' + st.scale);
    // 巨人走不进普通门
    await ev(() => {
      const pt = window.__pt;
      pt.walkTo(4, -4.5, 6, 0.3);
      pt.walkDir(0, 2);
    });
    const st2 = await ev(() => window.__pt.state());
    if (Math.abs(st2.scale - 2.2) > 0.05 || st2.pos[2] < -8.2) throw new Error('巨人钻进了普通门：' + JSON.stringify(st2));
    // 走回大门 → 回到普通门，变回原样
    await ev(() => {
      const pt = window.__pt;
      pt.walkTo(-5.5, -4, 6, 0.3);
      pt.walkDir(0, 4, (g) => g.player.scale < 1.5);
      pt.run(1);
    });
    const st3 = await ev(() => window.__pt.state());
    if (Math.abs(st3.scale - 1) > 0.05) throw new Error('没变回来：' + st3.scale);
    // 小号门：缩小
    await ev(() => window.__pt.fire('orange', [10, 1, 0]));
    await ev(() => {
      const pt = window.__pt;
      pt.walkTo(4, -5.5, 6, 0.2);
      pt.walkDir(0, 3, (g) => g.player.scale < 0.8);
      pt.run(1);
    });
    const st4 = await ev(() => window.__pt.state());
    await shot('C-tiny');
    if (Math.abs(st4.scale - 0.45) > 0.03) throw new Error('没有缩小：' + st4.scale);
  }, { expect: 'ok' });
}

// ---- D：激光 + 折射方块 + 接收器 + 门
{
  const def = base({
    spawn: { pos: [0, 0, 4], yaw: 0 },
    brushes: [...room([-8, 8], [0, 5], [-8, 8])],
    entities: [
      { type: 'laser', pos: [-7.7, 0.31, -4], dir: [1, 0, 0] },
      { type: 'catcher', id: 'c1', pos: [3, 0.45, 7.75], normal: [0, 0, -1] },
      { type: 'cube', kind: 'prism', pos: [3, 0.31, -4], yaw: 180 },
      { type: 'door', pos: [0, 1.5, -6], size: [3, 3, 0.3], requires: ['c1'] },
      light(0, 4.8, 0, 35),
    ],
  });
  await level(def, 'D 激光折射', async () => {
    await ev(() => window.__pt.run(0.5));
    await shot('D-laser');
    const st = await ev(() => window.__pt.state());
    if (!st.signals.c1) throw new Error('接收器没亮：' + JSON.stringify(st.signals));
    await ev(() => window.__pt.run(2));
    const st2 = await ev(() => window.__pt.state());
    if (st2.doors[0] < 0.9) throw new Error('门没开');
    // 走进激光会被烧死
    await ev(() => {
      const pt = window.__pt;
      pt.walkTo(-3, -1, 6, 0.3);
      pt.walkDir(0, 2);
    });
    const st3 = await ev(() => window.__pt.state());
    if (st3.pos[2] < -3.6) throw new Error('激光挡不住人：' + st3.pos);
  }, { expect: 'ok' });
}

// ---- E：光桥穿过传送门：发射器打在侧墙上，从背后墙上出来，横跨深坑
{
  const def = base({
    spawn: { pos: [0, 0, 7], yaw: 0 },
    killY: -5,
    brushes: [
      box(-6, -0.5, 2, 6, 0, 10, 'concrete'),
      box(-6, -0.5, -30, 6, 0, -20, 'concrete'),
      box(-6.5, -10, -30, -6, 8, 10),
      box(6, -10, -30, 6.5, 8, 10),
      box(-6, 8, -30, 6, 8.5, 10),
      box(-6, -10.5, -30, 6, -10, 10),
      box(-6, -10, 10, 6, 8, 10.5),
      box(-6, -10, -30.5, 6, 8, -30),
      panelX(6, -1, [2.5, 5.5], [0, 3]),
      panelZ(10, -1, [-2, 2], [0, 3]),
    ],
    entities: [
      { type: 'bridge', pos: [-5.7, 0.15, 4], dir: [1, 0, 0] },
      light(0, 7.8, 5, 40),
      light(0, 7.8, -25, 40),
      exit(0, 0, -25),
    ],
  });
  await level(def, 'E 光桥', async () => {
    await ev(() => window.__pt.fire('blue', [6, 1.2, 4]));
    await ev(() => window.__pt.fire('orange', [0, 1.2, 10]));
    await ev(() => window.__pt.run(0.3));
    await shot('E-bridge');
    const n = await ev(() => window.__game.bridges[0].parts.length);
    if (n < 2) throw new Error('光桥没有穿过传送门：' + n);
    await ev(() => window.__pt.walkTo(0, 8.5, 3, 0.3));
    await ev(() => window.__pt.walkTo(0, -25, 12));
  });
}

// ---- F：弹射板
{
  const def = base({
    spawn: { pos: [0, 0, 4], yaw: 180 },
    brushes: [...room([-6, 6], [0, 12], [-30, 8])],
    entities: [{ type: 'launcher', pos: [0, 0, 2], target: [0, 0, -22], time: 1.6 }, light(0, 11.8, 0, 50), light(0, 11.8, -20, 50)],
  });
  await level(def, 'F 弹射板', async () => {
    await ev(() => window.__pt.walkTo(0, 2, 3, 0.2));
    await ev(() => window.__pt.run(0.4));
    await shot('F-air');
    const z = await ev(() => {
      const g = window.__game;
      for (let i = 0; i < 300 && !g.player.grounded; i++) g.debugRun(1 / 60);
      return g.player.position.z;
    });
    if (Math.abs(z + 22) > 0.8) throw new Error('落点不对：' + z);
  }, { expect: 'ok' });
}

// ---- G：凝胶
{
  const def = base({
    spawn: { pos: [0, 6, 6], yaw: 0 },
    brushes: [
      ...room([-6, 6], [0, 14], [-40, 8]),
      box(-2, 0, 4, 2, 6, 8, 'metal'),
      box(-2, 0, 0, 2, 0.05, 3.9, 'bounce'),
      box(-6, 0, -40, 6, 0.05, -6, 'speed'),
    ],
    entities: [light(0, 13.8, 0, 60), light(0, 13.8, -25, 60)],
  });
  await level(def, 'G 凝胶', async () => {
    await ev(() => {
      const pt = window.__pt;
      pt.walkDir(0, 1.2, (g) => g.player.position.z < 3);
      pt.run(0.2);
    });
    let maxY = 0;
    for (let i = 0; i < 40; i++) {
      const y = await ev(() => {
        window.__pt.run(0.05);
        return window.__game.player.position.y;
      });
      maxY = Math.max(maxY, y);
    }
    await shot('G-bounce');
    if (maxY < 4) throw new Error('弹得不够高：' + maxY.toFixed(2));
    await ev(() => {
      const pt = window.__pt;
      const g = window.__game;
      g.player.position.set(0, 1, -8);
      g.player.velocity.set(0, 0, 0);
      g.player._syncBody(true);
      g.player.eye(g.player.prevEye);
      let best = 0;
      g.player.yaw = 0;
      for (let i = 0; i < 180; i++) {
        g.debugRun(1 / 60, { x: 0, y: 1 });
        best = Math.max(best, Math.hypot(g.player.velocity.x, g.player.velocity.z));
      }
      window.__best = best;
    });
    const sp = await ev(() => window.__best);
    if (sp < 11) throw new Error('推进凝胶速度不够：' + sp.toFixed(1));
  }, { expect: 'ok' });
}

// ---- H：移动平台
{
  const def = base({
    spawn: { pos: [0, 0, 2.6], yaw: 0 },
    brushes: [box(-3, -0.5, 2, 3, 0, 8, 'concrete'), box(-3, -0.5, -18, 3, 0, -12, 'concrete')],
    entities: [{ type: 'platform', pos: [0, -0.2, 0.5], to: [0, -0.2, -10.5], size: [3, 0.4, 3], period: 10 }, light(0, 6, 0, 60), light(0, 6, -12, 60), exit(0, 0, -15)],
  });
  await level(def, 'H 移动平台', async () => {
    await ev(() => window.__pt.walkTo(0, 0.4, 2, 0.3));
    await ev(() => window.__pt.run(4.6));
    const st = await ev(() => window.__pt.state());
    if (st.pos[2] > -8 || st.pos[1] < 0.5) throw new Error('没有跟着平台走：' + st.pos);
    await ev(() => window.__pt.walkTo(0, -15, 4));
  });
}

// ---- I：消散力场
{
  const def = base({
    spawn: { pos: [0, 0, 4], yaw: 0 },
    brushes: [...room([-6, 6], [0, 5], [-8, 8]), panelX(-6, 1, [-4, 4], [0, 4]), panelX(6, -1, [-4, 4], [0, 4])],
    entities: [{ type: 'fizzler', pos: [0, 2, 0], size: [12, 4, 0.1] }, light(0, 4.8, 0, 40)],
  });
  await level(def, 'I 消散力场', async () => {
    await ev(() => window.__pt.fire('blue', [-6, 1.2, 2]));
    await ev(() => window.__pt.fire('orange', [6, 1.2, 2]));
    await shot('I-fizzler');
    await ev(() => window.__pt.walkTo(0, -3, 4));
    const st = await ev(() => window.__pt.state());
    if (st.portals[0] || st.portals[1]) throw new Error('门没有消失');
  }, { expect: 'ok' });
}

// ---- J：限时开关
{
  const def = base({
    spawn: { pos: [0, 0, 4], yaw: 0 },
    brushes: [...room([-6, 6], [0, 5], [-8, 8])],
    entities: [{ type: 'switch', id: 's1', pos: [0, 0, 2], timer: 3 }, { type: 'door', pos: [0, 1.5, -6], size: [3, 3, 0.3], requires: ['s1'] }, light(0, 4.8, 0, 40)],
  });
  await level(def, 'J 限时开关', async () => {
    await ev(() => window.__pt.use([0, 1.1, 2]));
    await ev(() => window.__pt.run(2));
    const a = await ev(() => window.__pt.state());
    await shot('J-switch');
    await ev(() => window.__pt.run(2.5));
    const b = await ev(() => window.__pt.state());
    if (a.doors[0] < 0.9 || b.doors[0] > 0.5) throw new Error(`门的开合不对：${a.doors} ${b.doors}`);
  }, { expect: 'ok' });
}

const { failed, errors } = await H.close();
console.log(failed.length || errors.length ? `${failed.length} 项失败` : '全部机制测试通过 ✅');
process.exit(failed.length || errors.length ? 1 : 0);
