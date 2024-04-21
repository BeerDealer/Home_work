const { Router } = require("express");
const users = require("../../../models/user");

const router = Router();

router.post("/api/user/signup", (req, res) => {
  try {
    users.signup(req.body);
    res.redirect("/api/user/login");
  } catch (error) {
    console.log("e.Message :>> ", error.message);
    res.redirect("/error");
  }
});

module.exports = router;
