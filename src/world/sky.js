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

/** 同心圆环网格：离相机越近网格越细（大三角形贴着相机的时候，软件渲染的深度会出错） */
function seaGeometry(radius = 800, seg = 72) {
  const radii = [0];
  for (let r = 1.2; r < radius; r *= 1.22) radii.push(r);
  radii.push(radius);
  const pos = [0, 0, 0];
  for (let k = 1; k < radii.length; k++) for (let i = 0; i < seg; i++) pos.push(Math.cos((i / seg) * Math.PI * 2) * radii[k], 0, Math.sin((i / seg) * Math.PI * 2) * radii[k]);
  const idx = [];
  for (let i = 0; i < seg; i++) idx.push(0, 1 + ((i + 1) % seg), 1 + i);
  for (let k = 1; k + 1 < radii.length; k++) {
    for (let i = 0; i < seg; i++) {
      const a = 1 + (k - 1) * seg + i;
      const b = 1 + (k - 1) * seg + ((i + 1) % seg);
      const c = a + seg;
      const d = b + seg;
      idx.push(a, b, c, b, d, c);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setIndex(idx);
  return g;
}

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


    // 脚下的海：云海或水面，跟着相机走，到远处渐变成地平线的颜色
    this.sea = null;
    if (def.sea) {
      const sd = def.sea;
      const cloud = (sd.kind ?? 'cloud') === 'cloud';
      const su = {
        time: uniforms.time,
        cam: { value: new THREE.Vector3() },
        sunDir: { value: this.sunDir },
        sunColor: { value: uniforms.sunColor.value },
        horizon: { value: uniforms.horizon.value },
        top: { value: uniforms.top.value },
        deep: { value: new THREE.Color(sd.color ?? (cloud ? 0xffffff : 0x1d6fa5)) },
        shade: { value: new THREE.Color(sd.shade ?? (cloud ? 0xa9b8dc : 0x0a2a4a)) },
        cloud: { value: cloud ? 1 : 0 },
      };
      const seaMat = new THREE.ShaderMaterial({
        uniforms: su,
        vertexShader: `varying vec3 vW; uniform vec3 cam; void main(){ vW = position + vec3(cam.x, 0.0, cam.z); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
        fragmentShader: `uniform float time; uniform vec3 cam; uniform vec3 sunDir; uniform vec3 sunColor; uniform vec3 horizon; uniform vec3 top; uniform vec3 deep; uniform vec3 shade; uniform float cloud;
          varying vec3 vW;
          float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
          float noise(vec2 p){ vec2 i = floor(p); vec2 f = fract(p); f = f*f*(3.0-2.0*f);
            return mix(mix(hash(i), hash(i+vec2(1,0)), f.x), mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), f.x), f.y); }
          float fbm(vec2 p){ float a = 0.5; float s = 0.0; for (int i = 0; i < 5; i++){ s += a * noise(p); p = p * 2.07 + 17.0; a *= 0.5; } return s; }
          void main(){
            vec3 toCam = vec3(cam.x - vW.x, cam.y - ${(def.sea.y ?? 0).toFixed(3)}, cam.z - vW.z);
            float dist = length(toCam.xz);
            vec3 V = normalize(toCam);
            vec3 col;
            if (cloud > 0.5) {
              vec2 p = vW.xz * 0.018 + vec2(time * 0.012, time * 0.004);
              float n = fbm(p);
              float detail = fbm(p * 4.0 + 5.0);
              float c = smoothstep(0.30, 0.70, n);
              vec3 lit = mix(deep, sunColor, 0.35);
              float rim = smoothstep(0.0, 0.5, c) * (1.0 - smoothstep(0.5, 1.0, c));
              col = mix(shade, lit, c * 0.8 + detail * 0.25);
              col += sunColor * rim * 0.25;
            } else {
              vec2 p = vW.xz * 0.35;
              float e = 0.08;
              float h0 = fbm(p + time * 0.08);
              vec3 N = normalize(vec3((h0 - fbm(p + vec2(e, 0.0) + time * 0.08)) * 3.0, 1.0, (h0 - fbm(p + vec2(0.0, e) + time * 0.08)) * 3.0));
              float fres = pow(1.0 - clamp(dot(V, N), 0.0, 1.0), 4.0);
              vec3 refl = mix(horizon, top, 0.4);
              col = mix(mix(deep, shade, 0.4 + h0 * 0.3), refl, clamp(fres * 1.2 + 0.08, 0.0, 1.0));
              vec3 R = reflect(-V, N);
              col += sunColor * pow(max(dot(R, sunDir), 0.0), 140.0) * 2.2;
            }
            col = mix(col, horizon, smoothstep(120.0, 760.0, dist));
            gl_FragColor = vec4(col, 1.0);
          }`,
        depthWrite: true,
        fog: false,
      });
      const seaMesh = new THREE.Mesh(seaGeometry(), seaMat);
      seaMesh.renderOrder = -7;
      seaMesh.frustumCulled = false;
      this.group.add(seaMesh);
      this.sea = { mesh: seaMesh, y: sd.y ?? 0, uniforms: su };
    }

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
    if (this.sea) {
      this.sea.mesh.position.y = this.sea.y - camPos.y;
      this.sea.uniforms.cam.value.copy(camPos);
    }
  }

  get fogColor() {
    return this.preset.fog;
  }
}
