const express = require("express");
const router = express.Router();
const fileUploader = require("../../middlewares/file");
const Book = require("../../models/book");

router.put(
  "/books/:id",
  fileUploader.single("book-file"),
  async (query, response) => {
    const { id } = query.params;
    const data = query.body;
    try {
      await Book.findOneAndUpdate({ id: id }, data);
      response.redirect(`/api/books/${id}`);
    } catch (err) {
      response.status(405);
      response.json(err.message);
      console.log(err);
    }
  }
);

module.exports = router;
