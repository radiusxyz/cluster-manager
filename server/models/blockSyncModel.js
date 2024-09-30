import mongoose from "mongoose";

const blockSyncSchema = new mongoose.Schema({
  lastBlockNumber: { type: Number, required: true },
  lastTransactionHash: { type: String, required: true },
  lastLogIndex: { type: Number, required: true },
});

const BlockSync = mongoose.model("BlockSync", blockSyncSchema);

export default BlockSync;
