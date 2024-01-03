const mongoose = require("mongoose");
const validator = require("validator");
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validator: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.statics.correctPassword = function (candidatePassword, currentPassword) {
  return candidatePassword === currentPassword;
};

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
