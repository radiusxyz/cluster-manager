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

// get the list of sequencers for the given cluster

const getSequencerList = async (account, clusterId) => {
  try {
    const data = await client.readContract({
      account,
      address: hhContractAddress,
      abi: hhContractAbi,
      functionName: "getSequencerList",
      args: [clusterId],
    });
    console.log(`got the list of sequencers for ${clusterId}`, data);
  } catch (error) {
    console.error("error message:", error.message);
  }
};

// get the list of clusters for the given owner account

const getClustersByOwner = async (account) => {
  try {
    const data = await client.readContract({
      account,
      address: hhContractAddress,
      abi: hhContractAbi,
      functionName: "getClustersByOwner",
      args: [account.address],
    });
    console.log(`got the list of clusters for owner ${account.address}`, data);
  } catch (error) {
    console.error("error message:", error.message);
  }
};

// get the list of clusters for the given sequencer account
const getClustersBySequencer = async (account) => {
  try {
    const data = await client.readContract({
      account,
      address: hhContractAddress,
      abi: hhContractAbi,
      functionName: "getClustersBySequencer",
      args: [account.address],
    });
    console.log(
      `got the list of clusters for sequencer ${account.address}`,
      data
    );
  } catch (error) {
    console.error("error message:", error.message);
  }
};

// initialize a cluster
const initializeCluster = async (account) => {
  try {
    const { request } = await client.simulateContract({
      account,
      address: hhContractAddress,
      abi: hhContractAbi,
      functionName: "initializeCluster",
      args: [],
    });
    await client.writeContract(request);
    console.log("initiated a cluster");
  } catch (error) {
    console.error("error message:", error.message);
  }
};

// register the sequencer into the set
const registerSequencer = async (account, clusterId) => {
  try {
    const { request } = await client.simulateContract({
      account,
      address: hhContractAddress,
      abi: hhContractAbi,
      functionName: "registerSequencer",
      args: [clusterId],
    });
    await client.writeContract(request);
    console.log("registered into the cluster");
  } catch (error) {
    console.error("error message:", error.message);
  }
};

// deregister the sequencer from the list
const deregisterSequencer = async (account, clusterId) => {
  try {
    const { request } = await client.simulateContract({
      account,
      address: hhContractAddress,
      abi: hhContractAbi,
      functionName: "deregisterSequencer",
      args: [clusterId],
    });
    await client.writeContract(request);
    console.log("deregistered from the cluster");
  } catch (error) {
    console.error("error message:", error.message);
  }
};

const accountsHH = hhAccounts.map((account) =>
  privateKeyToAccount(account.hhPrivateKey)
);

// listening to events

let clusterIds = [];

// watching InitializeCluster events

const unwatchInitializeCluster = client.watchContractEvent({
  address: hhContractAddress,
  abi: hhContractAbi,
  eventName: "InitializeCluster",
  onLogs: (logs) => {
    clusterIds.push(...logs.map((log) => log.args.clusterId));
  },
});

// watching RegisterSequencer events

const unwatchRegisterSequencer = client.watchContractEvent({
  address: hhContractAddress,
  abi: hhContractAbi,
  eventName: "RegisterSequencer",
  onLogs: (logs) => {},
});

// watching DeregisterSequencer events

const unwatchDeregisterSequencer = client.watchContractEvent({
  address: hhContractAddress,
  abi: hhContractAbi,
  eventName: "DeregisterSequencer",
  onLogs: (logs) => {},
});

