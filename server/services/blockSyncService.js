import BlockSync from "../models/blockSyncModel.js";

// Get the last processed block number and transaction hash for a specific event
const getLastProcessedEvent = async (eventName) => {
  const record = await BlockSync.findOne({ eventName });
  if (record) {
    return {
      lastBlockNumber: record.lastBlockNumber,
      lastTransactionHash: record.lastTransactionHash,
    };
  }
  return {
    lastBlockNumber: null,
    lastTransactionHash: null,
  };
};

// Update the last processed block number and transaction hash for a specific event
const updateLastProcessedEvent = async (
  eventName,
  { blockNumber, transactionHash }
) => {
  await BlockSync.findOneAndUpdate(
    { eventName },
    { lastBlockNumber: blockNumber, lastTransactionHash: transactionHash },
    { upsert: true, new: true }
  );
};

export default {
  getLastProcessedEvent,
  updateLastProcessedEvent,
};
