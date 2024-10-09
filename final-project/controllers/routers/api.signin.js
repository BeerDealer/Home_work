const { Router } = require("express");
const { UserService } = require("../../models");
const bcrypt = require("bcryptjs");

const router = Router();

router.post("/api/signin", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await UserService.findByEmail(email);
    if (!user) {
      res.status(401).json({
        error: "Неверный логин или пароль",
        status: "error",
      });
    } else {
      const isMatch = await bcrypt.compare(password, user.passwordHash);
      if (!isMatch) {
        res.status(401).json({
          error: "Неверный логин или пароль",
          status: "error",
        });
      } else {
        res.status(200).json({
          data: user,
          status: "Ok",
        });
      }
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
