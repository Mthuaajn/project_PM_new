const express = require("express");
const router = express.Router();
const LapBaoCaoTonController = require("./../controllers/baocaotonController");
router.get("/", LapBaoCaoTonController.LapBaoCaoTon);

module.exports = router;
