const bcrypt = require("bcryptjs");

const tokenService = require("../services/Token");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.VIRTUAL,
      password_hash: DataTypes.STRING
    },
    {
      hooks: {
        beforeSave: async user => {
          if (user.password) {
            user.password_hash = await bcrypt.hash(user.password, 8);
          }
        }
      }
    }
  );

  User.prototype.checkPassword = async function(password) {
    return await bcrypt.compare(password, this.password_hash);
  };

  User.prototype.generateToken = function() {
    return tokenService.store({ id: this.id });
  };

  return User;
};
