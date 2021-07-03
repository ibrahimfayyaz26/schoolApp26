const mongoose = require("mongoose");

const Dairy = new mongoose.Schema({
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Classes",
  },
  dairy: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

Dairy.virtual("id").get(function () {
  return this._id.toHexString();
});

Dairy.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("Dairy", Dairy);
