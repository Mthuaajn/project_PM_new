const express = require("express");
const mongoose = require("mongoose");
const ChiTietTon = require("./../models/cttonModel");
const BaoCaoTon = require("./../models/baocaotonModel");
const pnhapModel = require("./../models/pnhapModel");
const hoadonModel = require("./../models/hoadonModel");

exports.LapBaoCaoTon = async (req, res, next) => {
  try {
    const currentDate = new Date();
    let month = currentDate.getMonth();
    let year = currentDate.getFullYear();
    if (month === 0) {
      month = 12;
      year -= 1;
    }
    const data = `${month}/${year}`;
    res.render("baocao/ton", { data });
  } catch (err) {
    return res.render("error", { err, layout: false });
  }
};

exports.getDATA = async (req, res, next) => {
  try {
    await ChiTietTon.deleteMany({});
    const currentDate = new Date();
    let month = currentDate.getMonth();
    let year = currentDate.getFullYear();
    if (month === 0) {
      month = 12;
      year -= 1;
    }
    const data = `${month}/${year}`;
    const phieuNhaps = await pnhapModel
      .find({
        ngaynhap: {
          $gte: new Date(year, month - 1, 1),
          $lt: new Date(year, month, 1),
        },
      })
      .populate("chphieunhap");
    const hoaDons = await hoadonModel
      .find({
        ngaynhap: {
          $gte: new Date(year, month - 1, 1),
          $lt: new Date(year, month, 1),
        },
      })
      .populate("chphieunhap");

    const tondau = {};
    const luongNhap = {};
    const luongBan = {};
    const toncuoi = {};
    const phatsinh = {};
    phieuNhaps.forEach((phieuNhap) => {
      phieuNhap.chphieunhap.forEach((chitiet) => {
        const masach = chitiet.book._id.toString();
        if (!tondau[masach] || !luongNhap[masach]) {
          tondau[masach] = 0;
          luongNhap[masach] = 0;
        }
        tondau[masach] += chitiet.book.soluongton;
        tondau[masach] -= chitiet.soLuong;
        luongNhap[masach] += chitiet.soLuong;
      });
    });
    hoaDons.forEach((hoadon) => {
      hoadon.ctHoaDon.forEach((chitiet) => {
        const masach = chitiet.book._id.toString();
        if (!luongBan[masach]) {
          luongBan[masach] = 0;
        }
        luongBan[masach] += chitiet.soLuong;
      });
    });
    for (let key in tondau) {
      toncuoi[key] = tondau[key] + luongNhap[key] - luongBan[key];
      phatsinh[key] = toncuoi[key] - tondau[key];
    }
    for (const maSach in tondau) {
      const ctton = new ChiTietTon({
        MaBaoCaoTon: `${maSach}-${month}-${year}`,
        MaSach: maSach,
        TonDau: tondau[maSach],
        TonCuoi: phatsinh[maSach],
        PhatSinh: toncuoi[maSach] || 0,
      });
      if (ctton !== null) {
        await ctton.save();
      }
    }

    const ctTon = await ChiTietTon.find({}).populate("MaSach");
    res.render("baocao/ton", { data, ctTon });
  } catch (err) {
    return res.render("error", { err, layout: false });
  }
};
