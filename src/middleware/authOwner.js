import ArticleModel from "../models/article.model.js";
export const ownerMiddleware = async (req, res, next) => {
  const owner = req.user;
  const IdUser = await ArticleModel.findByPk(req.params.id);
  if (owner.id !== IdUser.user_id) {
    console.log(IdUser);
    return res
      .status(401)
      .json({ message: "no eres el dueño de este articlo" });
  }
  next();
};
