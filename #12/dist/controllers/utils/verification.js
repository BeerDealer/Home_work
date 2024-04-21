const users = require("../../models/user");

const verify = (username, password, done) => {
  users.findByUsername(username, (err, user) => {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false);
    }

    if (!users.verifyPassword(user, password)) {
      return done(null, false);
    }

    return done(null, user);
  });
};

const options = {
  usernameField: "username",
  passwordField: "password",
};

module.exports.verify = verify;
module.exports.options = options;
