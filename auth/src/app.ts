import express from "express";
import "express-async-errors";
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
    secure: process.env.NODE_ENV !== "test",
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

export { app };
