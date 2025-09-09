import { body, param } from "express-validator";
import Usermodel from "../../models/user.model.js";

export const getUserByFkValid = [
  param("id")
    .notEmpty()
    .withMessage("debe de ser obligatorio en ID")
    .isInt()
    .withMessage("el ID debe ser enteros"),
];

export const updateUserValid = [
  param("id")
    .isInt()
    .withMessage("el id debe de ser entero")
    .notEmpty()
    .withMessage("el id debe de ser obligatorio")
    .custom(async (value) => {
      const userBD = await Usermodel.findByPk(value);
      if (!userBD) {
        throw new Error("el usuario no existe");
      }
    }),
  body("username")
    .isLength({ min: 3, max: 20 })
    .withMessage("solo se permiten entre 3 a 20 caractere")
    .isAlphanumeric()
    .withMessage("debe de ser de tipo alfanumerico")
    .custom(async (value) => {
      const usernameTb = await Usermodel.findOne({
        where: { username: value },
      });
      if (usernameTb) {
        throw new Error("ese nombre ya esta utilizado");
      }
    }),
  body("email")
    .isEmail()
    .withMessage("el campo debe de ser de tipo correo")
    .custom(async (value) => {
      const emailTb = await Usermodel.findOne({ where: { email: value } });
      if (emailTb) {
        throw new Error("ya existen un usuario con ese correo");
      }
    }),
  body("password")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
    })
    .withMessage(
      "debe de contener como minimo 8 caracteres,una minuscula,una mayuscula,un numero"
    ),
  body("role").custom(async (value) => {
    const roleEnu = value;
    if (roleEnu !== "user" && roleEnu !== "admin") {
      throw new Error("solamente puede contener los role admin o user");
    }
  }),
];

export const deletedUserValid = [
  param("id")
    .notEmpty()
    .withMessage("el ID debe de ser obligatorio")
    .isInt()
    .withMessage("el ID debe de ser entero"),
];
