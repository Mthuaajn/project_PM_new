const KhachHang = require("../models/khachHangModel.js");
const PhieuThu = require("../models/phieuThuModel.js");
const ctHoaDonModel = require("../models/hoadonModel.js");

const getBaoCao = async (khachHangId, month, year, noDau) => {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);

    const hoaDonList = await ctHoaDonModel
        .find({
            ngaynhap: {
                $gte: startDate,
                $lte: endDate,
            },
            makh: khachHangId,
        })
        .populate("book")
        .lean();
    const phieuThuList = await PhieuThu.find({
        ngaynhap: {
            $gte: startDate,
            $lte: endDate,
        },
        khachHang: khachHangId,
    }).lean();

    const tongMuaCuaThang = hoaDonList.reduce((prev, cur) => {
        const tongTien = cur.ctHoaDon.reduce((prev, cur) => prev + cur.tongTien, 0);
        return prev + tongTien;
    }, 0);

    const tongThuCuaThang = phieuThuList.reduce((prev, cur) => {
        return prev + cur.soTienThu;
    }, 0);
    
    const phatSinhCuaThang = tongMuaCuaThang - tongThuCuaThang;

    return {
        noDau: noDau,
        phatSinh: phatSinhCuaThang,
        noCuoi: noDau + phatSinhCuaThang <= 0 ? 0 : noDau + phatSinhCuaThang,
    };
};

const baoCaoCongNoRender = async (req, res, next) => {
    const targetMonth = 1;
    const targetYear = 2023;
    const khachHangList = await KhachHang.find().lean();
    const danhSachNoCong = [];
    for (let j = 0; j < khachHangList.length; j++) {
        let result = {};
        for (let i = 1; i <= targetMonth; i++) {
            if (i === 1) {
                result = await getBaoCao(khachHangList[j]._id.toString(), i, targetYear, khachHangList[j].tienNo);
            } else {
                result = await getBaoCao(khachHangList[j]._id.toString(), i, targetYear, result.noCuoi);
            }
        }
        danhSachNoCong.push({
            stt: j + 1,
            hoTen: khachHangList[j].hoTen,
            noDau: result.noDau,
            phatSinh: result.phatSinh,
            noCuoi: result.noCuoi,
        });
    }
    res.render("baocao/nocong", {
        danhSachNoCong: danhSachNoCong,
    });
};

const baoCaoCongNoPost = async (req, res, next) => {
    const { targetMonth } = req.body;
    const monthYearArray = targetMonth.split("/");

    const khachHangList = await KhachHang.find().lean();
    const danhSachNoCong = [];
    for (let j = 0; j < khachHangList.length; j++) {
        let result = {};
        for (let i = 1; i <= monthYearArray[0]; i++) {
            if (i === 1) {
                result = await getBaoCao(khachHangList[j]._id.toString(), i, monthYearArray[1], khachHangList[j].tienNo);
            } else {
                result = await getBaoCao(khachHangList[j]._id.toString(), i, monthYearArray[1], result.noCuoi);
            }
        }
        danhSachNoCong.push({
            stt: j + 1,
            hoTen: khachHangList[j].hoTen,
            noDau: result.noDau,
            phatSinh: result.phatSinh,
            noCuoi: result.noCuoi,
        });
    }
    res.json({ danhSachNoCong });
};

module.exports = {
    baoCaoCongNoRender,
    baoCaoCongNoPost,
};
