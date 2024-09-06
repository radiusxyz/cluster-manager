import { createPublicClient, http } from "viem";
import eventService from "../services/eventService.js";
import blockSyncService from "../services/blockSyncService.js";
import { hhContractAbi } from "../config.js";
import { hhContractAddress } from "../tests/hhContractAddress.js";
import dotenv from "dotenv";
import { localhost } from "../config.js";

dotenv.config({ path: "./.env" });

const [CONTRACT_ADDRESS, CONTRACT_ABI] = [hhContractAddress, hhContractAbi];

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

    client.watchContractEvent({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      eventName,
      fromBlock: lastProcessedBlock ? BigInt(lastProcessedBlock) : 1n, // Default to block 1 if no record found
      onLogs: async (logs) => {
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
  watchRegisterSequencer();
  watchDeregisterSequencer();
};

export default startEventListeners;
