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

import { UserRoute } from "./routes/dataRoute";
const userRoute = new UserRoute();

app.use("/api", userRoute.getRouter());

app.listen(3000, () => {
  console.log(`Server Started at ${3000}`);
});
