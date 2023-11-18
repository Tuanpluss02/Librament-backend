import { Request, Response } from "express";
import { addEmployee, getEmployeeById } from "../services/employee.service";
import { generateToken } from "../utils/jwtUtil";
import { PasswordUtil } from "../utils/passwordUtil";
export default class AuthController {
  static async login(req: Request, res: Response) {
    const { employee_id, password } = req.body;
    const user = await getEmployeeById(employee_id);
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
    const { employee_id, employee_name, password, position } = req.body;
    const user = await getEmployeeById(employee_id);
    if (user) {
      return res.status(400).send({ message: "ID already exists" });
    }
    const result = await addEmployee({
      employee_id,
      employee_name,
      password,
      position,
    });
    const token = generateToken(result.employee_id, result.position);
    return res.status(201).send({ access_token: token });
  }
}
