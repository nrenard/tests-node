require("./config/env");

const express = require("express");
const morgan = require("morgan");

class Server {
  constructor() {
    this.express = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.express.use(express.json());
    this.express.use(morgan("dev"));
  }

  routes() {
    this.express.use(require("./routes"));
  }
}

module.exports = new Server().express;
