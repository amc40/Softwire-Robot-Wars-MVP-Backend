import { Server } from "socket.io";
import Robot, { createRobot } from "./models/robot";
import GameState, { MAX_POSITION } from "./models/game-state";
import {
  getRobotAction,
  readRobotsFromFile,
  writeRobotCodeToFile,
  writeRobotToFile,
} from "./robot-repo/robot-fs";
import Projectile from "./models/projectile";

const SERVER_PORT = 3001;

export interface CreateRobotData {
  name: string;
  color: string;
  robotCode: string;
}

interface ClientToServerEvents {
  uploadRobot: (robot: CreateRobotData) => void;
  startBattle: () => void;
  resetBots: () => void;
}

interface ServerToClientEvents {
  battleEnded: (winnerName?: string) => void;
  gameState: (gameState: GameState) => void;
  welcome: () => void;
}

interface InterServerEvents {}

interface SocketData {}

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(SERVER_PORT, {
  cors: {
    origin: "*",
    methods: ["GET"],
  },
});

let robots: Robot[] = readRobotsFromFile();
let projectiles: Projectile[] = [];
let gameRunner: NodeJS.Timer | null = null;

console.log("initial robots", robots);

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("uploadRobot", (robotCreateData) => {
    console.log("trying to upload the robot", robotCreateData);
    const { name, color, robotCode } = robotCreateData;
    const robot = createRobot(robotCreateData);
    writeRobotToFile(robot);
    writeRobotCodeToFile(name, robotCode);
    robots.push(robot);
  });

  socket.on("startBattle", () => {
    console.log("receive startBattle");
    if(gameRunner == null) {
        gameRunner = setInterval(() => {
      // create copy so that later robots don't have the advantage of current round's info
      const gameState: GameState = {
        robots: [...robots],
        projectiles: [...projectiles],
      };
      for (let robot of robots) {
        const { moveDirection, moveTurret, fire } = getRobotAction(
          robot.name,
          gameState
        );
        // TODO: spawn projecile on fire
        const moveAmount = 1;
        if (moveDirection === "up") {
          robot.position = [robot.position[0], robot.position[1] + moveAmount];
        } else if (moveDirection === "down") {
          robot.position = [robot.position[0], robot.position[1] - moveAmount];
        } else if (moveDirection === "right") {
          robot.position = [robot.position[0] + moveAmount, robot.position[1]];
        } else if (moveDirection === "left") {
          robot.position = [robot.position[0] - moveAmount, robot.position[1]];
        }

        const rotateAmount = Math.PI / 16;
        // TODO: ensure in range
        if (moveTurret === "clockwise") {
          robot.turretAngle += rotateAmount;
        } else if (moveTurret === "anticlockwise") {
          robot.turretAngle -= rotateAmount;
        }
      }
      if (robots.length < 2) {
        socket.emit("battleEnded", robots[0]?.name);
        console.log("battle ended");
        clearInterval(gameRunner ?? -1);
      }
      socket.emit("gameState", gameState);
    }, 50);
    console.log("battle started");
}
  });

  // socket.on("gameState", msg => {
  //    // TODO: return the state of the game
  // });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("resetBots", () => {
    console.log("reset bots");
    robots = readRobotsFromFile();
  });

  socket.emit("welcome");
});
