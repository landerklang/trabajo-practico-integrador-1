import {
  getProfile,
  login,
  logout,
  register,
  updateProfile,
} from "../controller/auth.controller.js";
import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import { validator } from "../middleware/validation.js";
import {
  loginValid,
  registreUserValid,
  updateProfilevalid,
} from "../middleware/validation/user.validation.js";

export const authRouter = express.Router();

authRouter.post("/auth/register", registreUserValid, validator, register);

authRouter.post("/auth/login", loginValid, validator, login);

authRouter.get("/auth/profile", authMiddleware, validator, getProfile);

authRouter.put(
  "/auth/profile",
  authMiddleware,
  updateProfilevalid,
  validator,
  updateProfile
);

authRouter.post("/auth/logout", authMiddleware, validator, logout);
