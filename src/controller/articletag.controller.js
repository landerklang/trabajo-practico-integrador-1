import ArticleModel from "../models/article.model.js";
import TagModel from "../models/tag.model.js";
import ArticleTagModel from "../models/articletag.model.js";

export const addTag = async (req, res) => {
  try {
    const { Tag_id, article_id } = req.body;
    const agregarTag = await ArticleTagModel.create({
      Tag_id: Tag_id,
      article_id: article_id,
    });
    res.status(201).json({ agregarTag });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deletedTagArticle = async (req, res) => {
  try {
    const deleted = await ArticleTagModel.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(200).json({ message: "se elimino correctamente" });
    } else {
      res.status(404).json({ message: "no se encontro la etiqueta" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
