import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const DB_ENGINE = process.env.DB_ENGINE;

let sequelize: Sequelize;

if (DB_ENGINE === "mysql") {
  sequelize = new Sequelize(
    process.env.MYSQL_NAME!,
    process.env.MYSQL_USER!,
    process.env.MYSQL_PASSWORD!,
    {
      host: process.env.MYSQL_HOST,
      dialect: "mysql",
      port: Number(process.env.MYSQL_PORT),
    }
  );
} else if (DB_ENGINE === "postgres") {
  sequelize = new Sequelize(
    process.env.POSTGRES_NAME!,
    process.env.POSTGRES_USER!,
    process.env.POSTGRES_PASSWORD!,
    {
      host: process.env.POSTGRES_HOST,
      dialect: "postgres",
      port: Number(process.env.POSTGRES_PORT),
    }
  );
} else if (DB_ENGINE === "mssql") {
  sequelize = new Sequelize(
    process.env.MSSQL_NAME!,
    process.env.MSSQL_USER!,
    process.env.MSSQL_PASSWORD!,
    {
      host: process.env.MSSQL_HOST,
      dialect: "mssql",
      port: Number(process.env.MSSQL_PORT),
    }
  );
} else {
  throw new Error("Motor de base de datos no soportado");
}

export default sequelize;