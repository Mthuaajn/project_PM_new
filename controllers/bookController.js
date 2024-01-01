const fs = require("fs");
const theloaiModel = require("./../models/theloaiModel");
const nxbModel = require("./../models/nxbModel");

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
