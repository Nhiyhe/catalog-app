import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";
import { User, IUser } from "../models/user";
import { BadRequestError } from "../errors/bad-request-error";
import { validateSignUp } from "../validations/signup";
import { validateRequest } from "../middleware/validate-request";

const router = express.Router();

router.post(
  "/signup",
  [
    body("email").isEmail().withMessage("Email is Required"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password is Required"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("Email is already taken.");
    }

    const user = new User<IUser>({ email, password });

    await user.save();

    const userJwt = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_key!
    );

    req.session!.jwt = userJwt;

    res.status(201).send(user);
  }
);

export { router as signupRouter };
