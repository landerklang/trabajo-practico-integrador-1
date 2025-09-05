import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";
import ArticleModel from "./article.model.js";
import TagModel from "./tag.model.js";

const ArticleTagModel = sequelize.define("ArticleTagModel", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
});

ArticleModel.belongsToMany(TagModel, {
  through: ArticleTagModel,
  foreignKey: "article_id",
  as: "tags",
});

TagModel.belongsToMany(ArticleModel, {
  through: ArticleTagModel,
  foreignKey: "Tag_id",
  as: "article",
});

export default ArticleTagModel;
