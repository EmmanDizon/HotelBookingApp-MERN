const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const _ = require("lodash");

router.post("/register_user", async (req, res) => {
  const newUser = new User(req.body);

  try {
    let email = await User.findOne({ email: req.body.email });
    if (email)
      return res.json({
        success: false,
        message: "This email is already registered",
      });

    newUser.password = await newUser.hashPassword(newUser.password);
    await newUser.save();

    res.json({ success: true, message: "User registered successfully" });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/login", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (!user)
      return res.json({
        success: false,
        message: "Invalid username or password.",
      });

    const authenticate = await bcrypt.compare(req.body.password, user.password);
    if (!authenticate)
      return res.json({
        success: false,
        message: "Invalid username or password.",
      });

    const userProperty = _.pick(user, ["_id", "name", "email", "isAdmin"]);
    const output = {
      success: "true",
      message: "Successfully login !",
      ...userProperty,
    };
    res.send(output);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get("/get_all_users", async (req, res) => {
  const result = await User.find();
  res.send(result);
});

module.exports = router;
