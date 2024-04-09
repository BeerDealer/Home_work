const { Schema, model } = require("mongoose");

const User = new Schema({
  _id: {
    type: ObjectId,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  contactPhone: {
    type: String,
    required: false,
  },
});

module.exports = model("User", User);
