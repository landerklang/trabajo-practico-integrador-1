import { verifyToken } from "../helpers/jwt.helper.js";

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies["token"];
    if (!token) {
      return res.status(401).json({ message: "no autenticado" });
    }
    const decode = verifyToken(token);
    req.user = decode;
    next();
  } catch (error) {
    res.status(500).json({ message: "error interno del servidor" });
  }
};
