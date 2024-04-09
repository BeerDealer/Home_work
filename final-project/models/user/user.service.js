const { User } = require("./user.model");

class UserService {
  async create(data) {
    try {
      const user = new User(data);
      return user;
    } catch (e) {
      return { err: e, message: e.Message };
    }
  }

  async findByEmail(email) {
    try {
      const user = await User.find({ email: email }).select("__v");
      return user;
    } catch (e) {
      return { err: e, message: e.Message };
    }
  }
}

module.exports = UserService;
