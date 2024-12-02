import mongoose from "mongoose";

const blockSyncSchema = new mongoose.Schema({
  contractAddress: { type: String, required: true, index: true },
  lastBlockNumber: { type: Number, required: true },
  lastTransactionHash: { type: String, required: true },
  lastLogIndex: { type: Number, required: true },
});

blockSyncSchema.index({ contractAddress: 1 }, { unique: true });

const BlockSync = mongoose.model("BlockSync", blockSyncSchema);

export default BlockSync;
