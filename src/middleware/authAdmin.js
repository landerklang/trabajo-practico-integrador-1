export const authAdminMiddleware = (req, res, next) => {
  const userlogged = req.user.role;
  if (userlogged !== "admin") {
    return res
      .status(401)
      .json({ message: "usted no tienes los permisos requeridos" });
  }
  next();
};
