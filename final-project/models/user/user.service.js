const User = require("./user.model");

class UserService {
  constructor() {}
  static async create(data) {
    try {
      const user = new User(data);
      await user.save();
      return user;
    } catch (e) {
      const conflictKey = e.keyPattern
        ? Object.keys(e.keyPattern)[0]
        : "unknown";
      throw new Error(`${conflictKey} занят`);
    }
  }

  static async findByEmail(email) {
    try {
      const user = await User.findOne({ email: email }).select("-__v");
      return user;
    } catch (e) {
      throw new Error(e.message);
    }
  }
}

module.exports = UserService;
