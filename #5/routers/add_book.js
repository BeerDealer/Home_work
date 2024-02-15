const express = require("express");
const router = express.Router();
const Storage = require("../utils/storage");
const Book = require("../utils/book");

router.post("/books", (query, response) => {
  const storage = new Storage();
  const book = new Book({});
  try {
    storage.writeData(book);
    response.json(book);
    response.status(201);  
  } 
  catch(err) {
    response.json(err);
    response.status(401);  
  } 
})


module.exports = router;