import { RowDataPacket } from "mysql2";
import conn from "../database";

export const nextId = async (id: string) => {
    try {
      const sql = "SELECT code_number FROM code_table WHERE code_id = ?";
      const [rows] = await (await conn).query<RowDataPacket[]>(sql, [id]);
      const result = rows[0].code_number + 1;
      await updateId(id);
      return `${id}${result.toString().padStart(4, "0")}`;
    } catch (err) {
      console.log(err);
      throw err;
    }
}
  
export const updateId = async (id: string) => {
    try {
      const sql = "UPDATE code_table SET code_number = code_number + 1 WHERE code_id = ?";
      await (await conn).query(sql, [id]);
    } catch (err) {
      throw err;
    }
  }