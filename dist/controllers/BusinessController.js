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
exports.BusinessController = void 0;
const jwt = require("jsonwebtoken");
class BusinessController {
    constructor(businessService, userService) {
        this.businessService = businessService;
        this.userService = userService;
    }
    getBusinessWorkersByBid(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { businessId } = req.body;
                const data = yield this.businessService.getBusinessById(businessId);
                let workers = [];
                data.workers.forEach(worker => {
                    this.userService.getUserById(worker)
                        .then(workerDetails => {
                        workers.push(workerDetails);
                    })
                        .finally(() => res.status(200).json(workers))
                        .catch(err => res.status(500).send("Internal server error"));
                });
            }
            catch (err) {
                console.error(err);
                res.status(500).send("Internal server error");
            }
        });
    }
    getBusinessById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { businessId } = req.body;
                const data = yield this.businessService.getBusinessById(businessId);
                res.status(200).json(data);
            }
            catch (err) {
                console.error(err);
                res.status(500).send("Internal server error");
            }
        });
    }
    getBusinesses(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.businessService.getAllBusinesses();
                res.status(200).json(data);
            }
            catch (err) {
                console.error(err);
                res.status(500).send("Internal server error");
            }
        });
    }
    createBusiness(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, pictureUrl, loyalPercent, address, workers, owner, receipts } = req.body;
                const business = {
                    name,
                    pictureUrl,
                    loyalPercent,
                    address,
                    workers,
                    owner,
                    receipts
                };
                const data = yield this.businessService.createBusiness(business);
                res.status(201).json(data);
            }
            catch (err) {
                console.error(err);
                res.status(500).send(`Error ${err}`);
            }
        });
    }
    addWorker(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { workerId, businessId } = req.body;
                const data = yield this.businessService.addWorker(workerId, businessId);
                const updatedWorker = yield this.userService.updateWorker(workerId, 'Worker', businessId);
                res.status(201).json(data);
            }
            catch (error) {
                console.error(error);
                res.status(500).send(`Error ${error}`);
            }
        });
    }
    deleteWorker(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { workerId, businessId } = req.body;
                const data = yield this.businessService.deleteWorker(workerId, businessId);
                yield this.userService.updateWorker(workerId, 'Client', '');
                res.status(201).json(data);
            }
            catch (error) {
                console.error(error);
                res.status(500).send(`Error ${error}`);
            }
        });
    }
    updateBusinessInfo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const business = req.body;
                const businessId = req.headers.businessid;
                const token = req.headers.authorization;
                // Decode the token
                const decoded = jwt.verify(token, "secret");
                const owner = yield this.userService.getUserById(decoded._id);
                const currentBusiness = yield this.businessService.getBusinessById(businessId.toString());
                if (currentBusiness.owner != decoded._id) {
                    res
                        .status(500)
                        .send(`Owner ${owner.name} ${owner.surname} is not owned this business ${businessId}`);
                    return;
                }
                const data = yield this.businessService.updateBusinessInfo(business, businessId);
                res.status(201).json(data);
            }
            catch (error) {
                console.error(error);
                res.status(500).send(`Error ${error}`);
            }
        });
    }
}
exports.BusinessController = BusinessController;
//# sourceMappingURL=BusinessController.js.map