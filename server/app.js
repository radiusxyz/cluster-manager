import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import startEventListeners from "./listeners/eventListeners.js";
import clusterRoutes from "./routes/clusterRoutes.js";
import mongoose from "mongoose";
import Cluster from "./models/clusterModel.js";
import BlockSync from "./models/blockSyncModel.js";
dotenv.config({ path: "./.env" });

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1", clusterRoutes);

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then(async () => {
    console.log("DB connection successful!");
    // // Clear the Cluster collection on startup
    // await Cluster.deleteMany({});
    // await BlockSync.deleteMany({});
    // console.log("Cluster collection cleared");
    await startEventListeners();
  })
  .catch((error) => {
    console.error("DB connection failed:", error.message);
    process.exit(1);
  });

export default app;
