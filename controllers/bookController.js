const fs = require("fs");
const theloaiModel = require("./../models/theloaiModel");
const nxbModel = require("./../models/nxbModel");
const bookModel = require("./../models/bookModel");
const ctpnhapModel = require("./../models/ctpnhapModel");
const pNhapModel = require("./../models/pnhapModel");
const KhachHangModel = require("../models/khachHangModel.js");
const ctHoaDonModel = require("../models/cthoadonModel.js");
const hoaDonModel = require("../models/hoadonModel.js");
exports.getdlSach = async (req, res, next) => {
  const theloais = await theloaiModel.find({});
  const nxbs = await nxbModel.find({});
  const data = {
    title: "Book Management",
    listTheLoai: theloais,
    ListNXB: nxbs,
  };
  res.render("sach/dlsach", data);
};

exports.deleteTheLoai = async (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  const theloai = await theloaiModel.findByIdAndDelete(id);
  res.redirect(req.headers.referer || "/");
};

exports.qlsach = async (req, res, next) => {
  const { bookId, bookName, bookAuthor, bookCate, bookPublisher, bookPrice, action } = req.body;
  const book = await bookModel.findOne({ masach: bookId });
  const newBook = {
    masach: bookId,
    tensach: bookName,
    theloai: bookCate,
    tacgia: bookAuthor,
    nhaxuatban: bookPublisher,
    dongia: bookPrice,
  };
  switch (action) {
    case "add":
      await bookModel.findByIdAndUpdate(book._id, { soluongton: book.soluongton + 1 });
      res.redirect(req.headers.referer);
      break;
    case "delete":
      if (book.soluongton > 1) {
        await bookModel.findByIdAndUpdate(book._id, { soluongton: book.soluongton - 1 });
      } else {
        await bookModel.findByIdAndDelete(book._id);
      }

      res.redirect(req.headers.referer);
      break;
    case "update":
      const bookUpdate = await bookModel.findByIdAndUpdate(
        book._id,
        {
          tensach: bookName,
          tacgia: bookAuthor,
          theloai: bookCate,
          nhaxuatban: bookPublisher,
          dongia: bookPrice,
        },
        {
          new: true,
          runValidators: true,
        }
      );
      res.redirect(req.headers.referer);
      break;
    default:
  }
};

exports.renderPageQLsach = async (req, res, next) => {
  const books = await bookModel.find({});
  const theloais = await theloaiModel.find({});
  const nxbs = await nxbModel.find({});
  const data = {
    books,
    theloais,
    nxbs,
  };
  res.render("sach/qlsach", data);
};

exports.nhapsach = async (req, res, next) => {
  const phieuNhaps = await pNhapModel.find({});
  const books = await bookModel.find({});
  const ctPhieuNhaps = await ctpnhapModel.find({});

  const data = {
    books,
    ctPhieuNhaps,
    phieuNhaps,
  };
  res.render("sach/nhapsach", data);
};

exports.taoCTPNhap = async (req, res, next) => {
  const query = {};
  query["tensach"] = req.body.bookName;
  const book = await bookModel.findOne(query);
  const lastPhieuNhap = await ctpnhapModel.findOne().sort("-maPhieuNhap");
  const newMaPhieuNhap = lastPhieuNhap ? lastPhieuNhap.maPhieuNhap + 1 : 1;
  const newCTPNhap = {
    maPhieuNhap: newMaPhieuNhap,
    book,
    soLuong: req.body.bookQuantity,
    donGia: +req.body.bookPrice,
    tongTien: req.body.bookQuantity * req.body.bookPrice,
  };
  const ctpnhap = await ctpnhapModel.create(newCTPNhap);
  res.redirect(req.headers.referer);
};

exports.taoPhieuNhap = async (req, res, next) => {
  const ctPhieuNhaps = await ctpnhapModel.find({});
  const lastPhieuNhap = await pNhapModel.findOne().sort("-maPhieuNhap");
  const newMaHoaDon = lastPhieuNhap ? lastPhieuNhap.maPhieuNhap + 1 : 1;
  const data = {
    maPhieuNhap: newMaHoaDon,
    chphieunhap: ctPhieuNhaps.map((ctPhieuNhap) => ctPhieuNhap._id),
    ngaynhap: Date.now(),
  };
  await pNhapModel.create(data);
  ctPhieuNhaps.forEach(async (item) => {
    await bookModel.findByIdAndUpdate(item.book._id, {
      soluongton: item.book.soluongton + item.soLuong,
    });
  });
  res.redirect(req.headers.referer);
};

// ban sach
exports.renderPagebanSach = async (req, res, next) => {
  const hoaDons = await hoaDonModel.find({}).populate("KhachHang");
  const khachHangs = await KhachHangModel.find({});
  const books = await bookModel.find({});
  const ctHoaDons = await ctHoaDonModel.find({});
  const data = {
    books,
    khachHangs,
    ctHoaDons,
    hoaDons,
  };
  res.render("sach/bansach", data);
};

exports.taoCTHoaDon = async (req, res, next) => {
  const query = {};
  query["tensach"] = req.body.bookName;
  const book = await bookModel.findOne(query);
  const lastHoaDon = await ctHoaDonModel.findOne().sort("-maHoaDon");
  const newMaHoaDon = lastHoaDon ? lastHoaDon.maHoaDon + 1 : 1;
  const newCTHoaDon = {
    maHoaDon: newMaHoaDon,
    book,
    soLuong: req.body.bookQuantity,
    donGia: +req.body.bookPrice,
    tongTien: req.body.bookQuantity * req.body.bookPrice,
  };
  const ctHD = await ctHoaDonModel.create(newCTHoaDon);
  res.redirect(req.headers.referer);
};

exports.taoHoaDon = async (req, res, next) => {
  const ctHoaDons = await ctHoaDonModel.find({}).populate("book");
  const khachHang = await KhachHangModel.findOne({ maKhachHang: req.body.maKhachHang });
  const lastHD = await hoaDonModel.findOne().sort("-maHD");
  const newMaHoaDon = lastHD ? lastHD.maHD + 1 : 1;
  const data = {
    maHD: newMaHoaDon,
    ctHoaDon: ctHoaDons.map((ctHoaDon) => ctHoaDon._id),
    ngaynhap: Date.now(),
    makh: khachHang._id,
  };
  await hoaDonModel.create(data);
  ctHoaDons.forEach(async (item) => {
    await bookModel.findByIdAndUpdate(item.book._id, {
      soluongton: item.book.soluongton - item.soLuong,
    });
  });
  res.redirect(req.headers.referer);
};
// tim kiem sach
exports.renderPageTimKiemSach = async (req, res, next) => {
  const books = await bookModel.find({});
  const data = {
    books,
  };
  res.render("sach/timkiemsach", data);
};

exports.timkiemSach = async (req, res, next) => {
  let isFind = false;
  const query = {};
  query[req.query.field] = req.query.value;

  const books = await bookModel.find(query);
  if (books.length > 0) {
    isFind = true;
  }
  const data = {
    books,
    isFind,
  };
  res.render("sach/timkiemsach", data);
};
