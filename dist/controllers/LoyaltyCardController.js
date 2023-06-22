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
exports.LoyaltyCardController = void 0;
class LoyaltyCardController {
    constructor(loyaltyCardService, businessService, userService) {
        this.loyaltyCardService = loyaltyCardService;
        this.businessService = businessService;
        this.userService = userService;
    }
    getLoyaltyCardById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { loyaltyCardId } = req.body;
                const data = yield this.loyaltyCardService.getLoyaltyCardById(loyaltyCardId);
                res.status(200).json(data);
            }
            catch (err) {
                console.error(err);
                res.status(500).send("Internal server error");
            }
        });
    }
    getOrCreateLoyaltyCard(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { cliendId, businessId } = req.body;
                let newLoyaltyCard = null;
                const existingLoyaltyCard = yield this.loyaltyCardService.getLoyaltyCardByClientIdAndBusinessId(cliendId, businessId);
                const businessObject = yield this.businessService.getBusinessById(businessId);
                const loyaltyCard = {
                    userOwner: cliendId,
                    business: businessId,
                    receipts: [],
                    businessName: businessObject.name,
                    currencySign: businessObject.currencySign,
                };
                if (!existingLoyaltyCard) {
                    if (!businessObject) {
                        res.status(500).send("Business object does not exist");
                        return;
                    }
                    newLoyaltyCard = yield this.loyaltyCardService.createLoyaltyCard(loyaltyCard);
                    // Assign card to user
                    yield this.userService.addNewLoyaltyCardToUser(cliendId, newLoyaltyCard._id);
                    res.status(200).json(newLoyaltyCard);
                }
                else {
                    res.status(200).json(existingLoyaltyCard);
                }
            }
            catch (err) {
                console.error(err);
                res.status(500).send("Internal server error");
            }
        });
    }
    getLoyaltyCards(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.loyaltyCardService.getAllLoyaltyCards();
                res.status(200).json(data);
            }
            catch (err) {
                console.error(err);
                res.status(500).send("Internal server error");
            }
        });
    }
    createLoyaltyCard(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userOwner, business, receipts } = req.body;
                const businessObject = yield this.businessService.getBusinessById(business);
                const businessName = businessObject.name;
                const loyaltyCard = {
                    userOwner,
                    business,
                    receipts,
                    businessName,
                    currencySign: businessObject.currencySign,
                };
                const data = yield this.loyaltyCardService.createLoyaltyCard(loyaltyCard);
                res.status(201).json(data);
            }
            catch (err) {
                console.error(err);
                res.status(500).send(`Error ${err}`);
            }
        });
    }
}
exports.LoyaltyCardController = LoyaltyCardController;
//# sourceMappingURL=LoyaltyCardController.js.map