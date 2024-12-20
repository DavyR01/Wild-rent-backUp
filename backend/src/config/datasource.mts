// import path from "path";
import { DataSource } from "typeorm";
// import { Migration1721926264177 } from "../database/migrations/1721926264177-migration";
// import path from 'path';

const dataSource = new DataSource({
  type: "postgres",
  //   url: "postgres://postgres:wildrent@db:5432/postgres",
  host: "db",
  //   host: "localhost",
  port: 5432,
  //   port: 5434,
  username: "postgres",
  password: "wildrent",
  database: "postgres",

//   entities: ["dist/entities/*.mjs"],
  entities: ["src/entities/*.mjs"],

  synchronize: false, //! don't use in production
  logging: ["error", "query"],

//   migrations: ["dist/database/migrations/*.mjs"],
  migrations: ["src/database/migrations/*.mjs"], //? Déterminer à quel endroit on enregistre les fichiers de migrations afin de pouvoir les relire.
  
//   migrations: [path.join(__dirname, '../database/migrations/*.mjs')],


  //   migrations: [path.join(__dirname, '../database/migrations/*.ts')],
  //   migrations: [Migration1721926264177],
  migrationsRun: true, //? Assure l'application des migrations non encore appliquées à chaque connexion à la base de données.
//   migrationsTableName: "migrations"
});

export default dataSource;
