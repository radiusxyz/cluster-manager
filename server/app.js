import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import startEventListeners from "./listeners/eventListeners.js";
import proposerSetRoutes from "./routes/proposerSetRoutes.js";
dotenv.config({ path: "./.env" });

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1", proposerSetRoutes);

startEventListeners();

export default app;
