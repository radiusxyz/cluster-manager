import { createPublicClient, http } from "viem";
import eventService from "../services/eventService.js";
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

const watchInitializeProposerSet = () => {
  client.watchContractEvent({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    eventName: "InitializeProposerSet",
    onLogs: async (logs) => {
      try {
        await eventService.handleInitializeProposerSet(logs);
      } catch (error) {
        console.error("Error handling InitializeProposerSet event:", error);
      }
    },
  });
};

const watchRegisterSequencer = () => {
  client.watchContractEvent({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    eventName: "RegisterSequencer",
    onLogs: async (logs) => {
      try {
        await eventService.handleRegisterSequencer(logs);
      } catch (error) {
        console.error("Error handling RegisterSequencer event:", error);
      }
    },
  });
};

const watchDeregisterSequencer = () => {
  client.watchContractEvent({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    eventName: "DeregisterSequencer",
    onLogs: async (logs) => {
      try {
        await eventService.handleDeregisterSequencer(logs);
      } catch (error) {
        console.error("Error handling DeregisterSequencer event:", error);
      }
    },
  });
};

const startEventListeners = () => {
  watchInitializeProposerSet();
  watchRegisterSequencer();
  watchDeregisterSequencer();
};

export default startEventListeners;
