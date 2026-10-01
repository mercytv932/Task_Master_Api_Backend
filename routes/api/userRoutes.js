const express = require("express");
const router = express.Router();
const User = require("../../models/User.js");
const jwt = require("jsonwebtoken");

function signToken(user) {
  return jwt.sign(
    {
      _id: user._id,
      username: user.username,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "2h" },
  );
}

//create user
router.post("/register", async (req, res) => {
  try {
    const user = await User.create(req.body);

    const token = signToken(user);
    res.status(201).json({ token, user });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Registration didn't go through" });
  }
});

//login user
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: "Can't find this user" });
    }
    const correctPassword = await user.isCorrectPassword(req.body.password);
    if (!correctPassword) {
      return res.status(400).json({ message: "Wrong password!" });
    }
    const token = signToken(user);
    return res.status(200).json({ token, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Login failed" });
  }
});

module.exports = router;
