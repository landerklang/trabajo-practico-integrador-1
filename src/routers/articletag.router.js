import {
  addTag,
  deletedTagArticle,
} from "../controller/articletag.controller.js";
import { authMiddleware } from "../middleware/auth.js";
import { validator } from "../middleware/validation.js";
import express from "express";
import {
  addTagValid,
  deletedTagArticleValid,
} from "../middleware/validation/articletag.validation.js";
import { ownerMiddleware } from "../middleware/authOwner.js";

export const articleTagRouter = express.Router();

articleTagRouter.post(
  "/article-tags",
  authMiddleware,
  ownerMiddleware,
  addTagValid,
  validator,
  addTag
);

articleTagRouter.delete(
  "/article-tags/:id",
  authMiddleware,
  ownerMiddleware,
  deletedTagArticleValid,
  validator,
  deletedTagArticle
);
