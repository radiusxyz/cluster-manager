import BlockSync from "../models/blockSyncModel.js";

const getLastProcessedBlock = async (eventName) => {
  const record = await BlockSync.findOne({ eventName });
  return record ? record.lastBlockNumber : null;
};

const updateLastProcessedBlock = async (eventName, blockNumber) => {
  await BlockSync.findOneAndUpdate(
    { eventName },
    { lastBlockNumber: blockNumber },
    { upsert: true, new: true }
  );
};

export default {
  getLastProcessedBlock,
  updateLastProcessedBlock,
};
