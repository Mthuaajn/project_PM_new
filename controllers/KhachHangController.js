const KhachHang = require("../models/khachHangModel.js");

const renderKhachHangs = async (req, res) => {
    try {
        const KhachHangs = await KhachHang.find().lean();

        res.render("khach_hang/khachhang", {
            khachHangs: KhachHangs,
            messages: []
        });
    } catch (error) {
        console.log({ error });
        return res.render("error", { errorMessage: error.message });
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
        console.log({ error });
        return res.render("error", { errorMessage: error.message });
    }
};

const createKhachHang = async (req, res, next) => {
    try {
        const errorMessages = []
        const successMessages = []

        const { maKhachHang, hoTen, diaChi, dienThoai, email, tienNo } = req.body;

        const khachHang = await KhachHang.findOne({ maKhachHang }).lean();
        if (khachHang) {
            errorMessages.push({
                message: "Mã Khách Hàng bị trùng, vui lòng nhập lại"
            })
        }
        if (!maKhachHang || !hoTen || !diaChi || !dienThoai || !email || !tienNo) {
            errorMessages.push({
                message: "Vui lòng điền đầy đủ thông tin khách hàng."
            })
        }
        if (dienThoai?.length !== 10 || !/^\d+$/.test(dienThoai)) { // regular expression kiem tra so dien thoai
            errorMessages.push({
                message: "Số điện thoại phải chứa đúng 10 số và chỉ chấp nhận ký tự số."
            })
        }

        if (!/\S+@\S+\.\S+/.test(email)) { // regular expression kiem tra email
            errorMessages.push({
                message: "Định dạng email không đúng."
            })
        }
        if (errorMessages.length === 0) {
            const khachHang = new KhachHang(req.body);
            await khachHang.save();
            successMessages.push({
                message: 'Thành công'
            })
        }


        const messages = [...errorMessages, ...successMessages]

        return res.json({ messages });
    } catch (error) {
        console.log({ error });
        return res.render("error", { errorMessage: error.message });
    }
};

const renderKhachHangEdit = async (req, res, next) => {
    const KhachHang = await KhachHang.findById(req.params.id).lean();
    res.render("edit", { KhachHang });
};

const editKhachHang = async (req, res, next) => {
    const { id } = req.params;
    await KhachHang.updateOne({ _id: id }, req.body);
    res.redirect("/");
};

const deleteKhachHang = async (req, res, next) => {
    let { id } = req.params;
    await KhachHang.remove({ _id: id });
    res.redirect("/");
};

module.exports = {
    renderKhachHangs,
    renderTimKiemKhachHangs,
    createKhachHang,
    renderKhachHangEdit,
    editKhachHang,
    deleteKhachHang,
};