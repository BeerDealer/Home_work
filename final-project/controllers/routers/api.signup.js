const { Router } = require("express");
const { UserService } = require("../../models");
const bcrypt = require("bcryptjs");

const router = Router();

router.post("/api/signup", async (req, res) => {
  const { email, password, name, contactPhone } = req.body;
  try {
    const hashedPassword = bcrypt.hash(password, 10);
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
    res.status(500).json({
      error: e.message,
      status: "error",
    });
  }
});

module.exports = router;
