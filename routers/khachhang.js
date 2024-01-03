const {
    createKhachHang,
    deleteKhachHang,
    renderKhachHangs,
    renderTimKiemKhachHangs,
    renderKhachHangEdit,
    editKhachHang,
    thuTienGet,
    thuTienPost,
    getOne
  } = require("../controllers/KhachHangController");
  
const express = require('express');
const router = express.Router();

// Render all KhachHangs
router.get("/", renderKhachHangs);

router.get("/search", renderTimKiemKhachHangs);

router.get("/thutien", thuTienGet);

router.post("/thutien", thuTienPost);

router.post("/add", createKhachHang);

router.get("/:id", getOne);

router.get("/:id/edit", renderKhachHangEdit);

router.post("/:id/edit", editKhachHang);

router.get("/:id/delete", deleteKhachHang);

module.exports =router;