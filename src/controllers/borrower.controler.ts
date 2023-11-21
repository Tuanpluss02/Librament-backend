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
    #swagger.parameters['borrower_id'] = {
            in: 'query',
            required: true,
            type: 'string'
    }
    }
    */
        const borrower_id  = req.query.borrower_id as string;
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


}