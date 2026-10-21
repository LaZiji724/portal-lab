import * as THREE from 'three';
import { glowTexture } from './ambience.js';

/**
 * 关卡的天空：def.sky = { kind: 'space' | 'day' | 'dusk', sun: { dir, color, intensity } }
 *  - space：星空 + 星云 + 一颗太阳
 *  - day / dusk：渐变天空 + 太阳 + 云，地平线处的雾色和天空一致
 * 天穹跟着相机走，永远在无穷远处。
 */
const PRESETS = {
  space: { top: 0x02030a, horizon: 0x0a0d24, bottom: 0x02030a, nebA: 0x3a1f7a, nebB: 0x0f5c8c, nebula: 0.55, stars: 1, clouds: 0, sunColor: 0xfff0d0, fog: null },
  day: { top: 0x2f78d8, horizon: 0xbfdcff, bottom: 0x8fb0d0, nebA: 0, nebB: 0, nebula: 0, stars: 0, clouds: 1, sunColor: 0xfff2d6, fog: 0xc4dcf4 },
  dusk: { top: 0x1c2f6e, horizon: 0xffa56b, bottom: 0x4a3a56, nebA: 0, nebB: 0, nebula: 0, stars: 0.4, clouds: 0.8, sunColor: 0xffc27a, fog: 0xe8a77c },
};

