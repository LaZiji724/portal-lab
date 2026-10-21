import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { Pass } from 'three/examples/jsm/postprocessing/Pass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';

/** 把“带传送门的整帧渲染”当作后期链的第一步：画到后期链的缓冲里，而不是直接画到屏幕上 */
class PortalPass extends Pass {
  constructor(portalRenderer, getCamera) {
    super();
    this.portalRenderer = portalRenderer;
    this.getCamera = getCamera;
    this.needsSwap = false;
  }

  render(renderer, writeBuffer, readBuffer) {
    renderer.autoClear = true;
    this.portalRenderer.render(this.getCamera(), this.renderToScreen ? null : readBuffer);
  }
}

/**
 * 后期：HDR 缓冲 → 泛光（灯、出口、激光、传送门的光晕）→ 色调映射和色彩空间转换。
 * 低画质不用后期（直接画到屏幕），手机上泛光用更低的分辨率。
 */
export class Post {
  constructor(renderer, portalRenderer, getCamera, { samples = 4, bloomScale = 0.5 } = {}) {
    this.renderer = renderer;
    this.bloomScale = bloomScale;
    const size = renderer.getDrawingBufferSize(new THREE.Vector2());
    const rt = new THREE.WebGLRenderTarget(size.x, size.y, { type: THREE.HalfFloatType, samples, depthBuffer: true });
    this.composer = new EffectComposer(renderer, rt);
    this.composer.addPass(new PortalPass(portalRenderer, getCamera));
    this.bloom = new UnrealBloomPass(new THREE.Vector2(size.x * bloomScale, size.y * bloomScale), 0.35, 0.55, 0.82);
    this.composer.addPass(this.bloom);
    this.composer.addPass(new OutputPass());
    this.enabled = true;
  }

  setBloom(strength) {
    this.bloom.strength = strength;
  }

  setSize(w, h, pixelRatio) {
    this.composer.setPixelRatio(pixelRatio);
    this.composer.setSize(w, h);
    this.bloom.resolution.set(w * pixelRatio * this.bloomScale, h * pixelRatio * this.bloomScale);
    this.bloom.setSize(w * pixelRatio * this.bloomScale, h * pixelRatio * this.bloomScale);
  }

  render() {
    this.composer.render();
  }

  dispose() {
    this.composer.dispose();
  }
}
