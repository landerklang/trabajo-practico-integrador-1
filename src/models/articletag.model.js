import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

const ArticleTagModel = sequelize.define("ArticleTagModel", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
});

export default ArticleTagModel;
