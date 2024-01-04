const KhachHang = require("../models/khachHangModel.js");
const PhieuThu = require("../models/phieuThuModel.js");

const renderKhachHangs = async (req, res) => {
    try {
        const KhachHangs = await KhachHang.find().lean();

        res.render("khach_hang/khachhang", {
            khachHangs: KhachHangs,
            messages: [],
        });
    } catch (error) {
        console.log({error});
        return res.render("error", {errorMessage: error.message});
    }
};

const renderTimKiemKhachHangs = async (req, res) => {
    try {
        const KhachHangs = await KhachHang.find().lean();
        console.log(KhachHangs, "abc");
        res.render("khach_hang/timkiemkhachhang", {
            khachHangs: KhachHangs,
        });
    } catch (error) {
        console.log({error});
        return res.render("error", {errorMessage: error.message});
    }
};

const createKhachHang = async (req, res, next) => {
    try {
        const errorMessages = [];
        const successMessages = [];

        const {maKhachHang, hoTen, diaChi, dienThoai, email, tienNo} = req.body;

        const khachHang = await KhachHang.findOne({maKhachHang}).lean();
        if (khachHang) {
            errorMessages.push({
                message: "Mã Khách Hàng bị trùng, vui lòng nhập lại",
            });
        }
        if (!maKhachHang || !hoTen || !diaChi || !dienThoai || !email || !tienNo) {
            errorMessages.push({
                message: "Vui lòng điền đầy đủ thông tin khách hàng.",
            });
        }
        if (dienThoai?.length !== 10 || !/^\d+$/.test(dienThoai)) {
            // regular expression kiem tra so dien thoai
            errorMessages.push({
                message: "Số điện thoại phải chứa đúng 10 số và chỉ chấp nhận ký tự số.",
            });
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            // regular expression kiem tra email
            errorMessages.push({
                message: "Định dạng email không đúng.",
            });
        }
        if (errorMessages.length === 0) {
            const khachHang = new KhachHang(req.body);
            await khachHang.save();
            successMessages.push({
                message: "Thành công",
            });
        }

        const messages = [...errorMessages, ...successMessages];

        return res.json({messages, khachHangs: KhachHangs});
    } catch (error) {
        console.log({error});
        return res.render("error", {errorMessage: error.message});
    }
};

const renderKhachHangEdit = async (req, res, next) => {
    const KhachHang = await KhachHang.findById(req.params.id).lean();
    res.render("edit", {KhachHang});
};

const editKhachHang = async (req, res, next) => {
    const errorMessages = [];
    const successMessages = [];

    const {maKhachHang, hoTen, diaChi, dienThoai, email, tienNo} = req.body;

    if (!maKhachHang || !hoTen || !diaChi || !dienThoai || !email || !tienNo) {
        errorMessages.push({
            message: "Vui lòng điền đầy đủ thông tin khách hàng.",
        });
    }
    if (dienThoai?.length !== 10 || !/^\d+$/.test(dienThoai)) {
        // regular expression kiem tra so dien thoai
        errorMessages.push({
            message: "Số điện thoại phải chứa đúng 10 số và chỉ chấp nhận ký tự số.",
        });
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
        // regular expression kiem tra email
        errorMessages.push({
            message: "Định dạng email không đúng.",
        });
    }
    if (errorMessages.length === 0) {
        const {id} = req.params;
        await KhachHang.updateOne({_id: id}, req.body);
        successMessages.push({
            message: "Cập nhật khách hàng thành công",
        });
    }
    const KhachHangs = await KhachHang.find().lean();

    const messages = [...errorMessages, ...successMessages];

    return res.json({messages, khachHangs: KhachHangs});
};

const deleteKhachHang = async (req, res, next) => {
    const {id} = req.params;
    const errorMessages = [];
    const successMessages = [];

    const khachHang = await KhachHang.findById(id);

    if (khachHang) {
        const tienNo = khachHang.tienNo;
        if (tienNo > 0) {
            errorMessages.push({
                message: "Vui lòng thanh toán nợ trước khi xóa.",
            });
        }
    }

    if (errorMessages.length === 0) {
        await KhachHang.remove({_id: id});
        successMessages.push({
            message: "Xóa khách hàng thành công",
        });
    }
    const KhachHangs = await KhachHang.find().lean();

    const messages = [...errorMessages, ...successMessages];

    return res.json({messages, khachHangs: KhachHangs});
};

