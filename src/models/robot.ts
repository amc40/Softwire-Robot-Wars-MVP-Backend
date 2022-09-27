import { CreateRobotData } from "../server/server";
import { BoundingBox } from "./bounding-element";
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

export interface GameRobot extends Robot {
  position: [number, number];
  turretAngle: number;
  hitPoints: number;
}

export function createRobotGameInstance(robot: Robot): GameRobot {
  return {
    ...robot,
    position: getRandomPosition(),
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
