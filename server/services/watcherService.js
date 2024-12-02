import blockSyncService from "./blockSyncService.js";
import eventService from "./eventService.js";
import { contractAbi } from "../../common.js";
import { chainsConfig } from "../config.js";
import { createPublicClient, http, webSocket } from "viem";

// Helper function to create an HTTP client for a given chain
const createHttpClient = (chain, rpcUrl) =>
  createPublicClient({
    chain,
    transport: http(rpcUrl),
  });

// Helper function to create a WebSocket client for a given chain
const createWebSocketClient = (chain, webSocketUrl) => {
  return createPublicClient({
    chain,
    transport: webSocket(webSocketUrl),
  });
};

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

// Function to process logs
const processLog = async (
  log,
  events,
  contractAddress,
  chain,
  rpcUrl,
  webSocketUrl
) => {
  const event = events.find((e) => e.eventName === log.eventName);

  if (event && event.handleEvent) {
    await event.handleEvent(log, chain, rpcUrl, webSocketUrl);

    await blockSyncService.updateLastProcessedEvent({
      contractAddress,
      blockNumber: Number(log.blockNumber),
      transactionHash: log.transactionHash,
      logIndex: log.logIndex,
    });
  }
};

// Function to fetch missed events for a specific contract on a specific chain
const fetchMissedEvents = async (
  chain,
  rpcUrl,
  webSocketUrl,
  contractAddress,
  contractAbi,
  events,
  fromBlock,
  toBlock
) => {
  try {
    const clientHttp = createHttpClient(chain, rpcUrl);
    const logs = await clientHttp.getContractEvents({
      address: contractAddress,
      abi: contractAbi,
      fromBlock,
      toBlock,
    });

    console.log(`Fetched missed events on ${chain.name}:`, logs);

    const lastProcessedEvent = await blockSyncService.getLastProcessedEvent(
      contractAddress
    );

    for (const log of logs) {
      if (isNewLog(log, lastProcessedEvent)) {
        console.log(`Processing missed event log on ${chain.name}:`, log);
        await processLog(
          log,
          events,
          contractAddress,
          chain,
          rpcUrl,
          webSocketUrl
        );
      } else {
        console.log(`Skipping already processed log on ${chain.name}:`, log);
      }
    }
  } catch (error) {
    console.error(
      `Error fetching and processing missed events on ${chain.name}:`,
      error
    );
  }
};

// Function to watch and sync events for a specific contract on a specific chain
const checkPastThenWatch = async (
  chain,
  rpcUrl,
  webSocketUrl,
  contractAddress,
  contractAbi,
  events
) => {
  console.log("chain: ", chain.id);
  try {
    const clientHttp = createHttpClient(chain, rpcUrl);
    const clientWebSocket = createWebSocketClient(chain, webSocketUrl);

    const lastProcessedEvent = await blockSyncService.getLastProcessedEvent(
      contractAddress
    );
    let currentBlockNumber = await clientHttp.getBlockNumber();

    if (lastProcessedEvent) {
      const fromBlock = BigInt(lastProcessedEvent.lastBlockNumber);
      await fetchMissedEvents(
        chain,
        rpcUrl,
        webSocketUrl,
        contractAddress,
        contractAbi,
        events,
        fromBlock,
        currentBlockNumber
      );
      currentBlockNumber = BigInt(lastProcessedEvent.lastBlockNumber);
    }

    clientWebSocket.watchContractEvent({
      address: contractAddress,
      abi: contractAbi,
      fromBlock: lastProcessedEvent
        ? currentBlockNumber + 1n
        : currentBlockNumber,
      onLogs: async (logs) => {
        console.log(`Received logs on ${chain.name}:`, logs);
        try {
          const lastProcessedEvent =
            await blockSyncService.getLastProcessedEvent(contractAddress);
          for (const log of logs) {
            if (isNewLog(log, lastProcessedEvent)) {
              await processLog(
                log,
                events,
                contractAddress,
                chain,
                rpcUrl,
                webSocketUrl
              );
            }
          }
        } catch (error) {
          console.error(`Error handling event logs on ${chain.name}:`, error);
        }
      },
    });
  } catch (error) {
    console.error(
      `Error setting up watcher for events on ${chain.name}:`,
      error
    );
  }
};

// Start watchers for all configured chains
const startWatchers = async () => {
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
    for (const {
      chain,
      rpcUrl,
      webSocketUrl,
      contractAddress,
    } of chainsConfig) {
      await checkPastThenWatch(
        chain,
        rpcUrl,
        webSocketUrl,
        contractAddress,
        contractAbi,
        events
      );
    }
  } catch (error) {
    console.error("Failed to start event watcher:", error);
  }
};

const watcherService = {
  isNewLog,
  processLog,
  fetchMissedEvents,
  checkPastThenWatch,
  startWatchers,
};

export default watcherService;
