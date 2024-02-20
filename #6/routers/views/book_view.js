const express = require("express");
const router = express.Router();
const Storage = require("../../utils/storage");

router.get("/books/:id", (req, res) => {
  const storage = new Storage();
  const { id } = req.params;
  try {
    const book = storage.getDataById(id);
    res.render("books/view", {
      title: `Книга: ${book.title}`,
      book: book,
    });
  } catch (err) {
    res.redirect("/404");
  }
});

module.exports = router;
