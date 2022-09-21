import Projectile from "./projectile";
import Robot from "./robot";

export const MAX_POSITION = 1000;

interface GameState {
    robots: Robot[];
    projectiles: Projectile[];
}

export default GameState;