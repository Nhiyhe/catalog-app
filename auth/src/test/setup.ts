import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import { app } from "../app";
import mongoose from "mongoose";

let mongoServer: any;

declare global {
  var getCookie: () => Promise<string[]>;
}

beforeAll(async () => {
  process.env.JWT_key = "ldbvdlb";
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

global.getCookie = async () => {
  const email = "test@test.com";
  const password = "password";

  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email,
      password,
    })
    .expect(201);

  const cookie = response.get("Set-Cookie");

  return cookie;
};
