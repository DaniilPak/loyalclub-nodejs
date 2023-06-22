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
exports.UserService = void 0;
const UserModel = require("../models/UserModel");
class UserService {
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userModel = new UserModel({
                type: user.type,
                phoneNumber: user.phoneNumber,
                password: user.password,
                name: user.name,
                surname: user.surname,
                email: user.email,
                homeAddress: user.homeAddress,
                paymentInfo: user.paymentInfo,
                orderHistory: [],
                loyaltyCards: [],
                workBusiness: user.workBusiness,
            });
            try {
                yield userModel.save();
                return userModel;
            }
            catch (error) {
                throw error;
            }
        });
    }
    createOwner(owner) {
        return __awaiter(this, void 0, void 0, function* () {
            const userModel = new UserModel({
                type: owner.type,
                phoneNumber: owner.phoneNumber,
                password: owner.password,
                name: owner.name,
                surname: owner.surname,
                email: owner.email,
                homeAddress: owner.homeAddress,
                paymentInfo: owner.paymentInfo,
                orderHistory: owner.orderHistory,
                /// Custom options for owner
                business: owner.business,
            });
            try {
                yield userModel.save();
                return userModel;
            }
            catch (error) {
                throw error;
            }
        });
    }
    createWorker(worker) {
        return __awaiter(this, void 0, void 0, function* () {
            const userModel = new UserModel({
                type: worker.type,
                phoneNumber: worker.phoneNumber,
                password: worker.password,
                name: worker.name,
                surname: worker.surname,
                email: worker.email,
                homeAddress: worker.homeAddress,
                paymentInfo: worker.paymentInfo,
                orderHistory: worker.orderHistory,
                /// Custom options for worker
                workBusiness: worker.workBusiness,
                expirationDate: worker.expirationDate,
                acceptedReceipts: worker.acceptedReceipts,
            });
            try {
                yield userModel.save();
                return userModel;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield UserModel.find();
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield UserModel.findById(userId);
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateWorker(workerId, type, workBusiness) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield UserModel.findById(workerId);
                try {
                    data.type = type;
                    data.workBusiness = workBusiness;
                    data.save();
                }
                catch (error) {
                    throw error;
                }
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getUserByPhoneNumber(userPhoneNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield UserModel.findOne({ phoneNumber: userPhoneNumber });
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    addNewLoyaltyCardToUser(cliendId, loyaltyCardId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userModel = yield UserModel.findById(cliendId);
            try {
                userModel.loyaltyCards.push(loyaltyCardId);
                userModel.save();
            }
            catch (error) {
                throw error;
            }
        });
    }
    addHistory(userId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const userModel = yield UserModel.findById(userId);
            try {
                userModel.orderHistory.push(data);
                userModel.save();
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.UserService = UserService;
//# sourceMappingURL=UserService.js.map