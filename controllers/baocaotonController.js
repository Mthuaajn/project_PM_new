const express = require("express");
const mongoose = require("mongoose");
const ChiTietTon = require("./../models/cttonModel");
const BaoCaoTon = require("./../models/baocaotonModel");

exports.LapBaoCaoTon = (req, res, next) => {
  res.render("baocao/ton", { title: "Book Management" });
};
