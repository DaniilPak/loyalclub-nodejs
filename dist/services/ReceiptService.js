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
exports.ReceiptService = void 0;
const Receipt = require("../models/ReceiptModel");
class ReceiptService {
    constructor(userService, loyaltyCardService, businessService) {
        this.loyaltyCardService = loyaltyCardService;
        this.userService = userService;
        this.businessService = businessService;
    }
    createReceipt(receipt) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = new Receipt({
                purchaseDate: receipt.purchaseDate,
                purchaseAmount: receipt.purchaseAmount,
                card: receipt.client,
                client: receipt.client,
                worker: receipt.worker,
                bonusAmount: receipt.bonusAmount,
                minusBonus: receipt.minusBonus,
                currencySign: receipt.currencySign,
            });
            try {
                this.userService.addHistory(receipt.worker, data);
                this.loyaltyCardService.addReceiptToCard(receipt.card, data);
                this.loyaltyCardService.updateBonusAmount(receipt.card, receipt.bonusAmount, receipt.minusBonus);
                const loyaltyCard = yield this.loyaltyCardService.getLoyaltyCardByUserId(receipt.client);
                this.businessService.addReceiptToBusiness(loyaltyCard.business, data);
                yield data.save();
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getAllReceipts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield Receipt.find();
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getReceiptById(_receiptId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield Receipt.findById(_receiptId);
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.ReceiptService = ReceiptService;
//# sourceMappingURL=ReceiptService.js.map