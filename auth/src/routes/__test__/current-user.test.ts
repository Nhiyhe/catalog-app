import request from "supertest";
import { app } from "../../app";

describe("Current User", () => {
  it("should it returns details of current logged in user", async () => {
    const cookie = await global.getCookie();

    const response = await request(app)
      .get("/api/users/currentuser")
      .set("Cookie", cookie);

    expect(response.body.currentUser.email).toEqual("test@test.com");
  });

  it("should return null when signed in", async () => {
    const response = await request(app)
      .get("/api/users/currentuser")
      .expect(200);

    expect(response.body.currentUser).toEqual(null);
  });
});
