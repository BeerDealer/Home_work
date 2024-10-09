const express = require("express");
const router = express.Router();
const Book = require("../../models/book");

router.delete("/books/:id", async (query, response) => {
  const { id } = query.params;
  try {
    await Book.deleteOne({ id: id });
    response.json("Ok");
    response.status(201);
  } catch (err) {
    response.status(404);
    response.json(err.message);
  }
});

module.exports = router;
