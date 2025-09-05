import Usermodel from "../models/user.model.js";
import ProfileModel from "../models/profile.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await Usermodel.findAll({
      include: [{ model: ProfileModel, as: "Profile" }],
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserByFk = async (req, res) => {
  try {
    const getUserID = await Usermodel.findByPk(req.params.id, {
      include: [
        {
          model: ProfileModel,
          as: "Profile",
          attributes: { exclude: "user_id" },
        },
      ],
    });
    if (getUserID) {
      res.status(200).json(getUserID);
    } else {
      return res.status(404).json({ message: "no se encontro al usuario" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const [update] = await Usermodel.update(req.body, {
      where: { id: req.params.id },
    });
    if (update) {
      const updateuser = await Usermodel.findByPk(req.params.id);
      res.status(200).json(updateuser);
    } else
      return res.status(404).json({ message: "no se encontro al usuario" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deletUser = async (req, res) => {
  try {
    const deleteduser = await Usermodel.destroy({
      where: { id: req.params.id },
    });
    if (deleteduser) {
      res.json({ message: "se elimino con exito al usuario" });
    } else {
      res.status(404).json({ message: "no se encontro al usuario" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
