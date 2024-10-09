const express = require("express");
const router = express.Router();
const Storage = require("../../utils/storage");
const Book = require("../../utils/book");

router.get("/create", (req, res) => {
  res.render("books/create", {
    title: `Создать книгу`,
    book: {},
  });
});

router.post("/create", (req, res) => {
  const params = req.body;
  const book = new Book(params);
  const storage = new Storage();
  storage.writeData(book);
  res.redirect("/");
});

module.exports = router;
