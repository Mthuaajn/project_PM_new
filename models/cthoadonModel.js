const mongoose = require("mongoose");
const sachModel = require("./../models/bookModel");
const ctHoaDonSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.ObjectId,
    ref: "Book",
    required: true,
  },
  maHoaDon: {
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

ctHoaDonSchema.pre("find", function () {
  this.populate("book");
});
const ctHoaDonModel = mongoose.model("ctHoaDon", ctHoaDonSchema);
module.exports = ctHoaDonModel;
