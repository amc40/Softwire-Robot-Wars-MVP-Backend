import GameState from "../models/game-state";
import Projectile, { PROJECTILE_SPEED } from "../models/projectile";
import { GameRobot } from "../models/robot";
import { getVector } from "../utils/vector";

export interface RobotAction {
  moveTurret: "clockwise" | "anticlockwise" | "none";
  moveDirection: "up" | "right" | "down" | "left" | "none";
  fire: boolean;
}

function processFire(robot: GameRobot, fire: boolean): Projectile | undefined {
  if (fire) {
    // add a projecile
    return {
      position: [...robot.position],
      velocity: getVector(robot.turretAngle, PROJECTILE_SPEED),
    };
  }
  return undefined;
}

function processMoveDirection(
  robot: GameRobot,
  moveDirection: RobotAction["moveDirection"]
): [number, number] {
  const moveAmount = 10;
  if (moveDirection === "up") {
    return [robot.position[0], robot.position[1] + moveAmount];
  } else if (moveDirection === "down") {
    return [robot.position[0], robot.position[1] - moveAmount];
  } else if (moveDirection === "right") {
    return [robot.position[0] + moveAmount, robot.position[1]];
  } else if (moveDirection === "left") {
    return [robot.position[0] - moveAmount, robot.position[1]];
  }
  return robot.position;
}

function rotateTurret(
  robot: GameRobot,
  moveTurret: RobotAction["moveTurret"]
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
  { moveDirection, moveTurret, fire }: RobotAction
): {
  updatedRobot: GameRobot;
  projectile?: Projectile;
} {
  let projectile = processFire(robot, fire);

  const newRobotPosition = processMoveDirection(robot, moveDirection);

  const newTurretAngle = rotateTurret(robot, moveTurret);

  return {
    updatedRobot: {
      ...robot,
      position: newRobotPosition,
      turretAngle: newTurretAngle,
    },
    projectile,
  };
}

export type RobotActionSpecification = (gameState: GameState) => RobotAction;
