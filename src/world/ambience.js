import * as THREE from 'three';

/** 柔和的圆形光斑贴图（Canvas 生成） */
let _glowTex = null;
export function glowTexture() {
  if (_glowTex) return _glowTex;
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d');
  const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  grad.addColorStop(0, 'rgba(255,255,255,1)');
  grad.addColorStop(0.18, 'rgba(255,255,255,0.55)');
  grad.addColorStop(0.5, 'rgba(255,255,255,0.12)');
  grad.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 128, 128);
  _glowTex = new THREE.CanvasTexture(c);
  _glowTex.colorSpace = THREE.SRGBColorSpace;
  return _glowTex;
}

/** 灯下的一束淡淡的光柱（假体积光）：加法混合，顶部亮、底部和边缘淡出 */
export function createShaft(color, height, radius) {
  const geo = new THREE.ConeGeometry(radius, height, 28, 1, true);
  geo.translate(0, -height / 2, 0);
  const mat = new THREE.ShaderMaterial({
    uniforms: { color: { value: new THREE.Color(color) }, strength: { value: 0.1 } },
    vertexShader: `varying vec3 vN; varying vec3 vV; varying float vH;
      void main(){
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vN = normalize(normalMatrix * normal);
        vV = normalize(-mv.xyz);
        vH = -position.y / ${height.toFixed(3)};
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: `uniform vec3 color; uniform float strength; varying vec3 vN; varying vec3 vV; varying float vH;
      void main(){
        float edge = pow(abs(dot(normalize(vN), normalize(vV))), 1.6);
        float fade = (1.0 - vH) * smoothstep(0.0, 0.08, vH);
        gl_FragColor = vec4(color * strength * edge * fade * 2.0, 1.0);
      }`,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  const m = new THREE.Mesh(geo, mat);
  m.frustumCulled = false;
  m.renderOrder = 3;
  return m;
}

/** 漂浮的灰尘：全部在顶点着色器里算，围着相机循环出现 */
export class Ambience {
  constructor(scene, { count = 160, size = new THREE.Vector3(18, 7, 18) } = {}) {
    const geo = new THREE.BufferGeometry();
    const seed = new Float32Array(count * 3);
    const rnd = (i) => {
      const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
      return x - Math.floor(x);
    };
    for (let i = 0; i < count; i++) {
      seed[i * 3] = rnd(i * 3 + 1);
      seed[i * 3 + 1] = rnd(i * 3 + 2);
      seed[i * 3 + 2] = rnd(i * 3 + 3);
    }
    geo.setAttribute('position', new THREE.BufferAttribute(seed, 3));
    this.uniforms = {
      time: { value: 0 },
      cam: { value: new THREE.Vector3() },
      box: { value: size },
      color: { value: new THREE.Color(0xdbeaff) },
      map: { value: glowTexture() },
      pr: { value: 1 },
    };
    const mat = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: `uniform float time; uniform vec3 cam; uniform vec3 box; uniform float pr; varying float vA;
        void main(){
          vec3 s = position;
          vec3 drift = vec3(sin(time*0.11 + s.x*40.0)*0.6, -0.05 - s.y*0.06, cos(time*0.09 + s.z*40.0)*0.6) * time;
          vec3 p = s * box + drift;
          p = cam + mod(p - cam + box*0.5, box) - box*0.5;
          vec4 mv = viewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;
          float d = -mv.z;
          gl_PointSize = pr * (1.5 + s.y*2.5) * 30.0 / max(d, 1.5);
          vA = smoothstep(0.5, 2.0, d) * (1.0 - smoothstep(6.0, 9.0, d)) * (0.35 + 0.65*fract(s.x*91.7));
        }`,
      fragmentShader: `uniform vec3 color; uniform sampler2D map; varying float vA;
        void main(){ float a = texture2D(map, gl_PointCoord).a * vA * 0.28; gl_FragColor = vec4(color * a, 1.0); }`,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    this.points = new THREE.Points(geo, mat);
    this.points.frustumCulled = false;
    this.points.renderOrder = 4;
    scene.add(this.points);
    this.accent = new THREE.Color(0x55c0ff);
  }

  setColor(dust, accent) {
    this.uniforms.color.value.setHex(dust);
    this.accent.setHex(accent);
  }

  setPixelRatio(pr) {
    this.uniforms.pr.value = pr;
  }

  update(time, camPos) {
    this.uniforms.time.value = time;
    this.uniforms.cam.value.copy(camPos);
  }
}
