import mongoose from "mongoose";

const blockSyncSchema = new mongoose.Schema({
  eventName: String,
  lastBlockNumber: Number,
});

const BlockSync = mongoose.model("BlockSync", blockSyncSchema);

export default BlockSync;
