import { testConnection } from './database/db';
import express from "express";
import routes from "./routes";

async function main() {
    await testConnection();
}

const app = express();

app.use(express.json());
app.use("/api", routes);

app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});

main();