export class Sky {
  constructor(def, { low = false } = {}) {
    const preset = PRESETS[def.kind ?? 'space'] ?? PRESETS.space;
    this.preset = preset;
    this.group = new THREE.Group();
    this.sunDir = new THREE.Vector3(...(def.sun?.dir ?? [0.4, 0.55, -0.7])).normalize();
    const uniforms = {
      top: { value: new THREE.Color(def.top ?? preset.top) },
      horizon: { value: new THREE.Color(def.horizon ?? preset.horizon) },
      bottom: { value: new THREE.Color(def.bottom ?? preset.bottom) },
      nebA: { value: new THREE.Color(def.nebA ?? preset.nebA) },
      nebB: { value: new THREE.Color(def.nebB ?? preset.nebB) },
      nebula: { value: def.nebula ?? preset.nebula },
      clouds: { value: preset.clouds },
      sunDir: { value: this.sunDir },
      sunColor: { value: new THREE.Color(def.sun?.color ?? preset.sunColor) },
      time: { value: 0 },
      space: { value: def.kind === 'space' || !def.kind ? 1 : 0 },
    };
    this.uniforms = uniforms;
    const mat = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: `varying vec3 vP; void main(){ vP = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
      fragmentShader: `#define OCT ${low ? 3 : 5}
        uniform vec3 top; uniform vec3 horizon; uniform vec3 bottom; uniform vec3 nebA; uniform vec3 nebB;
        uniform float nebula; uniform float clouds; uniform vec3 sunDir; uniform vec3 sunColor; uniform float time; uniform float space;
        varying vec3 vP;
        float hash(vec3 p){ p = fract(p * 0.3183099 + vec3(0.1, 0.2, 0.3)); p *= 17.0; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }
        float noise(vec3 x){
          vec3 i = floor(x); vec3 f = fract(x); f = f*f*(3.0-2.0*f);
          return mix(mix(mix(hash(i), hash(i+vec3(1,0,0)), f.x), mix(hash(i+vec3(0,1,0)), hash(i+vec3(1,1,0)), f.x), f.y),
                     mix(mix(hash(i+vec3(0,0,1)), hash(i+vec3(1,0,1)), f.x), mix(hash(i+vec3(0,1,1)), hash(i+vec3(1,1,1)), f.x), f.y), f.z);
        }
        float fbm(vec3 p){ float a = 0.5; float s = 0.0; for (int i = 0; i < OCT; i++){ s += a * noise(p); p *= 2.03; a *= 0.5; } return s; }
        void main(){
          vec3 d = normalize(vP);
          vec3 col;
          if (space > 0.5) {
            col = mix(bottom, horizon, 0.5 + 0.5 * d.y);
            float n = fbm(d * 2.2 + 3.0);
            float m = smoothstep(0.42, 0.78, n) * nebula;
            col += mix(nebA, nebB, fbm(d * 3.1 + 11.0)) * m * 0.9;
            // 银河带
            float band = exp(-pow(dot(d, normalize(vec3(0.3, 0.8, 0.5))) * 3.2, 2.0));
            col += vec3(0.5, 0.55, 0.8) * band * fbm(d * 7.0) * 0.22 * nebula;
          } else {
            float h = d.y;
            col = h > 0.0 ? mix(horizon, top, pow(h, 0.55)) : mix(horizon, bottom, pow(-h, 0.4));
            if (h > 0.0 && clouds > 0.0) {
              vec2 uv = d.xz / (h + 0.25) * 1.3 + vec2(time * 0.006, 0.0);
              float c = smoothstep(0.52, 0.82, fbm(vec3(uv, 4.0))) * smoothstep(0.0, 0.2, h) * clouds;
              col = mix(col, mix(vec3(1.0), sunColor, 0.25), c * 0.85);
            }
          }
          float s = max(dot(d, sunDir), 0.0);
          col += sunColor * (pow(s, 900.0) * 14.0 + pow(s, 48.0) * 0.45 + pow(s, 7.0) * 0.14);
          gl_FragColor = vec4(col, 1.0);
        }`,
      side: THREE.BackSide,
      depthWrite: false,
      fog: false,
    });
    const dome = new THREE.Mesh(new THREE.SphereGeometry(900, 48, 32), mat);
    dome.renderOrder = -10;
    dome.frustumCulled = false;
    this.group.add(dome);

    const starAmount = def.stars ?? preset.stars;
    if (starAmount > 0) {
      const n = Math.round(2600 * starAmount);
      const pos = new Float32Array(n * 3);
      const col = new Float32Array(n * 3);
      const c = new THREE.Color();
      let seed = 12345;
      const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
      for (let i = 0; i < n; i++) {
        const u = rnd() * 2 - 1;
        const a = rnd() * Math.PI * 2;
        const r = Math.sqrt(1 - u * u);
        pos.set([r * Math.cos(a) * 850, u * 850, r * Math.sin(a) * 850], i * 3);
        const b = 0.35 + rnd() * rnd() * 1.4;
        c.setHSL(rnd() < 0.3 ? 0.58 : rnd() < 0.5 ? 0.1 : 0.0, 0.5, 0.75).multiplyScalar(b);
        col.set([c.r, c.g, c.b], i * 3);
      }
      const g = new THREE.BufferGeometry();
      g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      g.setAttribute('color', new THREE.BufferAttribute(col, 3));
      const stars = new THREE.Points(g, new THREE.PointsMaterial({ size: 1.8, sizeAttenuation: false, vertexColors: true, transparent: true, depthWrite: false, fog: false, opacity: 0.95 }));
      stars.renderOrder = -9;
      stars.frustumCulled = false;
      this.group.add(stars);
    }

    // 太阳的光晕（泛光会把它晕开）
    const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTexture(), color: uniforms.sunColor.value, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, fog: false, opacity: 0.3 }));
    halo.scale.setScalar(170);
    halo.position.copy(this.sunDir).multiplyScalar(820);
    halo.renderOrder = -8;
    this.group.add(halo);

    if (def.sun?.intensity !== 0) {
      this.light = new THREE.DirectionalLight(uniforms.sunColor.value, def.sun?.intensity ?? 2.2);
      this.light.position.copy(this.sunDir).multiplyScalar(100);
      this.light.target.position.set(0, 0, 0);
      this.group.userData.light = this.light;
    }
  }

  update(camPos, time) {
    this.group.position.copy(camPos);
    this.uniforms.time.value = time;
  }

  get fogColor() {
    return this.preset.fog;
  }
}
