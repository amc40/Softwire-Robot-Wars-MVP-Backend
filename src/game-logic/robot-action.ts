import GameState from "../models/game-state";
import { PhysicsObject } from "../models/physics-object";
import Projectile, { PROJECTILE_SPEED } from "../models/projectile";
import { GameRobot } from "../models/robot";
import { addVectors, getVector } from "../utils/vector";

export interface RobotAction {
  // TODO: either limit to one of rotateTank or moveTank, or try to simulate turning curved path
  rotateTurret: "clockwise" | "anticlockwise" | "none";
  rotateTank: "clockwise" | "anticlockwise" | "none";
  moveTank: "forwards" | "backwards" | "none";
  fire: boolean;
}

function processFire(robot: GameRobot, fire: boolean): Projectile | undefined {
  if (fire) {
    // add a projecile
    return {
      owner: {
        name: robot.name,
        color: robot.color,
      },
      position: [...robot.position],
      velocity: getVector(robot.turretAngle + robot.angle, PROJECTILE_SPEED),
    };
  }
  return undefined;
}

/**
 *
 * @param robot the robot to move
 * @param moveTank the movement to perform
 * @returns the Physics object represting the new position and velocity of the tank.
 */
function processMoveTank(
  robot: GameRobot,
  moveTank: RobotAction["moveTank"]
): PhysicsObject {
  const speed = 10;
  let velocity: [number, number] = [0, 0];
  if (moveTank === "forwards") {
    velocity = getVector(robot.angle, speed);
  } else if (moveTank === "backwards") {
    velocity = getVector(robot.angle + Math.PI, speed);
  }
  return {
    position: addVectors(velocity, robot.position),
    velocity,
  };
}

/**
 *
 * @return the new angle of the tank
 */
function processRotateTank(
  robot: GameRobot,
  rotateRobot: RobotAction["rotateTank"]
): number {
  const rotateAmount = Math.PI / 32;
  // TODO: ensure in range
  if (rotateRobot === "clockwise") {
    return robot.angle + rotateAmount;
  } else if (rotateRobot === "anticlockwise") {
    return robot.angle - rotateAmount;
  }
  return robot.angle;
}

/**
 *
 * @returns the new turret angle
 */
function processRotateTurret(
  robot: GameRobot,
  moveTurret: RobotAction["rotateTurret"]
): number {
  const rotateAmount = Math.PI / 16;
  // TODO: ensure in range
  if (moveTurret === "clockwise") {
    return robot.turretAngle + rotateAmount;
  } else if (moveTurret === "anticlockwise") {
    return robot.turretAngle - rotateAmount;
  }
  return robot.turretAngle;
}

export function processRobotAction(
  robot: GameRobot,
  { rotateTank, moveTank, rotateTurret, fire }: RobotAction
): {
  updatedRobot: GameRobot;
  projectile?: Projectile;
} {
  let projectile = processFire(robot, fire);

  // TODO: possibly make this neater
  const { position, velocity } = processMoveTank(robot, moveTank);
  // can only do one of move or rotate -- move takes precedence
  const angle =
    moveTank !== "none" ? processRotateTank(robot, rotateTank) : robot.angle;
  const turretAngle = processRotateTurret(robot, rotateTurret);

  return {
    updatedRobot: {
      ...robot,
      position,
      velocity,
      angle,
      turretAngle,
    },
    projectile,
  };
}

export type RobotActionSpecification = (gameState: GameState) => RobotAction;
