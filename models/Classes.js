const mongoose = require("mongoose");

const Classes = new mongoose.Schema({
  class: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
});

Classes.virtual("id").get(function () {
  return this._id.toHexString();
});

Classes.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("Classes", Classes);
