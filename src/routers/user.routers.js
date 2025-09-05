import {
  deletUser,
  getAllUsers,
  getUserByFk,
  updateUser,
} from "../controller/users.controller.js";
import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import { authAdminMiddleware } from "../middleware/authAdmin.js";

export const userRouters = express.Router();

userRouters.get("/users", authMiddleware, authAdminMiddleware, getAllUsers);

userRouters.get("/user/:id", authMiddleware, authAdminMiddleware, getUserByFk);

userRouters.put("/user/:id", authMiddleware, authAdminMiddleware, updateUser);

userRouters.delete("/user/:id", authMiddleware, authAdminMiddleware, deletUser);
