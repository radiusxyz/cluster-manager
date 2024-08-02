import { createWalletClient, http, publicActions } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { localhost, hhContractAbi } from "../config.js";
import { hhContractAddress } from "./hhContractAddress.js";
import { hhAccounts } from "../scripts/accounts.js";
import request from "supertest";

import app from "../app.js";

// Increase Jest timeout if necessary
jest.setTimeout(30000);

const client = createWalletClient({
  chain: localhost,
  transport: http(),
}).extend(publicActions);

// get the list of sequencers for the given proposer set

const getSequencerList = async (account, proposerSetId) => {
  try {
    const data = await client.readContract({
      account,
      address: hhContractAddress,
      abi: hhContractAbi,
      functionName: "getSequencerList",
      args: [proposerSetId],
    });
    console.log(`got the list of sequencers for ${proposerSetId}`, data);
  } catch (error) {
    console.error("error message:", error.message);
  }
};

// get the list of proposers for the given owner account

const getProposerSetsByOwner = async (account) => {
  try {
    const data = await client.readContract({
      account,
      address: hhContractAddress,
      abi: hhContractAbi,
      functionName: "getProposerSetsByOwner",
      args: [account.address],
    });
    console.log(
      `got the list of proposer sets for owner ${account.address}`,
      data
    );
  } catch (error) {
    console.error("error message:", error.message);
  }
};

// get the list of proposers for the given sequencer account
const getProposerSetsBySequencer = async (account) => {
  try {
    const data = await client.readContract({
      account,
      address: hhContractAddress,
      abi: hhContractAbi,
      functionName: "getProposerSetsBySequencer",
      args: [account.address],
    });
    console.log(
      `got the list of proposer sets for sequencer ${account.address}`,
      data
    );
  } catch (error) {
    console.error("error message:", error.message);
  }
};

// initialize a proposer set
const initializeProposerSet = async (account) => {
  try {
    const { request } = await client.simulateContract({
      account,
      address: hhContractAddress,
      abi: hhContractAbi,
      functionName: "initializeProposerSet",
      args: [],
    });
    await client.writeContract(request);
    console.log("initiated a proposer set");
  } catch (error) {
    console.error("error message:", error.message);
  }
};

// register the sequencer into the set
const registerSequencer = async (account, proposerSetId) => {
  try {
    const { request } = await client.simulateContract({
      account,
      address: hhContractAddress,
      abi: hhContractAbi,
      functionName: "registerSequencer",
      args: [proposerSetId],
    });
    await client.writeContract(request);
    console.log("registered into the proposer set");
  } catch (error) {
    console.error("error message:", error.message);
  }
};

// deregister the sequencer from the list
const deregisterSequencer = async (account, proposerSetId) => {
  try {
    const { request } = await client.simulateContract({
      account,
      address: hhContractAddress,
      abi: hhContractAbi,
      functionName: "deregisterSequencer",
      args: [proposerSetId],
    });
    await client.writeContract(request);
    console.log("deregistered from the proposer set");
  } catch (error) {
    console.error("error message:", error.message);
  }
};

const accountsHH = hhAccounts.map((account) =>
  privateKeyToAccount(account.hhPrivateKey)
);

// listening to events

let proposerSetIds = [];

// watching InitializeProposerSet events

const unwatchInitializeProposerSet = client.watchContractEvent({
  address: hhContractAddress,
  abi: hhContractAbi,
  eventName: "InitializeProposerSet",
  onLogs: (logs) => {
    proposerSetIds.push(...logs.map((log) => log.args.proposerSetId));
  },
});

// watching RegisterSequencer events

const unwatchRegisterSequencer = client.watchContractEvent({
  address: hhContractAddress,
  abi: hhContractAbi,
  eventName: "RegisterSequencer",
  onLogs: (logs) => {
    console.log(logs);
  },
});

// watching DeregisterSequencer events

const unwatchDeregisterSequencer = client.watchContractEvent({
  address: hhContractAddress,
  abi: hhContractAbi,
  eventName: "DeregisterSequencer",
  onLogs: (logs) => {
    console.log(logs);
  },
});

describe("Proposer Sets API", () => {
  beforeAll(async () => {
    // Initialize 3 proposer sets
    await initializeProposerSet(accountsHH[0]);
    await initializeProposerSet(accountsHH[1]);
    await initializeProposerSet(accountsHH[2]);

    // Wait for the events to be emitted and processed
    await new Promise((resolve) => setTimeout(resolve, 5000)); // Adjust the timeout as needed
  });

  afterAll(() => {
    unwatchInitializeProposerSet();
  });

  it("should have 3 proposer sets after initialization", async () => {
    const response = await request(app).get("/api/v1/proposer-sets");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(3);

    // Verify the proposer sets' IDs
    const returnedIds = response.body.map((set) => set.proposerSetId);
    proposerSetIds.forEach((id) => {
      expect(returnedIds).toContain(id);
    });

    // Further checks can be added to verify the proposer sets' content
  });
});
