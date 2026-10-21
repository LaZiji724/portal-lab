import * as THREE from 'three';

/**
 * 重力场。
 *  - 方块场（shape 'box'）：场内重力朝 dir（单位向量）
 *  - 球形场（shape 'sphere'）：场内重力朝球心，像一颗小行星（invert：背离球心，站在空心球的内壁上）
 *  - 魔方场（shape 'cube'）：方盒子里“最近的那面墙”就是地面（走到墙角会自然翻到下一面），core 是中央失重区的大小（0~1）
 *  - 轴向场（shape 'axis'）：绕着一根轴的圆柱形区域，重力背离轴（invert 则朝向轴）：旋转的太空圆筒，站在圆筒内壁上
 * g 是强度倍数（1 = 地球重力 9.81），when 是开关条件（和门、激光一样）。
 * 多个场重叠时体积小的优先，场外用关卡自己的默认重力。
 */
export class GravityField {
  constructor(game, def) {
    this.game = game;
    this.def = def;
    this.shape = def.shape ?? 'box';
    this.pos = new THREE.Vector3(...def.pos);
    this.g = def.g ?? 1;
    this.invert = !!def.invert;
    if (this.shape === 'sphere') {
      this.radius = def.radius ?? 8;
      this.vol = (4 / 3) * Math.PI * this.radius ** 3;
    } else if (this.shape === 'cube') {
      this.size = new THREE.Vector3(...(def.size ?? [20, 20, 20]));
      this.half = this.size.clone().multiplyScalar(0.5);
      this.core = def.core ?? 0;
      this.sharp = def.sharp ?? 10;
      this.vol = this.size.x * this.size.y * this.size.z;
      this._v = new THREE.Vector3();
    } else if (this.shape === 'axis') {
      this.radius = def.radius ?? 10;
      this.length = def.length ?? 40;
      this.axis = new THREE.Vector3(...(def.axis ?? [0, 0, 1])).normalize();
      this.vol = Math.PI * this.radius ** 2 * this.length;
      this._v = new THREE.Vector3();
    } else {
      this.size = new THREE.Vector3(...(def.size ?? [4, 4, 4]));
      this.dir = new THREE.Vector3(...(def.dir ?? [0, 1, 0])).normalize();
      this.vol = this.size.x * this.size.y * this.size.z;
    }
    if (!def.hidden && this.shape !== 'axis' && this.shape !== 'cube') {
      this.mesh = this._makeMesh();
      game.levelGroup.add(this.mesh);
    }
  }

  get active() {
    return this.game.cond(this.def.when, true);
  }

  contains(p) {
    if (this.shape === 'sphere') return p.distanceToSquared(this.pos) < this.radius * this.radius;
    if (this.shape === 'cube') {
      const v = this._v.copy(p).sub(this.pos);
      return Math.abs(v.x) < this.half.x && Math.abs(v.y) < this.half.y && Math.abs(v.z) < this.half.z;
    }
    if (this.shape === 'axis') {
      const v = this._v.copy(p).sub(this.pos);
      const along = v.dot(this.axis);
      if (Math.abs(along) > this.length / 2) return false;
      return v.addScaledVector(this.axis, -along).lengthSq() < this.radius * this.radius;
    }
    return Math.abs(p.x - this.pos.x) < this.size.x / 2 && Math.abs(p.y - this.pos.y) < this.size.y / 2 && Math.abs(p.z - this.pos.z) < this.size.z / 2;
  }

