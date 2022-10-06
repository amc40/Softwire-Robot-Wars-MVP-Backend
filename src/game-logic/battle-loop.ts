import GameState from "../models/game-state";
import Projectile, {
  PROJECTILE_DAMAGE,
  updateProjectile,
} from "../models/projectile";
import { GameRobot } from "../models/robot";
import { getRobotAction } from "../robot-repo/robot-fs";
import { callWithTimeout } from "../utils/timeout";
import { processRobotAction } from "./robot-action";

/**
 *
 * @param currentGameState the current state of the game which the robot's code can inspect to inform its decision.
 * @return the gamestate after the robots have each acted once.
 */
export async function battleLoop(
  currentGameState: GameState
): Promise<GameState> {
  // create copy so that later robots don't have the advantage of current round's info
  let updatedRobots: GameRobot[] = [];
  let newProjectiles: Projectile[] = [];
  // TODO: do collision detection
  for (let robot of currentGameState.robots) {
    try {
      const robotAction = getRobotAction(robot.name, currentGameState);
      const { updatedRobot, projectile } = await callWithTimeout(
        processRobotAction,
        500,
        [robot, robotAction]
      );
      updatedRobots.push(updatedRobot);
      if (projectile) newProjectiles.push(projectile);
    } catch (e) {
      // do not robot -- it is removed from the game#
      console.error(
        `robot ${robot} removed from game due to exception being thrown while getting the action`
      );
    }
  }

  let updatedProjectiles: Projectile[] = [];
  for (let projectile of currentGameState.projectiles) {
    const updatedProjectileInfo = updateProjectile(projectile, updatedRobots);
    if (updatedProjectileInfo.state === "in-flight") {
      updatedProjectiles.push(updatedProjectileInfo.updatedProjectile);
    } else if (updatedProjectileInfo.state === "hit") {
      const { robotHit } = updatedProjectileInfo;
      robotHit.hitPoints = Math.max(0, robotHit.hitPoints - PROJECTILE_DAMAGE);
      if (robotHit.hitPoints <= 0) {
        // robot is destroyed, remove it
        updatedRobots = updatedRobots.filter(
          (robot) => robot.name !== robotHit.name
        );
      }
    }
  }
  return {
    ...currentGameState,
    robots: updatedRobots,
    projectiles: [...updatedProjectiles, ...newProjectiles],
  };
}
