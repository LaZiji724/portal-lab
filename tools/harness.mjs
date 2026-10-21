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
  // FREEZE=1：暂停页面自己的实时循环，只由脚本推进时间（更稳定，也避免截图时等很久）
  await page.evaluate((freeze) => {
    const g = window.__game;
    g.frozen = freeze;
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
      /** 沿着“脚下的地面”朝世界里的某个点走（星球上、反重力区里也能用）；到了就停 */
      walkWorld(target, maxT = 10, tol = 0.4, speed = 1, jumpEvery = 0, until = null) {
        let t = 0;
        const pl = g.player;
        const inv = new pl.frame.constructor();
        const d = pl.position.clone();
        let jt = 0;
        while (t < maxT && g.state === 'playing') {
          d.set(target[0], target[1], target[2]).sub(pl.position);
          d.addScaledVector(pl.up, -d.dot(pl.up));
          const dist = d.length();
          if (dist < tol || (until && until(g))) break;
          inv.copy(pl.frame).invert();
          d.applyQuaternion(inv);
          pl.yaw = Math.atan2(-d.x, -d.z);
          pl.updateCamera();
          jt += 0.05;
          const jump = jumpEvery > 0 && jt >= jumpEvery;
          if (jump) jt = 0;
          g.debugRun(0.05, { x: 0, y: Math.min(speed, dist / 1.5 + 0.15) }, jump);
          t += 0.05;
        }
        g.debugRun(0.2);
        return g.state;
      },
      /** 朝世界里的某个点瞄准（保持直立） */
      lookAtWorld(target) {
        g.debugAimAt(target);
      },
      /** 调试：朝 p 瞄准，返回开门判定的结果（为什么开不了门） */
      why(color, p) {
        if (p) g.debugAimAt(p);
        const eye = g.player.eye(new g.player.position.constructor());
        const fwd = g.player.forward(new g.player.position.constructor());
        const res = g.raycast(eye, fwd, 300, (col) => {
          const info = g.colliderInfo.get(col.handle);
          return !(info && (info.kind === 'player' || info.kind === 'bridge' || (info.kind === 'brush' && info.mat === 'grate')));
        });
        const info = res.hit ? g.colliderInfo.get(res.collider.handle) : null;
        const pl = res.hit ? g.portals.computePlacement(color, res, res.dir) : null;
        return { hit: res.hit, pt: res.point, n: res.normal, mat: info?.mat, kind: info?.kind, portalable: info?.portalable, reason: pl?.reason, ok: pl?.ok };
      },
      state() {
        return g.debugState();
      },
      /** 隔着一扇门瞄准：portalPos 是目标所在那一侧的门（连通的），把目标点换算到门的这一侧 */
      via(portalPos, target) {
        const [x, y, z] = portalPos;
        const near = (p) => p.placed && p.position.distanceToSquared({ x, y, z }) < 0.05;
        // 同一位置可能有好几扇（按条件切换的）空间门，优先用连通的那一扇；单向门的出口端也可以用来换算
        const P = g.portals.list.find((p) => near(p) && p.linked) ?? g.portals.list.find(near);
        if (!P) throw new Error('找不到连通的门 @' + portalPos);
        return P.position.clone().set(...target).applyMatrix4(P.teleport).toArray();
      },
      fireVia(color, portalPos, target) {
        return this.fire(color, this.via(portalPos, target));
      },
      useVia(portalPos, target) {
        return this.use(this.via(portalPos, target));
      },
      /** 把手里的方块放到 (x,z) 处的按钮上：从当前方向走到离按钮 1.5 米处，低头放下 */
      drop(x, z, maxT = 10) {
        const p = g.player.position;
        const d = Math.hypot(x - p.x, z - p.z) || 1;
        const sx = x + ((p.x - x) / d) * 1.5;
        const sz = z + ((p.z - z) / d) * 1.5;
        this.walkTo(sx, sz, maxT, 0.2);
        this.face(x, z);
        g.player.pitch = -0.6;
        this.run(0.8);
        this.use();
        this.run(1.2);
        g.player.pitch = 0;
      },
    };
  }, !!process.env.FREEZE);

  const ev = (fn, ...args) => page.evaluate(fn, ...args);
  const shot = async (name) => {
    await page.evaluate(() => {
      for (const s of document.querySelectorAll('.screen')) s.classList.remove('show');
      window.__game.render(0.016);
    });
    // SwiftShader 软件渲染很慢，门套门的画面可能要等很久；截图失败不算关卡失败
    try {
      await page.screenshot({ path: `${shots}/${name}.png`, timeout: 60000 });
    } catch (e) {
      console.log(`  （截图 ${name} 超时，跳过）`);
    }
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
