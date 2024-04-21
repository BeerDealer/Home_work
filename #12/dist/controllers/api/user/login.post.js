const { Router } = require("express");
const passport = require("passport");

const router = Router();

router.post(
  "/api/user/login",
  passport.authenticate("local", { failureRedirect: "/error" }),
  (req, res) => {
    console.log("req.user: ", req.user);
    res.redirect("me");
  }
);

module.exports = router;
