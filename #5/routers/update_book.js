const express = require("express");
const router = express.Router();
const Storage = require("../utils/storage");
const fileUploader = require("../middlewares/file");

router.put(
  "/books/:id",
  fileUploader.single("book-file"),
  (query, response) => {
    const storage = new Storage();
    const { id } = query.params;
    const data = query.body;
    try {
      storage.updateBookData(id, data);
      response.status(200);
      response.json("ok");
    } catch (err) {
      response.status(405);
      response.json(err.message);
    }
  }
);

module.exports = router;
