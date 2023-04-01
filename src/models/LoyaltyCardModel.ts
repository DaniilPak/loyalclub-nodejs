export { dataSchema };

const mongoose = require("mongoose");

const receiptSchema = new mongoose.Schema({
  purchaseDate: {
    required: true,
    type: Date,
  },
  purchaseAmount: {
    required: true,
    type: Number,
  },
  card: {
    required: true,
    type: String,
  },
  client: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  worker: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  bonusAmount: {
    required: true,
    type: Number,
  },
});

const dataSchema = new mongoose.Schema({
  userOwner: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  business: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "Business",
  },
  receipts: [
    {
      required: false,
      type: [receiptSchema],
    },
  ],
});

module.exports = mongoose.model("LoyaltyCard", dataSchema);
