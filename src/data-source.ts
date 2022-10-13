import { DataSource } from "typeorm";
import { Robot } from "./entity/Robot";

console.log(process.env.DATABASE_USERNAME);

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT) : 3306,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  logging: true,
  entities: [Robot],
  subscribers: [],
  migrations: [],
});
