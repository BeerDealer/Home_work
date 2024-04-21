const { Router } = require("express");

const router = Router();

router.post("/api/user/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err); // Обработка ошибок при разлогинивании
    }
  });
  res.redirect("/api/user/login");
});

module.exports = router;
