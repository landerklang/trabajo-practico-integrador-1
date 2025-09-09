import { body, param } from "express-validator";
import ArticleModel from "../../models/article.model.js";
import Usermodel from "../../models/user.model.js";

export const createdArticleValid = [
  body("title")
    .notEmpty()
    .withMessage("no se permite campos vacio para titulos")
    .isLength({ min: 3, max: 200 })
    .withMessage("debe de conteder entre 3 a 200 caracteres"),
  body("content")
    .isLength({ min: 50 })
    .withMessage("el contenido debe de tener como minimo 50 caracteres")
    .notEmpty()
    .withMessage("no se permite campos vacios en el contenido"),
  body("excerpt")
    .isLength({ max: 500 })
    .withMessage("solamente se permiten como maximo 500 caracteres"),
  body("status")
    .default("published")
    .isIn(["published", "archived"])
    .withMessage("solamente se permiten publishe o archived"),
  body("user_id")
    .notEmpty()
    .withMessage("no se permiten campos vacios")
    .custom(async (value, { req }) => {
      const userId = req.user.id;
      const user = await Usermodel.findByPk(value);
      if (!user) {
        throw new Error("El usuario no existe");
      }
      if (parseInt(value) !== userId) {
        throw new Error("Debes ser el autor para crear el artículo");
      }
    }),
];

export const getAllArticleValid = [];

export const getArticleByFkValid = [
  param("id")
    .isInt()
    .withMessage("el id debe de ser entero")
    .notEmpty()
    .withMessage("no puede existir un articulo sin su id")
    .custom(async (value) => {
      const idDB = await ArticleModel.findByPk(value);
      if (!idDB) {
        throw new Error("no se encontro al usuario");
      }
    }),
];

export const getArticleUserValid = [];

export const getUserArticleByFkValid = [
  param("id")
    .notEmpty()
    .withMessage("no se permiten campos vacios")
    .isInt()
    .withMessage("el id debe ser entero"),
];

export const updateArticleValid = [
  param("id")
    .notEmpty()
    .withMessage("el id no puede ser nulo")
    .isInt()
    .withMessage("el iD debe ser entero"),
  body("title")
    .notEmpty()
    .withMessage("no se permite campos vacio para titulos")
    .isLength({ min: 3, max: 200 })
    .withMessage("debe de conteder entre 3 a 200 caracteres"),
  body("content")
    .isLength({ min: 50 })
    .withMessage("el contenido debe de tener como minimo 50 caracteres")
    .notEmpty()
    .withMessage("no se permite campos vacios en el contenido"),
  body("excerpt")
    .isLength({ max: 500 })
    .withMessage("solamente se permiten como maximo 500 caracteres"),
  body("status")
    .default("published")
    .isIn(["published", "archived"])
    .withMessage("solamente se permiten publishe o archived"),
  body("user_id")
    .notEmpty()
    .withMessage("no se permiten campos vacios")
    .custom(async (value, { req }) => {
      const userId = req.user.id;
      const user = await Usermodel.findByPk(value);
      if (!user) {
        throw new Error("El usuario no existe");
      }
      if (parseInt(value) !== userId) {
        throw new Error("Debes ser el autor para crear el artículo");
      }
    })
    .custom(async (value) => {
      const idDB = await ArticleModel.findByPk(value);
      if (!idDB) {
        throw new Error("no se encontro al usuario");
      }
    }),
];

export const deletedArticleValid = [
  param("id")
    .isInt()
    .withMessage("el ID debe de ser entero")
    .notEmpty()
    .withMessage("se debe ingresar el ID"),
];
