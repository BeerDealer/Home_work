const express = require("express");
const router = express.Router();
const Storage = require("../../utils/storage");
const axios = require("axios");

router.get("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const counterUrl = req.counterUrl;

    await axios.post(`http://${counterUrl}:3000/counter/${id}`);

    const response = await axios.get(`http://${counterUrl}:3000/counter/${id}`);
    console.log(response.data.counter);
    const bookCounter = response.data.counter;

    const storage = new Storage();
    const book = storage.getDataById(id);

    res.render("books/view", {
      title: `Книга: ${book.title}`,
      book: book,
      counter: bookCounter,
    });
  } catch (error) {
    console.error("Ошибка при обработке запроса:", error);
    res.redirect("/404");
  }
});

module.exports = router;
