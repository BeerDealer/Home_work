const { Schema, model } = require("mongoose");
const Message = require("./message.model");

const Chat = new Schema({
  _id: {
    type: ObjectId,
    required: true,
    unique: true,
  },
  users: {
    type: [ObjectId, ObjectId],
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  messages: { type: [Message] },
});

module.exports = model("Chat", Chat);
