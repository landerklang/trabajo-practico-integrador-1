import ArticleModel from "../models/article.model.js";
export const ownerMiddleware = async (req, res, next) => {
  const owner = req.user;
  const IdUser = await ArticleModel.findByPk(req.params.id);
  if (owner.role !== "user" || owner.id !== IdUser.user_id) {
    return res
      .status(401)
      .json({ message: "no eres el dueño de este articlo" });
  } else console.log(IdUser.user_id);
  console.log(owner.id);
  next();
};
