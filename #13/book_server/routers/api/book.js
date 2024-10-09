const express = require("express");
const router = express.Router();
const Book = require("../../models/book");

router.get("/books/:id", async (query, response) => {
  const { id } = query.params;
  try {
    const book = await Book.find({ id: id }).select("-__v");
    response.json(book);
    response.status(200);
  } catch (err) {
    response.status(404);
    response.json(err.message);
  }
});

module.exports = router;
