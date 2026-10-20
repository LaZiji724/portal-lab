import * as THREE from 'three';

export const PORTAL_HALF_W = 0.62;
export const PORTAL_HALF_H = 1.12;
/** 穿门时会临时关闭碰撞的“隧道”深度（门背后多深的墙体被忽略） */
export const TUNNEL_DEPTH = 2.2;

export const PORTAL_COLORS = {
  blue: new THREE.Color(0x1f8bff),
  orange: new THREE.Color(0xff7a12),
  gate: new THREE.Color(0x9fe8ff),
};

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform sampler2D map;
  uniform vec2 resolution;
  uniform vec3 color;
  uniform vec3 fallback;
  uniform float time;
  uniform float open;
  uniform float linked;
  uniform float rect;
  uniform float seamless;
  varying vec2 vUv;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
  }

  void main() {
    vec2 p = (vUv - 0.5) * 2.0;
    float ang = atan(p.y, p.x);
    vec3 col;
    if (seamless > 0.5) {
      // 无缝门：和普通门洞一模一样，没有任何边框
      col = linked > 0.5 ? texture2D(map, gl_FragCoord.xy / resolution).rgb : fallback;
      gl_FragColor = vec4(col, 1.0);
    } else {
      float r;
      if (rect > 0.5) {
        r = max(abs(p.x), abs(p.y)) / max(open, 0.001);
      } else {
        // 边缘带一点随时间流动的抖动，像能量场
        float wobble = 0.035 * (noise(vec2(ang * 3.0, time * 1.7)) - 0.5);
        r = length(p) / max(open, 0.001) + wobble;
      }
      if (r > 1.0) discard;
      if (linked > 0.5) {
        col = texture2D(map, gl_FragCoord.xy / resolution).rgb;
      } else {
        float swirl = noise(vec2(ang * 2.0 + time * 0.8 + r * 6.0, r * 4.0 - time));
        col = color * (0.25 + 0.6 * swirl) * (1.2 - r);
      }
      float edge0 = rect > 0.5 ? 0.95 : 0.84;
      float rim = smoothstep(edge0, edge0 + 0.13 * (1.0 - rect * 0.7), r);
      float flick = noise(vec2(ang * 6.0, time * 3.0));
      col = mix(col, color * (2.2 + 2.5 * flick), rim);
      col += color * 0.35 * smoothstep(0.6, 0.9, r) * (1.0 - rim) * (1.0 - rect);
      gl_FragColor = vec4(col, 1.0);
    }
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

/**
 * 一扇传送门。玩家发射的蓝/橙门是椭圆形，关卡里的“空间门”（gateway）可以是矩形、
 * 没有边框（无缝），尺寸也可以和另一端不同——穿过大小不同的两扇门，人和物体会被等比缩放。
 */
export class Portal {
  constructor(color, { shape = 'ellipse', seamless = false, halfW = PORTAL_HALF_W, halfH = PORTAL_HALF_H } = {}) {
    this.color = color;
    this.shape = shape;
    this.seamless = seamless;
    this.halfW = halfW;
    this.halfH = halfH;
    this.size = 1; // 玩家门的尺寸倍率（由面板决定）
    this.placed = false;
    this.fixed = false;
    this.active = true; // 空间门可以被开关控制
    this.gateway = false;
    this.exitOnly = false; // 单向空间门的出口端：不能从这一端进去
    this.other = null;
    this.position = new THREE.Vector3();
    this.normal = new THREE.Vector3(0, 0, 1);
    this.up = new THREE.Vector3(0, 1, 0);
    this.right = new THREE.Vector3(1, 0, 0);
    this.matrix = new THREE.Matrix4();
    this.matrixInv = new THREE.Matrix4();
    this.quaternion = new THREE.Quaternion();
    this.quaternionInv = new THREE.Quaternion();
    /** 穿越到另一扇门的变换（位置，含缩放）、旋转、缩放倍率 */
    this.teleport = new THREE.Matrix4();
    this.teleportQ = new THREE.Quaternion();
    this.teleportScale = 1;
    this.surface = null; // 贴附的碰撞体
    this.tunnel = new Set(); // 门后需要临时关闭碰撞的碰撞体句柄
    this.openT = 0;

    const base = PORTAL_COLORS[color] ?? PORTAL_COLORS.gate;
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        map: { value: null },
        resolution: { value: new THREE.Vector2(1, 1) },
        color: { value: base.clone() },
        fallback: { value: new THREE.Color(0x07090b) },
        time: { value: 0 },
        open: { value: 0 },
        linked: { value: 0 },
        rect: { value: shape === 'rect' ? 1 : 0 },
        seamless: { value: seamless ? 1 : 0 },
      },
      vertexShader,
      fragmentShader,
      polygonOffset: true,
      polygonOffsetFactor: -2,
      polygonOffsetUnits: -4,
    });
    this.mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), this.material);
    this.mesh.visible = false;
    this.mesh.renderOrder = 1;
    this.mesh.userData.portal = this;
    this.light = new THREE.PointLight(base, 0, 4, 2);
    this.light.castShadow = false;
    this._resizeMesh();
  }

  _resizeMesh() {
    // 椭圆门的网格比门洞略大一圈，用来画发光边缘；无缝门和门洞完全一样大
    const k = this.seamless ? [1, 1] : this.shape === 'rect' ? [1.02, 1.02] : [1.06, 1.03];
    this.mesh.scale.set(this.halfW * 2 * k[0], this.halfH * 2 * k[1], 1);
  }

  setSize(size) {
    this.size = size;
    this.halfW = PORTAL_HALF_W * size;
    this.halfH = PORTAL_HALF_H * size;
    this._resizeMesh();
  }

  place(position, normal, up, surface) {
    this.position.copy(position);
    this.normal.copy(normal).normalize();
    this.up.copy(up).normalize();
    this.right.crossVectors(this.up, this.normal).normalize();
    this.matrix.makeBasis(this.right, this.up, this.normal).setPosition(this.position);
    this.matrixInv.copy(this.matrix).invert();
    this.quaternion.setFromRotationMatrix(this.matrix);
    this.quaternionInv.copy(this.quaternion).invert();
    this.surface = surface;
    this.placed = true;
    this.openT = this.gateway ? 1 : 0;
    this.mesh.position.copy(position).addScaledVector(this.normal, this.seamless ? 0.0005 : 0.002);
    this.mesh.quaternion.copy(this.quaternion);
    this.mesh.updateMatrixWorld(true);
    this.mesh.visible = this.active && !this.exitOnly;
    this.light.position.copy(position).addScaledVector(this.normal, 0.4 * this.size);
  }

  remove() {
    this.placed = false;
    this.mesh.visible = false;
    this.light.intensity = 0;
    this.tunnel.clear();
  }

  setActive(on) {
    this.active = on;
    this.mesh.visible = on && this.placed && !this.exitOnly;
  }

  /** 这扇门现在能不能走进去（另一端存在并且开着） */
  get linked() {
    return this.placed && this.active && !this.exitOnly && this.other && this.other.placed && this.other.active;
  }

  signedDistance(p) {
    return (p.x - this.position.x) * this.normal.x + (p.y - this.position.y) * this.normal.y + (p.z - this.position.z) * this.normal.z;
  }

  toLocal(p, out) {
    return out.copy(p).applyMatrix4(this.matrixInv);
  }

  /** 局部坐标离门中心的“归一化距离”的平方：<=1 表示在门洞内 */
  norm(local) {
    const x = local.x / this.halfW;
    const y = local.y / this.halfH;
    if (this.shape === 'rect') return Math.max(x * x, y * y);
    return x * x + y * y;
  }

  /** 局部坐标是否落在门洞内（scale<1 表示收缩判定） */
  contains(local, scale = 1) {
    return this.norm(local) <= scale * scale;
  }

  /** 尺寸为 radius（半宽）、height（总高）的物体能不能整个钻过这扇门 */
  fits(radius, height) {
    if (Math.abs(this.normal.y) > 0.5) return radius <= Math.min(this.halfW, this.halfH) * 0.97;
    return radius <= this.halfW * 0.97 && height <= this.halfH * 2 * 0.98;
  }

  /** 兼容旧代码：标准尺寸椭圆门的判定 */
  static inEllipse(local, scale = 1) {
    const x = local.x / (PORTAL_HALF_W * scale);
    const y = local.y / (PORTAL_HALF_H * scale);
    return x * x + y * y <= 1;
  }

  update(dt, time) {
    if (!this.placed) return;
    this.openT = Math.min(1, this.openT + dt * 5);
    const t = this.openT;
    const eased = 1 - Math.pow(1 - t, 3);
    this.material.uniforms.open.value = eased;
    this.material.uniforms.time.value = time;
    this.light.intensity = this.gateway ? 0 : 3.5 * eased * Math.min(2, this.size);
  }
}
