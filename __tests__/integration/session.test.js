const request = require("supertest");

const server = require("../../src/server");

const truncate = require("../utils/truncate");
const { User } = require("../../src/app/models");

const userToCreate = {
  name: "Diego",
  email: "diego@rocketseat.com",
  password: "123456"
};

describe("Authentication", () => {
  beforeEach(async () => {
    return await truncate();
  });

  it("should be able to authenticate with valid credentials", async () => {
    const user = await User.create(userToCreate);

    const response = await request(server)
      .post("/sessions", { json: true })
      .send({
        email: userToCreate.email,
        password: userToCreate.password
      });

    expect(response.status).toBe(200);
  });

  it("should not be able to authenticate with invalid credentials", async () => {
    const user = await User.create(userToCreate);

    const response = await request(server)
      .post("/sessions", { json: true })
      .send({
        email: userToCreate.email,
        password: ""
      });

    expect(response.status).toBe(401);
  });
});
