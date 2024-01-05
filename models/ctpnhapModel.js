const mongoose = require("mongoose");
const Book = require("./../models/bookModel");
const chphieunhapSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.ObjectId,
    ref: "Book",
    required: true,
    validate: {
      validator: async function (bookId) {
        const book = await Book.findById(bookId);
        return book && book.soluongton < 150;
      },
      message: "Sách phải có số lượng tồn nhỏ hơn 150",
    },
  },
  maPhieuNhap: {
    type: Number,
    required: true,
  },
  soLuong: {
    min: 150,
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

chphieunhapSchema.pre("find", function () {
  this.populate("book");
});

const chphieunhapModel = mongoose.model("chphieunhap", chphieunhapSchema);
module.exports = chphieunhapModel;
