import * as fs from "fs";
import { addAbortSignal } from "stream";
import {
  RobotAction,
  RobotActionSpecification,
} from "../game-logic/robot-action";
import GameState from "../models/game-state";
import Robot from "../models/robot";

const encoding = "utf8";

function getRobotCodeFilepath(robotName: string) {
  return `./robots/code/${robotName}.js`;
}

function getBaseRobotFilepath() {
  return "./robots";
}

function getRequireRobotCodeFilepath(robotName: string) {
  return `../../robots/code/${robotName}.js`;
}

function getRobotFilepath(robotName: string) {
  return `${getBaseRobotFilepath()}/${robotName}.json`;
}

export function writeRobotToFile(robot: Robot) {
  fs.writeFile(getRobotFilepath(robot.name), JSON.stringify(robot), (err) => {
    if (err) {
      throw `Could not write robot code to file: ${err}`;
    }
  });
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

export function getRobotAction(
  robotName: string,
  gameState: GameState
): RobotAction {
  const robotActionSpecification = require(getRequireRobotCodeFilepath(
    robotName
  )) as RobotActionSpecification;
  return robotActionSpecification(gameState);
}
