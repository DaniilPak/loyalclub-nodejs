"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoyaltyCardRoute = void 0;
const express_1 = require("express");
const LoyaltyCardController_1 = require("../controllers/LoyaltyCardController");
const LoyaltyCardService_1 = require("../services/LoyaltyCardService");
const BusinessService_1 = require("../services/BusinessService");
const UserService_1 = require("../services/UserService");
class LoyaltyCardRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.loyaltyCardController = new LoyaltyCardController_1.LoyaltyCardController(new LoyaltyCardService_1.LoyaltyCardService(), new BusinessService_1.BusinessService(), new UserService_1.UserService());
        this.setupRoutes();
    }
    setupRoutes() {
        this.router.get("/", this.loyaltyCardController.getLoyaltyCards.bind(this.loyaltyCardController));
        this.router.post("/", this.loyaltyCardController.createLoyaltyCard.bind(this.loyaltyCardController));
        this.router.post("/getloyaltycardbyid", this.loyaltyCardController.getLoyaltyCardById.bind(this.loyaltyCardController));
        this.router.post("/getorcreatecard", this.loyaltyCardController.getOrCreateLoyaltyCard.bind(this.loyaltyCardController));
    }
    getRouter() {
        return this.router;
    }
}
exports.LoyaltyCardRoute = LoyaltyCardRoute;
//# sourceMappingURL=LoyaltyCardRoute.js.map