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
exports.BusinessService = void 0;
const BusinessModel = require("../models/businessModel");
class BusinessService {
    createBusiness(business) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = new BusinessModel({
                name: business.name,
                pictureUrl: business.pictureUrl,
                loyalPercent: business.loyalPercent,
                address: business.address,
                workers: business.workers,
                owner: business.owner,
            });
            try {
                yield data.save();
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getAllBusinesses() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield BusinessModel.find();
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    addWorker(workerId, businessId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const business = yield BusinessModel.findById(businessId);
                if (!business.workers.includes(workerId)) {
                    business.workers.push(workerId);
                    business.save();
                }
                return business;
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteWorker(workerId, businessId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const business = yield BusinessModel.findById(businessId);
                const workerIndex = business.workers.indexOf(workerId);
                if (workerIndex !== -1) {
                    business.workers.splice(workerIndex, 1);
                    business.save();
                }
                return business;
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateBusinessInfo(business, businessId) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = { _id: businessId };
            const update = business;
            const options = { new: true };
            try {
                const data = yield BusinessModel.findOneAndUpdate(filter, update, options);
                data.save();
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getBusinessById(businessId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield BusinessModel.findById(businessId);
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    addReceiptToBusiness(businessId, receipt) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const business = yield BusinessModel.findById(businessId);
                business.receipts.push(receipt);
                business.save();
                return business;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.BusinessService = BusinessService;
//# sourceMappingURL=BusinessService.js.map