const mongoose = require("mongoose");

const User = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isStaff: {
    type: Boolean,
    default: false,
  },
  phone: {
    type: String,
    required: true,
  },
  isCr: {
    type: Boolean,
    default: false,
  },
});

User.virtual("id").get(function () {
  return this._id.toHexString();
});

User.set("toJSON", { virtuals: true });

module.exports = mongoose.model("User", User);
