const tokenService = require("../services/Token");

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({
      message: "Token not provided"
    });

  const [, token] = authHeader.split(" ");

  if (!token)
    return res.status(401).json({
      message: "Token mal formated"
    });

  try {
    const { id } = await tokenService.show(token);

    req.userId = id;

    return next();
  } catch (err) {
    return res.status(401).json({
      message: "Token invalid"
    });
  }
};
