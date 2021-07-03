const mongoose = require("mongoose");

const Leave = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  fatherName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  classes: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Classes",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
});

Leave.virtual("id").get(function () {
  return this._id.toHexString();
});

Leave.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("Leave", Leave);
