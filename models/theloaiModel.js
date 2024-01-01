const mongoose = require("mongoose");

const theloaiSchema = new mongoose.Schema({
  matheloai: {
    type: String,
    unique: true,
    required: [true, "vui long nhap ma the loai"],
  },
  tentheloai: {
    type: String,
    required: [true, "vui long nhap ten the loai"],
  },
});

const TheLoai = mongoose.model("TheLoai", theloaiSchema);
module.exports = TheLoai;
