import { RobotRepo } from "../internal";
import { GameState } from "../internal";
import { createRobotGameInstance, Robot } from "../internal";

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
      robots: participatingRobots.map((participatingRobot: any) =>
        createRobotGameInstance(participatingRobot)
      ),
      projectiles: [],
    },
  };
}

export default Battle;
