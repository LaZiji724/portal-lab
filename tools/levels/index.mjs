// 所有章节的关卡（含自动通关脚本）。build-levels 和 playtest 都从这里读取。
import ch1 from './ch1.mjs';

export const CHAPTERS = [{ title: '第 1 章 · 基础训练', levels: ch1 }];

/** 展开成一个列表：[{ def, solve, chapter }] */
export function allLevels() {
  const out = [];
  CHAPTERS.forEach((c, ci) => {
    for (const l of c.levels) out.push({ ...l, def: { ...l.def, chapter: ci }, chapter: ci });
  });
  return out;
}
