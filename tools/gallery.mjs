// 画面巡检：给指定关卡在出生点拍几个方向的截图。
// 用法：FREEZE=1 SHOTS=gallery node tools/gallery.mjs 1 9 14 20 27   （编号从 1 开始）
import { startHarness } from './harness.mjs';

const ids = process.argv.slice(2).map(Number);
const H = await startHarness({ shots: process.env.SHOTS ?? 'gallery', width: 1100, height: 620 });
for (const n of ids) {
  await H.ev((i) => window.__pt.load(i), n - 1);
  await H.ev(() => window.__pt.run(0.6));
  for (const [k, yaw] of [['a', 0], ['b', 90], ['c', 180], ['d', -90]]) {
    await H.ev((y) => {
      const g = window.__game;
      g.player.yaw += (y * Math.PI) / 180;
      g.player.pitch = 0;
      g.player.updateCamera();
    }, k === 'a' ? 0 : 90);
    await H.shot(`L${String(n).padStart(2, '0')}${k}`);
  }
}
await H.close();
