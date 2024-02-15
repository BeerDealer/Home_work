const express = require("express");
const router = express.Router();
const Storage = require("../utils/storage");
const path = require("path");

router.get("/books/:id/download", (query, response) => {
  const storage = new Storage();
  const { id } = query.params;
  try {
    const fileName = storage.getBookfile(id);
    const filePath = path.join(__dirname, "../public", fileName);
    response.download(filePath, (err) => {
      response.status(500);
      response.json(err.message);
    });
  } catch (err) {
    response.status(400);
    response.json(err.message);
  }
});

module.exports = router;
