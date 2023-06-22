"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkToken = void 0;
const jwt = require("jsonwebtoken");
require("dotenv").config();
const mongoJwtSecret = process.env.JWT_SECRET;
// Set up middleware to check for JWT token in request header
function checkToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    jwt.verify(token, mongoJwtSecret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Invalid token" });
        }
        req.user = decoded;
        next();
    });
}
exports.checkToken = checkToken;
;
//# sourceMappingURL=checkToken.js.map