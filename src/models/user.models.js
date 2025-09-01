import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Usermodel = sequelize.define("UserModel", {
  username: { type: DataTypes.STRING(20), allowNull: false, unique: true },
  email: { type: DataTypes.STRING(100), allowNull: false },
  password: { type: DataTypes.INTEGER(255), allowNull: false },
  role: {
    type: DataTypes.ENUM("user", "admin", "guest"),
    defaultValue: "guest",
    allowNull: false,
  },
});

export default Usermodel;
