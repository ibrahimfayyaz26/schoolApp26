const express = require("express");
const router = express.Router();
const DS = require("../models/DateSheet&Syllabus");
const multer = require("multer");

const file_type = {
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
  "image/png": ".png",
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
  DS.find()
    .sort({ date: -1 })
    .then((data) => {
      if (data.length) {
        res.send(data);
      } else {
        res.send([]);
      }
    })
    .catch((err) => res.send({ msg: err, failed: true }));
});

router.delete("/:id", (req, res) => {
  DS.findByIdAndRemove(req.params.id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.send("no data found");
      }
    })
    .catch((err) => res.send({ msg: err, failed: true }));
});

router.post("/", upload.array("images"), async (req, res) => {
  DS.find({ classes: req.body.classes }).then((data) =>
    Promise.all(
      data.map(async (i) => {
        let ff = await DS.findByIdAndRemove(i._id);
        return ff;
      })
    )
  );

  let I = [];

  const fileName = req.files;

  fileName.map((fileT) =>
    I.push(`${req.protocol}://${req.get("host")}/upload/${fileT.filename}`)
  );

  const item = new DS({
    images: I,
    classes: req.body.classes,
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

module.exports = router;
