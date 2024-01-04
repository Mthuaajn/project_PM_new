const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config({path: "./config.env"});
const mongoose = require("mongoose");
const nxbModel = require("./../models/nxbModel");
const theloaiModel = require("./../models/theloaiModel");
const bookModel = require("./../models/bookModel");
const UserModel = require("./../models/userModel");
const khachHangModel = require("./../models/khachHangModel");
const phieuThupModel = require("../models/phieuThuModel");

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("connect to database successfully");
    });

//   read file json
const nxb = JSON.parse(fs.readFileSync(`${__dirname}/nxb.json`, "utf-8"));
const theloai = JSON.parse(fs.readFileSync(`${__dirname}/theloai.json`, "utf-8"));
const books = JSON.parse(fs.readFileSync(`${__dirname}/book.json`, "utf-8"));
const khachHang = JSON.parse(fs.readFileSync(`${__dirname}/khachhang.json`, "utf-8"));
const users = JSON.parse(fs.readFileSync(`${__dirname}/user.json`, "utf-8"));
const phieuThu = JSON.parse(fs.readFileSync(`${__dirname}/phieuthu.json`, "utf-8"));
// Import data into database
const importData = async () => {
    try {
        await bookModel.create(books);
        await nxbModel.create(nxb);
        await theloaiModel.create(theloai);
        await khachHangModel.create(khachHang);
        await phieuThupModel.create(phieuThu)
        console.log("data successfully loaded");
    } catch (err) {
        console.log(err.message);
    }
    process.exit();
};

// DELEte all data from DB
const deleteData = async () => {
    try {
        await nxbModel.deleteMany({});
        await theloaiModel.deleteMany({});
        await bookModel.deleteMany({});
        await UserModel.deleteMany({});
        await phieuThupModel.deleteMany({});
        console.log("data successfully deleted");
    } catch (err) {
        console.log(err.message);
    }
    process.exit();
};

if (process.argv[2] == "--import") {
    importData();
} else if (process.argv[2] == "--delete") {
    deleteData();
}
