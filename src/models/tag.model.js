import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

const TagModel = sequelize.define("TagModel", {
  name: { type: DataTypes.STRING(30), unique: false },
});

export default TagModel;
