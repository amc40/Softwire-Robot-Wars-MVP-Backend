//index
export * from "./models/robot";
export * from "./models/game-state";
export {RobotAction, RobotActionSpecification} from "./game-logic/robot-action";
export * from "./robot-repo/robot-fs";
//server
export {BattleManager} from "./battle-manager";
export {createBattle} from "./models/battle";

export { createRobot } from "./models/robot";

export { readRobotsFromFile, RobotRepo, writeRobotCodeToFile, writeRobotToFile } from "./robot-repo/robot-fs";

//battle-manager
export * from "./game-logic/battle-loop";
export {Battle} from "./models/battle";


export * from "./server/server";


//battle-loop
export {GameState} from "./models/game-state";
export {Projectile} from "./models/projectile";
export * from "./models/projectile";

export * from "./robot-repo/robot-fs";
export * from "./game-logic/robot-action";

//collision-detection
export {BoundingBox, BoundingCircle} from "./models/bounding-element";

//robot-actions
export { PhysicsObject } from "./models/physics-object";
export * from "./models/projectile";
export * from "./models/robot";
export * from "./utils/vector";

//battle
export * from "./robot-repo/robot-fs";
export {GameState} from "./models/game-state";
export { createRobotGameInstance, Robot } from "./models/robot";

//game-state
export * from "./models/projectile";
export * from "./models/robot";

//play-area
export * from "./models/bounding-element";

//projectile
export { doesCircleCollideWithBox } from "./game-logic/collision-detection";
export { addVectors } from "./utils/vector";
export { BoundingCircle } from "./models/bounding-element";
export { PhysicsObject } from "./models/physics-object";
export { PLAY_AREA_BOUNDS } from "./models/play-area";
export {
  GameRobot,
  getRobotBoundingBox,
  Robot,
  ROBOT_MAX_HITPOINTS,
} from "./models/robot";

//robot
export { CreateRobotData } from "./server/server";
export { BoundingBox } from "./models/bounding-element";
export { PhysicsObject } from "./models/physics-object";
export { getRandomAngle, getRandomPosition } from "./models/play-area";

//robot-fs
export {
  RobotAction,
  RobotActionSpecification,
} from "./game-logic/robot-action";
export { GameState } from "./models/game-state";
export { createRobot, Robot } from "./models/robot";
export { CreateRobotData } from "./server/server";



// //index
// export * from "./robot-repo/robot-fs";
// export * from "./server/server";

// //battle-manager
// export * from "./game-logic/battle-loop";
// export {Battle} from "./models/battle";
// export * from "./server/server";

// //server
// export {BattleManager} from "./battle-manager";
// export {createBattle} from "./models/battle";
// export * from "./models/game-state";
// export { createRobot } from "./models/robot";
// export { readRobotsFromFile, RobotRepo, writeRobotCodeToFile, writeRobotToFile } from "./robot-repo/robot-fs";


// //battle-loop
// export {GameState} from "./models/game-state";
// export {Projectile} from "./models/projectile";
// export * from "./models/projectile";
// export * from "./models/robot";
// export * from "./robot-repo/robot-fs";
// export * from "./game-logic/robot-action";

// //collision-detection
// export {BoundingBox, BoundingCircle} from "./models/bounding-element";

// //robot-actions
// export { PhysicsObject } from "./models/physics-object";
// export * from "./models/projectile";
// export * from "./models/robot";
// export * from "./utils/vector";

// //battle
// export * from "./robot-repo/robot-fs";
// export {GameState} from "./models/game-state";
// export { createRobotGameInstance, Robot } from "./models/robot";

// //game-state
// export * from "./models/projectile";
// export * from "./models/robot";

// //play-area
// export * from "./models/bounding-element";

// //projectile
// export { doesCircleCollideWithBox } from "./game-logic/collision-detection";
// export { addVectors } from "./utils/vector";
// export { BoundingCircle } from "./models/bounding-element";
// export { PhysicsObject } from "./models/physics-object";
// export { PLAY_AREA_BOUNDS } from "./models/play-area";
// export {
//   GameRobot,
//   getRobotBoundingBox,
//   Robot,
//   ROBOT_MAX_HITPOINTS,
// } from "./models/robot";

// //robot
// export { CreateRobotData } from "./server/server";
// export { BoundingBox } from "./models/bounding-element";
// export { PhysicsObject } from "./models/physics-object";
// export { getRandomAngle, getRandomPosition } from "./models/play-area";

// //robot-fs
// export {
//   RobotAction,
//   RobotActionSpecification,
// } from "./game-logic/robot-action";
// export { GameState } from "./models/game-state";
// export { createRobot, Robot } from "./models/robot";
// export { CreateRobotData } from "./server/server";

