const express = require("express");
const {baoCaoCongNoRender, baoCaoCongNoPost} = require("../controllers/baoCaoController");
const router = express.Router();

router.get("/", baoCaoCongNoRender);
router.post("/", baoCaoCongNoPost);

module.exports = router;
