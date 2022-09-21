import fs from "fs";
import GameState from "../models/game-state";
import { RobotAction, RobotActionSpecification } from "../models/robot";

function getRobotFilepath(robotName: string) {
    return `./src/robots/${robotName}.js`;
}

export function writeRobotCodeToFile(robotCode: string, robotName: string) {
    // TODO: handle duplicate robots with the same namae
    fs.writeFile(getRobotFilepath(robotName), robotCode, err => {
        if (err) {
            throw `Could not write to file: ${err}`;
        }
        
    });
}

export function getRobotAction(robotName: string, gameState: GameState): RobotAction {
    const files= fs.readdir("./", err => { if (err) console.log(`readdir err msg: ${err}`)});
    console.log(`files: ${files}`); // array of file names
    const robotActionSpecification = require(getRobotFilepath(robotName)) as RobotActionSpecification;
    return robotActionSpecification(gameState);
}
