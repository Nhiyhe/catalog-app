import request from "supertest";
import { app } from "../../app";

describe("Sign Up User", () => {
  it("should returns 201 on successful signup", async () => {
    return request(app)
      .post("/api/users/signup")
      .send({
        email: "test@test.com",
        password: "passsword",
      })
      .expect(201);
  });

  it("should return 400 with an invalid email", async () => {
    return request(app)
      .post("/api/users/signup")
      .send({
        email: "testtest.com",
        password: "passsword",
      })
      .expect(400);
  });

  it("should return 400 with an invalid password", async () => {
    return request(app)
      .post("/api/users/signup")
      .send({
        email: "test@test.com",
        password: "1",
      })
      .expect(400);
  });

  it("should return 400 if email and password not supply", async () => {
    return request(app).post("/api/users/signup").send({}).expect(400);
  });

  it("should not allow duplicate emails", async () => {
    await request(app)
      .post("/api/users/signup")
      .send({ email: "test@test.com", password: "password" })
      .expect(201);

    return request(app)
      .post("/api/users/signup")
      .send({ email: "test@test.com", password: "password" })
      .expect(400);
  });

  it("sets a cookie after a successfull signup", async () => {
    const response = await request(app)
      .post("/api/users/signup")
      .send({ email: "test@test.com", password: "password" })
      .expect(201);
    expect(response.get("Set-Cookie")).toBeDefined();
  });
});
