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
    // Get the last processed block number from the database
    const lastProcessedBlock = await blockSyncService.getLastProcessedBlock(
      eventName
    );

    const fromBlock = lastProcessedBlock
      ? BigInt(lastProcessedBlock + 1)
      : BigInt(1);

    console.log(fromBlock);

    client.watchContractEvent({
      address: contractAddress,
      abi: contractAbi,
      eventName,
      fromBlock,
      onLogs: async (logs) => {
        console.log(`Received ${eventName} event logs:`, logs);

        try {
          await handleEvent(logs);
          // Update the last processed block number in the database
          const latestBlockNumber = logs[logs.length - 1].blockNumber;
          await blockSyncService.updateLastProcessedBlock(
            eventName,
            Number(latestBlockNumber)
          );
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
const watchInitializeCluster = () =>
  watchContractEventFromBlock(
    "InitializeCluster",
    eventService.handleInitializeCluster
  );

const watchAddRollup = () =>
  watchContractEventFromBlock("AddRollup", eventService.handleAddRollup);

const watchRegisterSequencer = () =>
  watchContractEventFromBlock(
    "RegisterSequencer",
    eventService.handleRegisterSequencer
  );
const watchDeregisterSequencer = () =>
  watchContractEventFromBlock(
    "DeregisterSequencer",
    eventService.handleDeregisterSequencer
  );

// Start event listeners
const startEventListeners = () => {
  watchInitializeCluster();
  watchAddRollup();
  watchRegisterSequencer();
  watchDeregisterSequencer();
};

export default startEventListeners;
