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
天空：`sky{kind:'space'|'day'|'dusk', sun{dir,color,intensity}, top, horizon, bottom, stars, nebula, nebA, nebB, sea}`；有 sky 的关卡不再是封闭房间，可以做大陆、星球、群岛。
`sky.sea{y, kind:'cloud'|'water', color, shade}`：脚下一片跟着相机走的云海或水面（只是画面，掉下去照样按 killY 判死）。
画面：`look{hemi, exposure, env, bloom}` 覆盖这一章主题的环境光、曝光、反射、泛光（也可以写在 sky 里）。封闭的暗房间常用 `look:{hemi:0.22, exposure:0.85, env:0.3, bloom:0.34}`，避免发光物和酸液把画面冲成一片白绿。

brush：`{pos,size,mat}`，mat ∈ white whiteS whiteL metal concrete plate glass grate bounce speed grass glow acid。
只有 white/whiteS/whiteL 能开门；glass 挡人挡子弹但透激光；grate 挡人和方块，子弹和激光能穿过；
bounce 弹跳凝胶（落地反弹、撞墙反弹）；speed 推进凝胶（最高 2.8 倍速，摩擦小）。
可选：`shape`('box'|'cyl'|'sphere'，圆柱 size=[直径,高,直径]，球 size=[直径,…])、`rot`[x,y,z]（度，欧拉角 YXZ，做斜坡、多边形房间、圆厅）、`color`（十六进制染色）。
- `deco: true`：纯装饰，没有碰撞（灯带、树冠、酸液外观、远景）。不投影的小东西尽量都标成 deco，省物理。
- `mat:'glow'`：自发光（水晶、灯带、星门柱子上的灯球），`color` 是颜色，`intensity` 是亮度（常用 1.2～2.6，会被泛光放大）。
- `mat:'grass'`：草地贴图，可以用 `color` 压暗（如 `0xa9c892`），否则在强光下会偏黄发白。
- `mat:'acid'`：酸液的样子（半透明、有闪光的液面），`color` 染色、`intensity` 是液面自发光。它只是画面，必须再配一个 `hazard hidden:true` 当致死范围。深翡翠色 `0x2f9a6a` + `intensity 0.12` 最耐看。
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
| hazard | pos, size, up, pool, hidden（酸液，碰到就死；hidden 只有致死范围不画液面，配合 acid 装饰砖或云海使用）|
| exit | pos, size, up, when[] |
| gravity | shape('box'\|'sphere'\|'axis'\|'cube'), pos, g（倍数）, when[], hidden（不画外壳）, invert。box：size, dir（场内重力朝向）；sphere：radius（朝球心，做小行星；invert 背离球心，站在空心球内壁）；axis：radius, length, axis（背离中轴，做旋转的太空圆筒；invert 朝向中轴）；cube：size, core（中央失重区 0～1）, sharp（墙角过渡，默认 10），盒子里离你最近的那面墙就是地面 |
| light | pos, intensity, color, distance, shadow, fixture |
| portal | color, pos, normal, up（固定传送门）|
| gateway | a{pos,normal,up}, b{...}, size[w,h], sizeB, shape('rect'), frame, when[], oneWay('ab'\|'ba')（一对固定的空间门，两端尺寸不同时穿过会被放大/缩小）|

信号：按钮、开关、接收器的 id 可以出现在 requires/when 里。

## 体型

玩家和方块穿过尺寸不同的门（空间门两端不同，或者白板/小白板/大白板之间）会按比例缩放，范围 0.15～2.6。
- 缩小后跑得慢、跳得低，能钻过窄缝；重量 = 体型³，太小压不动普通按钮（需要约 0.8 倍以上）。
- 放大后跳得高，能压重型按钮，但钻不进比自己小的门。
- 方块同理；比玩家大 1.6 倍以上的方块搬不动。

## 自定义重力的经验

- 多个重力场重叠时体积小的优先；场外用关卡默认重力。场要比房间大一圈（魔方场比房间每边多 4 米），否则贴墙传送出来时身体中心还在场外。
- 传送门把人放到出口时，视线在门面上、身体中心在门后约 0.7 米处，所以出口那面墙外也要有重力场。
- 地板/天花板上的门是横着的椭圆，长轴是开枪时玩家面朝的方向；要沿长轴慢慢走进去，走太快会越过门洞。
- 从地板门掉进地板门时，出来的速度等于下落速度，会被弹回去来回穿；脚本里出来后顺着横向冲劲走开就好。
- 拿着方块不能开枪：先开好两扇门再去拿方块。
- `cube.position` 是共用的临时向量，脚本里要立刻 `.clone()` 再比较或保存。
- 弹射板假设重力朝 -y；折射方块的出光方向跟方块朝向有关，在自定义重力里尽量不用。
