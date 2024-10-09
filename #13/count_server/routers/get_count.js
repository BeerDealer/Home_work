const express = require("express");
const router = express.Router();

router.get("/:bookId", async (req, res) => {
  try {
    const { bookId } = req.params;
    const redis = req.database;

    const count = await redis.get(bookId);

    res.json({ counter: count });
  } catch (error) {
    console.error("Ошибка при получении счетчика из Redis:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

module.exports = router;
