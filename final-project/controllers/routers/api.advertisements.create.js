const { Router } = require("express");
const { AdvertisementService } = require("../../models");

const router = Router();

router.post("/api/advertisements", async (req, res, next) => {
  try {
    if (!req.isAuthenticated()) {
      next(new Error({ message: "Not login" }));
    }
    const advertisements = await AdvertisementService.findalAll();
    res.status(200).json(advertisements);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
