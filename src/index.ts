import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import "reflect-metadata";
import { RobotRepo } from "./robot-repo/robot-fs";
import { createServer } from "./server/server";
import { AppDataSource } from "./data-source";
import { Robot } from "./entity/Robot";

// to initialize initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap
AppDataSource.initialize()
  .then(() => {
    // here you can start to work with your database
  })
  .catch((error) => console.error(error));

const test = async () => {
  const robot: Robot = new Robot();
  robot.color = "red";
  robot.name = "Fred";
  await AppDataSource.manager.save(robot);
  console.log("Robot has been saved. Photo id is", robot.id);
};

const robotRepo = new RobotRepo();
createServer(robotRepo);

test();
