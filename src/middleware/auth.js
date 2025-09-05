import { verifyToken } from "../helpers/jwt.helper.js";

export const authMiddleware = (req, res, next) => {
  try {
    //obtener token de la cokkie
    const token = req.cookies["token"];
    if (!token) {
      return res.status(401).json({ message: "el perfil no esta autenticado" });
    }
    //verificar y decodificar el token
    const decoded = verifyToken(token);
    //almacenar datos del usuario
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error interno del servidor" });
  }
};
