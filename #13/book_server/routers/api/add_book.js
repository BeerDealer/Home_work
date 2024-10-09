const express = require("express");
const router = express.Router();
const Book = require("../../models/book");
const { v4: uuid } = require("uuid");

router.post("/books", async (query, response) => {
  const data = query.body;
  console.log(data);
  data.id = uuid();
  const book = new Book(data);
  try {
    await book.save();
    response.json(book);
    response.status(201);
  } catch (err) {
    response.json(err);
    response.status(401);
  }
});

module.exports = router;
