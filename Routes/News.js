const express = require("express");
const router = express.Router();
const News = require("../models/News");
const multer = require("multer");

const file_type = {
  "image/jpg": ".jpg",
  "image/jpeg": ".jpeg",
  "image/png": ".png",
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let err = new Error("wrong image format");
    const fileType = file_type[file.mimetype];
    if (fileType) {
      err = null;
    }
    cb(err, "upload");
  },
  filename: function (req, file, cb) {
    const extension = file_type[file.mimetype];
    const fileName = file.originalname.split(" ").join();
    cb(null, `${fileName}-${Date.now()}.${extension}`);
  },
});

const upload = multer({ storage: storage });

router.get("/", (req, res) => {
  News.find()
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

router.post("/", upload.single("image"), (req, res) => {
  console.log(req.file.filename);

  const fileName = req.file.filename;

  const back = `${req.protocol}://${req.get("host")}/upload/`;
  const item = new News({
    description: req.body.description,
    image: `${back}${fileName}`,
    title: req.body.title,
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
  News.findByIdAndRemove(req.params.id)
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
