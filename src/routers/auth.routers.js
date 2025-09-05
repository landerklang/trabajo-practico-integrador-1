import {
  getProfile,
  login,
  logout,
  register,
  updateProfile,
} from "../controller/auth.controller.js";
import express from "express";
import { authMiddleware } from "../middleware/auth.js";

export const authRouter = express.Router();

authRouter.post("/auth/register", register);

authRouter.post("/auth/login", login);

authRouter.get("/auth/profile", authMiddleware, getProfile);

authRouter.put("/auth/profile", authMiddleware, updateProfile);

authRouter.post("/auth/logout", authMiddleware, logout);
