import { GameEvent } from "./game-event";
import Projectile from "./projectile";
import { GameRobot } from "./robot";

interface GameState {
  robots: GameRobot[];
  projectiles: Projectile[];
  gameEvents: GameEvent[];
  tickRate: number;
}

export default GameState;
