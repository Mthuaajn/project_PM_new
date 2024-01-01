const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const path = require("path");
const handlebars = require("express-handlebars");
dotenv.config({ path: "./config.env" });
const app = express();

const bookRouter = require("./routers/bookRoute");
const khachHangRouter = require("./routers/khachhang");
const qlsach = require("./routers/qlsach");
const dlsach = require("./routers/dlsach");
const nhapsach = require("./routers/nhapsach");
const bansach = require("./routers/bansach");
const timkiemsach = require("./routers/timkiemsach");
const thutien = require("./routers/thutien");
const timkiemkhachhang = require("./routers/timkiemkhachhang");

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// template engine
app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// routers

app.use("/sach", bookRouter);
app.use("/qlsach", qlsach);
app.use("/dlsach", dlsach);
app.use("/nhapsach", nhapsach);
app.use("/bansach", bansach);
app.use("/timkiemsach", timkiemsach);
app.use("/khachhangs", khachHangRouter);
app.use("/thutien", thutien);
app.use("/timkiemkhachhang", timkiemkhachhang);
app.get("/", (req, res) => {
  res.render("home");
});

module.exports = app;
