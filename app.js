import { sequelize } from "./src/config/database.js";
import "dotenv/config";
import morgan from "morgan";
import { starOn } from "./src/config/database.js";
import express from "express";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(morgan("dev"));

app.listen(PORT, async () => {
  await starOn();
  console.log(`se realizon una conexion con exito hacia el puerto ${PORT}`);
});
