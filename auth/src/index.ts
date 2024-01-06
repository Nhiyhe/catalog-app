import mongoose from "mongoose";
import { app } from "./app";

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
