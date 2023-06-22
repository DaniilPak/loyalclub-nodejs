export { dataSchema };

const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
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
  minusBonus: {
    required: false,
    type: Number,
  },
  currencySign: {
    required: false,
    type: String,
  }
});

module.exports = mongoose.model("Receipt", dataSchema);
