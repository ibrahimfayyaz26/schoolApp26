const mongoose = require("mongoose");

const DateSheet = new mongoose.Schema({
  classes: {
    type: String
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

DateSheet.virtual("id").get(function () {
  return this._id.toHexString();
});

DateSheet.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("DateSheet", DateSheet);
