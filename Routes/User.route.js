const { Router } = require("express");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Usermodel } = require("../models/User.model");

const userRouter = Router();

userRouter.post("/signup", (req, res) => {
  const { email, password } = req.body;
  bcrypt.hash(password, 5, async function (err, hash) {
    if (err) {
      res.send("Something went wrong");
    }
    const user = new Usermodel({
      email,
      password: hash,
    });
    try {
      await user.save();
      res.status(201).send("Signup Successful");
    } catch (error) {
      console.log(error);
      res.status(401).send("something went wrong");
    }
  });
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await Usermodel.findOne({ email });
  const hash = user.password;
  bcrypt.compare(password, hash, function (err, result) {
    if (err) {
      console.log(err);
      res.status(401).send("something went wrong");
    }
    var token = jwt.sign({ userId: user._id }, "abcdegfh", {
      expiresIn: "7d",
    });
    var refreshToken = jwt.sign({ userId: user._id }, "abcdegfh", {
      expiresIn: "28d",
    });

    var result = { token, refreshToken };
    if (result) {
      res.status(201).send({ Message: "Login Success", token });
    }
  });
});

module.exports = {
  userRouter,
};
