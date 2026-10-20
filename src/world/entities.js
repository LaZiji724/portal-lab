import * as THREE from 'three';
import { RAPIER, GROUPS } from '../core/physics.js';
import {
  CUBE_HALF,
  createCubeMesh,
  createButtonMesh,
  createDoorMesh,
  createExitMesh,
  createHazardMesh,
} from './entityVisuals.js';

const _v = new THREE.Vector3();

export class Cube {
  constructor(game, def) {
    this.game = game;
    this.def = def;
    this.spawn = new THREE.Vector3(...def.pos);
    this.prevPos = this.spawn.clone();
    this.body = game.world.createRigidBody(
      RAPIER.RigidBodyDesc.dynamic()
        .setTranslation(this.spawn.x, this.spawn.y, this.spawn.z)
        .setCcdEnabled(true)
        .setLinearDamping(0.05)
        .setAngularDamping(0.3)
    );
    this.collider = game.world.createCollider(
      RAPIER.ColliderDesc.cuboid(CUBE_HALF, CUBE_HALF, CUBE_HALF)
        .setDensity(60)
        .setFriction(0.7)
        .setRestitution(0.05)
        .setCollisionGroups(GROUPS.cube)
        .setActiveHooks(RAPIER.ActiveHooks.FILTER_CONTACT_PAIRS),
      this.body
    );
    game.colliderInfo.set(this.collider.handle, { kind: 'cube', cube: this });
    this.mesh = createCubeMesh();
    this.clone = createCubeMesh();
    this.clone.visible = false;
    game.levelGroup.add(this.mesh, this.clone);
    this.sync();
  }

  respawn() {
    this.body.setTranslation(this.spawn, true);
    this.body.setRotation({ x: 0, y: 0, z: 0, w: 1 }, true);
    this.body.setLinvel({ x: 0, y: 0, z: 0 }, true);
    this.body.setAngvel({ x: 0, y: 0, z: 0 }, true);
    this.prevPos.copy(this.spawn);
    this.sync();
  }

  get position() {
    const t = this.body.translation();
    return _v.set(t.x, t.y, t.z);
  }

  sync() {
    const t = this.body.translation();
    const r = this.body.rotation();
    this.mesh.position.set(t.x, t.y, t.z);
    this.mesh.quaternion.set(r.x, r.y, r.z, r.w);
  }
}

export class Button {
  constructor(game, def) {
    this.game = game;
    this.def = def;
    this.id = def.id ?? 'b1';
    this.pos = new THREE.Vector3(...def.pos);
    this.pressed = false;
    this.press = 0;
    const vis = createButtonMesh();
    this.group = vis.group;
    this.plunger = vis.plunger;
    this.plungerMat = vis.plungerMat;
    this.group.position.copy(this.pos);
    game.levelGroup.add(this.group);
    const body = game.world.createRigidBody(RAPIER.RigidBodyDesc.fixed().setTranslation(this.pos.x, this.pos.y + 0.08, this.pos.z));
    const col = game.world.createCollider(RAPIER.ColliderDesc.cylinder(0.08, 0.9).setCollisionGroups(GROUPS.world), body);
    game.colliderInfo.set(col.handle, { kind: 'button', button: this });
  }

  update(dt, cubes, player) {
    let on = false;
    for (const c of cubes) {
      const p = c.position;
      const dx = p.x - this.pos.x;
      const dz = p.z - this.pos.z;
      const dy = p.y - this.pos.y;
      if (dx * dx + dz * dz < 0.8 * 0.8 && dy > 0 && dy < 0.9) on = true;
    }
    const feet = player.position.y - 0.9;
    const dx = player.position.x - this.pos.x;
    const dz = player.position.z - this.pos.z;
    if (dx * dx + dz * dz < 0.75 * 0.75 && feet > this.pos.y - 0.05 && feet < this.pos.y + 0.45) on = true;
    if (on !== this.pressed) {
      this.pressed = on;
      this.game.audio?.play(on ? 'buttonDown' : 'buttonUp');
    }
    this.press += ((on ? 1 : 0) - this.press) * Math.min(1, dt * 12);
    this.plunger.position.y = 0.17 - 0.07 * this.press;
    this.plungerMat.color.setHex(on ? 0x146a1c : 0x8a1c14);
    this.plungerMat.emissive.setHex(on ? 0x30ff40 : 0xff2a10);
  }
}

export class Door {
  constructor(game, def) {
    this.game = game;
    this.def = def;
    this.requires = def.requires ?? [];
    this.size = def.size ?? [0.3, 3, 3];
    this.pos = new THREE.Vector3(...def.pos);
    this.open = 0;
    this.isOpen = false;
    const vis = createDoorMesh(this.size);
    this.group = vis.group;
    this.lightMat = vis.lightMat;
    this.group.position.copy(this.pos);
    game.levelGroup.add(this.group);
    this.body = game.world.createRigidBody(RAPIER.RigidBodyDesc.kinematicPositionBased().setTranslation(this.pos.x, this.pos.y, this.pos.z));
    this.collider = game.world.createCollider(
      RAPIER.ColliderDesc.cuboid(this.size[0] / 2, this.size[1] / 2, this.size[2] / 2).setCollisionGroups(GROUPS.world),
      this.body
    );
    game.colliderInfo.set(this.collider.handle, { kind: 'door', door: this });
  }

  update(dt, buttons) {
    const want = this.requires.length > 0 && this.requires.every((id) => buttons.some((b) => b.id === id && b.pressed));
    if (want !== this.isOpen) {
      this.isOpen = want;
      this.game.audio?.play(want ? 'doorOpen' : 'doorClose');
    }
    const target = want ? 1 : 0;
    if (this.open !== target) {
      const s = dt * 1.6;
      this.open = want ? Math.min(1, this.open + s) : Math.max(0, this.open - s);
      const y = this.pos.y + this.open * (this.size[1] - 0.15);
      this.group.position.y = y;
      this.body.setNextKinematicTranslation({ x: this.pos.x, y, z: this.pos.z });
    }
    this.collider.setEnabled(this.open < 0.95);
    this.lightMat.emissive.setHex(want ? 0x30ff40 : 0xff2010);
  }
}

export class Volume {
  constructor(def) {
    this.def = def;
    const p = def.pos;
    const s = def.size ?? [2, 2, 2];
    this.box = new THREE.Box3(new THREE.Vector3(p[0] - s[0] / 2, p[1] - s[1] / 2, p[2] - s[2] / 2), new THREE.Vector3(p[0] + s[0] / 2, p[1] + s[1] / 2, p[2] + s[2] / 2));
  }
  contains(p) {
    return this.box.containsPoint(p);
  }
}

export class Exit extends Volume {
  constructor(game, def) {
    super(def);
    this.group = createExitMesh(def.size ?? [2, 2.5, 2]);
    this.group.position.set(...def.pos);
    game.levelGroup.add(this.group);
  }
  update(time) {
    const beam = this.group.userData.beam;
    if (beam) beam.material.opacity = 0.06 + 0.04 * Math.sin(time * 3);
  }
}

export class Hazard extends Volume {
  constructor(game, def) {
    super(def);
    this.group = createHazardMesh(def.size ?? [4, 1, 4]);
    this.group.position.set(...def.pos);
    game.levelGroup.add(this.group);
  }
}
