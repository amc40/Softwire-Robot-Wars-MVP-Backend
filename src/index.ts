import { RobotRepo } from "./internal";
import { createServer } from "./internal";

const robotRepo = new RobotRepo();
createServer(robotRepo);