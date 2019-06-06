const routes = require("express").Router();

const AuthMiddleware = require("./app/middlewares/auth");

const SessionController = require("./app/controllers/SessionController");

routes.post("/sessions", SessionController.store);

routes.use(AuthMiddleware);

routes.get("/dashboard", (req, res) => res.send(""));

module.exports = routes;
