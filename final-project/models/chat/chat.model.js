const { Schema, model, ObjectId } = require("mongoose");
const { Message } = require("./message.model");

const Chat = new Schema({
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
