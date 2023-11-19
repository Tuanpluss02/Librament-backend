import { Request, Response } from "express";
import {
  addNewBook,
  deleteBookById,
  getBookById,
  updateBookInfor,
} from "../services/book.service";
import { iResponse } from "../utils/iResponse";
import { nextId } from "../utils/id_manage";

export default class BookController {
  static async getBook(req: Request, res: Response) {
    const { book_id } = req.params;
    const book = await getBookById(book_id);
    if (!book) {
      return iResponse(res, 404, "Book not found");
    }
    return iResponse(res, 200, "Get book successfully", book);
  }


  static async addBook(req: Request, res: Response) {
    const {
      title,
      author,
      genre,
      publication_year,
      isbn,
      quantity,
      publisher_id,
    } = req.body;
    const book_id = await nextId("BOOK");
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
    return iResponse(res, 201, "Add new book successfully", result);
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
      return iResponse(res, 404, "Book not found");
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
    return iResponse(res, 200, "Update book successfully", result);
  }
  static async deleteBook(req: Request, res: Response) {
    const { book_id } = req.params;
    const book = await getBookById(book_id);
    if (!book) {
      return iResponse(res, 404, "Book not found");
    }
    const result = await deleteBookById(book_id);
    return iResponse(res, 200, "Delete book successfully");
  }
}
