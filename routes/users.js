const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/login", (req, res) => {
  const u = req.body;
  User.findOne({ email: u.email }).then((user) => {
    if (!user) {
      return res.send({ message: "User doesnot exist" });
    } else {
      const payload = {
        id: user.id,
        exp: Date.now() + 1000 * 60 * 60 * 24 * 5,
      };
      const secret = "srcret123";

      jwt.sign(payload, secret, null, (err, token) => {
        return res.send({
          token,
        });
      });
    }
  });
});

router.post("/signup", (req, res) => {
  const data = req.body;
  User.findOne({ email: data.email }).then((u) => {
    if (u) {
      return res.send({ message: "User already exist" });
    } else {
      const newUser = new User(data);
      newUser.save().then((user) => {
        res.send(user);
      });
    }
  });
});

module.exports = router;
