const express = require("express");
const router = express.Router();


router.post("/login", (_, response) => {
    response.status(201);
    response.json({ id: 1, mail: "test@mail.ru" });
})

module.exports = router