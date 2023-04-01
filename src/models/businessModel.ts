export { dataSchema };

const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  pictureUrl: {
    required: false,
    type: String,
  },
  loyalPercent: {
    required: false,
    type: Number,
  },
  address: {
    required: false,
    type: String,
  },
  workers: [{
    required: false,
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
  owner: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }
});

module.exports = mongoose.model("Business", dataSchema);
