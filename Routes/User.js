const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
  User.find()
    .then((data) => {
      if (data.length) {
        res.send(data);
      } else {
        res.send("no data found");
      }
    })
    .catch((err) => res.send({ msg: err, failed: true }));
});

router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.send("no data found");
      }
    })
    .catch((err) => res.send({ msg: err, failed: true }));
});

router.post("/login", async (req, res) => {
  const secret = process.env.SECRET;
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.send({ msg: "wrong email address", failed: true });
  }
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    const token = jwt.sign({ userId: user.id }, secret, { expiresIn: "1w" });
    res.send({ user, token, failed: false });
  } else {
    res.send({ msg: "wrong password", failed: true });
  }
});

router.delete("/:id", (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.send("no data found");
      }
    })
    .catch((err) => res.send({ msg: err, failed: true }));
});

router.post("/register", async (req, res) => {
  const secret = process.env.SECRET;
  const user = await User.findOne({ email: req.body.email });
  if (user == null) {
    const item = new User({
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      userName: req.body.userName,
      isAdmin: req.body.isAdmin,
      isStaff: req.body.isStaff,
      phone: req.body.phone,
      isCr: req.body.isCr,
    });
    console.log("User");
    item
      .save()
      .then((data) => {
        if (data) {
          const token = jwt.sign({ userId: data.id }, secret, {
            expiresIn: "1w",
          });
          res.send({ user: data, token, failed: false });
        } else {
          res.send("no data found");
        }
      })
      .catch((err) => res.send({ msg: err, failed: true }));
  } else {
    res.send({
      msg: "user with this email address already registered",
      failed: true,
    });
  }
});

router.put("/:id", (req, res) => {
  User.findByIdAndUpdate(
    req.params.id,
    {
      email: req.body.email,
      password: req.body.password,
      userName: req.body.userName,
      isAdmin: req.body.isAdmin,
      isStaff: req.body.isStaff,
      phone: req.body.phone,
      isCr: req.body.isCr,
    },
    { new: true }
  )
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.send("no data found");
      }
    })
    .catch((err) => res.send({ msg: err, failed: true }));
});

module.exports = router;
