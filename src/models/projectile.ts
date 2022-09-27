import { BoundingCircle } from "./bounding-element";
import { ROBOT_MAX_HITPOINTS } from "./robot";

interface Projectile {
  position: [number, number];
  velocity: [number, number];
}

export const PROJECTILE_RADIUS = 3;
export const PROJECTILE_SPEED = 20;
export const PROJECTILE_DAMAGE = ROBOT_MAX_HITPOINTS / 20;

export function getProjectileBoundingCircle(
  projectile: Projectile
): BoundingCircle {
  return {
    x: projectile.position[0],
    y: projectile.position[1],
    radius: PROJECTILE_RADIUS,
  };
}

export default Projectile;
