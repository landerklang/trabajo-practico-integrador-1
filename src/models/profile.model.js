import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const ProfileModel = sequelize.define("ProfileModel", {
  first_name: { type: DataTypes.STRING(50), allowNull: false },
  last_name: { type: DataTypes.STRING(50), allowNull: false },
  biography: { type: DataTypes.TEXT },
  avatar_url: { type: DataTypes.STRING(255) },
  birth_date: { type: DataTypes.DATE },
});

export default ProfileModel;
