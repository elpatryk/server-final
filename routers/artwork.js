const { Router } = require("express");
const auth = require("../auth/middleware");
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
      order: [[`bids`, `amount`, `DESC`]],
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
    const { id } = req.user;
    // console.log("backend post bid", artwork);
    const { amount, email, artworkId } = req.body;

    const bid = await Bid.create({
      amount,
      email,
      artworkId,
    });

    // console.log("amount artworkId and email: ", amount, artwork, email);
    return res.status(201).send({ message: "New bid!", bid });
  } catch (e) {
    next(e);
  }
});

router.post("/auction", authMiddleware, async (req, res, next) => {
  try {
    const { id, isArtist } = req.user;
    const { title, imageUrl, minimumBid } = req.body;
    // console.log(id);

    const artwork = await Artwork.create({
      title,
      imageUrl,
      minimumBid,
      userId: id,
      hearts: 0,
    });
    if (!isArtist) {
      return res
        .status(400)
        .send({ message: "Only artist can upload new artwork" });
    }
    return res.status(201).send({ message: "New artwork posted!", artwork });
  } catch (e) {
    console.log(e);
  }
});

router.delete("/auction/:id", authMiddleware, async (req, res, next) => {
  const id = req.params.id;
  try {
    const { isArtist } = req.user;
    // console.log("Is Artist?", isArtist);
    if (!isArtist) {
      return res.status(400);
    }

    const artwork = await Artwork.findByPk(id);
    await artwork.destroy();

    res.send(id);
  } catch (e) {
    next(e.message);
  }
});
