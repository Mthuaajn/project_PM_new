const express = require("express");
const userRouter = express.Router();

const userController = require("./../controllers/authController");

userRouter.route("/").post(userController.login).get(userController.renderPageLogin);

module.exports = userRouter;
