const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = express();


if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// middleware
app.use(express.json());

module.exports = app;
