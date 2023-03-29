export { dataSchema };

const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  restaurantName: {
    required: true,
    type: String,
  },
  orderDate: {
    required: true,
    type: Date,
  },
  client: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  worker: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  orderTotal: {
    required: true,
    type: Number,
  },
  bonusAmount: {
    required: true,
    type: Number,
  },
});

module.exports = mongoose.model("Receipt", dataSchema);
