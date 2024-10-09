const { Router } = require("express");
const { UserService } = require("../../models");
const bcrypt = require("bcryptjs");

const router = Router();

router.post("/api/signup", async (req, res, next) => {
  const { email, password, name, contactPhone } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(UserService);
    const user = await UserService.create({
      email: email,
      passwordHash: hashedPassword,
      name: name,
      contactPhone: contactPhone,
    });
    res.status(201).json({
      data: user,
      status: "Ok",
    });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
