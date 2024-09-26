import { createPublicClient, http } from "viem";
import eventService from "../services/eventService.js";
import blockSyncService from "../services/blockSyncService.js";

import { contractAddress, contractAbi } from "../../common.js";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import { holesky } from "../config.js";

const client = createPublicClient({
  chain: holesky,
  transport: http(),
});

// Function to watch multiple contract events starting from a specific block number
const watchMultipleContractEvents = async (events) => {
  try {
    // Get the current block number to start from
    const currentBlockNumber = await client.getBlockNumber();
    let fromBlock = currentBlockNumber;
    let lastProcessedEvents = {};

    // Fetch the last processed event for each eventName
    for (const { eventName } of events) {
      const { lastBlockNumber, lastTransactionHash } =
        await blockSyncService.getLastProcessedEvent(eventName);

      lastProcessedEvents[eventName] = {
        lastBlockNumber: lastBlockNumber
          ? BigInt(lastBlockNumber)
          : currentBlockNumber,
        lastTransactionHash,
      };

      // Ensure fromBlock is the minimum of the current block or the last processed block
      if (lastProcessedEvents[eventName].lastBlockNumber < fromBlock) {
        fromBlock = lastProcessedEvents[eventName].lastBlockNumber;
      }
    }

    console.log("Last synced block", fromBlock);
    console.log("Current block", currentBlockNumber);

    // Set up a single watcher for all events
    client.watchContractEvent({
      address: contractAddress,
      abi: contractAbi,
      fromBlock,
      onLogs: async (logs) => {
        console.log("Received event logs:", logs);

        try {
          // Process each log and route it to the correct handler
          for (const log of logs) {
            const { eventName } = log;
            const { lastBlockNumber, lastTransactionHash } =
              lastProcessedEvents[eventName] || {};

            // Filter out already processed logs
            if (
              log.blockNumber > lastBlockNumber ||
              (log.blockNumber === lastBlockNumber &&
                log.transactionHash !== lastTransactionHash)
            ) {
              // Find the corresponding event handler
              const event = events.find((e) => e.eventName === eventName);
              if (event && event.handleEvent) {
                await event.handleEvent([log]);

                // Update the last processed block number and transaction hash in the database
                await blockSyncService.updateLastProcessedEvent(eventName, {
                  blockNumber: Number(log.blockNumber),
                  transactionHash: log.transactionHash,
                });

                // Update in-memory tracking of the last processed event
                lastProcessedEvents[eventName] = {
                  lastBlockNumber: log.blockNumber,
                  lastTransactionHash: log.transactionHash,
                };
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
