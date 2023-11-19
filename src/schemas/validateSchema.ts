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
