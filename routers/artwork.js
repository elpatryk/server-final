const { Router } = require("express");
const authMiddleware = require("../auth/middleware");
const router = new Router();
const Artwork = require("../models/").artwork;
const Bid = require("../models/").bid;

//get all artworks
router.get("/", async (request, response, next) => {
  try {
    const artworks = await Artwork.findAll({ include: { model: Bid } });
    response.send(artworks);
    console.log(artworks);
  } catch (e) {
    console.log(e);
    next(e);
  }
});
module.exports = router;
