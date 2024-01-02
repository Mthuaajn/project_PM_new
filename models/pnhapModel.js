const mongoose = require("mongoose");

const pnhapSchema = new mongoose.Schema({
  chphieunhap: {
    type: mongoose.Schema.ObjectId,
    ref: "chphieunhap",
    required: true,
  },
  ngaynhap: {
    type: Date,
    default: Date.now(),
  },
});

pnhapSchema.pre("find", function () {
  this.populate({
    path: "chphieunhap",
    select: "tongTien maPhieuNhap",
  });
});
const pNhapModel = mongoose.model("phieunhap", pnhapSchema);

module.exports = pNhapModel;
