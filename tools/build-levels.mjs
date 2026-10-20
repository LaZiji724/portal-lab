// 生成内置关卡 JSON：node tools/build-levels.mjs
// 关卡定义在 tools/levels/chN.mjs 里，输出的 JSON 和关卡编辑器使用同一种格式。
import { writeFileSync, mkdirSync, readdirSync, unlinkSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { CHAPTERS, allLevels } from './levels/index.mjs';

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'levels');
mkdirSync(OUT, { recursive: true });
for (const f of readdirSync(OUT)) if (/^level\d+\.json$/.test(f)) unlinkSync(join(OUT, f));

const levels = allLevels();
levels.forEach(({ def }, i) => {
  const file = join(OUT, `level${i}.json`);
  writeFileSync(file, JSON.stringify({ version: 1, ...def }, null, 1) + '\n');
  console.log('wrote', file, def.name, def.brushes.length, 'brushes');
});

const imports = levels.map((_, i) => `import level${i} from './level${i}.json';`).join('\n');
const index = `${imports}

/** 章节标题（关卡的 chapter 字段是这里的下标） */
export const CHAPTERS = ${JSON.stringify(CHAPTERS.map((c) => c.title))};

/** 内置关卡，按难度排序 */
export const LEVELS = [${levels.map((_, i) => `level${i}`).join(', ')}];
`;
writeFileSync(join(OUT, 'index.js'), index);
console.log(`共 ${levels.length} 关`);
