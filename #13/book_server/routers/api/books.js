const express = require("express");
const router = express.Router();
const Book = require("../../models/book");

router.get("/books", async (_, response) => {
  try {
    const books = await Book.find().select("-__v");
    response.json(books);
    response.status(200);
  } catch (err) {
    response.status(404);
    response.json(err.message);
  }
});

module.exports = router;
