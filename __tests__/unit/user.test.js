const bcrypt = require("bcryptjs");

const truncate = require("../utils/truncate");
const factory = require("../factories");

const defaultPassword = "123456";

describe("User", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("Should encrypt user password", async () => {
    const user = await factory.create("User", { password: defaultPassword });

    const compareHash = await bcrypt.compare(
      defaultPassword,
      user.password_hash
    );

    expect(compareHash).toBe(true);
  });
});
