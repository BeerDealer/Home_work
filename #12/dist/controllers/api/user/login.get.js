const { Router } = require("express");

const router = Router();

router.get("/api/user/login", (req, res) => {
  res.render("login", { title: "Вход" });
});

module.exports = router;
