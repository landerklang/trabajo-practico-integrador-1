import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import ProfileModel from "./profile.model.js";
import ArticleModel from "./article.model.js";

const Usermodel = sequelize.define(
  "UserModel",
  {
    username: { type: DataTypes.STRING(20), allowNull: false, unique: true },
    email: { type: DataTypes.STRING(100), allowNull: false },
    password: { type: DataTypes.INTEGER(255), allowNull: false },
    role: {
      type: DataTypes.ENUM("user", "admin", "guest"),
      defaultValue: "guest",
      allowNull: false,
    },
  },
  {
    paranoid: true,
  }
);

Usermodel.hasOne(ProfileModel, { foreignKey: "user_id", as: "Profile" });

ProfileModel.belongsTo(Usermodel, { foreignKey: "user_id", as: "User" });

Usermodel.hasMany(ArticleModel, { foreignKey: "user_id", as: "Article" });

ArticleModel.belongsTo(Usermodel, {
  foreignKey: "user_id",
  as: "User",
  onDelete: "CASCADE",
});

export default Usermodel;
