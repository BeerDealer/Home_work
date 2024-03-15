const express = require("express");
const router = express.Router();
const Storage = require("../../utils/storage");

router.post("/delete/:id", (req, res) => {
  const { id } = req.params;
  const storage = new Storage();
  try {
    storage.deleteDataById(id);
    res.redirect("/");
  } catch (err) {
    res.redirect("/404");
  }
});

module.exports = router;
