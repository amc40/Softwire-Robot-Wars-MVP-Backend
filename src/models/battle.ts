import GameState from "./game-state";
import Robot from "./robot";

interface Battle {
  name?: string;
  participatingRobots: Robot[];
  gameState: GameState;
}

export default Battle;
