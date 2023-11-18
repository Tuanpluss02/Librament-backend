import jwt from "jsonwebtoken";

const secretKey = process.env.SECRET_KEY || "secret ";
const expiresIn = process.env.ACCESS_TOKEN_EXPIRE || "1h";

export const generateToken = (user_id: string, role: string) => {
  const payload = {
    sub: user_id,
    role: role,
  };
  const token = jwt.sign(payload, secretKey, { expiresIn: expiresIn });
  return token;
};

export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (err) {
    return null;
  }
};
