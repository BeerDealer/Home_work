module.exports.get = [
  require("./user/login.get"),
  require("./user/me.get"),
  require("./user/error.get"),
  require("./user/signup.get"),
];
module.exports.post = [
  require("./user/login.post"),
  require("./user/logout.post"),
  require("./user/signup.post"),
];
