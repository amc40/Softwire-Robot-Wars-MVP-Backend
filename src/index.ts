import { Server } from "socket.io";
import Robot from "./models/robot";
import GameState, { MAX_POSITION } from "./models/game-state";
import { getRobotAction, writeRobotCodeToFile } from "./robot-repo/robot-fs";
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
}

interface ServerToClientEvents {
    battleEnded: (winnerName?: string) => void;
    gameState: (gameState: GameState) => void;
    welcome: () => void; 
}

interface InterServerEvents {

}

interface SocketData {

}

const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(SERVER_PORT, {
    cors: {
      origin: "*",
      methods: ["GET"],
    }
  });

let robots: Robot[] = [];
let projectiles: Projectile[] = [];
let gameRunner: NodeJS.Timer | null = null;

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on("uploadRobot", robot => {
        const { name, color, robotCode } = robot; 
        writeRobotCodeToFile(robotCode, name);
        console.log("trying to upload the robot", robot);
        robots.push({
            name,
            color,
            position: [Math.floor(Math.random() * MAX_POSITION), Math.floor(Math.random() * MAX_POSITION)],
            turretAngle: 0,
            hitPoints: 100,
        });
    });

    socket.on("startBattle", () => {
        console.log("battle started");
        gameRunner = setInterval(() => {
            // create copy so that later robots don't have the advantage of current round's info
            const gameState: GameState = {
                robots: [...robots],
                projectiles: [...projectiles],
            }
            for (let robot of robots) {
                
                const { moveDirection, moveTurret, fire } = getRobotAction(robot.name, gameState);
                // TODO: spawn projecile on fire
                const moveAmount = 10;
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
        }, 50);
        console.log("battle started");
    });

    // socket.on("gameState", msg => {
    //    // TODO: return the state of the game 
    // });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });

    socket.emit("welcome");

});

