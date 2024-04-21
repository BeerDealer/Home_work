const { Router } = require("express");

const router = Router();

router.get("/error", (req, res) => {
  res.render("not-auth", { title: "Ошибка" });
});

module.exports = router;
