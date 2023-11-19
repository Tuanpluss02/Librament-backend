import { RowDataPacket } from "mysql2";
import conn from "../database";
import { nextId } from "../utils/id_manage";

export const addNewPublisher = async (publisher: any) => {
    try {
        const sql = "INSERT INTO publishers SET ?";
        const publisher_id = await nextId("PUB");
        const values = {
            publisher_id,
            publisher_name: publisher.publisher_name,
            address: publisher.address,
            phone_number: publisher.phone_number,
        };
        await (await conn).query(sql, [values]);
        return values;
    } catch (err) {
        throw err;
    }
}

export const getPublisherById = async (publisher_id: string) => {
    try {
        const sql = "SELECT * FROM publishers WHERE publisher_id = ?";
        const [rows] = await (
            await conn
        ).query<RowDataPacket[]>(sql, [publisher_id]);
        const result = rows[0];
        return result;
    } catch (err) {
        throw err;
    }
}

export const getAllPublishers = async () => {
    try {
        const sql = "SELECT * FROM publishers";
        const [rows] = await (await conn).query(sql);
        return rows;
    } catch (err) {
        throw err;
    }
}

export const updatePublisherInfor = async (
    publisher_id: string,
    publisher: any
) => {
    try {
        const sql = "UPDATE publishers SET ? WHERE publisher_id = ?";
        const publisherExist = await getPublisherById(publisher_id);
        const values = {
            publisher_name: publisher.publisher_name || publisherExist.publisher_name,
            phone_number: publisher.phone_number || publisherExist.phone_number,
        };
        await (await conn).query(sql, [values, publisher_id]);
        return values;
    } catch (err) {
        throw err;
    }
}


export const deletePublisherById = async (publisher_id: string) => {
    try {
        const sql = "DELETE FROM publishers WHERE publisher_id = ?";
        await (await conn).query(sql, [publisher_id]);
        return;
    } catch (err) {
        throw err;
    }
}

export const getBooksOfPublisher = async (publisher_id: string) => {
    try {
        const sql = "SELECT * FROM books WHERE publisher_id = ?";
        const [rows] = await (await conn).query(sql, [publisher_id]);
        return rows;
    } catch (err) {
        throw err;
    }
}

export const getRecordsOfPublisher = async (publisher_id: string) => {
    try {
        const sql = "SELECT * FROM records WHERE publisher_id = ?";
        const [rows] = await (await conn).query(sql, [publisher_id]);
        return rows;
    } catch (err) {
        throw err;
    }
}