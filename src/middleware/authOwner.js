export const ownerMiddleware = (req, res, next) => {
  const owner = req.user.id;
  if (role !== "admin" && owner === "user_id") {
    return res
      .status(401)
      .json({ message: "no eres el dueño de este articlo" });
  }
  next();
};
