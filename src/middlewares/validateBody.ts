import e, { NextFunction, Request, Response } from "express";
import {
  registerSchema,
  loginSchema,
  newbookSchema,
  recordSchema,
  newPublisherSchema,
  updatePublisherSchema,
  updateBookSchema,
  updateRecordSchema,
  newBorrowerSchema,
  updateBorrowerSchema,
} from "../schemas/validateSchema";
import { iResponse } from "../utils/iResponse";
import Joi from "joi";
const validateBody = (
  req: Request,
  res: Response,
  next: NextFunction,
  schema: Joi.ObjectSchema<any>
) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return iResponse(res, 400, error.details[0].message);
  }
  next();
};

export const registerBodyValidate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  validateBody(req, res, next, registerSchema);
};

export const loginBodyValidate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  validateBody(req, res, next, loginSchema);
};

export const newbookBodyValidate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  validateBody(req, res, next, newbookSchema);
};

export const newRecordValidate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  validateBody(req, res, next, recordSchema);
}

export const updateBookValidate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  validateBody(req, res, next, updateBookSchema);
};

export const updateRecordValidate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  validateBody(req, res, next, updateRecordSchema);
};

export const updatePublisherValidate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  validateBody(req, res, next, updatePublisherSchema);
};

export const newPublisherValidate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  validateBody(req, res, next, newPublisherSchema);
};

export const newBorrowerValidate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  validateBody(req, res, next, newBorrowerSchema);
};

export const updateBorrowerValidate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  validateBody(req, res, next, updateBorrowerSchema);
};