import {
  deletUser,
  getAllUsers,
  getUserByFk,
  updateUser,
} from "../controller/users.controller.js";
import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import { authAdminMiddleware } from "../middleware/authAdmin.js";
import {
  deletedUserValid,
  getUserByFkValid,
  updateUserValid,
} from "../middleware/validation/user.validation.js";
import { validator } from "../middleware/validation.js";

export const userRouters = express.Router();

userRouters.get("/users", authMiddleware, authAdminMiddleware, getAllUsers);

userRouters.get(
  "/user/:id",
  authMiddleware,
  authAdminMiddleware,
  getUserByFkValid,
  validator,
  getUserByFk
);

userRouters.put(
  "/user/:id",
  authMiddleware,
  authAdminMiddleware,
  updateUserValid,
  validator,
  updateUser
);

userRouters.delete(
  "/user/:id",
  authMiddleware,
  authAdminMiddleware,
  deletedUserValid,
  validator,
  deletUser
);
