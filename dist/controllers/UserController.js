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
exports.UserController = void 0;
class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    addNewLoyaltyCardToUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { cliendId, loyaltyCardId } = req.body;
                const data = yield this.userService.addNewLoyaltyCardToUser(cliendId, loyaltyCardId);
                res.status(200).json(data);
            }
            catch (err) {
                console.error(err);
                res.status(500).send("Internal server error");
            }
        });
    }
    getUserByPhoneNumber(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { phoneNumber } = req.body;
                const data = yield this.userService.getUserByPhoneNumber(phoneNumber);
                res.status(200).json(data);
            }
            catch (err) {
                console.error(err);
                res.status(500).send("Internal server error");
            }
        });
    }
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.body;
                const data = yield this.userService.getUserById(userId);
                res.status(200).json(data);
            }
            catch (err) {
                console.error(err);
                res.status(500).send("Internal server error");
            }
        });
    }
    updateWorker(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { workerId, type, workBusiness } = req.body;
                const data = yield this.userService.updateWorker(workerId, type, workBusiness);
                res.status(200).json(data);
            }
            catch (err) {
                console.error(err);
                res.status(500).send("Internal server error");
            }
        });
    }
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.userService.getAllUsers();
                res.status(200).json(data);
            }
            catch (err) {
                console.error(err);
                res.status(500).send("Internal server error");
            }
        });
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.body;
                // Check for existing user
                const existingUser = yield this.userService.getUserByPhoneNumber(user.phoneNumber);
                if (existingUser) {
                    res.status(500).send("User exists, cant register with same number");
                }
                const data = yield this.userService.createUser(user);
                res.status(201).json(data);
            }
            catch (err) {
                console.error(err);
                res.status(500).send("Internal server error");
            }
        });
    }
    createOwner(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const owner = req.body;
                const data = yield this.userService.createOwner(owner);
                res.status(201).json(data);
            }
            catch (err) {
                console.error(err);
                res.status(500).send("Internal server error");
            }
        });
    }
    createWorker(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const worker = req.body;
                const data = yield this.userService.createWorker(worker);
                res.status(201).json(data);
            }
            catch (err) {
                console.error(err);
                res.status(500).send("Internal server error");
            }
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map