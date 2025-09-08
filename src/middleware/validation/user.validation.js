import { body, param } from "express-validator";
import Usermodel from "../../models/user.model.js";

export const registreUserValid = [
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
  body("firt_name")
    .isLength({ min: 2, max: 50 })
    .withMessage("solamenten se puede ingresar nombres de 2 a 50 caracteres")
    .isAlpha("es-ES", { ignore: " " })
    .withMessage("solamente se permite letras"),
  body("last_name")
    .isLength({ min: 2, max: 50 })
    .withMessage(
      "solamente se puede ingresar apellido que tengas 2 a 50 caractere"
    )
    .isAlpha("es-ES", { ignore: " " })
    .withMessage("solamente se permite letras"),
  body("biography")
    .isLength({ max: 500 })
    .withMessage(
      "solamente se permite un maximo 500 caracteres mas que eso no "
    ),
  body("avatar_url").isURL().withMessage("solamente se admite url"),
];

export const loginValid = [
  body("username")
    .notEmpty()
    .withMessage("no se permiten campos vacios")
    .isLength({ min: 3, max: 20 })
    .withMessage("solo se permiten entre 3 a 20 caractere")
    .isAlphanumeric()
    .withMessage("debe de ser de tipo alfanumerico"),
  body("password").notEmpty().withMessage("no se permiten campos vacios"),
];

export const getProfileValid = [];

export const updateProfilevalid = [
  body("firt_name")
    .isLength({ min: 2, max: 50 })
    .withMessage("solamenten se puede ingresar nombres de 2 a 50 caracteres")
    .isAlpha("es-ES", { ignore: " " })
    .withMessage("solamente se permite letras"),
  body("last_name")
    .isLength({ min: 2, max: 50 })
    .withMessage(
      "solamente se puede ingresar apellido que tengas 2 a 50 caracteres"
    )
    .isAlpha("es-ES", { ignore: " " })
    .withMessage("solamente se permite letras"),
];
