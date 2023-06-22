"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessRoute = void 0;
const express_1 = require("express");
const BusinessController_1 = require("../controllers/BusinessController");
const BusinessService_1 = require("../services/BusinessService");
const checkToken_1 = require("../middlewares/checkToken");
const UserService_1 = require("../services/UserService");
class BusinessRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.businessController = new BusinessController_1.BusinessController(new BusinessService_1.BusinessService(), new UserService_1.UserService());
        this.setupRoutes();
    }
    setupRoutes() {
        this.router.get("/", this.businessController.getBusinesses.bind(this.businessController));
        this.router.post("/", this.businessController.createBusiness.bind(this.businessController));
        this.router.post("/workeradd", checkToken_1.checkToken, this.businessController.addWorker.bind(this.businessController));
        this.router.post("/workerdelete", this.businessController.deleteWorker.bind(this.businessController));
        this.router.post("/update", checkToken_1.checkToken, this.businessController.updateBusinessInfo.bind(this.businessController));
        this.router.post("/getbusinessbyid", this.businessController.getBusinessById.bind(this.businessController));
        this.router.post("/getbusinesswithworkers", this.businessController.getBusinessWorkersByBid.bind(this.businessController));
    }
    getRouter() {
        return this.router;
    }
}
exports.BusinessRoute = BusinessRoute;
//# sourceMappingURL=BusinessRoute.js.map