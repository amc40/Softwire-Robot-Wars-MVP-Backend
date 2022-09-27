import { RobotRepo } from "../robot-repo/robot-fs";
import GameState from "./game-state";
import { createRobotGameInstance, Robot } from "./robot";

interface Battle {
  name?: string;
  participatingRobots: Robot[];
  gameState: GameState;
}

export function createBattle(robotRepo: RobotRepo): Battle {
  const participatingRobots = robotRepo.getRobots();
  return {
    participatingRobots,
    gameState: {
      robots: participatingRobots.map((participatingRobot) =>
        createRobotGameInstance(participatingRobot)
      ),
      projectiles: [],
    },
  };
}

export default Battle;
