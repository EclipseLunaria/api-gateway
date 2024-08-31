import { DataSource } from "typeorm";
import { Chapters, MangaMetadata } from "./entities";
import { config } from "dotenv";
config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [Chapters, MangaMetadata],
  subscribers: [],
  migrations: [],
});

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected successfully");
    // here you can start to work with your database
  })
  .catch((error) => console.log(error));
