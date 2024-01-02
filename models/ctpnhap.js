const mongoose = require("mongoose");

const chphieunhapSchema = new mongoose.Schema({
  book: {
    type: ObjectId,
    ref: "Book",
    required: true,
  },
  maPhieuNhap: {
    type: String,
    required: true,
  },
  soLuong: {
    type: Number,
    required: true,
  },
  donGia: {
    type: Number,
    required: true,
  },
  tongTien: {
    type: Number,
    required: true,
  },
});

const chphieunhapModel = mongoose.model("chphieunhap", chphieunhapSchema);
module.exports = chphieunhapModel;
