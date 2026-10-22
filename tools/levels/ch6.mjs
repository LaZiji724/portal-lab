// 第 6 章：错觉。看上去什么都对，其实哪里都不对——
// 窗只是遮住出口的画，销毁是回家，影子能搬着走，光幕可以躺下，视线要比身体先低下来。
import { box, room, wallWithHoles, panelX, panelY, panelZ, light, exit } from '../levelkit.mjs';
import { strip, planter } from './ch6/helpers.mjs';

const levels = [];
// 截图失败（机器忙时偶尔超时）不算关卡失败；截图前降低画质，减轻无头浏览器负担
const add = (def, solve) =>
  levels.push({
    def,
    solve: async (H) => {
      await H.ev(() => window.__game.setQuality('low'));
      await H.page.waitForTimeout(600); // 等上一关的“关卡完成”弹窗出现过，免得挡住截图
      const shot = async (name) => {
        try {
          await H.shot(name);
        } catch (e) {
          console.log('截图失败', name, e.message.split('\n')[0]);
        }
      };
      await solve({ ...H, shot });
    },
  });

const AMBER = 0xffb347;
const COLD = 0x7fd8ff;

// ================================================================ 28 空门
// 北墙的壁龛里一直立着出口，可一踩圆台，壁龛就变成一扇窗，通向一间走不进去的冷色金库。
// 人进不去，手可以：踩着圆台把方块递到金库里的按钮上，再松脚——窗消失，壁龛还在，出口亮了。
{
  add(
    {
      name: '空门',
      hint: '圆台一踩，壁龛就变成了窗。可窗只在你踩着的时候才存在——这时候，出口去哪儿了？',
      gun: 'none',
      spawn: { pos: [0, 0, 5.5], yaw: 0 },
      brushes: [
        // 大厅
        ...room([-7, 7], [0, 4.5], [-4, 7], {}, ['zn']),
        ...wallWithHoles('z', [-4.5, -4], [-7.5, 7.5], [0, 4.5], [[-1.1, 1.1, 0, 2.6]]),
        // 真实的壁龛：宽 2.2、高 2.6、深 2.6，里面立着出口
        box(-1.6, 0, -7.1, -1.1, 3.1, -4.5),
        box(1.1, 0, -7.1, 1.6, 3.1, -4.5),
        box(-1.1, 2.6, -7.1, 1.1, 3.1, -4.5),
        box(-1.1, 0, -7.1, 1.1, 2.6, -6.6),
        box(-1.6, -0.5, -7.1, 1.6, 0, -4.5, 'concrete'),
        strip(-1.1, 0.05, -6.55, 1.1, 0.12, -6.5, AMBER, 1.8),
        strip(-1.08, 0.1, -6.5, -1.03, 2.5, -6.45, AMBER, 1.2),
        strip(1.03, 0.1, -6.5, 1.08, 2.5, -6.45, AMBER, 1.2),
        // 大厅里的陈设：踢脚灯带、盆栽、长凳
        ...planter(-6.2, -3.2, 0, 1.1),
        ...planter(6.2, -3.2, 0, 1.1),
        ...planter(6.4, 6.2, 0, 0.9),
        box(3.4, 0, 0.6, 5.6, 0.45, 1.4, 'concrete'),
        // 圆台周围的一圈装饰光环（只是装饰，按钮本体在 entities 里）
        { pos: [0, 0.01, -2.2], size: [2.1, 0.02, 2.1], mat: 'glow', shape: 'cyl', color: AMBER, intensity: 0.7, deco: true },
        // 金库（偏移 x=+100）：冷色、空旷，只有一个按钮
        ...room([94, 106], [0, 4.5], [-8, 4], {}, ['zp']),
        ...wallWithHoles('z', [4, 4.5], [93.5, 106.5], [0, 4.5], [[98.9, 101.1, 0, 2.6]]),
        box(98.4, 0, 4.5, 98.9, 3.1, 6.6),
        box(101.1, 0, 4.5, 101.6, 3.1, 6.6),
        box(98.9, 2.6, 4.5, 101.1, 3.1, 6.6),
        box(98.9, 0, 6.1, 101.1, 2.6, 6.6),
        box(98.4, -0.5, 4.5, 101.6, 0, 6.6, 'concrete'),
        box(95.5, 0, -6.5, 96.5, 4.5, -5.5),
        box(103.5, 0, -6.5, 104.5, 4.5, -5.5),
        box(95.5, 0, -1.5, 96.5, 4.5, -0.5),
        box(103.5, 0, -1.5, 104.5, 4.5, -0.5),
        { pos: [100, 0.01, 3.1], size: [2.1, 0.02, 2.1], mat: 'glow', shape: 'cyl', color: AMBER, intensity: 0.7, deco: true },
      ],
      entities: [
        { type: 'cube', pos: [-4, 0.3, 2] },
        { type: 'button', id: 'p', pos: [0, 0, -2.2] },
        { type: 'button', id: 'pv', pos: [100, 0, 3.1] },
        { type: 'gateway', a: { pos: [0, 1.3, -4], normal: [0, 0, 1] }, b: { pos: [100, 1.3, 4], normal: [0, 0, -1] }, size: [2.2, 2.6], when: ['p'] },
        { ...exit(0, 0, -5.3, [1.8, 2.0, 1.8]), when: ['pv'] },
        light(-3, 4.2, 1, 40, { color: 0xffe9c8 }),
        light(3, 4.2, 4, 34, { color: 0xffe9c8 }),
        light(0, 2.3, -5.6, 9, { color: AMBER, fixture: false, distance: 7 }),
        light(100, 4.2, -2, 46, { color: 0xcdeaff, distance: 26 }),
        light(100, 2.6, 2.6, 8, { color: AMBER, fixture: false, distance: 6 }),
      ],
    },
    async ({ ev, shot }) => {
      await shot('c6-1-start');
      await ev(() => {
        const pt = window.__pt;
        const g = window.__game;
        pt.run(0.3);
        pt.walkTo(-3.3, 2.7, 6, 0.2);
        const c = g.cubes[0].position.clone();
        if (!pt.use([c.x, c.y, c.z])) throw new Error('没拿到方块');
        pt.walkTo(0, -2.9, 8, 0.1);
        pt.run(0.3);
        if (!g.signals.get('p')) throw new Error('圆台没踩上');
        g.player.yaw = 0;
        g.player.pitch = -0.12;
        g.player.updateCamera();
        pt.run(0.4);
      });
      await shot('c6-1-window');
      await ev(() => {
        const pt = window.__pt;
        const g = window.__game;
        pt.use();
        pt.run(1.2);
        if (!g.signals.get('pv')) throw new Error('方块没落到金库的按钮上 ' + JSON.stringify(g.cubes[0].position.toArray()));
        g.player.pitch = 0;
        pt.walkTo(0, -0.5, 4, 0.2);
        pt.run(0.6);
      });
      await shot('c6-1-niche');
      await ev(() => {
        const pt = window.__pt;
        pt.walkTo(0, -5.3, 6, 0.2);
        pt.run(0.3);
      });
    }
  );
}

export default levels;
