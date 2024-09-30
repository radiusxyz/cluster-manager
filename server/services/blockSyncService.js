import BlockSync from "../models/blockSyncModel.js";

// Update to include logIndex
const updateLastProcessedEvent = async ({
  blockNumber,
  transactionHash,
  logIndex,
}) => {
  await BlockSync.findOneAndUpdate(
    {},
    {
      lastBlockNumber: blockNumber,
      lastTransactionHash: transactionHash,
      lastLogIndex: logIndex,
    },
    { upsert: true, new: true }
  );
};

const getLastProcessedEvent = async () => {
  const record = await BlockSync.findOne();
  if (record) {
    return {
      lastBlockNumber: record.lastBlockNumber,
      lastTransactionHash: record.lastTransactionHash,
      lastLogIndex: record.lastLogIndex,
    };
  }
  return {
    lastBlockNumber: 0,
    lastTransactionHash: 0,
    lastLogIndex: 0,
  };
};

export default {
  getLastProcessedEvent,
  updateLastProcessedEvent,
};
