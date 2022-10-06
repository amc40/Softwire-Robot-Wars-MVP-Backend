import { Server, Socket } from "socket.io";
import BattleManager from "../battle-manager";
import Battle, { createBattle } from "../models/battle";
import GameState from "../models/game-state";
import { createRobot, Robot } from "../models/robot";
import { readRobotsFromFile, RobotRepo, writeRobotCodeToFile, writeRobotToFile } from "../robot-repo/robot-fs";

const SERVER_PORT = 3001;

export interface CreateRobotData {
  name: string;
  color: string;
  robotCode: string;
}

interface BattleInfo {
  name?: string;
  participatingRobots: Robot[];
}

interface ClientToServerEvents {
  uploadRobot: (robot: CreateRobotData) => void;
  startBattle: () => void;
  subscribeToBattle: (battleId: string) => void;
  getAllRobots: () => void;
  getCurrentBattles: () => void;
}

interface ServerToClientEvents {
  battleEnded: (winnerName?: string) => void;
  gameState: (gameState: GameState) => void;
  welcome: () => void;
  battleInfo: (battleInfo: BattleInfo) => void;
  allRobots: Robot[],
  currentBattles: BattleInfo[];
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

export function createServer(robotRepo: RobotRepo): RobotWarsServer {
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
      robotRepo.addRobot(robotCreateData);
    });
  
    socket.on("startBattle", () => {
      console.log("battle started");
      const battle: Battle = createBattle(robotRepo);  
      const battleManager = new BattleManager(battle, [socket]);
      battleManager.startBattle();
      socket.emit("battleInfo", {
        participatingRobots: battleManager.getParticipatingRobots(),
      });
    });
  
  
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });

  });
  return io;
}




