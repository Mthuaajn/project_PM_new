const UserModel = require("./../models/userModel");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.render("login", { message: "vui long cung cap email va password", layout: false });
  }
  const user = await UserModel.findOne({ email });
  if (!user || !UserModel.correctPassword(password, user.password)) {
    res.render("login", { message: "email hoac password khong dung", layout: false });
  }
  res.render("home");
};

exports.renderPageLogin = (req, res) => {
  res.render("login", {
    layout: false,
  });
};
