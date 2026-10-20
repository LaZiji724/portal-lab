// 自动试玩：用脚本操作玩家，把 7 个关卡逐一通关，验证物理和传送门逻辑。
// 用法：npm run build && npm run playtest   （截图输出到 playtest-shots/）
import { preview } from 'vite';
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const SHOTS = 'playtest-shots';
mkdirSync(SHOTS, { recursive: true });

const server = await preview({ preview: { port: 4174, strictPort: false }, logLevel: 'silent' });
const url = server.resolvedUrls.local[0];
const browser = await chromium.launch({
  args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'],
});
const page = await browser.newPage({ viewport: { width: 960, height: 540 } });
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
await page.goto(url);
await page.waitForFunction(() => window.__game?.world, null, { timeout: 60000 });

// 页面内的小工具：瞄准、开枪、走到某处、等待
await page.evaluate(() => {
  const g = window.__game;
  const log = [];
  const fizzle = g._fizzle.bind(g);
  g._fizzle = (cube) => {
    log.push('方块重生@' + cube.position.toArray().map((v) => v.toFixed(1)));
    fizzle(cube);
  };
  window.__pt = {
    log,
    load(i) {
      g.loadLevel(window.__levels[i], i);
      g.state = 'playing';
      for (const s of document.querySelectorAll('.screen')) s.classList.remove('show');
      document.querySelector('#hud').classList.add('show');
      log.length = 0;
    },
    aim(p) {
      g.debugAimAt(p);
    },
    fire(color, p) {
      if (p) g.debugAimAt(p);
      const ok = g.fire(color);
      log.push(`fire ${color} -> ${ok}`);
      return ok;
    },
    use(p) {
      if (p) g.debugAimAt(p);
      g.use();
      log.push(`use -> held=${!!g.player.held}`);
      return !!g.player.held;
    },
    run(t, move = { x: 0, y: 0 }, jump = false) {
      return g.debugRun(t, move, jump);
    },
    face(x, z) {
      const p = g.player.position;
      g.player.yaw = Math.atan2(-(x - p.x), -(z - p.z));
      g.player.updateCamera();
    },
    walkTo(x, z, maxT = 10, tol = 0.35) {
      let t = 0;
      while (t < maxT && g.state === 'playing') {
        const p = g.player.position;
        const d = Math.hypot(x - p.x, z - p.z);
        if (d < tol) break;
        this.face(x, z);
        g.debugRun(0.05, { x: 0, y: Math.min(1, d / 1.5 + 0.15) });
        t += 0.05;
      }
      g.debugRun(0.3);
      return g.state;
    },
    state() {
      return g.debugState();
    },
  };
});

const shot = async (name) => {
  await page.evaluate(() => {
    for (const s of document.querySelectorAll('.screen')) s.classList.remove('show');
    window.__game.render(0.016);
  });
  await page.screenshot({ path: `${SHOTS}/${name}.png` });
};

const ev = (fn, ...args) => page.evaluate(fn, ...args);
const results = [];

async function level(i, name, steps) {
  await ev((n) => window.__pt.load(n), i);
  let detail = '';
  try {
    await steps();
  } catch (e) {
    detail = e.message;
  }
  const s = await ev(() => window.__pt.state());
  const log = await ev(() => window.__pt.log.join('; '));
  const ok = s.state === 'complete';
  results.push({ i, name, ok, detail, log, final: s });
  console.log(`${ok ? '✅' : '❌'} 第${i + 1}关 ${name} ${ok ? '' : JSON.stringify(s)} ${log} ${detail}`);
}

// ---- 第 1 关：第一扇门
await level(0, '第一扇门', async () => {
  await ev(() => window.__pt.fire('blue', [0, 1.3, -6]));
  await shot('l0-portal');
  await ev(() => window.__pt.run(1.6, { x: 0, y: 1 }));
  await shot('l0-near');
  await ev(() => window.__pt.run(0.6, { x: 0, y: 1 }));
  await shot('l0-through');
  await ev(() => window.__pt.walkTo(20, 0));
});

// ---- 第 2 关：玻璃之隔
await level(1, '玻璃之隔', async () => {
  await ev(() => window.__pt.fire('orange', [0, 7, -10]));
  await ev(() => window.__pt.fire('blue', [0, 1.3, 8]));
  await shot('l1-portals');
  await ev(() => window.__pt.run(2.2, { x: 0, y: 1 }));
  await ev(() => window.__pt.run(1.5));
  await shot('l1-far');
  await ev(() => window.__pt.walkTo(0, -7.5));
});

