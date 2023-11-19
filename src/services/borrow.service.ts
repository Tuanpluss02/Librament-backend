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

export const addNewRecord = async (borrow: any) => {
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

export const getRecordById = async (record_id: string) => {
  try {
    const sql = "SELECT * FROM borrowing_records WHERE record_id = ?";
    const [rows] = await (await conn).query<RowDataPacket[]>(sql, [record_id]);
    const result = rows[0];
    return result;
  } catch (err) {
    throw err;
  }
};

export const getAllRecords = async () => {
  try {
    const sql = "SELECT * FROM borrowing_records";
    const [rows] = await (await conn).query(sql);
    return rows;
  } catch (err) {
    throw err;
  }
};

export const updateRecord = async (record_id: string, borrow: any) => {
  try {
    const sql = "UPDATE borrowing_records SET ? WHERE record_id = ?";
    const recordExist = await getRecordById(record_id);
    const values = {
      book_id: borrow.book_id || recordExist.book_id,
      borrower_id: borrow.borrower_id || recordExist.borrower_id,
      borrow_date: borrow.borrow_date || recordExist.borrow_date,
      return_date: borrow.return_date || recordExist.return_date,
      status: borrow.status || recordExist.status,
    };
    await (await conn).query(sql, [values, record_id]);
    return values;
  } catch (err) {
    throw err;
  }
};

export const deleteRecordById = async (record_id: string) => {
  try {
    const sql = "DELETE FROM borrowing_records WHERE record_id = ?";
    await (await conn).query(sql, [record_id]);
  } catch (err) {
    throw err;
  }
};

export const getAllBooksOfBorrower = async (borrower_id: string) => {
  try {
    const sql =
      "SELECT books.book_id, books.title, books.author, books.genre, books.publication_year, books.isbn, books.quantity FROM books INNER JOIN borrowing_records ON books.book_id = borrowing_records.book_id WHERE borrowing_records.borrower_id = ?";
    const [rows] = await (await conn).query(sql, [borrower_id]);
    return rows;
  } catch (err) {
    throw err;
  }
}
