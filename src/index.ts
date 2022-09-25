import { Server } from "socket.io";
import Robot, { createRobot } from "./models/robot";
import GameState from "./models/game-state";
import {
  getRobotAction,
  readRobotsFromFile,
  writeRobotCodeToFile,
  writeRobotToFile,
} from "./robot-repo/robot-fs";
import Projectile from "./models/projectile";





let robots: Robot[] = readRobotsFromFile();
let projectiles: Projectile[] = [];
let gameRunner: NodeJS.Timer | null = null;

console.log("initial robots", robots);


