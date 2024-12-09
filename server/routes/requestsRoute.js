const router = require("express").Router();
const Req = require("../models/requestModal");
const authMiddleware = require("../middlewares/authMiddleware");


router.post("/place-new-request", authMiddleware, async (req, res) => {
  try {
    const newReq = new Req(req.body);
    await newReq.save();
    res.send({
      success: true,
      message: "Request placed successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});


router.post("/get-all-requests", authMiddleware, async (req, res) => {
  try {
    const { product, seller, buyer } = req.body;
    let filters = {};
    if (product) {
      filters.product = product;
    }
    if (seller) {
      filters.seller = seller;
    }
    if (buyer) {
      filters.buyer = buyer;
    }
    const Reqs = await Req.find(filters)
      .populate("product")
      .populate("buyer")
      .populate("seller")
      .sort({ createdAt: -1 });
    res.send({
      success: true,
      data: Reqs,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
