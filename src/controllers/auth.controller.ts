import { Request, Response } from "express";
import { addEmployee, getEmployeeById } from "../services/employee.service";
import { generateToken } from "../utils/jwtUtil";
import { PasswordUtil } from "../utils/passwordUtil";
import { iResponse } from "../utils/iResponse";
export default class AuthController {
  static async login(req: Request, res: Response) {
    const { employee_id, password } = req.body;
    const employee = await getEmployeeById(employee_id);
    if (!employee) {
      return iResponse(res, 400, "Invalid ID");
    }
    const isMatch = await PasswordUtil.comparePassword(
      password,
      employee.password
    );
    if (!isMatch) {
      return iResponse(res, 400, "Invalid password");
    }
    const token = generateToken(employee.employee_id, employee.position);
    return iResponse(res, 200, "Login successfully", { access_token: token });
  }

  static async register(req: Request, res: Response) {
    const { employee_id, employee_name, password, position } = req.body;
    const user = await getEmployeeById(employee_id);
    if (user) {
      return iResponse(res, 400, "ID already exists");
    }
    const result = await addEmployee({
      employee_id,
      employee_name,
      password,
      position,
    });
    const token = generateToken(result.employee_id, result.position);
    return iResponse(res, 200, "Login successfully", { access_token: token });
  }
}
