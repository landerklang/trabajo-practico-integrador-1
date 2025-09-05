import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  }
);

export const starOn = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log("se realizo una conexion con exito con la base de datos");
  } catch (error) {
    console.error("no se pudo conectar con la base de datos", error);
  }
};
