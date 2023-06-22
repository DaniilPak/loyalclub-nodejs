"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSchema = void 0;
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
    currencySign: {
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
    owner: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    receipts: [receiptSchema]
}, {
    versionKey: '__v' // Enable versioning with '__v' as the version key
});
exports.dataSchema = dataSchema;
module.exports = mongoose.model("Business", dataSchema);
//# sourceMappingURL=BusinessModel.js.map