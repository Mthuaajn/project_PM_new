const fs = require("fs");
const theloaiModel = require("./../models/theloaiModel");
const nxbModel = require("./../models/nxbModel");
const bookModel = require("./../models/bookModel");
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
      await bookModel.create(newBook);
      await book.save();
      res.redirect(req.headers.referer);
      break;
    case "save":
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

exports.renderPage = async (req, res, next) => {
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
