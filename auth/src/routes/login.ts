import express, { Request, Response } from "express";
import Jwt from "jsonwebtoken";
import { body } from "express-validator";
import { validateRequest } from "../middleware/validate-request";
import { User } from "../models/user";
import { BadRequestError } from "../errors/bad-request-error";
import { PasswordManager } from "../services/passwordManager";

const router = express.Router();

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a password"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError("invalid credentials");
    }

    const validPassword = PasswordManager.compare(
      existingUser.password,
      password
    );

    if (!validPassword) {
      throw new BadRequestError("Invalid credentials");
    }

    const userJwt = Jwt.sign(
      {
        id: existingUser._id,
        email: existingUser.email,
      },
      process.env.JWT_key!
    );

    req.session = {
      jwt: userJwt,
    };

    res.send(existingUser);
  }
);

export { router as loginRouter };
