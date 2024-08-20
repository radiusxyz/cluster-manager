import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import startEventListeners from "./listeners/eventListeners.js";
import proposerSetRoutes from "./routes/proposerSetRoutes.js";
import mongoose from "mongoose";
import ProposerSet from "./models/proposerSetModel.js";
dotenv.config({ path: "./.env" });

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1", proposerSetRoutes);

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then(async () => {
    console.log("DB connection successful!");
    // Clear the ProposerSet collection on startup
    await ProposerSet.deleteMany({});
    console.log("ProposerSet collection cleared");
  })
  .catch((error) => {
    console.error("DB connection failed:", error.message);
    process.exit(1);
  });

startEventListeners();

export default app;