// ---- 第 3 关：搬运方块
await level(2, '搬运方块', async () => {
  await ev(() => window.__pt.fire('orange', [0, 5.3, -8]));
  await ev(() => window.__pt.fire('blue', [0, 1.3, 8]));
  await ev(() => {
    const pt = window.__pt;
    pt.walkTo(0, 7.2, 4, 0.2);
    pt.run(0.8, { x: 0, y: 0.4 });
    pt.run(0.6);
  });
  await shot('l2-ledge');
  const held = await ev(() => window.__pt.use([0, 4.3, -6]));
  if (!held) throw new Error('没拿到方块');
  await ev(() => {
    const pt = window.__pt;
    window.__game.player.pitch = -0.15;
    pt.face(0, -8);
    pt.run(3, { x: 0, y: 1 });
    pt.run(0.5);
  });
  await shot('l2-back');
  await ev(() => {
    const pt = window.__pt;
    pt.walkTo(4, 4.9, 6, 0.25);
    pt.face(4, 2);
    window.__game.player.pitch = -0.6;
    pt.run(1);
    pt.use();
    pt.run(1.5);
  });
  await shot('l2-button');
  await ev(() => {
    const pt = window.__pt;
    pt.walkTo(6, 0, 5);
    pt.walkTo(13, 0, 8);
  });
});

// ---- 第 4 关：天降
await level(3, '天降', async () => {
  await ev(() => window.__pt.fire('orange', [0, 12, -7]));
  await ev(() => window.__pt.fire('blue', [0, 0, 2]));
  await shot('l3-portals');
  await ev(() => {
    const pt = window.__pt;
    pt.walkTo(0, 2.6, 4, 0.3);
    pt.run(2.5);
  });
  await shot('l3-ledge');
  await ev(() => window.__pt.walkTo(0, -8));
});

// ---- 第 5 关：飞跃
await level(4, '飞跃', async () => {
  await ev(() => {
    const pt = window.__pt;
    pt.walkTo(0, 7.3, 3, 0.15);
  });
  await ev(() => window.__pt.fire('blue', [0, 0, -0.6]));
  await ev(() => window.__pt.fire('orange', [0, 15, 10]));
  await shot('l4-portals');
  await ev(() => {
    const pt = window.__pt;
    pt.face(0, -20);
    window.__game.player.pitch = -0.3;
    pt.run(1.6, { x: 0, y: 1 });
  });
  await shot('l4-fall');
  await ev(() => window.__pt.run(3));
  await shot('l4-landed');
  await ev(() => window.__pt.walkTo(0, -20));
});

// ---- 第 6 关：无限下落
await level(5, '无限下落', async () => {
  await ev(() => window.__pt.fire('blue', [2.6, 0, 0]));
  await ev(() => window.__pt.fire('orange', [2.6, 14, 0]));
  await ev(() => {
    const pt = window.__pt;
    pt.walkTo(2.6, 0.8, 4, 0.4);
    window.__game.player.velocity.set(0, 0, 0);
    pt.run(3.2);
  });
  await shot('l5-loop');
  const sp = await ev(() => {
    const v = window.__game.player.velocity;
    return Math.hypot(v.x, v.y, v.z);
  });
  if (sp < 15) throw new Error('下落速度不够：' + sp.toFixed(1));
  await ev(() => {
    const pt = window.__pt;
    const g = window.__game;
    // 等到身体处在上半段再瞄墙
    for (let i = 0; i < 120 && g.player.position.y < 7; i++) pt.run(1 / 60);
    pt.fire('orange', [0, 8.5, 0]);
    pt.run(2.5);
  });
  await shot('l5-landed');
  await ev(() => window.__pt.walkTo(23, 0));
});

// ---- 第 7 关：隔栅取物
await level(6, '隔栅取物', async () => {
  await ev(() => window.__pt.fire('blue', [-8, 1.3, 2]));
  await ev(() => window.__pt.fire('orange', [0.5, 1.04, -7.75]));
  await shot('l6-portals');
  await ev(() => window.__pt.run(2.5));
  const cube = await ev(() => window.__game.cubes[0].position.toArray());
  if (cube[2] < -5.5) throw new Error('方块没掉出来：' + cube.map((v) => v.toFixed(2)));
  await ev((c) => {
    const pt = window.__pt;
    pt.walkTo(c[0] + 1.6, c[2], 6, 0.3);
    pt.use([c[0], c[1], c[2]]);
  }, cube);
  await ev(() => {
    const pt = window.__pt;
    pt.walkTo(4, 4.4, 8, 0.25);
    pt.face(4, 2);
    window.__game.player.pitch = -0.6;
    pt.run(1);
    pt.use();
    pt.run(1.5);
  });
  await shot('l6-button');
  await ev(() => {
    const pt = window.__pt;
    pt.walkTo(6, 0, 5);
    pt.walkTo(13, 0, 8);
  });
});

await browser.close();
await server.close();
if (errors.length) console.log('页面错误：\n' + errors.join('\n'));
const failed = results.filter((r) => !r.ok);
console.log(failed.length ? `${failed.length} 关未通过` : '全部 7 关自动通关 ✅');
process.exit(failed.length || errors.length ? 1 : 0);
