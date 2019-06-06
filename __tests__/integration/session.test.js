const request = require("supertest");

const server = require("../../src/server");
const truncate = require("../utils/truncate");
const factory = require("../factories");

const defaultPassword = "123456";

describe("Authentication", () => {
  beforeEach(async () => {
    return await truncate();
  });

  it("should be able to authenticate with valid credentials", async () => {
    const user = await factory.create("User", { password: defaultPassword });

    const response = await request(server)
      .post("/sessions", { json: true })
      .send({
        email: user.email,
        password: defaultPassword
      });

    expect(response.status).toBe(200);
  });

  it("should not be able to authenticate with invalid credentials", async () => {
    const user = await factory.create("User");

    const response = await request(server)
      .post("/sessions", { json: true })
      .send({
        email: user.email,
        password: ""
      });

    expect(response.status).toBe(401);
  });

  it("should return jwt token when authenticated", async () => {
    const user = await factory.create("User", { password: defaultPassword });

    const response = await request(server)
      .post("/sessions", { json: true })
      .send({
        email: user.email,
        password: defaultPassword
      });

    expect(response.body).toHaveProperty("token");
  });

  it("should be able to access private routes when authenticated", async () => {
    const user = await factory.create("User");

    const response = await request(server)
      .get("/dashboard", { json: true })
      .set("Authorization", `Bearer ${user.generateToken()}`)
      .send();

    expect(response.status).toBe(200);
  });

  it("should not be able to access private route when not authenticated", async () => {
    const response = await request(server)
      .get("/dashboard", { json: true })
      .send();

    expect(response.status).toBe(401);
  });

  it("should not be able to access private routes when not authenticated JWT", async () => {
    const response = await request(server)
      .get("/dashboard", { json: true })
      .set("Authorization", `Bearer 12313`)
      .send();

    expect(response.status).toBe(401);
  });
});
