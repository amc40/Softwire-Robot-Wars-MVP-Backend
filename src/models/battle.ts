import { RobotRepo } from "../robot-repo/robot-fs";
import GameState from "./game-state";
import Robot from "./robot";

interface Battle {
  name?: string;
  participatingRobots: Robot[];
  gameState: GameState;
}


export function createBattle(robotRepo: RobotRepo): Battle {
  const participatingRobots =robotRepo.getRobots()
  return {
    participatingRobots,
    gameState: {
      robots: participatingRobots,
      projectiles: [],
    }
  };
}

export default Battle;
