import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

export const ArticleModel = sequelize.define("ArticleModel", {
  title: { type: DataTypes.STRING(200), allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false },
  excerpt: { type: DataTypes.STRING(500) },
});
