const express = require("express");
const router = express.Router();
const Dairy = require("../models/Dairy");
const mongoose = require("mongoose");

router.get("/", (req, res) => {
  Dairy.find()
    .populate("class")
    .sort({ date: -1 })
    .then((data) => {
      if (data.length) {
        res.send(data);
      } else {
        res.send("no data found");
      }
    })
    .catch((err) => res.send({ msg: err, failed: true }));
});

router.post("/", (req, res) => {
  if (!mongoose.isValidObjectId(req.body.class)) {
    res.status(500).send("wrong class id");
  }
  const item = new Dairy({
    class: req.body.class,
    dairy: req.body.dairy,
  });
  item
    .save()
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.send("no data found");
      }
    })
    .catch((err) => res.send({ msg: err, failed: true }));
});

router.delete("/:id", (req, res) => {
  Dairy.findByIdAndRemove(req.params.id)
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
