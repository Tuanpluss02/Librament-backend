import { Request, Response } from "express";
import { createUser, getUserByEmail } from "../services/user.service";
import { generateToken } from "../utils/jwtUtil";
import { PasswordUtil } from "../utils/passwordUtil";
export default class AuthController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    const isMatch = PasswordUtil.comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ message: "Invalid password" });
    }
    const token = generateToken(user.user_id, user.role);
    return res.status(200).send({ access_token: token });
  }

  static async register(req: Request, res: Response) {
    const { email, password, full_name, role } = req.body;
    const user = await getUserByEmail(email);
    if (user) {
      return res.status(400).send({ message: "Email already exists" });
    }
    const newUser = {
      email,
      password,
      full_name,
      role,
    };
    const result = await createUser(newUser);
    const token = generateToken(result.user_id, result.role);
    return res.status(201).send({ access_token: token });
  }
}
