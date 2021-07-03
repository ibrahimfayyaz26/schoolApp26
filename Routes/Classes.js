const express = require("express");
const router = express.Router();
const Classes = require("../models/Classes");

router.get("/", (req, res) => {
  Classes.find()
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
  const item = new Classes({
    class: req.body.class,
    section: req.body.section,
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
  Classes.findByIdAndRemove(req.params.id)
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
