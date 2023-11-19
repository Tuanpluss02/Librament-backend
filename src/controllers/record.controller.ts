import { deleteBorrowerById } from "../services/borrow.service";
import { addNewRecord, getRecordById, updateRecordInfor, getAllRecords } from "../services/record.service";
import { stringToDate } from "../utils/dateConvert";
import { Status } from "../utils/enums";
import { iResponse } from "../utils/iResponse";
import { nextId } from "../utils/id_manage";
import { Request, Response } from "express";

export class RecordController {
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
            console.log("newBorrowRecord");
            
            const { book_id, borrower_id, borrow_date, return_date} = req.body;
            const employee_id = res.locals.payload.sub;
            const record_id = await nextId("REC");
            const status = Status.borrowed;
            const borrow_date_format = stringToDate(borrow_date);
            const return_date_format = stringToDate(return_date);
            const result = await addNewRecord({
                record_id,
                book_id,
                borrower_id,
                employee_id,
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
    
            const  record_id  = req.params.record_id as string;
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
        #swagger.parameters['record_id'] = {
                in: 'query',
                required: true,
                type: 'string'
        } */
    
            const record_id = req.query.record_id as string;
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