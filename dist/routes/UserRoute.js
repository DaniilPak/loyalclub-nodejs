"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoute = void 0;
const express_1 = require("express");
const UserService_1 = require("../services/UserService");
const UserController_1 = require("../controllers/UserController");
class UserRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.userController = new UserController_1.UserController(new UserService_1.UserService());
        this.setupRoutes();
    }
    setupRoutes() {
        this.router.get("/", this.userController.getUsers.bind(this.userController));
        this.router.post("/", this.userController.createUser.bind(this.userController));
        this.router.post("/getuserbyid", this.userController.getUserById.bind(this.userController));
        this.router.post("/owner", this.userController.createOwner.bind(this.userController));
        this.router.post("/worker", this.userController.createWorker.bind(this.userController));
        this.router.post("/getuserbyphone", this.userController.getUserByPhoneNumber.bind(this.userController));
    }
    getRouter() {
        return this.router;
    }
}
exports.UserRoute = UserRoute;
//# sourceMappingURL=UserRoute.js.map