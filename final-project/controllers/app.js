const express = require("express");
const mongoose = require("mongoose");
const routerList = require("./routers");
const errorMiddleware = require("./middlewares");
const verify = require("./helpers");
const passport = require("passport");
const session = require("express-session");

const PORT = process.env.PORT || 3000;
const URL_DB = process.env.URL_DB;

const start = async (port, url, app) => {
  try {
    await mongoose.connect(url, {
      dbName: "proj",
    });
    app.listen(port, () => {
      console.log(`App starts on ${port}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1);
  }
};

const app = express();

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);

verify(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

routerList.forEach((router) => {
  app.use("/", router);
});

app.use(errorMiddleware);

start(PORT, URL_DB, app);
