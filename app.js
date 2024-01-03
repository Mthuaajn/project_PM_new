const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const path = require("path");
const handlebars = require("express-handlebars");
dotenv.config({ path: "./config.env" });
const app = express();

const bookRouter = require("./routers/bookRoute");
const khachHangRouter = require("./routers/khachhang");
const thutien = require("./routers/thutien");
const timkiemkhachhang = require("./routers/timkiemkhachhang");

const userRouter = require("./routers/userRouter");
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
app.use("/khachhangs", khachHangRouter);
app.use("/thutien", thutien);
app.use("/timkiemkhachhang", timkiemkhachhang);

// app.use("/", userRouter);
// app.get("/home", (req, res) => {
//   res.render("home");
// });

app.get("/", (req, res) => {
  res.render("home");
});
module.exports = app;
