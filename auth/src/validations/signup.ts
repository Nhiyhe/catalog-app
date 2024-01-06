import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { RequestValidationError } from "../errors/request-validation-error";

export const validateSignUp = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.body);
  body("email").isEmail().withMessage("Email is Required"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password is Required");

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }

  next();
};
