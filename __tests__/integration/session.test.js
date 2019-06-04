const request = require("supertest");

const server = require("../../src/server");

const truncate = require("../utils/truncate");
const { User } = require("../../src/app/models");

const userToCreate = {
  name: "Diego",
  email: "diego@rocketseat.com",
  password_hash: "123456"
};

describe("Authentication", () => {
  beforeEach(async () => {
    return await truncate();
  });

  it("should be able to authenticate with valid credentials", async () => {
    const user = await User.create(userToCreate);

    const response = await request(server).post("/sessions", {
      json: true,
      body: {
        email: userToCreate.email,
        password: userToCreate.password_hash
      }
    });

    expect(response.status).toBe(200);
  });
});
