import { doesCircleCollideWithBox } from "../game-logic/collision-detection";
import { addVectors } from "../utils/vector";
import { BoundingCircle } from "./bounding-element";
import { PhysicsObject } from "./physics-object";
import { PLAY_AREA_BOUNDS } from "./play-area";
import {
  GameRobot,
  getRobotBoundingBox,
  Robot,
  ROBOT_MAX_HITPOINTS,
} from "./robot";

interface Projectile extends PhysicsObject {
  owner: Robot;
}

export const PROJECTILE_RADIUS = 3;
export const PROJECTILE_SPEED = 20;
export const PROJECTILE_DAMAGE = ROBOT_MAX_HITPOINTS / 5;

export function getProjectileBoundingCircle(
  projectile: Projectile
): BoundingCircle {
  return {
    ...projectile.position,
    radius: PROJECTILE_RADIUS,
  };
}

type ProjectileState =
  | {
      state: "hit";
      robotHit: GameRobot;
    }
  | {
      state: "left-play-area";
    }
  | {
      state: "in-flight";
      updatedProjectile: Projectile;
    };

/**
 * @return the updated projectile or null if it has
 */
export function updateProjectile(
  originalProjectile: Projectile,
  gameRobots: GameRobot[]
): ProjectileState {
  const position = addVectors(
    originalProjectile.position,
    originalProjectile.velocity
  );
  const projectile: Projectile = {
    ...originalProjectile,
    position,
  };
  // check if hit any robot
  // TODO: check if hit self
  const projectileBounds = getProjectileBoundingCircle(projectile);
  const robotHit = gameRobots.find((gameRobot) => {
    const robotBounds = getRobotBoundingBox(gameRobot);
    return doesCircleCollideWithBox(projectileBounds, robotBounds);
  });
  if (robotHit != null && robotHit.name !== projectile.owner.name) {
    return {
      state: "hit",
      robotHit,
    };
  }
  // check if left play area
  if (!doesCircleCollideWithBox(projectileBounds, PLAY_AREA_BOUNDS)) {
    return {
      state: "left-play-area",
    };
  }

  return {
    state: "in-flight",
    updatedProjectile: projectile,
  };
}

export default Projectile;
