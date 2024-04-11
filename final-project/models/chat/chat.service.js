const Chat = require("./chat.model");
const EventEmitter = require("events");
const Message = require("./message.model");
const { Types } = require("mongoose");
const { ObjectId } = Types;

class ChatService extends EventEmitter {
  constructor() {
    super();
  }
  async find(users) {
    try {
      const chat = await Chat.find({ users: { $all: users } });
      if (chat.length === 0) {
        return null;
      }
      return chat;
    } catch (e) {
      return { err: e, message: e.Message };
    }
  }

  async sendMessage(data) {
    const { author, reciver, text } = data;
    try {
      let chat = await this.find([author, reciver]);
      if (chat === null) {
        chat = await new Chat({
          _id: ObjectId(),
          users: [author, reciver],
          createdAt: new Date(),
          messages: [],
        });
      }
      const message = new Message({
        _id: ObjectId(),
        author: author,
        sentAt: new Date(),
        text: text,
      });
      await Chat.updateOne({ _id: chat._id }, { $push: { messages: message } });
      this.emit("newMessage", { message: message, chatId: chat._id });
      return message;
    } catch (e) {
      return { err: e, message: e.Message };
    }
  }

  async getHistory(id) {
    try {
      const { messages } = await Chat.find({ _id: id });
      return messages;
    } catch (e) {
      return { err: e, message: e.Message };
    }
  }

  subscribe(callback) {
    this.on("newMessage", callback);
  }
}

module.exports = ChatService;
