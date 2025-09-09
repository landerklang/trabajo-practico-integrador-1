import express from "express";
import {
  createdTag,
  deletedTag,
  getAllTag,
  getTagByFk,
  updateTag,
} from "../controller/tag.controller.js";
import { authMiddleware } from "../middleware/auth.js";
import { authAdminMiddleware } from "../middleware/authAdmin.js";
import {
  createdTagValid,
  deletedTagValid,
  getTagByFkValid,
  updateTagValid,
} from "../middleware/validation/tag.validation.js";
import { validator } from "../middleware/validation.js";

export const TagRouters = express.Router();

TagRouters.post(
  "/tags",
  authMiddleware,
  authAdminMiddleware,
  createdTagValid,
  validator,
  createdTag
);

TagRouters.get("/tags", authMiddleware, validator, getAllTag);

TagRouters.get(
  "/tags/:id",
  authMiddleware,
  authAdminMiddleware,
  getTagByFkValid,
  validator,
  getTagByFk
);

TagRouters.put(
  "/tags/:id",
  authMiddleware,
  authAdminMiddleware,
  updateTagValid,
  validator,
  updateTag
);

TagRouters.delete(
  "/tags/:id",
  authMiddleware,
  authAdminMiddleware,
  deletedTagValid,
  validator,
  deletedTag
);
