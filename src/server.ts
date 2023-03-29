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
import { DataRoute } from "./routes/dataRoute";
import { UserRoute } from "./routes/userRoute";
import { ReceiptRoute } from "./routes/receiptRoute";

const dataRoute = new DataRoute();
const userRoute = new UserRoute();
const receiptRoute = new ReceiptRoute();

app.use("/api", dataRoute.getRouter());
app.use("/api/user", userRoute.getRouter());
app.use("/api/receipt", receiptRoute.getRouter());

/// Swagger entry
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/// Main entry
app.listen(3000, () => {
  console.log(`Server Started at ${3000}`);
});
