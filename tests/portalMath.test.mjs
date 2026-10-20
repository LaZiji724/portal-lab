// 传送门数学的单元测试：node --test tests/
import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { Portal } from '../src/portal/Portal.js';
import { computeTeleport, quaternionToLook, lookToQuaternion } from '../src/portal/portalMath.js';

const v = (x, y, z) => new THREE.Vector3(x, y, z);
const near = (a, b, eps = 1e-6) => assert.ok(a.distanceTo(b) < eps, `${a.toArray()} ≠ ${b.toArray()}`);

function pair() {
  const a = new Portal('blue');
  const b = new Portal('orange');
  a.other = b;
  b.other = a;
  a.place(v(0, 1.1, 0), v(0, 0, 1), v(0, 1, 0), null); // 墙上，朝 +Z
  b.place(v(10, 0, 5), v(0, 1, 0), v(0, 0, -1), null); // 地上，朝上
  computeTeleport(a, b, a.teleport, a.teleportQ);
  computeTeleport(b, a, b.teleport, b.teleportQ);
  return { a, b };
}

test('门中心互相对应', () => {
  const { a, b } = pair();
  near(a.position.clone().applyMatrix4(a.teleport), b.position);
  near(b.position.clone().applyMatrix4(b.teleport), a.position);
});

test('从入口门背面穿进去，会从出口门正面出来', () => {
  const { a, b } = pair();
  const behindA = a.position.clone().addScaledVector(a.normal, -0.5);
  const out = behindA.applyMatrix4(a.teleport);
  assert.ok(b.signedDistance(out) > 0.49);
});

test('速度大小守恒，方向跟着门转：撞进墙门的速度变成从地门向上', () => {
  const { a } = pair();
  const vel = v(0, 0, -7).applyQuaternion(a.teleportQ);
  near(vel, v(0, 7, 0), 1e-5);
  assert.ok(Math.abs(vel.length() - 7) < 1e-6);
});

test('来回穿两次回到原处（两个变换互逆）', () => {
  const { a, b } = pair();
  const p = v(0.3, 1.5, 0.8);
  near(p.clone().applyMatrix4(a.teleport).applyMatrix4(b.teleport), p, 1e-5);
});

test('四元数旋转与矩阵旋转一致', () => {
  const { a } = pair();
  const dir = v(0.2, -0.5, -1).normalize();
  const byQ = dir.clone().applyQuaternion(a.teleportQ);
  const m = new THREE.Matrix4().extractRotation(a.teleport);
  near(byQ, dir.clone().applyMatrix4(m), 1e-6);
});

test('视角拆分：yaw / pitch / roll 来回转换不丢信息', () => {
  for (const [yaw, pitch, roll] of [
    [0.3, 0.2, 0],
    [-2, -0.7, 0.4],
    [1.2, 1.1, -1.0],
  ]) {
    const q = lookToQuaternion(yaw, pitch, roll, new THREE.Quaternion());
    const r = quaternionToLook(q);
    const q2 = lookToQuaternion(r.yaw, r.pitch, r.roll, new THREE.Quaternion());
    assert.ok(Math.abs(Math.abs(q.dot(q2)) - 1) < 1e-6, `${[yaw, pitch, roll]} -> ${Object.values(r)}`);
  }
});

test('大小不同的两扇门：穿过去会按大小比例缩放，来回一次还原', () => {
  const a = new Portal('gate', { shape: 'rect', halfW: 1, halfH: 1.5 });
  const b = new Portal('gate', { shape: 'rect', halfW: 0.25, halfH: 0.375 });
  a.other = b;
  b.other = a;
  a.place(v(0, 1.5, 0), v(0, 0, 1), v(0, 1, 0), null);
  b.place(v(20, 0.375, 0), v(-1, 0, 0), v(0, 1, 0), null);
  const k = computeTeleport(a, b, a.teleport, a.teleportQ);
  computeTeleport(b, a, b.teleport, b.teleportQ);
  assert.ok(Math.abs(k - 0.25) < 1e-9);
  // 入口门边缘对应出口门边缘
  near(v(1, 1.5, 0).applyMatrix4(a.teleport), v(20, 0.375, -0.25), 1e-6);
  const p = v(0.4, 2.1, -0.3);
  near(p.clone().applyMatrix4(a.teleport).applyMatrix4(b.teleport), p, 1e-5);
});

test('矩形门与椭圆门的判定', () => {
  const r = new Portal('gate', { shape: 'rect', halfW: 1, halfH: 2 });
  const e = new Portal('blue');
  assert.ok(r.contains(v(0.95, 1.95, 0)));
  assert.ok(!r.contains(v(1.05, 0, 0)));
  assert.ok(!e.contains(v(0.6, 1.0, 0))); // 椭圆的角落在门外
  assert.ok(e.contains(v(0, 1.0, 0)));
});

test('能不能钻过门：巨人钻不过普通门，小人可以', () => {
  const e = new Portal('blue');
  e.place(v(0, 1.12, 0), v(0, 0, 1), v(0, 1, 0), null);
  assert.ok(e.fits(0.3, 1.8));
  assert.ok(!e.fits(0.66, 3.96));
  assert.ok(e.fits(0.135, 0.81));
});