const thuTienGet = async (req, res, next) => {
    const KhachHangs = await KhachHang.find().lean();
    const PhieuThus = await PhieuThu.find().lean();
    const newData = PhieuThus.map((phieuThu) => {
        const khachHang = KhachHangs.find((khachHang) => {
            return phieuThu.khachHang.toString() === khachHang._id.toString();
        });
        return {
            maPhieuThu: phieuThu.maPhieuThu,
            soTienThu: phieuThu.soTienThu,
            khachHang: phieuThu.khachHang,
            ngaynhap: phieuThu.ngaynhap,
            tenKhachHang: khachHang.hoTen,
            diaChi: khachHang.diaChi,
            email: khachHang.email,
        };
    });
    console.log(newData);
    res.render("khach_hang/thutien", {
        khachHangs: KhachHangs,
        phieuThus: newData,
        messages: [],
    });
};

const thuTienPost = async (req, res, next) => {
    const {maKhachHang, maPhieuThu, customerLoan, soTienThu} = req.body;
    const successMessages = [];
    const errorMessages = [];
    const phieuThu = await PhieuThu.findOne({maPhieuThu: maPhieuThu});
    const khachHang = await KhachHang.findById(maKhachHang);
    const khachHangs = await KhachHang.find().lean();

    if (phieuThu) {
        errorMessages.push({
            message: "Mã phiếu thu đã tồn tại, vui lòng nhập lại",
        });
    }

    if (soTienThu > khachHang.tienNo) {
        errorMessages.push({
            message: "Số tiền thu không được vượt quá số tiền khách hàng đang nợ",
        });
    }

    if (errorMessages.length === 0) {
        const newSoTien = Math.abs(soTienThu - khachHang.tienNo);
        await KhachHang.findByIdAndUpdate(
            {_id: maKhachHang},
            {
                $set: {
                    tienNo: newSoTien,
                },
            },
            {new: true}
        );

        const data = {
            maPhieuThu: maPhieuThu,
            soTienThu: soTienThu,
            khachHang: maKhachHang,
            tenKhachHang: khachHang.hoTen,
        };

        const phieuThu = new PhieuThu(data);
        await phieuThu.save();
        successMessages.push({
            message: "Tạo mới phiếu thu thành công",
        });
    }
    const PhieuThus = await PhieuThu.find().lean();
    const newData = PhieuThus.map((phieuThu) => {
        const khachHang = khachHangs.find((khachHang) => phieuThu.khachHang.toString() === khachHang._id.toString());
        return {
            maPhieuThu: phieuThu.maPhieuThu,
            soTienThu: phieuThu.soTienThu,
            khachHang: phieuThu.khachHang,
            ngaynhap: phieuThu.ngaynhap,
            tenKhachHang: khachHang.hoTen,
            diaChi: khachHang.diaChi,
            email: khachHang.email,
        };
    });
    const messages = [...errorMessages, ...successMessages];

    return res.json({phieuThus: newData, messages});
};

const deletePhieuThu = async (req, res, next) => {
    const {id} = req.params;
    const errorMessages = [];
    const successMessages = [];

    const phieuThu = await PhieuThu.findById(id);

    if (phieuThu && errorMessages.length === 0) {
        await phieuThu.remove({_id: id});
        successMessages.push({
            message: "Xóa phiếu thu thành công",
        });
    }

    const PhieuThus = await PhieuThu.find().lean();
    const messages = [...errorMessages, ...successMessages];

    return res.json({messages, phieuThus: PhieuThus});
};

const getOne = async (req, res, next) => {
    const {id} = req.params;
    const khachHang = await KhachHang.findOne({_id: id});
    return res.json(khachHang);
};

module.exports = {
    renderKhachHangs,
    renderTimKiemKhachHangs,
    createKhachHang,
    renderKhachHangEdit,
    editKhachHang,
    deleteKhachHang,
    thuTienGet,
    thuTienPost,
    deletePhieuThu,
    getOne,
};
