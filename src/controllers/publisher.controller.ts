import { Request, Response } from "express";
import { nextId } from "../utils/id_manage";
import { addNewPublisher, deletePublisherById, getAllPublishers, getBooksOfPublisher, getPublisherById, updatePublisherInfor } from "../services/publisher.service";
import { iResponse } from "../utils/iResponse";

export default class PublisherController {
    static async addPublisher(req: Request, res: Response) {
        /*#swagger.tags = ['Publishers']
         #swagger.description = 'Endpoint to add new publisher.'
            #swagger.summary = 'Add new publisher'
            #swagger.security = [{
                    "bearerAuth": []
            }]
            #swagger.requestBody = {
                required: true,
                content: {
                    "application/x-www-form-urlencoded": {
                        schema: {
                            $ref: "#/definitions/publisher"
                        }
                    }
                }
            } */
        const { publisher_name, address, phone_number } = req.body;
        const publisher_id = await nextId("PUB");
        const values = {
            publisher_id,
            publisher_name,
            address,
            phone_number,
        };
        await addNewPublisher(values);
        return iResponse(res, 201, "Add new publisher successfully", values);
    }

    static async getAll(req: Request, res: Response) {
        /*#swagger.tags = ['Publishers']
        #swagger.description = 'Endpoint to get all publishers.'
        #swagger.summary = 'Get all publishers'
        #swagger.security = [{
                "bearerAuth": []
        }] */
        const result = await getAllPublishers();
        return iResponse(res, 200, "Get all publishers successfully", result);
    }

    static async getById(req: Request, res: Response) {
        /*#swagger.tags = ['Publishers']
        #swagger.description = 'Endpoint to get publisher by id.'
        #swagger.summary = 'Get publisher by id'
        #swagger.security = [{
                "bearerAuth": []
        }] */
        const { publisher_id } = req.params;
        const result = await getPublisherById(publisher_id);
        if (!result) {
            return iResponse(res, 404, "Publisher not found");
        }
        return iResponse(res, 200, "Get publisher by id successfully", result);
    }

    static async update(req: Request, res: Response) {
        /*#swagger.tags = ['Publishers']
        #swagger.description = 'Endpoint to update publisher.'
        #swagger.summary = 'Update publisher'
        #swagger.security = [{
                "bearerAuth": []
        }]
        #swagger.requestBody = {
            required: true,
            content: {
                "application/x-www-form-urlencoded": {
                    schema: {
                        $ref: "#/definitions/publisher"
                    }
                }
            }
        } */
        const { publisher_id } = req.params;
        const { publisher_name, address, phone_number } = req.body;
        const publisher = await getPublisherById(publisher_id);
        if (!publisher) {
            return iResponse(res, 404, "Publisher not found");
        }
        const values = {
            publisher_name: publisher_name || publisher.publisher_name,
            address: address || publisher.address,
            phone_number: phone_number || publisher.phone_number,
        };
        await updatePublisherInfor(publisher_id, values);
        return iResponse(res, 200, "Update publisher successfully", values);
    }
    static async delete(req: Request, res: Response) {
        /*#swagger.tags = ['Publishers']
        #swagger.description = 'Endpoint to delete publisher.'
        #swagger.summary = 'Delete publisher'
        #swagger.security = [{
                "bearerAuth": []
        }] */
        const { publisher_id } = req.params;
        const publisher = await getPublisherById(publisher_id);
        if (!publisher) {
            return iResponse(res, 404, "Publisher not found");
        }
        await deletePublisherById(publisher_id);
        return iResponse(res, 200, "Delete publisher successfully");
    }
    static async getAllBooks(req: Request, res: Response) {
        /*#swagger.tags = ['Publishers']
        #swagger.description = 'Endpoint to get all books of a publisher.'
        #swagger.summary = 'Get all books of a publisher'
        #swagger.security = [{
                "bearerAuth": []
        }] */
        const { publisher_id } = req.params;
        const publisher = await getPublisherById(publisher_id);
        if (!publisher) {
            return iResponse(res, 404, "Publisher not found");
        }
        const result = await getBooksOfPublisher(publisher_id);
        return iResponse(res, 200, "Get all books of a publisher successfully", result);
        
    }
}

