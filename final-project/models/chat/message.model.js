const { Schema, model, ObjectId } = require("mongoose");

const Message = new Schema({
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

module.MessageModel = model("Message", Message);
module.Message = Message;
