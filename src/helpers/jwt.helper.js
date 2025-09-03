import { decode } from "jsonwebtoken";
import jws from "jsonwebtoken";

export const generadorToken = (user) => {
  const token = jws.sign(
    {
      id: user.id,
      name: user.person.name,
      lastname: user.person.lastname,
    },
    "JWT_SECRET",
    {
      expiresIn: "1h",
    }
  );
  return token;
};

export const verifyToken = (token) => {
  try {
    return jws.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new error("error de verificacion de token:" + error.message);
  }
};
