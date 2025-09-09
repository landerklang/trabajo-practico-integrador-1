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
import {
  createdArticleValid,
  deletedArticleValid,
  getArticleByFkValid,
  getUserArticleByFkValid,
  updateArticleValid,
} from "../middleware/validation/article.validation.js";
import { validator } from "../middleware/validation.js";

export const articleRouters = express.Router();

articleRouters.post(
  "/articles",
  authMiddleware,
  createdArticleValid,
  validator,
  createdArticle
);

articleRouters.get("/articles", authMiddleware, getAllArticle);

articleRouters.get("/articles/user", authMiddleware, getArticleUser);
//las rutas tienen una jerarquia donde analisara de arriba a bajo si hay un user en la misma barra que id buscara id si esta primero
articleRouters.get(
  "/articles/:id",
  authMiddleware,
  getArticleByFkValid,
  validator,
  getArticleByFK
);

articleRouters.get(
  "/articles/user/:id",
  authMiddleware,
  getUserArticleByFkValid,
  validator,
  getUserArticleByFk
);

articleRouters.put(
  "/articles/:id",
  authMiddleware,
  ownerMiddleware,
  updateArticleValid,
  validator,
  updateArticle
);

articleRouters.delete(
  "/articles/user/:id",
  authMiddleware,
  ownerMiddleware,
  deletedArticleValid,
  validator,
  updateArticle
);
