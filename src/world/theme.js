import * as THREE from 'three';
import { setFloor } from './materials.js';

/**
 * 每一章一套配色：墙板色调、地面材质、灯光氛围、泛光强度、强调色（灯带、尘埃）。
 * 关卡的 chapter 字段决定用哪一套；自定义关卡用第 0 套。
 */
export const THEMES = [
  // 0 基础训练：干净的钢灰实验室
  { wall: 0xb9c4d4, floor: 'floor_light', floorTint: 0xe6ecf4, sky: 0xe4ecff, ground: 0x4a4a52, hemi: 0.5, exposure: 1.1, bloom: 0.32, accent: 0x55c0ff, dust: 0xdbeaff, env: 0.65 },
  // 1 非欧空间：深紫夜色，带一点梦境
  { wall: 0xbaa6f0, floor: 'floor_dark', floorTint: 0xb9b2e6, sky: 0xcdbfff, ground: 0x30203f, hemi: 0.55, exposure: 1.35, bloom: 0.42, accent: 0xb58cff, dust: 0xd9c8ff, env: 0.55 },
  // 2 放大与缩小：暖铜色工坊
  { wall: 0xd7a471, floor: 'floor_cool', floorTint: 0xe4cfb2, sky: 0xffe2bd, ground: 0x4b3522, hemi: 0.55, exposure: 1.15, bloom: 0.34, accent: 0xffb257, dust: 0xffe3c0, env: 0.6 },
  // 3 光与力：冷蓝工业感
  { wall: 0x77a6e6, floor: 'floor_dark', floorTint: 0xa9c9ff, sky: 0xbfd8ff, ground: 0x1d2a3d, hemi: 0.5, exposure: 1.18, bloom: 0.45, accent: 0x38d6ff, dust: 0xbfe6ff, env: 0.6 },
  // 4 综合难关：暗红与炭黑，压迫感
  { wall: 0xcf7a74, floor: 'floor_dark', floorTint: 0xd8b6b0, sky: 0xffcfc4, ground: 0x3b1c1a, hemi: 0.55, exposure: 1.2, bloom: 0.5, accent: 0xff6a45, dust: 0xffd1c4, env: 0.55 },
  // 5 云海奇境：奶白色的石头、金色的灯带、明亮的天空
  { wall: 0xe4d9c2, floor: 'floor_light', floorTint: 0xefe5d0, sky: 0xd8ecff, ground: 0x8a7a60, hemi: 0.85, exposure: 1.05, bloom: 0.38, accent: 0xffd36b, dust: 0xfff4d8, env: 0.7 },
  // 6 星海万象：深空，冷色调
  { wall: 0x9db4ff, floor: 'floor_cool', floorTint: 0xb8c4e8, sky: 0x9fb4ff, ground: 0x0b0e22, hemi: 0.35, exposure: 1.15, bloom: 0.5, accent: 0x7af0ff, dust: 0xcfe0ff, env: 0.5 },
];

const _c = new THREE.Color();

/** 把第 index 章的配色套到场景上（材质是共享的，换关时整套切换） */
export function applyTheme(game, index = 0) {
  const t = THEMES[index] ?? THEMES[0];
  game.theme = t;
  const m = game.materials;
  m.metal.color.setHex(t.wall);
  m.plate.color.setHex(t.wall).lerp(_c.setHex(0xffffff), 0.35);
  m.concrete.color.setHex(t.floorTint);
  setFloor(m, t.floor);
  game.hemi.color.setHex(t.sky);
  game.hemi.groundColor.setHex(t.ground);
  // 关卡可以用 look{hemi,exposure,bloom,env} 微调（封闭的房间没有 sky 也能调亮度），sky 里的 hemi/exposure 同样有效
  const look = { ...(game.level?.sky ?? {}), ...(game.level?.look ?? {}) };
  game.hemi.intensity = look.hemi ?? t.hemi;
  game.scene.environmentIntensity = look.env ?? t.env;
  game.renderer.toneMappingExposure = look.exposure ?? t.exposure;
  game.post?.setBloom(look.bloom ?? t.bloom);
  game.ambience?.setColor(t.dust, t.accent);
}
