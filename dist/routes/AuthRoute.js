"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoute = void 0;
const express_1 = require("express");
const AuthController_1 = require("../controllers/AuthController");
const UserService_1 = require("../services/UserService");
class AuthRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.authController = new AuthController_1.AuthController(new UserService_1.UserService);
        this.setupRoutes();
    }
    setupRoutes() {
        this.router.post("/", this.authController.makeAuth.bind(this.authController));
    }
    getRouter() {
        return this.router;
    }
}
exports.AuthRoute = AuthRoute;
//# sourceMappingURL=AuthRoute.js.map