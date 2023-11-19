import { RowDataPacket } from "mysql2/promise";
import conn from "../database";
export const addNewBorrower = async (borrower: any) => {
  try {
    const sql = "INSERT INTO borrowers SET ?";
    const values = {
      borrower_id: borrower.borrower_id,
      full_name: borrower.full_name,
      address: borrower.address,
      phone_number: borrower.phone_number,
    };
    await (await conn).query(sql, [values]);
    return values;
  } catch (err) {
    throw err;
  }
};

export const getBorrowerById = async (borrower_id: string) => {
  try {
    const sql = "SELECT * FROM borrowers WHERE borrower_id = ?";
    const [rows] = await (
      await conn
    ).query<RowDataPacket[]>(sql, [borrower_id]);
    const result = rows[0];
    return result;
  } catch (err) {
    throw err;
  }
};

export const getAllBorrowers = async () => {
  try {
    const sql = "SELECT * FROM borrowers";
    const [rows] = await (await conn).query(sql);
    return rows;
  } catch (err) {
    throw err;
  }
};

export const updateBorrowerInfor = async (
  borrower_id: string,
  borrower: any
) => {
  try {
    const sql = "UPDATE borrowers SET ? WHERE borrower_id = ?";
    const borrowerExist = await getBorrowerById(borrower_id);
    const values = {
      full_name: borrower.full_name || borrowerExist.full_name,
      address: borrower.address || borrowerExist.address,
      phone_number: borrower.phone_number || borrowerExist.phone_number,
    };
    await (await conn).query(sql, [values, borrower_id]);
    return values;
  } catch (err) {
    throw err;
  }
};

export const deleteBorrowerById = async (borrower_id: string) => {
  try {
    const sql = "DELETE FROM borrowers WHERE borrower_id = ?";
    await (await conn).query(sql, [borrower_id]);
  } catch (err) {
    throw err;
  }
};

