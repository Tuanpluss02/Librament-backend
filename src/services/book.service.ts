import { RowDataPacket } from "mysql2/promise";
import conn from "../database";

export const addNewBook = async (book: any) => {
  try {
    const sql = "INSERT INTO books SET ?";
    const values = {
      book_id: book.book_id,
      title: book.title,
      author: book.author,
      genre: book.genre,
      publication_year: book.publication_year,
      isbn: book.isbn,
      quantity: book.quantity,
      publisher_id: book.publisher_id,
    };
    await (await conn).query(sql, [values]);
    return values;
  } catch (err) {
    throw err;
  }
};

export const getBookById = async (book_id: string) => {
  try {
    const sql = "SELECT * FROM books WHERE book_id = ?";
    const [rows] = await (await conn).query<RowDataPacket[]>(sql, [book_id]);
    const result = rows[0];
    return result;
    return rows;
  } catch (err) {
    throw err;
  }
};
export const getAllBooks = async () => {
  try {
    const sql = "SELECT * FROM books";
    const [rows] = await (await conn).query(sql);
    return rows;
  } catch (err) {
    throw err;
  }
};
export const updateBookInfor = async (book_id: string, book: any) => {
  try {
    const sql = "UPDATE books SET ? WHERE book_id = ?";
    const bookExist = await getBookById(book_id);
    const values = {
      title: book.title,
      author: book.author,
      genre: book.genre,
      publication_year: book.publication_year,
      isbn: book.isbn,
      quantity: book.quantity,
      publisher_id: book.publisher_id,
    };
  } catch (err) {
    throw err;
  }
};
export const deleteBook = async (book_id: string) => {};
