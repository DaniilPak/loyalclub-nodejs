export { dataSchema };

const mongoose = require("mongoose");

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
});

module.exports = mongoose.model("User", dataSchema);
