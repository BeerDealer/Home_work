const { Router } = require("express");
const { AdvertisementService } = require("../../models");

const router = Router();

router.get("/api/advertisements", async (req, res, next) => {
  try {
    const advertisements = await AdvertisementService.findalAll();
    res.status(200).json(advertisements);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
