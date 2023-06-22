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
    businessName: {
        required: false,
        type: String,
    },
    receipts: [
        {
            required: false,
            type: [receiptSchema],
        },
    ],
    bonusAmount: {
        required: true,
        type: Number,
    },
    currencySign: {
        required: false,
        type: String,
    }
}, {
    versionKey: '__v' // Enable versioning with '__v' as the version key
});
exports.dataSchema = dataSchema;
module.exports = mongoose.model("LoyaltyCard", dataSchema);
//# sourceMappingURL=LoyaltyCardModel.js.map