const jwt = require("jsonwebtoken");

const secret = process.env.APP_SECRET;
const expiresIn = 86400;

class Token {
  store(cripted) {
    return jwt.sign(cripted, secret, { expiresIn });
  }

  show(token) {
    return jwt.verify(token, secret);
  }
}

module.exports = new Token();
