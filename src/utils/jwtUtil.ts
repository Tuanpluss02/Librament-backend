import jwt, { JwtPayload } from "jsonwebtoken";

const secretKey = process.env.SECRET_KEY || "secret ";
const expiresIn = process.env.ACCESS_TOKEN_EXPIRE || "1h";

export const generateToken = (id: string, position: string) => {
  const payload = {
    sub: id,
    position: position,
  };
  const token = jwt.sign(payload, secretKey, { expiresIn: expiresIn });
  return token;
};

export const verifyToken = (token: string): JwtPayload | null => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded as JwtPayload;
  } catch (err) {
    return null;
  }
};
