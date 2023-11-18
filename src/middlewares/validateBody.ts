import { NextFunction, Request, Response } from "express";
import Joi, { ObjectSchema } from "joi";

const registerSchema: ObjectSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  full_name: Joi.string().required(),
  role: Joi.string().valid("boss", "staff").required(),
});

const loginSchema: ObjectSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
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
  req.body.email = req.body.email.toLowerCase();
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
  req.body.email = req.body.email.toLowerCase();
  next();
};
