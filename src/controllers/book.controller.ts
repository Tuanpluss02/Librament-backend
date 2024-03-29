import { Request, Response } from "express";
import {
  addNewBook,
  deleteBookById,
  getAllBooks,
  getBookById,
  updateBookInfor,
} from "../services/book.service";
import { iResponse } from "../utils/iResponse";
import { nextId } from "../utils/id_manage";

export default class BookController {

  static async getBook(req: Request, res: Response) {
/*  #swagger.tags = ['Books'] 
    #swagger.description = 'Endpoint to get book.'
    #swagger.summary = 'Get book'
    #swagger.security = [{
            "bearerAuth": []
    }]
    #swagger.parameters['book_id'] = {
            in: 'query',
            required: true,
            type: 'string'
    }
    } */
    const book_id = req.query.book_id as string;
    const book = await getBookById(book_id);
    if (!book) {
      return iResponse(res, 404, "Book not found");
    }
    return iResponse(res, 200, "Get book successfully", book);
  }

  static async getAll(req: Request, res: Response) {
/*  #swagger.tags = ['Books']
    #swagger.description = 'Endpoint to get all books.'
    #swagger.summary = 'Get all books'
    #swagger.security = [{
            "bearerAuth": []
    }]
    } */
    const result = await getAllBooks();
    return iResponse(res, 200, "Get all books successfully", result);
  }

  static async addBook(req: Request, res: Response) {
/*  #swagger.tags = ['Books']
    #swagger.description = 'Endpoint to add new book.'
    #swagger.summary = 'Add new book'
    #swagger.security = [{
            "bearerAuth": []
    }]
    #swagger.requestBody = {
      required: true,
      content: {
        "application/x-www-form-urlencoded": {
          schema: {
            $ref: "#/definitions/book"
          }
        }
      }
    } */
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
  /*#swagger.tags = ['Books']
    #swagger.description = 'Endpoint to update book.'
    #swagger.summary = 'Update book'
    #swagger.security = [{
            "bearerAuth": []
    }]
    #swagger.requestBody = {
      content: {
        "application/x-www-form-urlencoded": {
          schema: {
            $ref: "#/definitions/book"
          }
        }
      }
    } */
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
/*  #swagger.tags = ['Books']
    #swagger.description = 'Endpoint to delete book.'
    #swagger.summary = 'Delete book'
    #swagger.security = [{
            "bearerAuth": []
    }]
    } */
    
    const { book_id } = req.params;
    const book = await getBookById(book_id);
    if (!book) {
      return iResponse(res, 404, "Book not found");
    }
    const result = await deleteBookById(book_id);
    return iResponse(res, 200, "Delete book successfully");
  }
}
