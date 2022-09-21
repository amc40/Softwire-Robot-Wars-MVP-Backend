import GameState from "./game-state";

interface Robot {
    name: string;
    color: string;
    position: [number, number];
    turretAngle: number;
    hitPoints: number;
}

export interface RobotAction {
    moveTurret: "clockwise" | "anticlockwise" | "none";
    moveDirection: "up" | "right" | "down" | "left" | "none";
    fire: boolean;
}

export type RobotActionSpecification = (gameState: GameState) => RobotAction;

export default Robot;