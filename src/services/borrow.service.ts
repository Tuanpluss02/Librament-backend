import { RowDataPacket } from "mysql2/promise";
import conn from "../database";
export const addNewBorrower = async (borrower: any) => {
  try {
    const sql = "INSERT INTO borrowers SET ?";
    const values = {
      borrower_id: borrower.borrower_id,
      borrower_name: borrower.borrower_name,
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
      borrower_name: borrower.borrower_name,
      address: borrower.address,
      phone_number: borrower.phone_number,
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

export const addNewBorrow = async (borrow: any) => {
  try {
    const sql = "INSERT INTO borrowing_records SET ?";
    const values = {
      book_id: borrow.book_id,
      borrower_id: borrow.borrower_id,
      borrow_date: borrow.borrow_date,
      return_date: borrow.return_date,
      status: borrow.status,
    };
    await (await conn).query(sql, [values]);
    return values;
  } catch (err) {
    throw err;
  }
};

export const getBorrowById = async (record_id: string) => {
  try {
    const sql = "SELECT * FROM borrowing_records WHERE record_id = ?";
    const [rows] = await (await conn).query<RowDataPacket[]>(sql, [record_id]);
    const result = rows[0];
    return result;
  } catch (err) {
    throw err;
  }
};

export const getAllBorrows = async () => {
  try {
    const sql = "SELECT * FROM borrowing_records";
    const [rows] = await (await conn).query(sql);
    return rows;
  } catch (err) {
    throw err;
  }
};

export const updateBorrowInfor = async (record_id: string, borrow: any) => {
  try {
    const sql = "UPDATE borrowing_records SET ? WHERE record_id = ?";
    const borrowExist = await getBorrowById(record_id);
    const values = {
      book_id: borrow.book_id,
      borrower_id: borrow.borrower_id,
      borrow_date: borrow.borrow_date,
      return_date: borrow.return_date,
      status: borrow.status,
    };
    await (await conn).query(sql, [values, record_id]);
    return values;
  } catch (err) {
    throw err;
  }
};

export const deleteBorrowById = async (record_id: string) => {
  try {
    const sql = "DELETE FROM borrowing_records WHERE record_id = ?";
    await (await conn).query(sql, [record_id]);
  } catch (err) {
    throw err;
  }
};
