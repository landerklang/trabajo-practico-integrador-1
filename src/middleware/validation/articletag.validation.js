import { body, param } from "express-validator";
import TagModel from "../../models/tag.model.js";
import ArticleModel from "../../models/article.model.js";

export const addTagValid = [
  body("Tag_id")
    .isInt()
    .withMessage("el user_Id debe de ser entero")
    .notEmpty()
    .withMessage("el user_id es obligatorio")
    .custom(async (value) => {
      const Tagid = await TagModel.findByPk(value);
      if (Tagid === null) {
        throw new Error("no existe un usuario con este Id");
      }
    }),
  body("article_id")
    .isInt()
    .withMessage("el group_Id debe de ser entero")
    .notEmpty()
    .withMessage("el group_id es obligatorio")
    .custom(async (articlevalidar) => {
      const articleid = await ArticleModel.findByPk(articlevalidar);
      if (articleid === null) {
        throw new Error("no existe un grupo con ese ID");
      }
    }),
];

export const deletedTagArticleValid = [
  param("id")
    .notEmpty()
    .withMessage("el id debe de ser obligatorio")
    .isInt()
    .withMessage("el ID debe de ser entero"),
];
