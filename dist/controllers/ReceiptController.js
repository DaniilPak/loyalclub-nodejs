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
exports.ReceiptController = void 0;
class ReceiptController {
    constructor(receiptService, loyaltyCardService, businessService, userService) {
        this.receiptService = receiptService;
        this.loyaltyCardService = loyaltyCardService;
        this.businessService = businessService;
        this.userService = userService;
    }
    getDetailedReceipt(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { receiptId } = req.body;
                const receiptObject = yield this.receiptService.getReceiptById(receiptId);
                // Get client object by receipt cliend id
                const clientObject = yield this.userService.getUserById(receiptObject.client);
                // Get worker object 
                const workerObject = yield this.userService.getUserById(receiptObject.worker);
                res.status(200).json({ receiptObject, clientObject, workerObject });
            }
            catch (err) {
                console.error(err);
                res.status(500).send("Internal server error");
            }
        });
    }
    getReceipts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.receiptService.getAllReceipts();
                res.status(200).json(data);
            }
            catch (err) {
                console.error(err);
                res.status(500).send("Internal server error");
            }
        });
    }
    createReceipt(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { purchaseAmount, card, clientId, workerId, bonusAmount, minusBonus } = req.body;
                const purchaseDate = new Date();
                const currentLoyaltyCard = yield this.loyaltyCardService.getLoyaltyCardByUserId(clientId);
                const currentBusiness = yield this.businessService.getBusinessById(currentLoyaltyCard.business);
                if (minusBonus > currentLoyaltyCard.bonusAmount) {
                    res.status(201).json({ error: 'Minus bonus is more than bonus amount exist' });
                    return;
                }
                const isOwnerOfBusiness = workerId == currentBusiness.owner;
                const isWorkerOfBusiness = currentBusiness.workers.includes(workerId);
                const countedBonus = (purchaseAmount / 100) * currentBusiness.loyalPercent;
                const receipt = {
                    purchaseDate,
                    purchaseAmount,
                    card,
                    client: clientId,
                    worker: workerId,
                    bonusAmount: Math.ceil(countedBonus),
                    minusBonus: minusBonus,
                    currencySign: currentBusiness.currencySign,
                };
                if (isOwnerOfBusiness || isWorkerOfBusiness) {
                    const data = yield this.receiptService.createReceipt(receipt);
                    res.status(201).json(data);
                }
                else {
                    res.status(500).send(`Error`);
                }
            }
            catch (err) {
                res.status(500).send(`Error ${err}`);
            }
        });
    }
}
exports.ReceiptController = ReceiptController;
//# sourceMappingURL=ReceiptController.js.map