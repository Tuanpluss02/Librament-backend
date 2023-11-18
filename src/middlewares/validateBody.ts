import { NextFunction, Request, Response } from "express";
import Joi, { ObjectSchema } from "joi";

const registerSchema: ObjectSchema = Joi.object({
  employee_id: Joi.string().required(),
  employee_name: Joi.string().required(),
  password: Joi.string().min(6).required(),
  position: Joi.string().valid("admin", "staff").required(),
});

const loginSchema: ObjectSchema = Joi.object({
  employee_id: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const newbookSchema: ObjectSchema = Joi.object({
  book_id: Joi.string().required(),
  publisher_id: Joi.string().required(),
  title: Joi.string().required(),
  author: Joi.string().required(),
  genre: Joi.string().required(),
  publication_year: Joi.number().required(),
  isbn: Joi.string().required(),
  quantity: Joi.number().required(),
});

export const registerBodyValidate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }
  next();
};

export const loginBodyValidate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }
  next();
};

export const newbookBodyValidate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = newbookSchema.validate(req.body);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }
  next();
};
