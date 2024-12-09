const mongoose = require("mongoose");
const bidSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
    },
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    reciever: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    time: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    mobile: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Bid = mongoose.model("bids", bidSchema);
module.exports = Bid;
