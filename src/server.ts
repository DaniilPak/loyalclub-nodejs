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
import { DataRoute } from "./routes/DataRoute";
import { UserRoute } from "./routes/UserRoute";
import { ReceiptRoute } from "./routes/ReceiptRoute";
import { LoyaltyCardRoute } from "./routes/LoyaltyCardRoute";
import { BusinessRoute } from "./routes/BusinessRoute";
import { AuthRoute } from "./routes/AuthRoute";

const dataRoute = new DataRoute();
const userRoute = new UserRoute();
const receiptRoute = new ReceiptRoute();
const loyaltyCardRoute = new LoyaltyCardRoute();
const businessRoute = new BusinessRoute();
const authRoute = new AuthRoute();

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
