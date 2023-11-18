import { RowDataPacket } from "mysql2";
import conn from "../database";
import { v4 as uuid } from "uuid";
import { PasswordUtil } from "../utils/passwordUtil";

export const getUserByEmail = async (email: string) => {
  try {
    const sql = "SELECT * FROM users WHERE email = ?";
    const [rows] = await (await conn).query<RowDataPacket[]>(sql, [email]);
    const result = rows[0];
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getUserById = async (user_id: string) => {
  try {
    const sql = "SELECT * FROM users WHERE user_id = ?";
    const [rows] = await (await conn).query<RowDataPacket[]>(sql, [user_id]);
    const result = rows;
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const createUser = async (user: any) => {
  try {
    const user_id = uuid();
    const hashPassword = await PasswordUtil.hashPassword(user.password);
    const sql = "INSERT INTO users SET ?";
    const values = {
      user_id: user_id,
      email: user.email,
      password: hashPassword,
      full_name: user.full_name,
      role: user.role,
    };
    await (await conn).query(sql, [values]);
    const insertedRecord = {
      user_id: user_id,
      email: user.email,
      password: hashPassword,
      full_name: user.full_name,
      role: user.role,
    };
    return insertedRecord;
  } catch (err) {
    throw err;
  }
};
