import RAPIER from '@dimforge/rapier3d-compat';

let ready = null;

export function initPhysics() {
  if (!ready) ready = RAPIER.init();
  return ready;
}

export { RAPIER };

export const GROUP = {
  WORLD: 1 << 0,
  PLAYER: 1 << 1,
  CUBE: 1 << 2,
};

/** Rapier 的碰撞分组：高 16 位是“我属于谁”，低 16 位是“我和谁碰” */
export function groups(member, filter) {
  return ((member & 0xffff) << 16) | (filter & 0xffff);
}

export const GROUPS = {
  world: groups(GROUP.WORLD, 0xffff),
  player: groups(GROUP.PLAYER, GROUP.WORLD | GROUP.CUBE),
  cube: groups(GROUP.CUBE, GROUP.WORLD | GROUP.PLAYER | GROUP.CUBE),
  heldCube: groups(GROUP.CUBE, GROUP.WORLD | GROUP.CUBE),
};
