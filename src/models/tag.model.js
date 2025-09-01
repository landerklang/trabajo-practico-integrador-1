import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

export const TagModel = sequelize.define("TagModel", {
  name: { type: DataTypes.STRING(30) },
});
