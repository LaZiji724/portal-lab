// 自动试玩：用脚本操作玩家，把所有关卡逐一通关，验证每一关都能解。
// 用法：npm run build && npm run playtest            全部关卡
//       node tools/playtest.mjs 8 9 12               只跑第 8、9、12 关（从 1 开始数）
//       node tools/playtest.mjs ch3                   只跑第 3 章
// 截图输出到 playtest-shots/。OUTDIR=dist-xxx 可以指定用哪个构建目录。
import { startHarness } from './harness.mjs';
import { allLevels } from './levels/index.mjs';

const all = allLevels();
const args = process.argv.slice(2);
const pick = all
  .map((l, i) => ({ ...l, i }))
  .filter((l) => {
    if (!args.length) return true;
    return args.some((a) => (a.startsWith('ch') ? l.chapter + 1 === Number(a.slice(2)) : Number(a) === l.i + 1));
  });

const H = await startHarness({ shots: process.env.SHOTS ?? 'playtest-shots' });
for (const l of pick) {
  await H.level(l.def, l.def.name, () => l.solve(H), { label: `第${l.i + 1}关` });
}
const { failed, errors } = await H.close();
console.log(failed.length ? `${failed.length} 关未通过` : `全部 ${pick.length} 关自动通关 ✅`);
process.exit(failed.length || errors.length ? 1 : 0);
