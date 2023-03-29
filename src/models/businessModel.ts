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
  address: {
    required: false,
    type: String,
  },
  workers: [{
    required: false,
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
});

module.exports = mongoose.model("Business", dataSchema);
