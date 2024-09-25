import mongoose from "mongoose";

const blockSyncSchema = new mongoose.Schema({
  eventName: { type: String, unique: true, required: true },
  lastBlockNumber: { type: Number, required: true },
  lastTransactionHash: { type: String, required: true }, // Add this line to track the last transaction hash
});

const BlockSync = mongoose.model("BlockSync", blockSyncSchema);

export default BlockSync;
