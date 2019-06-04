module.exports = (sequelize, DataTypes) =>
  sequelize.define("User", {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password_hash: DataTypes.STRING
  });
