const express = require("express");
const mongoose = require("mongoose");

const nxbSchema = new mongoose.Schema({
  manxb: {
    type: String,
    unique: true,
    required: [true, "vui long nhap ma nxb"],
  },
  tennxb: {
    type: String,
    required: [true, "vui long nhap ten nxb"],
  },
});

const NXB = mongoose.model("NXB", nxbSchema);

module.exports = NXB;
