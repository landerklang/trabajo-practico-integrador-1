import ArticleModel from "../models/article.model.js";
import TagModel from "../models/tag.model.js";

export const createdTag = async (req, res) => {
  try {
    const create = await TagModel.create(req.body);
    res.status(201).json(create);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllTag = async (req, res) => {
  try {
    const allTag = await TagModel.findAll();
    res.status(200).json(allTag);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTagByFk = async (req, res) => {
  try {
    const getTagID = await TagModel.findByPk(req.params.id, {
      include: [{ model: ArticleModel, as: "article" }],
    });
    if (getTagID) {
      res.status(200).json(getTagID);
    } else {
      res.status(404).json({ message: "no se encontro el perfil" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateTag = async (req, res) => {
  try {
    const [update] = await TagModel.update(req.body, {
      where: { id: req.params.id },
    });
    if (update) {
      const tagupdate = await TagModel.findByPk(req.params.id);
      res.status(200).json(tagupdate);
    } else {
      res.status(404).json({ message: "no se encontro la tag" });
    }
  } catch (error) {
    res.status(505).json({ error: error.message });
  }
};

export const deletedTag = async (req, res) => {
  try {
    const eliminar = await TagModel.destroy({ where: { id: req.params.id } });
    if (eliminar) {
      res.status(200).json({ msg: "se elimino correctamente" });
    } else {
      res.status(404).json({ message: "no se encontro la etiqueta" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
