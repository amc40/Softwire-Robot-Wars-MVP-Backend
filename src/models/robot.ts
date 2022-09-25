import { CreateRobotData } from "../server/server";
import { getRandomPosition } from "./play-area";

interface Robot {
  name: string;
  color: string;
  position: [number, number];
  turretAngle: number;
  hitPoints: number;
}

export function createRobot({ name, color }: CreateRobotData): Robot {
  return {
    name,
    color,
    position: getRandomPosition(),
    turretAngle: Math.random() * 2 * Math.PI,
    hitPoints: 100,
  };
}

export default Robot;
