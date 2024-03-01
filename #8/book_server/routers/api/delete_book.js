const express = require("express");
const router = express.Router();
const Storage = require("../../utils/storage");

router.delete("/books/:id", (query, response) => {
  const storage = new Storage();
  const { id } = query.params;
  try {
    storage.deleteDataById(id);
    response.json("Ok");
    response.status(201);
  } catch (err) {
    response.status(404);
    response.json(err.message);
  }
});

module.exports = router;
