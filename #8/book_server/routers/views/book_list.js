const express = require("express");
const router = express.Router();
const Storage = require("../../utils/storage");

router.get("/", (req, res) => {
  const storage = new Storage();
  const { bookshelf } = storage.getData();
  res.render("books/index", {
    title: "Книги",
    books: bookshelf,
  });
});

module.exports = router;
