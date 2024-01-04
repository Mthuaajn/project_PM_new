const express = require("express");
const mongoose = require("mongoose");

const baocaotonSchema = new mongoose.Schema({
  CTBaoCao: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "CTTON",
      unique: true,
    },
  ],
  Thang: {
    type: Date,
    required: [true, "vui long nhap thang"],
  },
});
const Baocaoton = mongoose.model("Baocaoton", baocaotonSchema);
module.exports = Baocaoton;
