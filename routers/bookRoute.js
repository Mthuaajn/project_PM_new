const express = require("express");
const bookRoute = express.Router();
const bookController = require("./../controllers/bookController");

bookRoute.route("/dlsach").get(bookController.getdlSach);
bookRoute.route("/qlsach").get(bookController.renderPageQLsach).post(bookController.qlsach);
bookRoute.route("/nhapsach").get(bookController.nhapsach);
bookRoute.route("/bansach").get(bookController.renderPagebanSach);
bookRoute.route("/theloai/:id").delete(bookController.deleteTheLoai);

module.exports = bookRoute;
