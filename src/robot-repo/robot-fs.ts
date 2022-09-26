import * as fs from "fs";
import {
  RobotAction,
  RobotActionSpecification,
} from "../game-logic/robot-action";
import GameState from "../models/game-state";
import Robot, { createRobot } from "../models/robot";
import { CreateRobotData } from "../server/server";


function getBaseRobotFilepath() {
  return "./robots";
}

function getRobotCodeBaseFilepath() {
    return `${getBaseRobotFilepath()}/code`
}

function getRobotCodeFilepath(robotName: string) {
  return `${getRobotCodeBaseFilepath()}/${robotName}.js`;
}


function getRequireRobotCodeFilepath(robotName: string) {
  return `../../robots/code/${robotName}.js`;
}

function getRobotFilepath(robotName: string) {
  return `${getBaseRobotFilepath()}/${robotName}.json`;
}

export function writeRobotToFile(robot: Robot) {
  fs.writeFileSync(getRobotFilepath(robot.name), JSON.stringify(robot));
}

export function readRobotsFromFile(): Robot[] {
  const files = fs.readdirSync(getBaseRobotFilepath());
  const robotFiles = files.filter((file) => file.match(".json$"));
  const robots = robotFiles.map((robotFile) => {
    try {
      return JSON.parse(
        fs.readFileSync(`${getBaseRobotFilepath()}/${robotFile}`, {
          encoding: "utf-8",
        })
      ) as Robot;
    } catch (e) {
      console.error(e);
      return undefined;
    }
  });
  return robots.filter((robot) => robot != null) as Robot[];
}

export function writeRobotCodeToFile(robotName: string, robotCode: string) {
  // TODO: handle duplicate robots with the same name
  fs.writeFile(getRobotCodeFilepath(robotName), robotCode, (err) => {
    if (err) {
      throw `Could not write robot code to file: ${err}`;
    }
  });
}

function createRobotDirsIfNotExist() {
    if(!fs.existsSync(getBaseRobotFilepath())){
        fs.mkdirSync(getBaseRobotFilepath());
    }
    if (!fs.existsSync(getRobotCodeBaseFilepath())) {
        fs.mkdirSync(getRobotCodeBaseFilepath());
    }
}

export function getRobotAction(
  robotName: string,
  gameState: GameState
): RobotAction {
  const robotActionSpecification = require(getRequireRobotCodeFilepath(
    robotName
  )) as RobotActionSpecification;
  return robotActionSpecification(gameState);
}

export class RobotRepo {
    robots: Robot[];

    constructor() {
        createRobotDirsIfNotExist();
        this.robots = readRobotsFromFile();
    }

    addRobot(createRobotData: CreateRobotData) {
        const { name, color, robotCode } = createRobotData;
        const robot = createRobot(createRobotData);
        writeRobotToFile(robot);
        writeRobotCodeToFile(name, robotCode);
        // TODO: don't refetch them all
        this.robots = readRobotsFromFile();
        console.log("new robots", this.robots);
    }

    getRobots() {
        return this.robots;
    }

}