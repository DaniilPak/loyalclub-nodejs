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
exports.LoyaltyCardService = void 0;
const LoyaltyCardModel = require("../models/LoyaltyCardModel");
const mongoose = require('mongoose');
class LoyaltyCardService {
    createLoyaltyCard(loyaltyCard) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = new LoyaltyCardModel({
                userOwner: loyaltyCard.userOwner,
                business: loyaltyCard.business,
                receipts: loyaltyCard.receipts,
                businessName: loyaltyCard.businessName,
                bonusAmount: 0,
                currencySign: loyaltyCard.currencySign,
            });
            try {
                yield data.save();
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getLoyaltyCardById(loyaltyCardId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield LoyaltyCardModel.findById(loyaltyCardId);
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getLoyaltyCardByClientIdAndBusinessId(cliendId, businessId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield LoyaltyCardModel.findOne({
                    userOwner: cliendId,
                    business: businessId
                });
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getLoyaltyCardByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield LoyaltyCardModel.findOne({ userOwner: userId });
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getAllLoyaltyCards() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield LoyaltyCardModel.find();
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    addReceiptToCard(loyaltyCardId, receipt) {
        return __awaiter(this, void 0, void 0, function* () {
            const loyaltyCard = yield LoyaltyCardModel.findById(loyaltyCardId);
            try {
                loyaltyCard.receipts.push(receipt);
                loyaltyCard.save();
                return loyaltyCard;
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateBonusAmount(loyaltyCardId, amount, minusBonus) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                LoyaltyCardModel.findById(loyaltyCardId)
                    .then((document) => {
                    if (!document) {
                        throw new Error('Document not found');
                    }
                    // Update the document
                    document.bonusAmount += amount;
                    document.bonusAmount -= minusBonus;
                    // Save the updated document
                    return document.save();
                })
                    .then((updatedDocument) => {
                    console.log('Updated document:', updatedDocument);
                })
                    .catch((error) => {
                    if (error instanceof mongoose.Error.VersionError) {
                        // Handle concurrency conflict
                        console.error('Concurrency conflict occurred:', error);
                    }
                    else {
                        // Handle other errors
                        console.error('Error updating document:', error);
                    }
                });
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.LoyaltyCardService = LoyaltyCardService;
//# sourceMappingURL=LoyaltyCardService.js.map