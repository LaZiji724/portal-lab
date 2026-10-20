import * as THREE from 'three';
import { applyObliqueClip } from './portalMath.js';
import { PORTAL_HALF_H } from './Portal.js';

const _frustum = new THREE.Frustum();
const _pv = new THREE.Matrix4();
const _sphere = new THREE.Sphere();
const _camPos = new THREE.Vector3();

/**
 * 传送门渲染：每扇门是一块“监控屏”，屏幕上的画面来自架在另一扇门后面的虚拟相机。
 * 门中看门用递归实现：先渲染更深一层的画面，再把它贴进上一层。
 */
export class PortalRenderer {
  constructor(renderer, scene, portals, { depth = 2, scale = 1 } = {}) {
    this.renderer = renderer;
    this.scene = scene;
    this.portals = portals;
    this.depth = depth;
    this.scale = scale;
    this.targets = [];
    this.cams = [];
    this.size = new THREE.Vector2(1, 1);
    this.rtSize = new THREE.Vector2(1, 1);
    this.passes = 0;
    this._build();
  }

  _build() {
    for (const level of this.targets) for (const t of level) t.dispose();
    this.targets = [];
    this.cams = [];
    for (let l = 0; l < this.depth; l++) {
      const row = [];
      const camRow = [];
      for (let i = 0; i < 2; i++) {
        row.push(
          new THREE.WebGLRenderTarget(this.rtSize.x, this.rtSize.y, {
            type: THREE.HalfFloatType,
            depthBuffer: true,
          })
        );
        const cam = new THREE.PerspectiveCamera();
        cam.matrixAutoUpdate = false;
        cam.layers.enable(1); // 虚拟相机能看到玩家自己的身体
        camRow.push(cam);
      }
      this.targets.push(row);
      this.cams.push(camRow);
    }
  }

  setQuality({ depth, scale }) {
    if (depth !== undefined && depth !== this.depth) {
      this.depth = Math.max(1, depth);
      this._build();
    }
    if (scale !== undefined) this.scale = scale;
    this.setSize(this.size.x, this.size.y);
  }

  setSize(w, h) {
    this.size.set(w, h);
    this.rtSize.set(Math.max(1, Math.floor(w * this.scale)), Math.max(1, Math.floor(h * this.scale)));
    for (const row of this.targets) for (const t of row) t.setSize(this.rtSize.x, this.rtSize.y);
  }

  _visible(portal, cam) {
    cam.getWorldPosition(_camPos);
    if (portal.signedDistance(_camPos) < 0.0) return false;
    _pv.multiplyMatrices(cam.projectionMatrix, cam.matrixWorldInverse);
    _frustum.setFromProjectionMatrix(_pv);
    _sphere.set(portal.position, PORTAL_HALF_H * 1.05);
    return _frustum.intersectsSphere(_sphere);
  }

  _bind(level, resolution) {
    for (let i = 0; i < 2; i++) {
      const u = this.portals[i].material.uniforms;
      if (level < this.depth) {
        u.map.value = this.targets[level][i].texture;
        u.linked.value = 1;
      } else {
        u.map.value = null;
        u.linked.value = 0; // 递归最深处用能量涡旋兜底
      }
      u.resolution.value.copy(resolution);
    }
  }

  _renderLevel(cam, level, baseProj) {
    for (let i = 0; i < 2; i++) {
      const P = this.portals[i];
      const Q = P.other;
      if (!this._visible(P, cam)) continue;
      const virt = this.cams[level][i];
      virt.fov = cam.fov;
      virt.aspect = cam.aspect;
      virt.near = cam.near;
      virt.far = cam.far;
      virt.projectionMatrix.copy(baseProj);
      virt.projectionMatrixInverse.copy(baseProj).invert();
      virt.matrix.multiplyMatrices(P.teleport, cam.matrixWorld);
      virt.updateMatrixWorld(true);

      if (level + 1 < this.depth) this._renderLevel(virt, level + 1, baseProj);
      this._bind(level + 1, this.rtSize);

      applyObliqueClip(virt, Q.normal, Q.position);
      this.renderer.setRenderTarget(this.targets[level][i]);
      this.renderer.clear();
      this.renderer.render(this.scene, virt);
      this.passes++;
    }
  }

  /** 渲染整帧（不含手持枪模型） */
  render(camera) {
    const [A, B] = this.portals;
    this.passes = 0;
    if (A.linked && B.linked) {
      camera.updateMatrixWorld(true);
      this._renderLevel(camera, 0, camera.projectionMatrix);
      this._bind(0, this.size);
    } else {
      for (const p of this.portals) p.material.uniforms.linked.value = 0;
    }
    this.renderer.setRenderTarget(null);
    this.renderer.render(this.scene, camera);
    this.passes++;
  }

  dispose() {
    for (const row of this.targets) for (const t of row) t.dispose();
  }
}
