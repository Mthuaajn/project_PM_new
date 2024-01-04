const KhachHang = require("../models/khachHangModel.js");
const PhieuThu = require("../models/phieuThuModel.js");
const ctHoaDonModel = require("../models/hoadonModel.js");

const getBaoCao = async (khachHangId, month, noDau) => {
    const startDate = new Date(new Date().getFullYear(), month - 1, 1);
    const endDate = new Date(new Date().getFullYear(), month, 0, 23, 59, 59, 999);

    const hoaDonList = await ctHoaDonModel
        .find({
            ngaynhap: {
                $gte: startDate,
                $lte: endDate,
            },
        })
        .populate("book")
        .lean();

    const phieuThuList = await PhieuThu.find({
        ngaynhap: {
            $gte: startDate,
            $lte: endDate,
        },
    }).lean();

    const tongMuaCuaThang = hoaDonList.reduce((prev, cur) => {
        const khachHangIdHoaDon = cur.makh._id.toString();
        if (khachHangId === khachHangIdHoaDon) {
            const tongTien = cur.ctHoaDon.reduce((prev, cur) => prev + cur.tongTien, 0);
            return prev + tongTien;
        } else {
            return prev;
        }
    }, 0);

    const tongThuCuaThang = phieuThuList.reduce((prev, cur) => {
        const khachHangIdPhieuThu = cur.khachHang.toString();
        if (khachHangId === khachHangIdPhieuThu) {
            return prev + cur.soTienThu;
        } else {
            return prev;
        }
    }, 0);
    const phatSinhCuaThang = tongThuCuaThang - tongMuaCuaThang;

    return {
        noDau: noDau,
        phatSinh: phatSinhCuaThang,
        noCuoi: noDau + phatSinhCuaThang,
    };
};

const baoCaoCongNoRender = async (req, res, next) => {
    const targetMonth = 1;
    const khachHangList = await KhachHang.find().lean();
    const danhSachNoCong = [];
    for (let j = 0; j < khachHangList.length; j++) {
        let result = {};
        for (let i = 1; i <= targetMonth; i++) {
            if (i === 1) {
                result = await getBaoCao(khachHangList[j]._id.toString(), i, khachHangList[j].tienNo);
            } else {
                result = await getBaoCao(khachHangList[j]._id.toString(), i, result.noCuoi);
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
    const {targetMonth} = req.body;
    const khachHangList = await KhachHang.find().lean();
    const danhSachNoCong = [];
    for (let j = 0; j < khachHangList.length; j++) {
        let result = {};
        for (let i = 1; i <= targetMonth; i++) {
            if (i === 1) {
                result = await getBaoCao(khachHangList[j]._id.toString(), i, khachHangList[j].tienNo);
            } else {
                result = await getBaoCao(khachHangList[j]._id.toString(), i, result.noCuoi);
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
    res.json({danhSachNoCong});
};

module.exports = {
    baoCaoCongNoRender,
    baoCaoCongNoPost,
};
