import Projectile from "./projectile";
import Robot from "./robot";

interface GameState {
  robots: Robot[];
  projectiles: Projectile[];
}

export default GameState;
