"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSchema = void 0;
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
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
    password: {
        type: String,
        required: true,
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
    orderHistory: [
        {
            required: false,
            type: mongoose.Schema.Types.ObjectId,
            ref: "Receipt",
        },
    ],
    loyaltyCards: [
        {
            required: false,
            type: mongoose.Schema.Types.ObjectId,
            ref: "LoyaltyCard",
        },
    ],
    /// For Owner User
    business: {
        required: false,
        type: mongoose.Schema.Types.ObjectId,
        ref: "Business",
    },
    /// For Worker User
    workBusiness: {
        required: false,
        type: String,
    },
    expirationDate: {
        required: false,
        type: Date,
    },
    acceptedReceipts: [receiptSchema],
});
exports.dataSchema = dataSchema;
dataSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        // Hash the password if it has been modified or is new
        if (!user.isModified("password")) {
            return next();
        }
        try {
            const salt = yield bcrypt.genSalt(10);
            const hash = yield bcrypt.hash(user.password, salt);
            user.password = hash;
            next();
        }
        catch (error) {
            return next(error);
        }
    });
});
module.exports = mongoose.model("User", dataSchema);
//# sourceMappingURL=UserModel.js.map