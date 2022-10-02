import { CreateRobotData } from "../server/server";
import { BoundingBox } from "./bounding-element";
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
    velocity: [0, 0],
    turretAngle: getRandomAngle(),
    hitPoints: ROBOT_MAX_HITPOINTS,
  };
}

export function getRobotBoundingBox(gameRobot: GameRobot): BoundingBox {
  return {
    x: gameRobot.position[0],
    y: gameRobot.position[1],
    width: ROBOT_WIDTH,
    height: ROBOT_HEIGHT,
  };
}
