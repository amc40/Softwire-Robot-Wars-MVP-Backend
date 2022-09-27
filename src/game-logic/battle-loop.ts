import GameState from "../models/game-state";
import Projectile from "../models/projectile";
import { GameRobot } from "../models/robot";
import { getRobotAction } from "../robot-repo/robot-fs";
import { processRobotAction } from "./robot-action";

/**
 *
 * @param currentGameState the current state of the game which the robot's code can inspect to inform its decision.
 * @return the gamestate after the robots have each acted once.
 */
export function battleLoop(currentGameState: GameState): GameState {
  // create copy so that later robots don't have the advantage of current round's info
  let updatedRobots: GameRobot[] = [];
  let newProjectiles: Projectile[] = [];
  // TODO: do collision detection
  for (let robot of currentGameState.robots) {
    const robotAction = getRobotAction(robot.name, currentGameState);
    const { updatedRobot, projectile } = processRobotAction(robot, robotAction);
    updatedRobots.push(updatedRobot);
    if (projectile) newProjectiles.push(projectile);
  }

  return {
    ...currentGameState,
    robots: updatedRobots,
    projectiles: [...currentGameState.projectiles, ...newProjectiles],
  };
}
