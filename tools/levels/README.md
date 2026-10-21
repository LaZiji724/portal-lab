# 关卡制作说明

每一章是一个文件 `chN.mjs`，默认导出 `[{ def, solve }]`：

- `def` 是关卡 JSON（和编辑器同一种格式），由 `../levelkit.mjs` 里的小函数拼出来。
- `solve` 是这一关的自动通关脚本：`async ({ ev, shot }) => { ... }`，在无头浏览器里操作玩家，
  最后必须真的走进出口（`state === 'complete'`）。每一关都必须有脚本，用来证明它能解。

```
node tools/build-levels.mjs            # 生成 src/levels/*.json 和 index.js
npm run build && npm run playtest      # 全部关卡自动通关
node tools/playtest.mjs ch3            # 只跑第 3 章
node tools/playtest.mjs 9 10           # 只跑第 9、10 关（从 1 开始数）
OUTDIR=dist-ch3 node tools/playtest.mjs ch3   # 用另一个构建目录（npx vite build --outDir dist-ch3）
node tools/mechtest.mjs                # 各个机制的单项测试
```

坐标：米，y 朝上；玩家站立时 `position.y = 0.92`（脚底 0），视线约 1.6 米；走 5 米/秒，跳约 1.2 米高。
传送门半宽 0.62、半高 1.12（普通白板），开在 `whiteS` 上是 0.45 倍，`whiteL` 上是 2.2 倍。

## def 字段

`name` `hint` `gun`('blue'|'orange'|'both'|'none') `spawn{pos,yaw,scale}` `brushes[]` `entities[]`
可选 `fog{color,near,far}`（无缝空间门/循环空间用来遮住无限递归）、`killY`（掉到这个高度以下就死，默认 -40）。
重力相关：`gravityDir`（默认重力方向，如 [0,1,0] 掉向天花板）、`gravityMag`（倍数，0 = 失重；默认 1）、`killR`（离原点超过这个距离就死，用于星球/太空关）。
天空：`sky{kind:'space'|'day'|'dusk', sun{dir,color,intensity}, top, horizon, bottom, stars, nebula}`；有 sky 的关卡不再是封闭房间，可以做大陆、星球、群岛。

brush：`{pos,size,mat}`，mat ∈ white whiteS whiteL metal concrete glass grate bounce speed。
只有 white/whiteS/whiteL 能开门；glass 挡人挡子弹但透激光；grate 挡人和方块，子弹和激光能穿过；
bounce 弹跳凝胶（落地反弹、撞墙反弹）；speed 推进凝胶（最高 2.8 倍速，摩擦小）。
可选：`shape`('box'|'cyl'|'sphere'，圆柱 size=[直径,高,直径]，球 size=[直径,…])、`rot`[x,y,z]（度，欧拉角 YXZ，做斜坡、多边形房间、圆厅）、`color`（十六进制染色）。
弯曲/旋转后的 white 面板仍可开门，但 cyl/sphere 表面不行，要在上面贴 box 形的白板。

## 实体

| type | 字段 |
| --- | --- |
| cube | pos, kind('normal'\|'prism'), scale, yaw |
| button | id, pos, heavy（需要重量 3.5，即放大约 1.5 倍以上的方块/玩家）, up（按钮朝向，贴天花板/星球用）|
| door | pos, size, requires[]（全部满足才开，id 前加 `!` 表示取反）|
| switch | id, pos, yaw, timer（秒；0 或省略=来回切换）|
| laser | pos, dir, when[] |
| catcher | id, pos, normal（被激光照到时信号为真）|
| bridge | pos, dir, up, width, when[]（光桥，可穿过传送门）|
| launcher | pos, target, time, when[]（弹射板，time 秒后落到 target）|
| platform | pos, to, size, mat, period, phase, when[]（有 when 时按条件移动到 to，没有就来回往返）|
| fizzler | pos, size, when[]（消散力场：人穿过会清掉自己开的门，方块会被销毁重生）|
| hazard | pos, size, up, pool（酸液，碰到就死）|
| exit | pos, size, up, when[] |
| gravity | shape('box'\|'sphere'), pos, size / radius, dir（box：场内重力朝向）, g（倍数）, when[]（球形场重力朝球心，做小行星）|
| light | pos, intensity, color, distance, shadow, fixture |
| portal | color, pos, normal, up（固定传送门）|
| gateway | a{pos,normal,up}, b{...}, size[w,h], sizeB, shape('rect'), frame, when[], oneWay('ab'\|'ba')（一对固定的空间门，两端尺寸不同时穿过会被放大/缩小）|

信号：按钮、开关、接收器的 id 可以出现在 requires/when 里。

## 体型

玩家和方块穿过尺寸不同的门（空间门两端不同，或者白板/小白板/大白板之间）会按比例缩放，范围 0.15～2.6。
- 缩小后跑得慢、跳得低，能钻过窄缝；重量 = 体型³，太小压不动普通按钮（需要约 0.8 倍以上）。
- 放大后跳得高，能压重型按钮，但钻不进比自己小的门。
- 方块同理；比玩家大 1.6 倍以上的方块搬不动。