  /** 在 p 处的重力方向（单位向量），写进 out */
  dirAt(p, out) {
    if (this.shape === 'sphere') {
      out.copy(this.pos).sub(p);
      if (out.lengthSq() < 1e-6) return out.set(0, -1, 0);
      return this.invert ? out.negate().normalize() : out.normalize();
    }
    if (this.shape === 'cube') {
      // 用高次范数的梯度：离墙近的轴占绝对优势，墙角处两个方向平滑过渡，走过棱线时视角平稳地转过去
      const v = this._v.copy(p).sub(this.pos);
      const k = this.sharp - 1;
      const gx = Math.sign(v.x) * Math.pow(Math.abs(v.x) / this.half.x, k);
      const gy = Math.sign(v.y) * Math.pow(Math.abs(v.y) / this.half.y, k);
      const gz = Math.sign(v.z) * Math.pow(Math.abs(v.z) / this.half.z, k);
      const l = Math.hypot(gx, gy, gz);
      if (l < 1e-9) return out.set(0, -1, 0);
      const sgn = this.invert ? -1 / l : 1 / l;
      return out.set(gx * sgn, gy * sgn, gz * sgn);
    }
    if (this.shape === 'axis') {
      out.copy(p).sub(this.pos);
      out.addScaledVector(this.axis, -out.dot(this.axis));
      if (out.lengthSq() < 1e-6) return out.set(0, -1, 0);
      return this.invert ? out.negate().normalize() : out.normalize();
    }
    return out.copy(this.dir);
  }

  /** p 处的重力强度倍数：魔方场的中央核心区是失重的 */
  magAt(p) {
    if (this.shape === 'cube' && this.core > 0) {
      const v = this._v.copy(p).sub(this.pos);
      const u = Math.max(Math.abs(v.x) / this.half.x, Math.abs(v.y) / this.half.y, Math.abs(v.z) / this.half.z);
      return this.g * Math.min(1, Math.max(0, (u - this.core) / 0.12));
    }
    return this.g;
  }

  _makeMesh() {
    const color = new THREE.Color(this.def.color ?? (this.shape === 'sphere' ? 0x6fb8ff : 0x7af0ff));
    const uniforms = {
      color: { value: color },
      time: { value: 0 },
      on: { value: 1 },
      dir: { value: this.shape === 'sphere' ? new THREE.Vector3(0, -1, 0) : this.dir.clone() },
      sphere: { value: this.shape === 'sphere' ? 1 : 0 },
      size: { value: this.shape === 'sphere' ? new THREE.Vector3(this.radius * 2, this.radius * 2, this.radius * 2) : this.size.clone() },
    };
    const mat = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: `varying vec3 vN; varying vec3 vV; varying vec3 vL;
        void main(){
          vL = position;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          vN = normalize(normalMatrix * normal);
          vV = normalize(-mv.xyz);
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: `uniform vec3 color; uniform float time; uniform float on; uniform vec3 dir; uniform float sphere; uniform vec3 size;
        varying vec3 vN; varying vec3 vV; varying vec3 vL;
        void main(){
          float fres = pow(1.0 - abs(dot(normalize(vN), normalize(vV))), 2.5);
          float a;
          if (sphere > 0.5) {
            a = 0.05 + fres * 0.55;
          } else {
            // 沿重力方向流动的条纹：一眼能看出“往哪边掉”
            float t = dot(vL, dir) / 1.2 - time * 1.1;
            float stripe = smoothstep(0.35, 0.5, abs(fract(t) - 0.5));
            a = 0.035 + fres * 0.22 + stripe * 0.07;
          }
          vec3 c = mix(vec3(1.0, 0.35, 0.3), color, on);
          gl_FragColor = vec4(c * a * (0.35 + 0.65 * on), 1.0);
        }`,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    const geo = this.shape === 'sphere' ? new THREE.SphereGeometry(this.radius, 48, 32) : new THREE.BoxGeometry(this.size.x, this.size.y, this.size.z);
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.copy(this.pos);
    mesh.renderOrder = 5;
    mesh.frustumCulled = false;
    this.uniforms = uniforms;
    return mesh;
  }

  update(time) {
    if (!this.mesh) return;
    this.uniforms.time.value = time;
    this.uniforms.on.value = this.active ? 1 : 0;
    this.mesh.visible = this.active || this.shape === 'box';
  }
}
