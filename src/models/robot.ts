import { CreateRobotData } from "../server/server";
import { BoundingBox, BoundingCircle } from "./bounding-element";
import { PhysicsObject } from "./physics-object";
import { getRandomAngle, getRandomPosition } from "./play-area";

export interface Robot {
  name: string;
  color: string;
}

export function createRobot(createRobotData: CreateRobotData): Robot {
  return createRobotData;
}

export const ROBOT_MAX_HITPOINTS = 100;
const ROBOT_WIDTH = 25;
const ROBOT_HEIGHT = 35;
const ROBOT_RADIUS = 1;
export const ROBOT_BARREL_LENGTH = 32;

export interface GameRobot extends Robot, PhysicsObject {
  angle: number;
  turretAngle: number;
  hitPoints: number;
}

export function createRobotGameInstance(robot: Robot): GameRobot {
  return {
    ...robot,
    angle: getRandomAngle(),
    position: getRandomPosition(),
    velocity: { x: 0, y: 0 },
    turretAngle: getRandomAngle(),
    hitPoints: ROBOT_MAX_HITPOINTS,
  };
}

export function getRobotBoundingBox(gameRobot: GameRobot): BoundingBox {
  return {
    ...gameRobot.position,
    width: ROBOT_WIDTH,
    height: ROBOT_HEIGHT,
  };
}

export function getRobotBoundingCircle(gameRobot: GameRobot): BoundingCircle {
  return {
    ...gameRobot.position,
    radius: ROBOT_RADIUS
  };
}
