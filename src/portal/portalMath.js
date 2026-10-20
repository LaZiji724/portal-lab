import * as THREE from 'three';

// 绕门的局部 Y 轴旋转 180°：从入口门“背面”出来变成从出口门“正面”出来
const FLIP = new THREE.Matrix4().makeRotationY(Math.PI);
const FLIP_Q = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI);

/**
 * 计算从门 a 穿越到门 b 的刚体变换：T = Mb · R(π) · Ma⁻¹
 * 位置用 out 矩阵变换，方向（速度、朝向）只用旋转部分 outQ。
 */
export function computeTeleport(a, b, out, outQ) {
  out.multiplyMatrices(b.matrix, FLIP).multiply(a.matrixInv);
  outQ.copy(b.quaternion).multiply(FLIP_Q).multiply(a.quaternionInv);
  return out;
}

const _plane = new THREE.Plane();
const _clip = new THREE.Vector4();
const _q = new THREE.Vector4();

/**
 * 斜裁剪近平面（Eric Lengyel 方法）。
 * 把投影矩阵的近平面换成出口门所在平面，门背后的墙体就不会挡住视线。
 * planeNormal 指向需要保留的一侧。
 */
export function applyObliqueClip(camera, planeNormal, planePoint) {
  _plane.setFromNormalAndCoplanarPoint(planeNormal, planePoint).applyMatrix4(camera.matrixWorldInverse);
  // 相机离平面太近时斜裁剪会退化，此时直接用普通投影（门后只剩墙体背面，会被背面剔除）
  if (Math.abs(_plane.constant) < 0.02) return false;
  if (_plane.constant > 0) return false; // 相机在保留侧，说明这个视角本来就看不到门
  _clip.set(_plane.normal.x, _plane.normal.y, _plane.normal.z, _plane.constant);
  const e = camera.projectionMatrix.elements;
  _q.x = (Math.sign(_clip.x) + e[8]) / e[0];
  _q.y = (Math.sign(_clip.y) + e[9]) / e[5];
  _q.z = -1.0;
  _q.w = (1.0 + e[10]) / e[14];
  _clip.multiplyScalar(2.0 / _clip.dot(_q));
  e[2] = _clip.x;
  e[6] = _clip.y;
  e[10] = _clip.z + 1.0;
  e[14] = _clip.w;
  camera.projectionMatrixInverse.copy(camera.projectionMatrix).invert();
  return true;
}

const _f = new THREE.Vector3();
const _u = new THREE.Vector3();
const _u0 = new THREE.Vector3();
const _c = new THREE.Vector3();
const _e = new THREE.Euler();
const _q0 = new THREE.Quaternion();
const MAX_PITCH = THREE.MathUtils.degToRad(89.5);

/**
 * 把任意朝向的相机四元数拆成 yaw / pitch / roll（YXZ 顺序）。
 * 穿过地面门→墙面门后，相机可能是歪的，roll 之后会被平滑归零。
 */
export function quaternionToLook(q) {
  _f.set(0, 0, -1).applyQuaternion(q);
  _u.set(0, 1, 0).applyQuaternion(q);
  let yaw;
  if (Math.abs(_f.y) < 0.999) yaw = Math.atan2(-_f.x, -_f.z);
  else if (_f.y < 0) yaw = Math.atan2(-_u.x, -_u.z);
  else yaw = Math.atan2(_u.x, _u.z);
  const pitch = THREE.MathUtils.clamp(Math.asin(THREE.MathUtils.clamp(_f.y, -1, 1)), -MAX_PITCH, MAX_PITCH);
  _q0.setFromEuler(_e.set(pitch, yaw, 0, 'YXZ'));
  _u0.set(0, 1, 0).applyQuaternion(_q0);
  _c.crossVectors(_u0, _u);
  // 绕“向后”轴（局部 +Z）的转角，与 Euler 的 z 分量同号
  _f.multiplyScalar(-1);
  const roll = Math.atan2(_c.dot(_f), _u0.dot(_u));
  return { yaw, pitch, roll };
}

export function lookToQuaternion(yaw, pitch, roll, out) {
  return out.setFromEuler(_e.set(pitch, yaw, roll, 'YXZ'));
}

export { MAX_PITCH };
