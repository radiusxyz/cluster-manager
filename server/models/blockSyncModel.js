import mongoose from "mongoose";

const blockSyncSchema = new mongoose.Schema({
  eventName: { type: String, unique: true, required: true },
  lastBlockNumber: { type: Number, required: true },
});

const BlockSync = mongoose.model("BlockSync", blockSyncSchema);

export default BlockSync;
