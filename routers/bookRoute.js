const express = require("express");
const bookRoute = express.Router();
const bookController = require("./../controllers/bookController");

bookRoute.route("/dlsach").get(bookController.getdlSach);
bookRoute.route("/qlsach").get(bookController.renderPageQLsach).post(bookController.qlsach);
bookRoute.route("/nhapsach").get(bookController.nhapsach);
bookRoute.route("/phieunhap/taosach").post(bookController.taoCTPNhap);
bookRoute.route("/phieunhap/taophieunhap").post(bookController.taoPhieuNhap);
bookRoute.route("/bansach").get(bookController.renderPagebanSach);
bookRoute.route("/theloai/:id").delete(bookController.deleteTheLoai);
bookRoute.route("/pagetimkiem").get(bookController.renderPageTimKiemSach);
bookRoute.route("/timkiemsach").get(bookController.timkiemSach);
module.exports = bookRoute;
