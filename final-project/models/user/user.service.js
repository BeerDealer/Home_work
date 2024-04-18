const User = require("./user.model");

class UserService {
  constructor() {}
  static async create(data) {
    try {
      const user = new User(data);
      return user;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  static async findByEmail(email) {
    try {
      const user = await User.find({ email: email }).select("__v");
      return user;
    } catch (e) {
      throw new Error(e.message);
    }
  }
}

module.exports = UserService;
