const mongoose = require("mongoose");

const News = new mongoose.Schema({
  title: {
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
  date: {
    type: Date,
    default: Date.now,
  },
});

News.virtual("id").get(function () {
  return this._id.toHexString();
});

News.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("News", News);
