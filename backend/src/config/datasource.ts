// import dotenv from "dotenv";
// import path from "node:path";
import { DataSource } from "typeorm";
// import { Migration1721926264177 } from "../database/migrations/1721926264177-migration";

// const envFile =
//   process.env.NODE_ENV === "production" ? ".env.prod" : ".env.dev";

// dotenv.config({ path: path.join(__dirname, "../../..") });

const {DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME} = process.env

const dataSource = new DataSource({
  type: "postgres",
  //   url: "postgres://postgres:wildrent@db:5432/postgres",
  host: DB_HOST,
  //   host: "localhost",
  port: DB_PORT ? parseInt(DB_PORT, 10) : undefined,
  //   port: 5434,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  entities: ["src/entities/*.ts"],
  synchronize: false,
  logging: ["error", "query"],
  migrations: ["src/database/migrations/*.ts"], // Déterminer à quel endroit on enregistre les fichiers de migrations afin de pouvoir les relire.
  //   migrations: [path.join(__dirname, '../database/migrations/*.ts')],
  //   migrations: [Migration1721926264177],
  migrationsRun: true // Assure l'application des migrations non encore appliquées à chaque connexion à la base de données.
});

export default dataSource;
