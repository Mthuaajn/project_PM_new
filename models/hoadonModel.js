const mongoose = require("mongoose");

const hoaDonSchema = new mongoose.Schema(
  {
    maHD: {
      type: Number,
      required: true,
    },
    ctHoaDon: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "ctHoaDon",
        required: true,
      },
    ],
    ngaynhap: {
      type: Date,
      default: Date.now(),
    },
    makh: {
      type: mongoose.Schema.ObjectId,
      ref: "KhachHang",
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

hoaDonSchema.virtual("tongTien").get(function () {
  return this.ctHoaDon.reduce((total, ctHoaDon) => {
    return total + ctHoaDon.tongTien;
  }, 0);
});

hoaDonSchema.pre("find", function () {
  this.populate({
    path: "ctHoaDon",
    select: "tongTien maHoaDon",
  }).populate({
    path: "makh",
    select: "maKhachHang", 
  });
});
const HoaDonModel = mongoose.model("HoaDon", hoaDonSchema);

module.exports = HoaDonModel;
