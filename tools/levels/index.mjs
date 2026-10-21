// 所有章节的关卡（含自动通关脚本）。build-levels 和 playtest 都从这里读取。
// ONLY=1,2 只取这几章（发布做好的章节时用）；某一章文件出错时跳过它并给出警告。
const FILES = [
  ['第 1 章 · 基础训练', './ch1.mjs'],
  ['第 2 章 · 非欧空间', './ch2.mjs'],
  ['第 3 章 · 放大与缩小', './ch3.mjs'],
  ['第 4 章 · 光与力', './ch4.mjs'],
  ['第 5 章 · 综合难关', './ch5.mjs'],
  ['第 6 章 · 异形空间', './ch6.mjs'],
  ['第 7 章 · 星球与重力', './ch7.mjs'],
];
const only = process.env.ONLY ? process.env.ONLY.split(',').map(Number) : null;

export const CHAPTERS = [];
for (const [i, [title, file]] of FILES.entries()) {
  if (only && !only.includes(i + 1)) continue;
  try {
    const levels = (await import(file)).default;
    if (levels.length) CHAPTERS.push({ title, levels, num: i + 1 });
  } catch (e) {
    console.warn(`跳过 ${file}：${e.message}`);
  }
}

/** 展开成一个列表：[{ def, solve, chapter, num }]，chapter 是 CHAPTERS 里的下标，num 是章节文件编号 */
export function allLevels() {
  const out = [];
  CHAPTERS.forEach((c, ci) => {
    for (const l of c.levels) out.push({ ...l, def: { ...l.def, chapter: ci }, chapter: ci, num: c.num });
  });
  return out;
}
