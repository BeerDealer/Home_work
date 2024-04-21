const { Router } = require("express");

const router = Router();

router.get("/api/user/me", (req, res) => {
  if (!req.isAuthenticated()) {
    res.redirect("/error");
  }
  console.log("req :>> ", req.user);
  res.render("me", {
    title: "Мой профиль",
    username: req.user.username,
    emails: req.user.email,
  });
});

module.exports = router;
