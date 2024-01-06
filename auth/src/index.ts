import express from "express";
import "express-async-errors";
import mongoose from "mongoose";
import cookieSession from "cookie-session";

import { currentUserRouter } from "./routes/current-user";
import { loginRouter } from "./routes/login";
import { logoutRouter } from "./routes/logout";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middleware/error-handler";
import { NotFoundError } from "./errors/notfound-error";

const app = express();

const BASE_URL = "/api/users";

//setting up cookie session
app.set("trust proxy", true);

app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

//setting up middlewares
app.use(express.json());

app.use(BASE_URL, currentUserRouter);
app.use(BASE_URL, loginRouter);
app.use(BASE_URL, logoutRouter);
app.use(BASE_URL, signupRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
  if (!process.env.JWT_key) {
    throw new Error("JWT_key must be defined");
  }

  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("Connected to Mongo Db");
  } catch (error) {
    console.error(error);
  }

  app.listen(3000, () => {
    console.log(`Auth service running on port 3000!!!!`);
  });
};

start();
