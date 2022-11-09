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
    // console.log(artworks);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

//get specific artwork
router.get("/:id", async (request, response, next) => {
  try {
    const artworkId = request.params.id;
    const artDetails = await Artwork.findByPk(artworkId, {
      include: { model: Bid },
    });
    response.send(artDetails);
    // console.log(artDetails);
  } catch (e) {
    next(e);
  }
});
module.exports = router;

// edit hearts
router.put("/hearts/:id", async (req, res, next) => {
  const id = req.params.id;
  const artwork = await Artwork.findByPk(id);
  const { hearts } = req.body;
  //   console.log("hearts from backend: ", hearts);
  const newHeart = await artwork.update({ hearts });

  return res.status(200).send(newHeart);
});

// post new bid with id of artwork
router.post("/:id/bids", authMiddleware, async (req, res, next) => {
  try {
    const artwork = await Artwork.findByPk(req.params.id);

    // console.log("backend post bid", artwork);
    const { amount, email } = req.body;

    const bid = await Bid.create({
      amount,
      email,
      artworkId: artwork.id,
    });
    console.log("req user", req.user);
    console.log("amount and email: ", amount, email);
    return res.status(201).send({ message: "New bid!", bid });
  } catch (e) {
    next(e);
  }
});
