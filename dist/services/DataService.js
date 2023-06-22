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
exports.DataService = void 0;
const Data = require("../models/model");
class DataService {
    createData(name, age) {
        return __awaiter(this, void 0, void 0, function* () {
            // implementation to create a user in database
            const data = new Data({
                name: name,
                age: age,
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
    getAllData() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield Data.find();
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getDataById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield Data.findById(userId);
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.DataService = DataService;
//# sourceMappingURL=DataService.js.map