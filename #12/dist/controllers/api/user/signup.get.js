const { Router } = require("express");

const router = Router();

router.get("/api/user/signup", (req, res) => {
  res.render("signup", { title: "Регистрация" });
});

module.exports = router;
