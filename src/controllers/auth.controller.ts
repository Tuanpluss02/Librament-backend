

import { Request, Response } from "express";
import { addEmployee, getEmployeeById } from "../services/employee.service";
import { generateToken } from "../utils/jwtUtil";
import { PasswordUtil } from "../utils/passwordUtil";
import { iResponse } from "../utils/iResponse";
import { nextId, updateId } from "../utils/id_manage";

export default class AuthController {

  static async login(req: Request, res: Response) {
      /* #swagger.tags = ['Auth'] 
    #swagger.description = 'Endpoint to login.'
    #swagger.summary = 'Login'
    #swagger.requestBody = {
      required: true,
      content: {
        "application/x-www-form-urlencoded": {
          schema: {
            $ref: "#/definitions/login"
          }
        }
      }
    } */
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
      /* #swagger.tags = ['Auth'] 
    #swagger.description = 'Endpoint to register.'
    #swagger.summary = 'Register'
    #swagger.requestBody = {
      required: true,
      content: {
        "application/x-www-form-urlencoded": {
          schema: {
            $ref: "#/definitions/register"
          }
        }
      }
    } */
    const { employee_name, password, position } = req.body;
    const employee_id = await nextId("EMP");
    const result = await addEmployee({
      employee_id,
      employee_name,
      password,
      position,
    });
    const token = generateToken(result.employee_id, result.position);
    return iResponse(res, 200, "Registration successfully", { 
      employee_id: result.employee_id,
      employee_name: result.employee_name,
      position: result.position,
      access_token: token,
     });
  }
}