describe("Clusters API", () => {
  beforeAll(async () => {
    // Initialize 3 clusters
    await initializeCluster(accountsHH[0]);
    await initializeCluster(accountsHH[1]);
    await initializeCluster(accountsHH[2]);

    // Wait for the events to be emitted and processed
    await new Promise((resolve) => setTimeout(resolve, 5000));

    if (clusterIds.length < 3) {
      console.error("Cluster IDs not initialized correctly", clusterIds);
      throw new Error("Failed to initialize clusters.");
    }

    console.log("Initialized cluster IDs:", clusterIds);
  });

  afterAll(() => {
    unwatchInitializeCluster();
    unwatchRegisterSequencer();
    unwatchDeregisterSequencer();
  });

  it("should have 3 clusters after initialization", async () => {
    const response = await request(app).get("/api/v1/clusters");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(3);

    // Verify the clusters' IDs
    const returnedIds = response.body.map((set) => set.clusterId);
    clusterIds.forEach((id) => {
      expect(returnedIds).toContain(id);
    });

    // Further checks can be added to verify the clusters' content
  });

  it("should have one cluster per address", async () => {
    for (const account of accountsHH.slice(0, 3)) {
      const response = await request(app).get(
        `/api/v1/addresses/${account.address}/clusters/generated`
      );
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(1);
    }
  });

  it("should have no clusters for an address that did not create any", async () => {
    const response = await request(app).get(
      `/api/v1/addresses/${accountsHH[3].address}/clusters/generated`
    );
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(0);
  });

  it("should have no joined clusters for an address that never initiated nor joined any", async () => {
    const response = await request(app).get(
      `/api/v1/addresses/${accountsHH[3].address}/clusters/joined`
    );
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(0);
  });

  it("should register an address into three clusters and verify", async () => {
    const testAccount = accountsHH[3];

    // Register the address into three clusters
    await registerSequencer(testAccount, clusterIds[0]);
    await registerSequencer(testAccount, clusterIds[1]);
    await registerSequencer(testAccount, clusterIds[2]);

    // Wait for the events to be emitted and processed
    await new Promise((resolve) => setTimeout(resolve, 5000));

    const response = await request(app).get(
      `/api/v1/addresses/${testAccount.address}/clusters/joined`
    );
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(3);
  });

  it("should deregister the address from the second cluster and verify", async () => {
    const testAccount = accountsHH[3];

    // Deregister the address from the second cluster
    await deregisterSequencer(testAccount, clusterIds[1]);

    // Wait for the events to be emitted and processed
    await new Promise((resolve) => setTimeout(resolve, 5000));

    const response = await request(app).get(
      `/api/v1/addresses/${testAccount.address}/clusters/joined`
    );
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);

    // Verify the clusters' IDs
    const returnedIds = response.body.map((set) => set.clusterId);

    expect(returnedIds).toContain(clusterIds[0]);
    expect(returnedIds).toContain(clusterIds[2]);
    expect(returnedIds).not.toContain(clusterIds[1]);
  });

  describe("Clusters Sequencers API", () => {
    let clusterId;

    beforeAll(async () => {
      clusterId = clusterIds[0];
      const response = await request(app).get(
        `/api/v1/clusters/${clusterId}/sequencers`
      );

      await deregisterSequencer(accountsHH[3], clusterId);

      await new Promise((resolve) => setTimeout(resolve, 5000));
    });

    it("should register three addresses into a cluster and verify", async () => {
      await registerSequencer(accountsHH[1], clusterId);
      await registerSequencer(accountsHH[2], clusterId);
      await registerSequencer(accountsHH[3], clusterId);

      // Wait for the events to be emitted and processed
      await new Promise((resolve) => setTimeout(resolve, 5000));

      const response = await request(app).get(
        `/api/v1/clusters/${clusterId}/sequencers`
      );

      expect(response.status).toBe(200);

      const registeredAddresses = response.body
        .filter((seq) => seq !== "0x0000000000000000000000000000000000000000")
        .map((seq) => seq);

      expect(registeredAddresses).toContain(accountsHH[1].address);
      expect(registeredAddresses).toContain(accountsHH[2].address);
      expect(registeredAddresses).toContain(accountsHH[3].address);
    });

    it("should deregister one address from the cluster and verify", async () => {
      await deregisterSequencer(accountsHH[2], clusterId);

      // Wait for the events to be emitted and processed
      await new Promise((resolve) => setTimeout(resolve, 5000));

      const response = await request(app).get(
        `/api/v1/clusters/${clusterId}/sequencers`
      );
      expect(response.status).toBe(200);

      const registeredAddresses = response.body
        .filter((seq) => seq !== "0x0000000000000000000000000000000000000000")
        .map((seq) => seq);

      expect(registeredAddresses).toContain(accountsHH[1].address);
      expect(registeredAddresses).toContain(accountsHH[3].address);
      expect(registeredAddresses).not.toContain(accountsHH[2].address);
    });

    it("should register another address into the cluster and verify", async () => {
      await registerSequencer(accountsHH[4], clusterId);

      // Wait for the events to be emitted and processed
      await new Promise((resolve) => setTimeout(resolve, 5000));

      const response = await request(app).get(
        `/api/v1/clusters/${clusterId}/sequencers`
      );
      expect(response.status).toBe(200);

      const registeredAddresses = response.body
        .filter((seq) => seq !== "0x0000000000000000000000000000000000000000")
        .map((seq) => seq);

      expect(registeredAddresses).toContain(accountsHH[1].address);
      expect(registeredAddresses).toContain(accountsHH[3].address);
      expect(registeredAddresses).toContain(accountsHH[4].address);
    });
  });
});
