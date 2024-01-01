const express = require("express");
const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema({
  masach: {
    type: String,
    required: [true, "vui long nhap ma sach"],
    unique: true,
  },
  tensach: {
    type: String,
    required: [true, "vui long nhap ten sach"],
  },
  theloai: {
    type: String,
    required: [true, "vui long nhap the loai"],
  },
  tacgia: {
    type: String,
    required: [true, "vui long nhap tac gia"],
  },
  nhaxuatban: {
    type: String,
    required: [true, "vui long nhap nha xuat ban"],
  },
  dongia: {
    type: Number,
    required: [true, "vui long nhap don gia"],
  },
});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
