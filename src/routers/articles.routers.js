import express from "express";
import {
  createdArticle,
  getAllArticle,
  getArticleByFK,
  getArticleUser,
  getUserArticleByFk,
  updateArticle,
} from "../controller/article.controller.js";
import { authMiddleware } from "../middleware/auth.js";
import { ownerMiddleware } from "../middleware/authOwner.js";

export const articleRouters = express.Router();

articleRouters.post("/articles", authMiddleware, createdArticle);

articleRouters.get("/articles", authMiddleware, getAllArticle);

articleRouters.get("/articles/user", authMiddleware, getArticleUser);
//las rutas tienen una jerarquia donde analisara de arriba a bajo si hay un user en la misma barra que id buscara id si esta primero
articleRouters.get("/articles/:id", authMiddleware, getArticleByFK);

articleRouters.get("/articles/user/:id", authMiddleware, getUserArticleByFk);

articleRouters.put(
  "/articles/:id",
  authMiddleware,
  ownerMiddleware,
  updateArticle
);
