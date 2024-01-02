const mongoose = require("mongoose");

const chphieunhapSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.ObjectId,
    ref: "Book",
    required: true,
  },
  maPhieuNhap: {
    type: Number,
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

chphieunhapSchema.pre("find", function () {
  this.populate("book").select("+tensach");
});

const chphieunhapModel = mongoose.model("chphieunhap", chphieunhapSchema);
module.exports = chphieunhapModel;
