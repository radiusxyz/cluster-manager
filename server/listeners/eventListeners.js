import { createPublicClient, http } from "viem";
import eventService from "../services/eventService.js";
import blockSyncService from "../services/blockSyncService.js";

import { contractAddress, contractAbi } from "../../common.js";
import dotenv from "dotenv";
dotenv.config();
import { localhost } from "../config.js";

const client = createPublicClient({
  chain: localhost,
  transport: http(),
});

// Helper function to check if the log is new
const isNewLog = (log, lastProcessedEvent) => {
  // If lastProcessedEvent is null or missing fields, consider the log new
  if (
    !lastProcessedEvent ||
    lastProcessedEvent.lastBlockNumber === null ||
    lastProcessedEvent.lastTransactionHash === null ||
    lastProcessedEvent.lastLogIndex === null
  ) {
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
      eventName: log.eventName, // Optional, can remove if not needed
      blockNumber: Number(log.blockNumber),
      transactionHash: log.transactionHash,
      logIndex: log.logIndex,
    });
  }
};

// Function to fetch missed events and process them
const fetchMissedEvents = async (events, fromBlock, toBlock) => {
  try {
    // Fetch historical logs without specifying the event name
    const logs = await client.getContractEvents({
      address: contractAddress,
      abi: contractAbi,
      fromBlock,
      toBlock,
    });

    // Get the last processed event from the database
    const lastProcessedEvent = await blockSyncService.getLastProcessedEvent();

    // Process each log
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

// Function to watch multiple contract events starting from a specific block number
const watchMultipleContractEvents = async (events) => {
  try {
    const currentBlockNumber = await client.getBlockNumber();
    let fromBlock = currentBlockNumber;

    // Fetch the last processed event
    const lastProcessedEvent = await blockSyncService.getLastProcessedEvent();

    // If lastProcessedEvent is not null, sync missed events
    if (lastProcessedEvent && lastProcessedEvent.lastBlockNumber !== null) {
      fromBlock = BigInt(lastProcessedEvent.lastBlockNumber);
      console.log("Last synced block", fromBlock);
      console.log("Current block", currentBlockNumber);

      // Fetch missed events before setting up watcher
      await fetchMissedEvents(events, fromBlock, currentBlockNumber);
    } else {
      console.log("No previous events to sync, starting fresh.");
    }

    // Start watching contract events after fetching missed events (if any)
    client.watchContractEvent({
      address: contractAddress,
      abi: contractAbi,
      fromBlock: lastProcessedEvent
        ? currentBlockNumber + 1n
        : currentBlockNumber, // Start from current block if first time
      onLogs: async (logs) => {
        console.log("Received event logs:", logs);

        try {
          const lastProcessedEvent =
            await blockSyncService.getLastProcessedEvent();
          for (const log of logs) {
            // If there is no lastProcessedEvent or the log is new, process it
            if (isNewLog(log, lastProcessedEvent)) {
              await processLog(log, events);
            }
          }
        } catch (error) {
          console.error("Error handling event logs:", error);
        }
      },
    });
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
