import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import axios from "axios";
import {
  createPublicClient,
  createWalletClient,
  custom,
  defineChain,
  http,
  parseEther,
  publicActions,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { localhost, hhContractAbi, hhContractAddress } from "../config.js";
import { hhAccounts } from "./accounts.js";
import { clusters } from "./clusters.js";

const app = express();

const PORT = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());

const accountsHH = hhAccounts.map((account) =>
  privateKeyToAccount(account.hhPrivateKey)
);

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

// test

// initiate multiple clusters

// accountsHH.forEach(async (account) => {
//   try {
//     const { request } = await client.simulateContract({
//       account: account,
//       address: hhContractAddress,
//       abi: hhContractAbi,
//       functionName: "initializeCluster",
//       args: [],
//     });
//     await client.writeContract(request);
//     console.log("initiated a cluster");
//   } catch (error) {
//     console.error("error message:", error.message);
//   }
// });

// register multiple accounts into the same cluster, check sequencer list registration and deregistration

// registerSequencer(accountsHH[1], clusters[0].id);
// registerSequencer(accountsHH[2], clusters[0].id);
// registerSequencer(accountsHH[3], clusters[0].id);
// getSequencerList(accountsHH[0], clusters[0].id);

// register the same account into multiple clusters, check clusters by sequencer after registration and deregistration

// await initializeCluster(accountsHH[8]);

await initializeCluster(accountsHH[13]);

// await registerSequencer(accountsHH[1], clusterId);
// await deregisterSequencer(accountsHH[1], clusterId);

// getClustersBySequencer(accountsHH[1]);

// app.listen(PORT, () => {
//   console.log("Server is running on port: ", PORT);
// });
