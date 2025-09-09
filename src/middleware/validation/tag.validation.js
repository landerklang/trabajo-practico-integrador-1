import { param, body } from "express-validator";
import TagModel from "../../models/tag.model.js";

export const createdTagValid = [
  body("name")
    .notEmpty()
    .withMessage("el campo name es obligatorio")
    .isLength({ min: 2, max: 30 })
    .withMessage("el nombre debe de contener 2 a 30 caracteres")
    .custom(async (value) => {
      const nameBD = await TagModel.findOne({ where: { name: value } });
      if (nameBD) {
        throw new Error("ya existe un tag con ese nombre");
      }
    }),
];

export const getTagByFkValid = [
  param("id")
    .isInt()
    .withMessage("el ID debe de ser entero")
    .notEmpty()
    .withMessage("el ID es obligatorio"),
];

export const updateTagValid = [
  param("id")
    .notEmpty()
    .withMessage("el ID es obligatorio")
    .isInt()
    .withMessage("el ID debe ser de tipo entero"),
  body("name")
    .notEmpty()
    .withMessage("el campo name es obligario")
    .isLength({ min: 2, max: 30 }),
];

export const deletedTagValid = [
  param("id")
    .notEmpty()
    .withMessage("el id es un campos obligatorio ")
    .isInt()
    .withMessage("el ID debe de ser entero"),
];
