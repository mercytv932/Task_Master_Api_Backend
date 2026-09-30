const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unqiue: true },
  password: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
