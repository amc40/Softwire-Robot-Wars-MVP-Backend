import { CreateRobotData } from "..";
import { getRobotAction } from "../robot-repo/robot-fs";
import GameState, { getRandomPosition } from "./game-state";

interface Robot {
    name: string;
    color: string;
    position: [number, number];
    turretAngle: number;
    hitPoints: number;
}

export function createRobot({ name, color}: CreateRobotData): Robot {
    return {
        name,
        color,
        position: getRandomPosition(),
        turretAngle: Math.random() * 2 * Math.PI,
        hitPoints: 100,
    };
}

export interface RobotAction {
    moveTurret: "clockwise" | "anticlockwise" | "none";
    moveDirection: "up" | "right" | "down" | "left" | "none";
    fire: boolean;
}

export type RobotActionSpecification = (gameState: GameState) => RobotAction;

export default Robot;