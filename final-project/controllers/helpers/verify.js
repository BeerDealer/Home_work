const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const UserService = require("../../models/user/user.service");

function initialize(passport) {
  const authenticateUser = async (email, password, done) => {
    try {
      const user = await UserService.findByEmail(email);
      if (!user) {
        return done(null, false, { message: "No user with that email" });
      }

      if (await bcrypt.compare(password, user.passwordHash)) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Password incorrect" });
      }
    } catch (e) {
      return done(e);
    }
  };

  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    return done(null, await UserService.findById(id));
  });
}

module.exports = initialize;
