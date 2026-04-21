import dotenv from "dotenv";
import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";

import routes from "../routes";
import { sequelize, testConnection, getDatabaseInfo } from "../database/db"; // 👈 AQUÍ

dotenv.config();

export class App {
  public app: Application;

  constructor(private port?: number | string) {
    this.app = express();
    this.settings();
    this.middlewares();
    this.routes();
    this.dbConnection();
  }

  private settings(): void {
    this.app.set("port", this.port || process.env.PORT || 4000);
  }

  private middlewares(): void {
    this.app.use(morgan("dev"));
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  private routes(): void {
    this.app.use("/api", routes);
  }

  private async dbConnection(): Promise<void> {
    try {
      const dbInfo = getDatabaseInfo();

      console.log(`🔗 Connecting to: ${dbInfo.engine.toUpperCase()}`);

      const isConnected = await testConnection();

      if (!isConnected) {
        throw new Error("Database connection failed");
      }

      await sequelize.sync({ force: false });

      console.log("📦 Database synchronized");
    } catch (error) {
      console.error("❌ Database connection error:", error);
      process.exit(1);
    }
  }

  async listen() {
    await this.app.listen(this.app.get("port"));
    console.log(`🚀 Server running on port ${this.app.get("port")}`);
  }
}