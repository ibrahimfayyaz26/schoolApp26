const express = require("express");
const router = express.Router();
const Leave = require("../models/Leave");
const multer = require("multer");

const file_type = {
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
};

const storage = multer.diskStorage({
  destination: (req, file, cd) => {
    const fileT = file_type[file.mimetype];
    let err = new Error("wrong image type");
    if (fileT) {
      err = null;
    }
    cd(err, "upload");
  },
  filename: (req, file, cd) => {
    const fileT = file_type[file.mimetype];
    const fileName = `${file.originalname
      .split(" ")
      .join()}-${Date.now()}.${fileT}`;
    cd(null, fileName);
  },
});

const upload = multer({ storage: storage });

router.get("/", (req, res) => {
  Leave.find()
    .sort({ date: -1 })
    .populate("classes")
    .then((data) => {
      if (data.length) {
        res.send(data);
      } else {
        res.send("no data found");
      }
    })
    .catch((err) => res.send({ msg: err, failed: true }));
});

router.get("/approved", (req, res) => {
  Leave.find({ isApproved: true })
    .sort({ date: -1 })
    .populate("classes")
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
  const fileName = req.file.filename;

  const back = `${req.protocol}://${req.get("host")}/upload/`;
  const item = new Leave({
    name: req.body.name,
    image: `${back}${fileName}`,
    fatherName: req.body.fatherName,
    phone: req.body.phone,
    description: req.body.description,
    staff: req.body.staff,
    classes: req.body.classes,
    user: req.body.user,
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
  Leave.findByIdAndRemove(req.params.id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.send("no data found");
      }
    })
    .catch((err) => res.send({ msg: err, failed: true }));
});

router.put("/:id", (req, res) => {
  Leave.findByIdAndUpdate(
    req.params.id,
    {
      isApproved: req.body.isApproved,
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
