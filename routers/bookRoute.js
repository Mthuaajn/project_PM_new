const express = require("express");
const bookRoute = express.Router();
const bookController = require("./../controllers/bookController");
bookRoute.route("/dlsach").get(bookController.getdlSach);

module.exports = bookRoute;
