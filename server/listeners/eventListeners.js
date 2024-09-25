import { createPublicClient, http } from "viem";
import eventService from "../services/eventService.js";
import blockSyncService from "../services/blockSyncService.js";

import { contractAddress, contractAbi } from "../../common.js";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import { localhost } from "../config.js";

// setting the public client
const client = createPublicClient({
  chain: localhost,
  transport: http(),
});

// Function to watch contract events starting from a specific block number
const watchContractEventFromBlock = async (eventName, handleEvent) => {
  try {
    // Get the last processed block number and transaction hash from the database
    const { lastBlockNumber, lastTransactionHash } =
      await blockSyncService.getLastProcessedEvent(eventName);

    const fromBlock = lastBlockNumber ? BigInt(lastBlockNumber) : BigInt(1);
    const currentBlockNumber = await client.getBlockNumber();

    console.log("Last synced block", fromBlock, eventName);
    console.log("Current block", currentBlockNumber, eventName);

    client.watchContractEvent({
      address: contractAddress,
      abi: contractAbi,
      eventName,
      fromBlock,
      onLogs: async (logs) => {
        console.log(`Received ${eventName} event logs:`, logs);

        try {
          const filteredLogs = logs.filter(
            (log) =>
              log.blockNumber > lastBlockNumber ||
              (log.blockNumber === lastBlockNumber &&
                log.transactionHash !== lastTransactionHash)
          );

          if (filteredLogs.length > 0) {
            await handleEvent(filteredLogs);

            // Update the last processed block number and transaction hash in the database
            const latestLog = filteredLogs[filteredLogs.length - 1];
            await blockSyncService.updateLastProcessedEvent(eventName, {
              blockNumber: Number(latestLog.blockNumber),
              transactionHash: latestLog.transactionHash,
            });
          }
        } catch (error) {
          console.error(`Error handling ${eventName} event:`, error);
        }
      },
    });
  } catch (error) {
    console.error(`Error setting up watcher for ${eventName} event:`, error);
  }
};

// Define specific event handlers
const watchInitializeCluster = async () =>
  await watchContractEventFromBlock(
    "InitializeCluster",
    eventService.handleInitializeCluster
  );

const watchAddRollup = async () =>
  await watchContractEventFromBlock("AddRollup", eventService.handleAddRollup);

const watchRegisterSequencer = async () =>
  await watchContractEventFromBlock(
    "RegisterSequencer",
    eventService.handleRegisterSequencer
  );
const watchDeregisterSequencer = async () =>
  await watchContractEventFromBlock(
    "DeregisterSequencer",
    eventService.handleDeregisterSequencer
  );

// Start event listeners
const startEventListeners = async () => {
  try {
    await watchInitializeCluster();
  } catch (error) {
    console.error("Failed to start InitializeCluster watcher:", error);
  }

  try {
    await watchAddRollup();
  } catch (error) {
    console.error("Failed to start AddRollup watcher:", error);
  }

  try {
    await watchRegisterSequencer();
  } catch (error) {
    console.error("Failed to start RegisterSequencer watcher:", error);
  }

  try {
    await watchDeregisterSequencer();
  } catch (error) {
    console.error("Failed to start DeregisterSequencer watcher:", error);
  }
};

export default startEventListeners;
