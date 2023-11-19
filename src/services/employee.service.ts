import { RowDataPacket } from "mysql2";
import conn from "../database";
import { PasswordUtil } from "../utils/passwordUtil";

export const getEmployeeById = async (employee_id: string) => {
  try {
    const sql = "SELECT * FROM employees WHERE employee_id = ?";
    const [rows] = await (
      await conn
    ).query<RowDataPacket[]>(sql, [employee_id]);
    const result = rows[0];
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
export const addEmployee = async (employee: any) => {
  try {
    const hashPassword = await PasswordUtil.hashPassword(employee.password);
    const sql = "INSERT INTO employees SET ?";
    const values = {
      employee_id: employee.employee_id,
      password: hashPassword,
      employee_name: employee.employee_name,
      position: employee.position,
    };
    await (await conn).query(sql, [values]);
    const result = {
      employee_id: employee.employee_id,
      employee_name: employee.employee_name,
      position: employee.position,
    };
    return result;
  } catch (err) {
    throw err;
  }
};



