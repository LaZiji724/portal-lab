// 自动试玩用的公共部分：启动预览服务器和无头浏览器，往页面里注入一组操作小工具。
import { preview } from 'vite';
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

export async function startHarness({ shots = 'playtest-shots', width = 960, height = 540 } = {}) {
  mkdirSync(shots, { recursive: true });
  const outDir = process.env.OUTDIR ?? 'dist';
  const server = await preview({ preview: { port: 4174, strictPort: false }, build: { outDir }, logLevel: 'silent' });
  const url = server.resolvedUrls.local[0];
  const browser = await chromium.launch({
    args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'],
  });
  const page = await browser.newPage({ viewport: { width, height } });
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
    const die = g.die.bind(g);
    g.die = () => {
      if (g.state === 'playing') log.push('死亡@' + g.player.position.toArray().map((v) => v.toFixed(1)));
      die();
    };
    window.__pt = {
      log,
      load(i) {
        const def = typeof i === 'number' ? window.__levels[i] : i;
        g.loadLevel(def, typeof i === 'number' ? i : -1);
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
      /** 一直朝某个方向走，直到条件满足或超时（用来走进传送门） */
      walkDir(yawDeg, seconds, until) {
        g.player.yaw = (yawDeg * Math.PI) / 180;
        let t = 0;
        while (t < seconds && g.state === 'playing') {
          g.debugRun(1 / 60, { x: 0, y: 1 });
          t += 1 / 60;
          if (until && until(g)) break;
        }
        return g.state;
      },
      state() {
        return g.debugState();
      },
    };
  });

  const ev = (fn, ...args) => page.evaluate(fn, ...args);
  const shot = async (name) => {
    await page.evaluate(() => {
      for (const s of document.querySelectorAll('.screen')) s.classList.remove('show');
      window.__game.render(0.016);
    });
    await page.screenshot({ path: `${shots}/${name}.png` });
  };
  const results = [];

  /** 跑一关：steps 里用 ev 调用页面里的工具，最后检查是否通关 */
  async function level(i, name, steps, { expect = 'complete', label } = {}) {
    await ev((n) => window.__pt.load(n), i);
    let detail = '';
    try {
      await steps();
    } catch (e) {
      detail = e.message;
    }
    const s = await ev(() => window.__pt.state());
    const log = await ev(() => window.__pt.log.join('; '));
    const ok = expect === 'complete' ? s.state === 'complete' && !detail : !detail;
    results.push({ i, name, ok, detail, log, final: s });
    label ??= typeof i === 'number' ? `第${i + 1}关` : '测试';
    console.log(`${ok ? '✅' : '❌'} ${label} ${name} ${ok ? '' : JSON.stringify(s)} ${log} ${detail}`);
    return ok;
  }

  async function close() {
    await browser.close();
    await server.close();
    if (errors.length) console.log('页面错误：\n' + [...new Set(errors)].join('\n'));
    return { failed: results.filter((r) => !r.ok), errors };
  }

  return { page, ev, shot, level, close, results };
}
