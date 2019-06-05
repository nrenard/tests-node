const bcrypt = require("bcryptjs");

const truncate = require("../utils/truncate");
const { User } = require("../../src/app/models");

const userToCreate = {
  name: "Diego",
  email: "diego@rocketseat.com",
  password: "123456"
};

describe("User", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("Should encrypt user password", async () => {
    const user = await User.create(userToCreate);

    const compareHash = await bcrypt.compare(
      userToCreate.password,
      user.password_hash
    );

    expect(compareHash).toBe(true);
  });
});
