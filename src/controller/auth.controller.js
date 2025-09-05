import Usermodel from "../models/user.model.js";
import ProfileModel from "../models/profile.model.js";
import { comparePassword, hashPassword } from "../helpers/bcrypt.helpers.js";
import { generadorToken, verifyToken } from "../helpers/jwt.helper.js";

export const register = async (req, res) => {
  const {
    username,
    email,
    password,
    role,
    first_name,
    last_name,
    biography,
    birth_date,
    avatar_url,
  } = req.body;
  try {
    const hashedPassword = await hashPassword(password);

    const user = await Usermodel.create({
      username: username,
      email: email,
      password: hashedPassword,
      role: role,
    });
    await ProfileModel.create({
      first_name: first_name,
      last_name: last_name,
      biography: biography,
      birth_date: birth_date,
      avatar_url: avatar_url,
      user_id: user.id,
    });
    res.status(201).json({
      msg: "usuario creado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      msg: error,
    });
  }
};

export const login = async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const user = await Usermodel.findOne({
      where: { username: username, role },
      include: {
        model: ProfileModel,
        attributes: ["first_name", "last_name", "biography", "birth_date"],
        as: "Profile",
      },
    });

    if (!user) {
      return res
        .status(404)
        .json({ message: "el usuario o la contraseña es incorrecta" });
    }

    const isMath = await comparePassword(password, user.password);
    if (!isMath) {
      return res
        .status(404)
        .json({ message: "el usuario o la contraseña es incorrecta" });
    }

    const token = generadorToken({
      id: user.id,
      first_name: user.Profile.first_name,
      last_name: user.Profile.last_name,
      biography: user.Profile.biography,
      birth_date: user.Profile.birth_date,
      role: user.role,
    });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
    });

    return res.status(200).json({
      msg: "login con exito",
    });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

export const getProfile = async (req, res) => {
  try {
    return res.json({
      user: {
        id: req.user.id,
        first_name: req.user.first_name,
        last_name: req.user.last_name,
      },
    });
  } catch (error) {
    res.status(401).json({ message: "no existe el usuario autenticado" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const [update] = await ProfileModel.update(req.body, {
      where: { id: userId },
    });
    if (update) {
      const updateprofile = await ProfileModel.findByPk(userId);
      res.json(updateprofile);
    } else {
      return res.status(404).json({ message: "no se encontro el perfil" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("token");
    return res.json({ message: "logout con exito" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
