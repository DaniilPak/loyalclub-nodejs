"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataRoute = void 0;
const express_1 = require("express");
const DataService_1 = require("../services/DataService");
const DataController_1 = require("../controllers/DataController");
const checkToken_1 = require("../middlewares/checkToken");
class DataRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.dataController = new DataController_1.DataController(new DataService_1.DataService());
        this.setupRoutes();
    }
    setupRoutes() {
        this.router.get("/", this.dataController.getData.bind(this.dataController));
        this.router.post("/", this.dataController.createData.bind(this.dataController));
        // this.router.post(
        //   "/auth",
        //   this.dataController.makeAuth.bind(this.dataController)
        // );
        this.router.get("/protected", checkToken_1.checkToken, this.dataController.getProtectedInfo.bind(this.dataController));
        this.router.get("/getbyid", this.dataController.getDataById.bind(this.dataController));
    }
    getRouter() {
        return this.router;
    }
}
exports.DataRoute = DataRoute;
//# sourceMappingURL=DataRoute.js.map