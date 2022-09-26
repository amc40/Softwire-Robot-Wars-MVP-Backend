import { RobotRepo } from "./robot-repo/robot-fs";
import { createServer } from "./server/server";

const robotRepo = new RobotRepo();
createServer(robotRepo);