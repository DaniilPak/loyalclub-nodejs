"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceiptRoute = void 0;
const express_1 = require("express");
const ReceiptController_1 = require("../controllers/ReceiptController");
const ReceiptService_1 = require("../services/ReceiptService");
const UserService_1 = require("../services/UserService");
const LoyaltyCardService_1 = require("../services/LoyaltyCardService");
const BusinessService_1 = require("../services/BusinessService");
const checkToken_1 = require("../middlewares/checkToken");
class ReceiptRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.receiptController = new ReceiptController_1.ReceiptController(new ReceiptService_1.ReceiptService(new UserService_1.UserService(), new LoyaltyCardService_1.LoyaltyCardService(), new BusinessService_1.BusinessService()), new LoyaltyCardService_1.LoyaltyCardService(), new BusinessService_1.BusinessService(), new UserService_1.UserService());
        this.setupRoutes();
    }
    setupRoutes() {
        this.router.get("/", this.receiptController.getReceipts.bind(this.receiptController));
        this.router.post("/", checkToken_1.checkToken, this.receiptController.createReceipt.bind(this.receiptController));
        this.router.post("/getdetailedreceipt", this.receiptController.getDetailedReceipt.bind(this.receiptController));
    }
    getRouter() {
        return this.router;
    }
}
exports.ReceiptRoute = ReceiptRoute;
//# sourceMappingURL=ReceiptRoute.js.map