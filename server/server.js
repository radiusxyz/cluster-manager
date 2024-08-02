import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";

dotenv.config({ path: "./.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then(() => console.log("DB connection successful!"))
  .catch((error) => {
    console.error("DB connection failed:", error.message);
    process.exit(1);
  });

const PORT = process.env.PORT || 3333;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on("SIGTERM", () => {
  console.log("👋 SIGTERM RECEIVED. Shutting down gracefully");
  server.close(() => {
    console.log("💥 Process terminated!");
  });
});
