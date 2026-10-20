import * as THREE from 'three';
import { applyObliqueClip } from './portalMath.js';

const _frustum = new THREE.Frustum();
const _pv = new THREE.Matrix4();
const _sphere = new THREE.Sphere();
const _camPos = new THREE.Vector3();

/**
 * 传送门渲染：每扇门是一块“监控屏”，屏幕上的画面来自架在另一扇门后面的虚拟相机。
 * 门中看门用递归实现：先渲染更深一层的画面，再把它贴进上一层。
 *
 * 关卡里可能同时有很多扇门，所以渲染目标按“递归层级 × 槽位”复用，
 * 每帧还有一个总的渲染次数预算，超出预算的门显示兜底画面（无缝门是雾色，彩色门是能量涡旋）。
 */
export class PortalRenderer {
  constructor(renderer, scene, getPortals, { depth = 2, scale = 1, budget = 10 } = {}) {
    this.renderer = renderer;
    this.scene = scene;
    this.getPortals = getPortals;
    this.depth = depth;
    this.scale = scale;
    this.budget = budget;
    this.pool = []; // pool[level][slot] = { target, cam }
    this.size = new THREE.Vector2(1, 1);
    this.passes = 0;
  }

  /** 每一层最多同时渲染几扇门 */
  _slotsAt(level) {
    return level === 0 ? 6 : level === 1 ? 3 : 2;
  }

  _rtSize(level) {
    // 更深层的门在屏幕上通常更小，用更低的分辨率
    const s = this.scale * (level === 0 ? 1 : level === 1 ? 0.75 : 0.5);
    return [Math.max(1, Math.floor(this.size.x * s)), Math.max(1, Math.floor(this.size.y * s))];
  }

  _slot(level, i) {
    const row = (this.pool[level] ??= []);
    if (!row[i]) {
      const [w, h] = this._rtSize(level);
      const target = new THREE.WebGLRenderTarget(w, h, { type: THREE.HalfFloatType, depthBuffer: true });
      const cam = new THREE.PerspectiveCamera();
      cam.matrixAutoUpdate = false;
      cam.layers.enable(1); // 虚拟相机能看到玩家自己的身体
      row[i] = { target, cam };
    }
    return row[i];
  }

  _dispose() {
    for (const row of this.pool) for (const s of row ?? []) s?.target.dispose();
    this.pool = [];
  }

  setQuality({ depth, scale, budget }) {
    if (depth !== undefined) this.depth = Math.max(1, depth);
    if (budget !== undefined) this.budget = budget;
    if (scale !== undefined) this.scale = scale;
    this.setSize(this.size.x, this.size.y);
  }

  setSize(w, h) {
    this.size.set(w, h);
    this.pool.forEach((row, level) => {
      const [rw, rh] = this._rtSize(level);
      for (const s of row ?? []) s?.target.setSize(rw, rh);
    });
  }

  _visible(portal, cam) {
    cam.getWorldPosition(_camPos);
    if (portal.signedDistance(_camPos) < 0.0) return -1;
    _pv.multiplyMatrices(cam.projectionMatrix, cam.matrixWorldInverse);
    _frustum.setFromProjectionMatrix(_pv);
    _sphere.set(portal.position, Math.max(portal.halfW, portal.halfH) * 1.05);
    if (!_frustum.intersectsSphere(_sphere)) return -1;
    // 越近、越大的门越优先
    return _camPos.distanceTo(portal.position) / Math.max(portal.halfW, portal.halfH);
  }

  /**
   * 渲染从 cam 看到的场景（第 level 层）到 target（null 表示屏幕）。
   * 先递归渲染其中可见的门，再把门的画面贴上去。exit 是这个视角“穿过”的出口门，用来斜裁剪。
   */
  _renderView(cam, level, target, res, reserve, baseProj, exit) {
    const portals = this.getPortals();
    const textures = new Map();
    if (level < this.depth) {
      const vis = [];
      for (const P of portals) {
        if (!P.linked) continue;
        const score = this._visible(P, cam);
        if (score >= 0) vis.push({ P, score });
      }
      vis.sort((a, b) => a.score - b.score);
      const n = Math.min(vis.length, this._slotsAt(level));
      for (let i = 0; i < n; i++) {
        // 预算要留给：后面还没渲染的兄弟门，以及还在等待的上层画面（reserve）
        const keep = reserve + (n - i - 1);
        if (this.passes + 1 + keep > this.budget) break;
        const { P } = vis[i];
        const slot = this._slot(level, i);
        const virt = slot.cam;
        virt.projectionMatrix.copy(baseProj);
        virt.projectionMatrixInverse.copy(baseProj).invert();
        virt.matrix.multiplyMatrices(P.teleport, cam.matrixWorld);
        virt.updateMatrixWorld(true);
        const [w, h] = this._rtSize(level);
        slot.res = (slot.res ?? new THREE.Vector2()).set(w, h);
        this._renderView(virt, level + 1, slot.target, slot.res, keep + 1, baseProj, P.other);
        textures.set(P, slot.target.texture);
      }
    }
    for (const P of portals) {
      const u = P.material.uniforms;
      const t = textures.get(P);
      u.map.value = t ?? null;
      u.linked.value = t ? 1 : 0;
      u.resolution.value.copy(res);
    }
    if (exit) applyObliqueClip(cam, exit.normal, exit.position);
    this.renderer.setRenderTarget(target);
    this.renderer.clear();
    this.renderer.render(this.scene, cam);
    this.passes++;
  }

  /** 渲染整帧（不含手持枪模型） */
  render(camera) {
    this.passes = 0;
    camera.updateMatrixWorld(true);
    this._renderView(camera, 0, null, this.size, 1, camera.projectionMatrix, null);
  }

  dispose() {
    this._dispose();
  }
}
