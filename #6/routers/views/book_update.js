const express = require("express");
const router = express.Router();
const Storage = require("../../utils/storage");
const Book = require("../../utils/book");

router.get("/update/:id", (req, res) => {
  const { id } = req.params;
  const storage = new Storage();
  try {
    const book = storage.getDataById(id);
    res.render("books/update", {
      title: `Создать книгу`,
      book: book,
    });
  } catch (err) {
    req.redirect("/404");
  }
});

router.post("/update/:id", (req, res) => {
  const { id } = req.params;
  const params = req.body;
  const storage = new Storage();
  storage.updateBookData(id, params);
  res.redirect("/");
});

module.exports = router;
