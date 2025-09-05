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

export const TagRouters = express.Router();

TagRouters.post("/tags", authMiddleware, authAdminMiddleware, createdTag);

TagRouters.get("/tags", authMiddleware, getAllTag);

TagRouters.get("/tags/:id", authMiddleware, authAdminMiddleware, getTagByFk);

TagRouters.put("/tags/:id", authMiddleware, authAdminMiddleware, updateTag);

TagRouters.delete("/tags/:id", authMiddleware, authAdminMiddleware, deletedTag);
