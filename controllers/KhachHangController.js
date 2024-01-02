const KhachHang = require("../models/khachHangModel.js");

const renderKhachHangs = async (req, res) => {
    try {
        const KhachHangs = await KhachHang.find().lean();
        console.log(KhachHangs, "abc");
        res.render("khach_hang/khachhang", {
            khachHangs: KhachHangs,
        });
    } catch (error) {
        console.log({error});
        return res.render("error", {errorMessage: error.message});
    }
};

const createKhachHang = async (req, res, next) => {
    try {
        const khachHang = new KhachHang(req.body);
        await khachHang.save();
        res.redirect(req.headers.referer);
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
    const {id} = req.params;
    await KhachHang.updateOne({_id: id}, req.body);
    res.redirect("/");
};

const deleteKhachHang = async (req, res, next) => {
    let {id} = req.params;
    await KhachHang.remove({_id: id});
    res.redirect("/");
};

module.exports = {
    renderKhachHangs,
    createKhachHang,
    renderKhachHangEdit,
    editKhachHang,
    deleteKhachHang,
};