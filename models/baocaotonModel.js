const express = require("express");
const mongoose = require("mongoose");

const baocaotonSchema = new mongoose.Schema({
  MaBaoCaoTon: {
    type: String,
    required: [true, "vui long nhap ma bao cao ton"],
    unique: true,
  },
  Thang: {
    type: Date,
    required: [true, "vui long nhap thang"],
  },
});
const Baocaoton = mongoose.model("Baocaoton", baocaotonSchema);
module.exports = Baocaoton;
