import { Projectile } from "../internal";
import { GameRobot } from "../internal";

interface GameState {
  robots: GameRobot[];
  projectiles: Projectile[];
}

export default GameState;
