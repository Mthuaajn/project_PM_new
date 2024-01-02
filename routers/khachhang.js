const {
    createKhachHang,
    deleteKhachHang,
    renderKhachHangs,
    renderTimKiemKhachHangs,
    renderKhachHangEdit,
    editKhachHang,
  } = require("../controllers/KhachHangController");
  
const express = require('express');
const router = express.Router();

// Render all KhachHangs
router.get("/", renderKhachHangs);

router.get("/search", renderTimKiemKhachHangs);

router.post("/add", createKhachHang);

router.get("/:id/edit", renderKhachHangEdit);

router.post("/:id/edit", editKhachHang);

router.get("/:id/delete", deleteKhachHang);

module.exports =router;