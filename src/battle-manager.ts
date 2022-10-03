import { battleLoop } from "./game-logic/battle-loop";
import Battle from "./models/battle";
import { RobotWarsSocket } from "./server/server";

class BattleManager {
  static readonly GAME_STATE_MSG_INTERVAL_MS = 32.25;
  readonly GAME_STATE_MSG_INTERVAL_MS = BattleManager.GAME_STATE_MSG_INTERVAL_MS;
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
          //update clients with 2 gameStates to show dead player due to interpolating of gameStates
          //ideally we would send an update where losing player health was 0
          //or frontend will have to store list of players and infer loser
          clientSocket.emit("gameState", this.battle.gameState);
          clientSocket.emit("gameState", this.battle.gameState);
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

export default BattleManager;
