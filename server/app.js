import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import startEventListeners from "./listeners/eventListeners.js";
const proposerSetRoutes = require("./routes/proposerSetRoutes.js");
dotenv.config({ path: "./.env" });

app.use(cors());
app.use(express.json());
app.use("api/v1", proposerSetRoutes);

startEventListeners();

module.exports = app;
