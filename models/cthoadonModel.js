const mongoose = require("mongoose");

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
ctHoaDonSchema.pre("save", async function (next) {
  const sach = await sachModel.findById(this.sachId);
  if (sach.soLuongTon - this.soLuong < 20) {
    throw new Error("Số lượng tồn sau khi bán phải ít nhất là 20");
  }
  next();
});
ctHoaDonSchema.pre("find", function () {
  this.populate("book");
});
const ctHoaDonModel = mongoose.model("ctHoaDon", ctHoaDonSchema);
module.exports = ctHoaDonModel;
