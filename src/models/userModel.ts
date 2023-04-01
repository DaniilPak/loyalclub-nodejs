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
  type: {
    required: true,
    type: String,
  },
  phoneNumber: {
    required: true,
    type: String,
  },
  bonusAmount: {
    required: true,
    type: Number,
  },
  name: {
    required: true,
    type: String,
  },
  surname: {
    required: true,
    type: String,
  },
  email: {
    required: false,
    type: String,
  },
  homeAddress: {
    required: false,
    type: String,
  },
  paymentInfo: {
    required: false,
    type: String,
  },
  orderHistory: [{
    required: false,
    type: mongoose.Schema.Types.ObjectId,
    ref: "Receipt",
  }],
  loyaltyCards: [{
    required: false,
    type: mongoose.Schema.Types.ObjectId,
    ref: "LoyaltyCard",
  }],

  /// For Owner User
  business: {
    required: false,
    type: mongoose.Schema.Types.ObjectId,
    ref: "Business",
  },

  /// For Worker User
  workBusiness: {
    required: false,
    type: mongoose.Schema.Types.ObjectId,
    ref: "Business",
  },
  expirationDate: {
    required: false,
    type: Date
  },
  acceptedReceipts: [receiptSchema],
});

module.exports = mongoose.model("User", dataSchema);
