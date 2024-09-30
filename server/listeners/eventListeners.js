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
    const { lastBlockNumber, lastTransactionHash, lastLogIndex } =
      await blockSyncService.getLastProcessedEvent();

    // Process each log
    for (const log of logs) {
      // Check if the log is new by comparing block number, transaction hash, and logIndex
      if (
        BigInt(log.blockNumber) > BigInt(lastBlockNumber) ||
        (BigInt(log.blockNumber) === BigInt(lastBlockNumber) &&
          log.transactionHash === lastTransactionHash &&
          log.logIndex > lastLogIndex)
      ) {
        console.log("Processing missed event log:", log);

        // Find the matching event from the events array
        const event = events.find((e) => e.eventName === log.eventName);
        if (event && event.handleEvent) {
          // Handle the event
          await event.handleEvent([log]);

          // Update the last processed block number, transaction hash, and log index in the database
          await blockSyncService.updateLastProcessedEvent({
            eventName: log.eventName, // Optional, can remove if not needed
            blockNumber: Number(log.blockNumber),
            transactionHash: log.transactionHash,
            logIndex: log.logIndex,
          });
        }
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
    const { lastBlockNumber } = await blockSyncService.getLastProcessedEvent();

    if (lastBlockNumber !== 0) {
      fromBlock = BigInt(lastBlockNumber);
    }

    console.log("Last synced block", fromBlock);
    console.log("Current block", currentBlockNumber);

    // Fetch missed events before setting up watcher
    await fetchMissedEvents(events, fromBlock, currentBlockNumber);

    // Start watching contract events after fetching missed events
    client.watchContractEvent({
      address: contractAddress,
      abi: contractAbi,
      fromBlock: currentBlockNumber + 1n, // Ensure we start from the next block
      onLogs: async (logs) => {
        console.log("Received event logs:", logs);

        try {
          for (const log of logs) {
            const { eventName } = log;
            const { lastBlockNumber, lastTransactionHash, lastLogIndex } =
              await blockSyncService.getLastProcessedEvent();

            // Ensure the log is new based on block number, transaction hash, and logIndex
            if (
              BigInt(log.blockNumber) > BigInt(lastBlockNumber) ||
              (BigInt(log.blockNumber) === BigInt(lastBlockNumber) &&
                log.transactionHash === lastTransactionHash &&
                log.logIndex > lastLogIndex)
            ) {
              const event = events.find((e) => e.eventName === eventName);
              if (event && event.handleEvent) {
                await event.handleEvent([log]);

                // Update the last processed block number, transaction hash, and log index
                await blockSyncService.updateLastProcessedEvent({
                  blockNumber: Number(log.blockNumber),
                  transactionHash: log.transactionHash,
                  logIndex: log.logIndex,
                });
              }
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
