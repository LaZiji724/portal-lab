import * as THREE from 'three';

export const PORTAL_HALF_W = 0.62;
export const PORTAL_HALF_H = 1.12;
/** 穿门时会临时关闭碰撞的“隧道”深度（门背后多深的墙体被忽略） */
export const TUNNEL_DEPTH = 2.2;

export const PORTAL_COLORS = {
  blue: new THREE.Color(0x1f8bff),
  orange: new THREE.Color(0xff7a12),
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
  uniform float time;
  uniform float open;
  uniform float linked;
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
    // 边缘带一点随时间流动的抖动，像能量场
    float wobble = 0.035 * (noise(vec2(ang * 3.0, time * 1.7)) - 0.5);
    float r = length(p) / max(open, 0.001) + wobble;
    if (r > 1.0) discard;

    vec3 col;
    if (linked > 0.5) {
      col = texture2D(map, gl_FragCoord.xy / resolution).rgb;
    } else {
      float swirl = noise(vec2(ang * 2.0 + time * 0.8 + r * 6.0, r * 4.0 - time));
      col = color * (0.25 + 0.6 * swirl) * (1.2 - r);
    }
    float rim = smoothstep(0.84, 0.97, r);
    float flick = noise(vec2(ang * 6.0, time * 3.0));
    col = mix(col, color * (2.2 + 2.5 * flick), rim);
    col += color * 0.35 * smoothstep(0.6, 0.9, r) * (1.0 - rim);
    gl_FragColor = vec4(col, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

export class Portal {
  constructor(color) {
    this.color = color;
    this.placed = false;
    this.fixed = false;
    this.other = null;
    this.position = new THREE.Vector3();
    this.normal = new THREE.Vector3(0, 0, 1);
    this.up = new THREE.Vector3(0, 1, 0);
    this.right = new THREE.Vector3(1, 0, 0);
    this.matrix = new THREE.Matrix4();
    this.matrixInv = new THREE.Matrix4();
    this.quaternion = new THREE.Quaternion();
    this.quaternionInv = new THREE.Quaternion();
    /** 穿越到另一扇门的变换（位置）与旋转 */
    this.teleport = new THREE.Matrix4();
    this.teleportQ = new THREE.Quaternion();
    this.surface = null; // 贴附的碰撞体
    this.tunnel = new Set(); // 门后需要临时关闭碰撞的碰撞体句柄
    this.openT = 0;

    this.material = new THREE.ShaderMaterial({
      uniforms: {
        map: { value: null },
        resolution: { value: new THREE.Vector2(1, 1) },
        color: { value: PORTAL_COLORS[color].clone() },
        time: { value: 0 },
        open: { value: 0 },
        linked: { value: 0 },
      },
      vertexShader,
      fragmentShader,
      polygonOffset: true,
      polygonOffsetFactor: -2,
      polygonOffsetUnits: -4,
    });
    this.mesh = new THREE.Mesh(new THREE.PlaneGeometry(PORTAL_HALF_W * 2.12, PORTAL_HALF_H * 2.06), this.material);
    this.mesh.visible = false;
    this.mesh.renderOrder = 1;
    this.mesh.userData.portal = this;
    this.light = new THREE.PointLight(PORTAL_COLORS[color], 0, 4, 2);
    this.light.castShadow = false;
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
    this.openT = 0;
    this.mesh.position.copy(position).addScaledVector(this.normal, 0.002);
    this.mesh.quaternion.copy(this.quaternion);
    this.mesh.updateMatrixWorld(true);
    this.mesh.visible = true;
    this.light.position.copy(position).addScaledVector(this.normal, 0.4);
  }

  remove() {
    this.placed = false;
    this.mesh.visible = false;
    this.light.intensity = 0;
    this.tunnel.clear();
  }

  get linked() {
    return this.placed && this.other && this.other.placed;
  }

  signedDistance(p) {
    return (p.x - this.position.x) * this.normal.x + (p.y - this.position.y) * this.normal.y + (p.z - this.position.z) * this.normal.z;
  }

  toLocal(p, out) {
    return out.copy(p).applyMatrix4(this.matrixInv);
  }

  /** 局部坐标是否落在椭圆门洞内（scale<1 表示收缩判定） */
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
    this.light.intensity = 3.5 * eased;
  }
}
