const express = require("express");
const Book = require("./utils/book.js");

const routers = [
  "books",
  "book",
  "login",
  "add_book",
  "delete_book",
  "update_book",
  "download_file",
];

const app = express();

routers.forEach((router) => {
  const route = require(`./routers/${router}.js`);
  app.use("/api", route);
});

let port = process.env.PORT || 3000;
app.listen(port);
