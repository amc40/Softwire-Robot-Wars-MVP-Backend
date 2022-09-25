import { Server, Socket } from "socket.io";
import GameState from "../models/game-state";
import { createRobot } from "../models/robot";
import { readRobotsFromFile, writeRobotCodeToFile, writeRobotToFile } from "../robot-repo/robot-fs";

const SERVER_PORT = 3001;

export interface CreateRobotData {
  name: string;
  color: string;
  robotCode: string;
}

interface ClientToServerEvents {
  uploadRobot: (robot: CreateRobotData) => void;
  startBattle: () => void;
}

interface ServerToClientEvents {
  battleEnded: (winnerName?: string) => void;
  gameState: (gameState: GameState) => void;
  welcome: () => void;
}

interface InterServerEvents {}

interface SocketData {}

export type RobotWarsServer = Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;

export type RobotWarsSocket = Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>;

function createServer(): RobotWarsServer {
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
  }) as RobotWarsServer;
  io.on("connection", (socket) => {
    console.log("a user connected");
  
    socket.on("uploadRobot", (robotCreateData) => {
      console.log("trying to upload the robot", robotCreateData);
      const { name, color, robotCode } = robotCreateData;
      const robot = createRobot(robotCreateData);
      writeRobotToFile(robot);
      writeRobotCodeToFile(name, robotCode);
      robots = readRobotsFromFile();
    });
  
    socket.on("startBattle", () => {
      console.log("battle started");
      gameRunner = setInterval(, 50);

    });
  
  
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  
    socket.emit("welcome");
  });
  return io;
}




