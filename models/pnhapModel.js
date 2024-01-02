const mongoose = require("mongoose");

const pnhapSchema = new mongoose.Schema(
  {
    maPhieuNhap: {
      type: Number,
      required: true,
    },
    chphieunhap: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "chphieunhap",
        required: true,
      },
    ],
    ngaynhap: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

pnhapSchema.pre("find", function () {
  this.populate({
    path: "chphieunhap",
    select: "tongTien maPhieuNhap",
  });
});

pnhapSchema.virtual("tongTien").get(function () {
  return this.chphieunhap.reduce((tong, chphieunhap) => {
    return tong + chphieunhap.tongTien;
  }, 0);
});
const pNhapModel = mongoose.model("phieunhap", pnhapSchema);

module.exports = pNhapModel;
