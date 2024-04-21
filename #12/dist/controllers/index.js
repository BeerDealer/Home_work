const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const users = require("../models/user");
const { options, verify } = require("./utils/verification");
const { get } = require("./api");
const { post } = require("./api");

passport.use("local", new LocalStrategy(options, verify));

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  users.findById(id, (err, user) => {
    if (err) {
      return cb(err);
    }
    cb(null, user);
  });
});

const app = express();
app.set("view engine", "ejs");
app.set("views", "./dist/views");

app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "SECRET",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

get.forEach((router) => {
  app.use("/", router);
});

post.forEach((router) => {
  app.use("/", router);
});

app.use((req, res) => {
  res.render("not-exists", { title: "Страницы не существует" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
