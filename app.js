import "dotenv/config";
import morgan from "morgan";
import { starOn } from "./src/config/database.js";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authRouter } from "./src/routers/auth.routers.js";
import { userRouters } from "./src/routers/user.routers.js";
import { TagRouters } from "./src/routers/tag.routers.js";
import { articleRouters } from "./src/routers/articles.routers.js";
import { articleTagRouter } from "./src/routers/articleTag.router.js";

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
app.use("/api", userRouters);
app.use("/api", TagRouters);
app.use("/api", articleRouters);
app.use("/api", articleTagRouter);

app.listen(PORT, async () => {
  await starOn();
  console.log(`se realizon una conexion con exito hacia el puerto ${PORT}`);
});
