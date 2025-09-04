import "dotenv/config";
import morgan from "morgan";
import { starOn } from "./src/config/database.js";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authRouter } from "./src/routers/auth.routers.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:5090",
    credentials: true,
  })
);
app.use(cookieParser());
app.use("/api", authRouter);

app.listen(PORT, async () => {
  await starOn();
  console.log(`se realizon una conexion con exito hacia el puerto ${PORT}`);
});
