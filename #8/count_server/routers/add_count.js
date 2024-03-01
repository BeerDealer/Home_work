const express = require("express");
const router = express.Router();

router.post("/:bookId", async (req, res) => {
  try {
    const { bookId } = req.params;
    const redis = req.database;

    const count = await redis.incr(bookId);

    res.json({ message: `Счетчик для книги ${bookId} увеличен до ${count}` });
  } catch (error) {
    console.error("Ошибка при увеличении счетчика в Redis:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

module.exports = router;
