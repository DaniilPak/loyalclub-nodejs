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
exports.AuthController = void 0;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const mongoJwtSecret = process.env.JWT_SECRET;
class AuthController {
    constructor(userService) {
        this.userService = userService;
    }
    // Set up route to authenticate user and send JWT token
    makeAuth(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { phoneNumber, password } = req.body;
            try {
                const userData = yield this.userService.getUserByPhoneNumber(phoneNumber);
                const isPasswordCorrect = yield bcrypt.compare(password, userData.password);
                if (isPasswordCorrect) {
                    const token = jwt.sign({ _id: userData._id }, mongoJwtSecret, { expiresIn: "24h" });
                    res.json({ token, userData });
                }
                else {
                    res.status(401).json({ message: "Invalid credentials" });
                }
            }
            catch (err) {
                res.json({ err });
            }
        });
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=AuthController.js.map