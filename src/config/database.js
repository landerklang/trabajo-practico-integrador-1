import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_PASSWORD,
  process.env.DB_USER,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  }
);

export const starOn = async () => {
  try {
    await sequelize.sync({ alter: false });
    console.log("se realizo una conexion con exito");
  } catch (error) {
    console.error("no se pudo conectar con la base de datos", error);
  }
};
