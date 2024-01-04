const express = require("express");
const mongoose = require("mongoose");

const cttonSchema = new mongoose.Schema({
  MaBaoCaoTon: {
    type: String,
    required: [true, "vui long nhap ma bao cao ton"],
    unique: true,
  },
  MaSach: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: [true, "vui long nhap ma sach"],
  },
  TonDau: {
    type: Number,
    required: [true, "vui long nhap ton dau"],
  },
  TonCuoi: {
    type: Number,
    required: [true, "vui long nhap ton cuoi"],
  },
  PhatSinh: {
    type: Number,
    required: [true, "vui long nhap phat sinh"],
  },
});
const CTTON = mongoose.model("CTTON", cttonSchema);
module.exports = CTTON;
