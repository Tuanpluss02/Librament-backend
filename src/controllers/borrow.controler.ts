import { Request, Response } from "express";
import { nextId } from "../utils/id_manage";
import {addNewBorrower, deleteBorrowerById, getAllBorrowers, getBorrowerById, updateBorrowerInfor } from "../services/borrow.service";
import { iResponse } from "../utils/iResponse";
import { stringToDate } from "../utils/dateConvert";
import { Status } from "../utils/enums";
import { addNewRecord, getAllRecords, getRecordById, updateRecordInfor } from "../services/record.service";

export default class BorrowController {
    static async addBorrower(req: Request, res: Response) {
  /*#swagger.tags = ['Borrowers']
    #swagger.description = 'Endpoint to add new borrower.'
    #swagger.summary = 'Add new borrower'
    #swagger.security = [{
            "bearerAuth": []
    }]
    #swagger.requestBody = {
      required: true,
      content: {
        "application/x-www-form-urlencoded": {
          schema: {
            $ref: "#/definitions/borrower"
          }
        }
      }
    } */
        const { borrower_name, address, phone_number } = req.body;
        const borrower_id = await nextId("BOR");
        const result = await addNewBorrower({
            borrower_id,
            borrower_name,
            address,
            phone_number,
        });
        return iResponse(res, 201, "Add new borrower successfully", result);
    }

    static async getBorrower(req: Request, res: Response) {
          /*#swagger.tags = ['Borrowers']
    #swagger.description = 'Endpoint to get borrower.'
    #swagger.summary = 'Get borrower'
    #swagger.security = [{
            "bearerAuth": []
    }]
    } */
        const { borrower_id } = req.params;
        const borrower = await getBorrowerById(borrower_id);
        if (!borrower) {
            return iResponse(res, 404, "Borrower not found");
        }
        return iResponse(res, 200, "Get borrower successfully", borrower);
    }

    static async getAllBorrowers(req: Request, res: Response) {
    /*#swagger.tags = ['Borrowers']
    #swagger.description = 'Endpoint to get all borrowers.'
    #swagger.summary = 'Get all borrowers'
    #swagger.security = [{
            "bearerAuth": []
    }]
    } */
        const borrowers = await getAllBorrowers();
        return iResponse(res, 200, "Get all borrowers successfully", borrowers);
    }

    static async updateBorrower(req: Request, res: Response) {
        /*#swagger.tags = ['Borrowers']
    #swagger.description = 'Endpoint to update borrower.'
    #swagger.summary = 'Update borrower'
    #swagger.security = [{
            "bearerAuth": []
    }]
    #swagger.requestBody = {
        required: true,
        content: {
          "application/x-www-form-urlencoded": {
            schema: {
              $ref: "#/definitions/borrower"
            }
          }
        }
        } */

        const { borrower_id } = req.params;
        const { borrower_name, address, phone_number } = req.body;
        const borrower = await getBorrowerById(borrower_id);
        if (!borrower) {
            return iResponse(res, 404, "Borrower not found");
        }
        const result = await updateBorrowerInfor(borrower_id, {
            borrower_name,
            address,
            phone_number,
        });
        return iResponse(res, 200, "Update borrower successfully", result);
    }

    static async deleteBorrower(req: Request, res: Response) {
    /*#swagger.tags = ['Borrowers']
    #swagger.description = 'Endpoint to add new borrower.'
    #swagger.summary = 'Add new borrower'
    #swagger.security = [{
            "bearerAuth": []
    }]
    } */
        const { borrower_id } = req.params;
        const borrower = await getBorrowerById(borrower_id);
        if (!borrower) {
            return iResponse(res, 404, "Borrower not found");
        }
        await deleteBorrowerById(borrower_id);
        return iResponse(res, 200, "Delete borrower successfully");
    }

    static async newBorrowRecord(req: Request, res: Response) {
    /*#swagger.tags = ['Records']
    #swagger.description = 'Endpoint to add new record.'
    #swagger.summary = 'Add new record'
    #swagger.security = [{
            "bearerAuth": []
    }]
    #swagger.requestBody = {
        required: true,
        content: {
          "application/x-www-form-urlencoded": {
            schema: {
              $ref: "#/definitions/record"
            }
          }
        }
        } */
        const { book_id, borrower_id, borrow_date, return_date} = req.body;
        const record_id = await nextId("REC");
        const status = Status.borrowed;
        const borrow_date_format = stringToDate(borrow_date);
        const return_date_format = stringToDate(return_date);
        const result = await addNewRecord({
            record_id,
            book_id,
            borrower_id,
            borrow_date: borrow_date_format,
            return_date: return_date_format,
            status,
        });
        return iResponse(res, 201, "Borrow book successfully", result);
    }
    static async returnBook(req: Request, res: Response) {
        /*#swagger.tags = ['Records']
    #swagger.description = 'Endpoint to return book.'
    #swagger.summary = 'Return book'
    #swagger.security = [{
            "bearerAuth": []
    }] */

        const { record_id } = req.params;
        const record = await getRecordById(record_id);
        if (!record) {
            return iResponse(res, 404, "Record not found");
        }
        const status = Status.returned;
        const result = await updateRecordInfor(record_id, {
            status,
        });
        return iResponse(res, 200, "Return book successfully", result);
    }

    static async getRecord(req: Request, res: Response) {
        /*#swagger.tags = ['Records']
    #swagger.description = 'Endpoint to get record.'
    #swagger.summary = 'Get record'
    #swagger.security = [{
            "bearerAuth": []
    }]
    } */

        const { record_id } = req.params;
        const record = await getRecordById(record_id);
        if (!record) {
            return iResponse(res, 404, "Record not found");
        }
        return iResponse(res, 200, "Get record successfully", record);
    }

    static async getAllRecords(req: Request, res: Response) {
    /*#swagger.tags = ['Records']
    #swagger.description = 'Endpoint to get all records.'
    #swagger.summary = 'Get all records'
    #swagger.security = [{
            "bearerAuth": []
    }]
    } */
        const records = await getAllRecords();
        return iResponse(res, 200, "Get all records successfully", records);
    }
    static async updateRecord(req: Request, res: Response) {
    /*#swagger.tags = ['Records']
    #swagger.description = 'Endpoint to add new record.'
    #swagger.summary = 'Add new record'
    #swagger.security = [{
            "bearerAuth": []
    }]
    #swagger.requestBody = {
        required: true,
        content: {
          "application/x-www-form-urlencoded": {
            schema: {
              $ref: "#/definitions/record"
            }
          }
        }
    }
    */
        const { record_id } = req.params;
        const { book_id, borrower_id, borrow_date, return_date, status } = req.body;
        const record = await getRecordById(record_id);
        if (!record) {
            return iResponse(res, 404, "Record not found");
        }
        const borrow_date_format = stringToDate(borrow_date);
        const return_date_format = stringToDate(return_date);
        const result = await updateRecordInfor(record_id, {
            book_id,
            borrower_id,
            borrow_date: borrow_date_format,
            return_date: return_date_format,
            status,
        });
        return iResponse(res, 200, "Update record successfully", result);
    }

    static async deleteRecord(req: Request, res: Response) {
        /*#swagger.tags = ['Records']
    #swagger.description = 'Endpoint to delete record.'
    #swagger.summary = 'Delete record'
    #swagger.security = [{
            "bearerAuth": []
    }]
    } */

        const { record_id } = req.params;
        const record = await getRecordById(record_id);
        if (!record) {
            return iResponse(res, 404, "Record not found");
        }
        await deleteBorrowerById(record_id);
        return iResponse(res, 200, "Delete record successfully");
    }
}