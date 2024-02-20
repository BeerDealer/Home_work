const express = require("express");
const Book = require("./utils/book.js");

const apiRouters = [
  "books",
  "book",
  "login",
  "add_book",
  "delete_book",
  "update_book",
  "download_file",
];

const routers = [
  "book_list",
  "book_view",
  "book_create",
  "book_update",
  "book_delete",
];

const middlewares = ["error"];

const app = express();
app.use(express.urlencoded());
app.set("view engine", "ejs");

apiRouters.forEach((router) => {
  const route = require(`./routers/api/${router}.js`);
  app.use("/api", route);
});

routers.forEach((router) => {
  const route = require(`./routers/views/${router}.js`);
  app.use("/", route);
});

middlewares.forEach((middleware) => {
  const md = require(`./middlewares/${middleware}.js`);
  app.use(md);
});

let port = process.env.PORT || 3000;
app.listen(port);
