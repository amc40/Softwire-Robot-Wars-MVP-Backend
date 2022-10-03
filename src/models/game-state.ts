import Projectile from "./projectile";
import { GameRobot } from "./robot";

interface GameState {
  robots: GameRobot[];
  projectiles: Projectile[];
  tickRate: number;
}

export default GameState;
