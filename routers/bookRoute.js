const express = require("express");
const bookRoute = express.Router();
const bookController = require("./../controllers/bookController");

bookRoute.route("/dlsach").get(bookController.getdlSach);
bookRoute.route("/theloai/:id").get(bookController.deleteTheLoai);
bookRoute.route("/nxb/:id").get(bookController.deleteNXB);

bookRoute.route("/qlsach").get(bookController.renderPageQLsach).post(bookController.qlsach);

bookRoute.route("/nhapsach").get(bookController.nhapsach);
bookRoute.route("/phieunhap/taosach").post(bookController.taoCTPNhap);
bookRoute.route("/phieunhap/taophieunhap").post(bookController.taoPhieuNhap);
bookRoute.route("/phieunhap/:id").get(bookController.deletePhieuNhap);
bookRoute.route("/ctphieunhap/:id").get(bookController.deleteCTPhieuNhap);

bookRoute.route("/bansach").get(bookController.renderPagebanSach);
bookRoute.route("/hoadon/taosach").post(bookController.taoCTHoaDon);
bookRoute.route("/hoadon/taohoadon").post(bookController.taoHoaDon);
bookRoute.route("/hoadon/:id").get(bookController.deleteHoadon);
bookRoute.route("/cthoadon/:id").get(bookController.deleteCTHoadon);

bookRoute.route("/pagetimkiem").get(bookController.renderPageTimKiemSach);
bookRoute.route("/timkiemsach").get(bookController.timkiemSach);
module.exports = bookRoute;
