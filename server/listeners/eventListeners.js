import { createPublicClient, http } from "viem";
import eventService from "../services/eventService.js";
import blockSyncService from "../services/blockSyncService.js";

import { contractAddress, contractAbi } from "../../common.js";
import dotenv from "dotenv";
dotenv.config();
import { localhost, holesky } from "../config.js";

const client = createPublicClient({
  chain: holesky,
  transport: http(),
});

// Helper function to check if the log is new
const isNewLog = (log, lastProcessedEvent) => {
  if (!lastProcessedEvent) {
    return true;
  }

  const { lastBlockNumber, lastTransactionHash, lastLogIndex } =
    lastProcessedEvent;

  return (
    BigInt(log.blockNumber) > BigInt(lastBlockNumber) ||
    (BigInt(log.blockNumber) === BigInt(lastBlockNumber) &&
      log.transactionHash === lastTransactionHash &&
      log.logIndex > lastLogIndex)
  );
};

// Helper function to process logs
const processLog = async (log, events) => {
  const event = events.find((e) => e.eventName === log.eventName);
  if (event && event.handleEvent) {
    await event.handleEvent([log]);

    // Update the last processed block number, transaction hash, and log index in the database
    await blockSyncService.updateLastProcessedEvent({
      eventName: log.eventName,
      blockNumber: Number(log.blockNumber),
      transactionHash: log.transactionHash,
      logIndex: log.logIndex,
    });

    const lastProcessedEvent = await blockSyncService.getLastProcessedEvent();
    console.log("Updated last processed event:", lastProcessedEvent);
  }
};

// Function to fetch missed events and process them
const fetchMissedEvents = async (events, fromBlock, toBlock) => {
  try {
    const logs = await client.getContractEvents({
      address: contractAddress,
      abi: contractAbi,
      fromBlock,
      toBlock,
    });

    const lastProcessedEvent = await blockSyncService.getLastProcessedEvent();

    for (const log of logs) {
      if (isNewLog(log, lastProcessedEvent)) {
        console.log("Processing missed event log:", log);
        await processLog(log, events);
      } else {
        console.log("Skipping already processed log:", log);
      }
    }
  } catch (error) {
    console.error("Error fetching and processing missed events:", error);
  }
};

// Function to watch multiple contract events with continuous monitoring
const watchMultipleContractEvents = async (events) => {
  try {
    const lastProcessedEvent = await blockSyncService.getLastProcessedEvent();

    if (lastProcessedEvent) {
      const fromBlock = BigInt(lastProcessedEvent.lastBlockNumber);
      console.log("Last synced block:", fromBlock);

      // Fetch missed events up to current block
      let currentBlockNumber = await client.getBlockNumber();
      console.log("Fetching missed events up to block:", currentBlockNumber);
      await fetchMissedEvents(events, fromBlock, currentBlockNumber);
      currentBlockNumber = BigInt(lastProcessedEvent.lastBlockNumber);

      // After fetching, start the watcher from the last processed block + 1
      console.log(
        "Setting up watcher starting from block:",
        currentBlockNumber + 1n
      );

      // Start watching events from the block after the last one fetched
      client.watchContractEvent({
        address: contractAddress,
        abi: contractAbi,
        fromBlock: currentBlockNumber + 1n,
        onLogs: async (logs) => {
          console.log("Received event logs:", logs);

          try {
            const lastProcessedEvent =
              await blockSyncService.getLastProcessedEvent();
            for (const log of logs) {
              if (isNewLog(log, lastProcessedEvent)) {
                await processLog(log, events);
              }
            }
          } catch (error) {
            console.error("Error handling event logs:", error);
          }
        },
      });
    } else {
      // No previous event: Start fresh from current block number
      console.log("No previous events to sync, starting fresh.");
      const currentBlockNumber = await client.getBlockNumber();
      console.log(
        "Setting up watcher starting from block:",
        currentBlockNumber
      );

      client.watchContractEvent({
        address: contractAddress,
        abi: contractAbi,
        fromBlock: currentBlockNumber,
        onLogs: async (logs) => {
          console.log("Received event logs:", logs);

          try {
            const lastProcessedEvent =
              await blockSyncService.getLastProcessedEvent();
            for (const log of logs) {
              if (isNewLog(log, lastProcessedEvent)) {
                await processLog(log, events);
              }
            }
          } catch (error) {
            console.error("Error handling event logs:", error);
          }
        },
      });
    }
  } catch (error) {
    console.error("Error setting up watcher for events:", error);
  }
};

// Start event listeners
const startEventListeners = async () => {
  const events = [
    {
      eventName: "InitializeCluster",
      handleEvent: eventService.handleInitializeCluster,
    },
    { eventName: "AddRollup", handleEvent: eventService.handleAddRollup },
    {
      eventName: "RegisterSequencer",
      handleEvent: eventService.handleRegisterSequencer,
    },
    {
      eventName: "DeregisterSequencer",
      handleEvent: eventService.handleDeregisterSequencer,
    },
  ];

  try {
    await watchMultipleContractEvents(events);
  } catch (error) {
    console.error("Failed to start event watcher:", error);
  }
};

export default startEventListeners;
