import request from "supertest";
import { app } from "../../app";

describe("Login user", () => {
  it("should fail when supplied email does not exists", async () => {
    return request(app)
      .post("/api/users/login")
      .send({ email: "test@gmail.com", password: "password" })
      .expect(400);
  });

  it("shoud fail when invalid password is provides", async () => {
    await request(app)
      .post("/api/users/signup")
      .send({ email: "test@gmail.com", password: "password" })
      .expect(201);

    await request(app)
      .post("/api/users/login")
      .send({ email: "test2@gmail.com", password: "password" })
      .expect(400);
  });

  it("response with a cookie when given valid credentials", async () => {
    const email = "test2@test.com";
    const password = "password";

    await request(app)
      .post("/api/users/signup")
      .send({ email, password })
      .expect(201);

    const response = await request(app)
      .post("/api/users/login")
      .send({ email, password })
      .expect(200);

    expect(response.get("Set-Cookie")).toBeDefined();
  });
});
