import Projectile from "./projectile";
import Robot from "./robot";

export const MAX_POSITION = 1000;

interface GameState {
    robots: Robot[];
    projectiles: Projectile[];
}

export function getRandomPosition(): [number, number] {
    return [Math.floor(Math.random() * MAX_POSITION), Math.floor(Math.random() * MAX_POSITION)];
}

export default GameState;