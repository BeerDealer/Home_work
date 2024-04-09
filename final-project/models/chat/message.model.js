const { Schema, model } = require("mongoose");

const Message = new Schema({
  _id: {
    type: ObjectId,
    required: true,
    unique: true,
  },
  author: {
    type: ObjectId,
    required: true,
  },
  sentAt: {
    type: Date,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  readAt: {
    type: Date,
  },
});

modeule.exports = model("Message", Message);
