"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);
const database = mongoose.connection;
database.on("error", (error) => {
    console.log(error);
});
database.once("connected", () => {
    console.log("Database Connected");
});
const app = express();
app.use(cors());
app.use(express.json());
/// API entry
const DataRoute_1 = require("./routes/DataRoute");
const UserRoute_1 = require("./routes/UserRoute");
const ReceiptRoute_1 = require("./routes/ReceiptRoute");
const LoyaltyCardRoute_1 = require("./routes/LoyaltyCardRoute");
const BusinessRoute_1 = require("./routes/BusinessRoute");
const AuthRoute_1 = require("./routes/AuthRoute");
const dataRoute = new DataRoute_1.DataRoute();
const userRoute = new UserRoute_1.UserRoute();
const receiptRoute = new ReceiptRoute_1.ReceiptRoute();
const loyaltyCardRoute = new LoyaltyCardRoute_1.LoyaltyCardRoute();
const businessRoute = new BusinessRoute_1.BusinessRoute();
const authRoute = new AuthRoute_1.AuthRoute();
app.use("/api", dataRoute.getRouter());
app.use("/api/user", userRoute.getRouter());
app.use("/api/receipt", receiptRoute.getRouter());
app.use("/api/loyaltycard", loyaltyCardRoute.getRouter());
app.use("/api/business", businessRoute.getRouter());
app.use("/api/auth", authRoute.getRouter());
/// Swagger entry
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
/// Main entry
app.listen(3000, () => {
    console.log(`Server Started at ${3000}`);
});
//# sourceMappingURL=server.js.map