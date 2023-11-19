import Joi, { ObjectSchema } from "joi";

export const registerSchema: ObjectSchema = Joi.object({
  employee_name: Joi.string().required(),
  password: Joi.string().min(6).required(),
  position: Joi.string().valid("admin", "staff").required(),
});

export const loginSchema: ObjectSchema = Joi.object({
  employee_id: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

export const newbookSchema: ObjectSchema = Joi.object({
  publisher_id: Joi.string().required(),
  title: Joi.string().required(),
  author: Joi.string().required(),
  genre: Joi.string().required(),
  publication_year: Joi.number().required(),
  isbn: Joi.string().required(),
  quantity: Joi.number().required(),
});

export const updateBookSchema: ObjectSchema = Joi.object({
  publisher_id: Joi.string(),
  title: Joi.string(),
  author: Joi.string(),
  genre: Joi.string(),
  publication_year: Joi.number(),
  isbn: Joi.string(),
  quantity: Joi.number(),
});

export const newBorrowerSchema: ObjectSchema = Joi.object({
  full_name: Joi.string().required(),
  address: Joi.string().required(),
  phone_number: Joi.string().required(),
})

export const recordSchema: ObjectSchema = Joi.object({
  book_id: Joi.string().required(),
  borrower_id: Joi.string().required(),
  borrow_date: Joi.string().pattern(/^\d{2}\/\d{2}\/\d{4}$/).required(),
  return_date: Joi.string().pattern(/^\d{2}\/\d{2}\/\d{4}$/).min(Joi.ref('borrow_date')).required(),
  status: Joi.string().valid("borrowed", "returned", "overdue", "pending").required(),
});

export const updateRecordSchema: ObjectSchema = Joi.object({
  book_id: Joi.string(),
  borrower_id: Joi.string(),
  borrow_date: Joi.string().pattern(/^\d{2}\/\d{2}\/\d{4}$/),
  return_date: Joi.string().pattern(/^\d{2}\/\d{2}\/\d{4}$/).min(Joi.ref('borrow_date')),
  status: Joi.string().valid("borrowed", "returned", "overdue", "pending"),
});

export const newPublisherSchema: ObjectSchema = Joi.object({
  publisher_name: Joi.string().required(),
  address: Joi.string().required(),
  phone_number: Joi.string().required(),
});

export const updatePublisherSchema: ObjectSchema = Joi.object({
  publisher_name: Joi.string(),
  address: Joi.string(),
  phone_number: Joi.string(),
});