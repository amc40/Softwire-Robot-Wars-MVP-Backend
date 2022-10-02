import { Server, Socket } from "socket.io";
// import {BattleManager} from "../internal";
import {Battle, createBattle } from "../internal";
import {GameState} from "../internal";
import { createRobot } from "../internal";
import { readRobotsFromFile, RobotRepo, writeRobotCodeToFile, writeRobotToFile } from "../internal";


import { battleLoop } from "../internal";


class BattleManager {
  readonly GAME_STATE_MSG_INTERVAL_MS = 32.25;
  readonly GAME_SIMULATION_INTERVAL_MS = this.GAME_STATE_MSG_INTERVAL_MS;
  battle: Battle;
  subscribedClientSockets: RobotWarsSocket[];
  gameRunner: NodeJS.Timer | null = null;
  gameStateUpdateRunner: NodeJS.Timer | null = null;

  constructor(battle: Battle, subscribedClientSockets: RobotWarsSocket[] = []) {
    this.battle = battle;
    this.subscribedClientSockets = subscribedClientSockets;
  }

  startBattle() {
    // send an update of the game state to each of the subscribed clients periodically
    this.gameStateUpdateRunner = setInterval(() => {
      for (let clientSocket of this.subscribedClientSockets) {
        clientSocket.emit("gameState", this.battle.gameState);
      }
    }, this.GAME_STATE_MSG_INTERVAL_MS);

    this.gameRunner = setInterval(() => {
      const newGameState = battleLoop(this.battle.gameState);
      this.battle.gameState = newGameState;
      if (newGameState.robots.length < 2) {
        for (let clientSocket of this.subscribedClientSockets) {
          clientSocket.emit("battleEnded", newGameState.robots[0]?.name);
          console.log("battle ended");
          clearInterval(this.gameRunner ?? -1);
          clearInterval(this.gameStateUpdateRunner ?? -1);
        }
      }
    }, this.GAME_SIMULATION_INTERVAL_MS);
  }

  handleUnsubscribe(clientSocketToUnsubscribe: RobotWarsSocket) {
    this.subscribedClientSockets = this.subscribedClientSockets.filter(
      (clientSocket) => clientSocket.id !== clientSocketToUnsubscribe.id
    );
  }

  handleDisconnect(clientSocketToUnsubscribe: RobotWarsSocket) {
    this.handleUnsubscribe(clientSocketToUnsubscribe);
  }
}

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
    });
  
  
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });

  });
  return io;
}




