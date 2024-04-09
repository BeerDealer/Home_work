const { Schema, model, ObjectId } = require("mongoose");

const Advertisement = new Schema({
  _id: {
    type: ObjectId,
    required: true,
    unique: true,
  },
  shortText: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  images: {
    type: [String],
  },
  userId: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
  tags: {
    type: [String],
  },
  isDeleted: {
    type: Boolean,
    required: true,
  },
});

module.exports = model("Advertisement", Advertisement);
