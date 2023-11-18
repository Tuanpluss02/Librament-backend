import { Request, Response } from "express";
import {
  addNewBook,
  getBookById,
  updateBookInfor,
} from "../services/book.service";

export default class BookController {
  static async getBook(req: Request, res: Response) {
    const { book_id } = req.params;
    const book = await getBookById(book_id);

    if (!book) {
      return res.status(404).send({ message: "Book not found" });
    }
    return res.status(200).send(book);
  }
  static async addBook(req: Request, res: Response) {
    const {
      book_id,
      title,
      author,
      genre,
      publication_year,
      isbn,
      quantity,
      publisher_id,
    } = req.body;
    const book = await getBookById(book_id);
    console.log(book);
    if (book) {
      return res.status(400).send({ message: "ID already exists" });
    }
    const result = await addNewBook({
      book_id,
      title,
      author,
      genre,
      publication_year,
      isbn,
      quantity,
      publisher_id,
    });
    return res.status(201).send(result);
  }
  static async updateBook(req: Request, res: Response) {
    const { book_id } = req.params;
    const {
      title,
      author,
      genre,
      publication_year,
      isbn,
      quantity,
      publisher_id,
    } = req.body;
    const book = await getBookById(book_id);
    if (!book) {
      return res.status(404).send({ message: "Book not found" });
    }
    const result = await updateBookInfor(book_id, {
      title,
      author,
      genre,
      publication_year,
      isbn,
      quantity,
      publisher_id,
    });
  }
  static async deleteBook(req: Request, res: Response) {}
}

// CREATE TABLE books (
//     book_id VARCHAR(55) PRIMARY KEY NOT NULL,
//     publisher_id VARCHAR(55) NOT NULL,
//     title VARCHAR(255) NOT NULL,
//     author VARCHAR(255) NOT NULL,
//     genre VARCHAR(255) NOT NULL,
//     publication_year VARCHAR(10) NOT NULL,
//     isbn VARCHAR(255) NOT NULL,
//     quantity INT NOT NULL
//     FOREIGN KEY (publisher_id) REFERENCES publishers(publisher_id),
// );
