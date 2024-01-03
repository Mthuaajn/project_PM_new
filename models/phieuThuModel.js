const mongoose = require("mongoose");

const phieuThuSchema = new mongoose.Schema({
  khachHang: {
    type: mongoose.Schema.ObjectId,
    ref: "KhachHang",
    required: true,
  },
  tenKhachHang: {
    type: String,
    required: true
  },
  maPhieuThu: {
    type: Number,
    required: true,
  },
  soTienThu: {
    type: Number,
    required: true,
  },
  ngaynhap: {
    type: Date,
    default: Date.now(),
  },
});

phieuThuSchema.pre("find", function () {
  this.populate("KhachHang");
});

const phieuThupModel = mongoose.model("phieuthu", phieuThuSchema);
module.exports = phieuThupModel;
