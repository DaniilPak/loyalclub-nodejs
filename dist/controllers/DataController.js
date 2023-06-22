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
exports.DataController = void 0;
const jwt = require("jsonwebtoken");
class DataController {
    constructor(dataService) {
        this.dataService = dataService;
    }
    getData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const datas = yield this.dataService.getAllData();
                res.status(200).json(datas);
            }
            catch (err) {
                console.error(err);
                res.status(500).send("Internal server error");
            }
        });
    }
    createData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const myData = req.body;
                const data = yield this.dataService.createData(myData.name, myData.age);
                res.status(201).json(data);
            }
            catch (err) {
                console.error(err);
                res.status(500).send("Internal server error");
            }
        });
    }
    getDataById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.body;
                const data = yield this.dataService.getDataById(id);
                res.status(201).json(data);
            }
            catch (err) {
                console.error(err);
                res.status(500).send("Internal server error");
            }
        });
    }
    // Set up route to authenticate user and send JWT token
    makeAuth(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            if (username === "admin" && password === "password") {
                const token = jwt.sign({ username }, "secret", { expiresIn: "1h" });
                res.json({ token });
            }
            else {
                res.status(401).json({ message: "Invalid credentials" });
            }
        });
    }
    getProtectedInfo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.json({ message: `Welcome ${req}! This is protected data.` });
        });
    }
}
exports.DataController = DataController;
//# sourceMappingURL=DataController.js.map