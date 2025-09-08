import ArticleModel from "../models/article.model.js";
import Usermodel from "../models/user.model.js";

export const createdArticle = async (req, res) => {
  try {
    const create = await ArticleModel.create(req.body);
    res.status(201).json(create);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllArticle = async (req, res) => {
  try {
    const allArticle = await ArticleModel.findAll();
    res.status(200).json(allArticle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getArticleByFK = async (req, res) => {
  try {
    const getByID = await ArticleModel.findByPk(req.params.id);
    if (getByID) {
      res.status(200).json({ getByID });
    } else {
      res.status(404).json({ message: "no se encontro el articulo" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getArticleUser = async (req, res) => {
  try {
    const userID = await Usermodel.findByPk(req.user.id, {
      include: [{ model: ArticleModel, as: "Article" }],
    });
    if (userID) {
      res.status(200).json(userID);
    } else {
      res.status(400).json({ message: "no se encontro el usuario" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserArticleByFk = async (req, res) => {
  try {
    const useriD = req.user.id;
    const articleUserId = await ArticleModel.findByPk(req.params.id, {
      include: [{ model: Usermodel, as: "User" }],
    });
    if (useriD !== articleUserId.user_id) {
      console.log(articleUserId.user_id);
      return res
        .status(400)
        .json({ message: "no eres dueño de este articulo" });
    }
    if (articleUserId) {
      res.status(200).json(articleUserId);
    } else {
      res.status(400).json({ message: "no se encontro el usuario" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateArticle = async (req, res) => {
  try {
    const [update] = await ArticleModel.update(req.body, {
      where: { id: req.params.id },
    });
    if (update) {
      const updatearticle = await ArticleModel.findByPk(req.params.id);
      res.json(updatearticle);
    } else {
      res.status(404).json({ message: "no se encontro el articulo" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
