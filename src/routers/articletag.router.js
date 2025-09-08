import {
  addTag,
  deletedTagArticle,
} from "../controller/articletag.controller.js";
import { authMiddleware } from "../middleware/auth.js";
import { ownerMiddleware } from "../middleware/authOwner.js";
import express from "express";

export const articleTagRouter = express.Router();

articleTagRouter.post("/article-tags", authMiddleware, addTag);

articleTagRouter.delete("/article-tags/:id", authMiddleware, deletedTagArticle);
