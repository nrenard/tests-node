require("./env");

const env = process.env;

module.exports = {
  host: env.DB_HOST,
  username: env.DB_USER,
  password: env.DB_PASS,
  database: env.DB_NAME,
  dialect: env.DB_DIALECT || "postgres",
  logging: false,
  storage: "./__tests__/database.sqlite",
  define: {
    timestamp: true,
    underscored: true,
    underscoredAll: true
  }
};
