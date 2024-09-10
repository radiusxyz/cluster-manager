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
import { localhost, contractAbi, contractAddress } from "../config.js";
import { hhAccounts } from "./accounts.js";

const app = express();

const PORT = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());

dotenv.config({ path: "./.env" });
const PRIVATE_KEY = process.env.PRIVATE_KEY;

// setting the wallet client

const account = privateKeyToAccount("0x" + PRIVATE_KEY);

const accountsHH = hhAccounts.map((account) =>
  privateKeyToAccount(account.hhPrivateKey)
);

const client = createWalletClient({
  account,
  chain: localhost,
  transport: http(),
}).extend(publicActions);

// contract interactions

let clusterId;

// watching the InitializeCluster events

const unwatch = client.watchContractEvent({
  address: contractAddress,
  abi: contractAbi,
  onLogs: (logs) => {
    clusterId = logs[logs.length - 1].args.clusterId;
    console.log(clusterId);
  },
});

// get the list of sequencers for the given cluster
app.get("/get-sequencer-list", async (req, res) => {
  try {
    const data = await client.readContract({
      account,
      address: contractAddress,
      abi: contractAbi,
      functionName: "getSequencerList",
      args: [clusterId],
    });
    res.status(200).json({
      message: `got the list of sequencers for ${clusterId}`,
      sequencerList: data,
    });
  } catch (error) {
    console.error("error message:", error.message);
  }
});

// get the list of all clusters
app.get("/all-clusters", async (req, res) => {
  try {
    const data = await client.readContract({
      account,
      address: contractAddress,
      abi: contractAbi,
      functionName: "getAllClusterIds",
      args: [account.address],
    });
    res.status(200).json({
      message: `got the list of all clusters`,
      sequencerList: data,
    });
  } catch (error) {
    console.error("error message:", error.message);
  }
});

// get the list of clusters for the given owner account
app.get("/owner-clusters", async (req, res) => {
  try {
    const data = await client.readContract({
      account,
      address: contractAddress,
      abi: contractAbi,
      functionName: "getClustersByOwner",
      args: [account.address],
    });
    res.status(200).json({
      message: `got the list of clusters for owner ${account.address}`,
      sequencerList: data,
    });
  } catch (error) {
    console.error("error message:", error.message);
  }
});

// get the list of clusters for the given sequencer account
app.get("/sequencer-clusters", async (req, res) => {
  try {
    const data = await client.readContract({
      account,
      address: contractAddress,
      abi: contractAbi,
      functionName: "getClustersBySequencer",
      args: [account.address],
    });
    res.status(200).json({
      message: `got the list of clusters for sequencer ${account.address}`,
      sequencerList: data,
    });
  } catch (error) {
    console.error("error message:", error.message);
  }
});

// initialize a cluster
app.get("/init", async (req, res) => {
  try {
    const { request } = await client.simulateContract({
      account,
      address: contractAddress,
      abi: contractAbi,
      functionName: "initializeCluster",
      args: [],
    });
    await client.writeContract(request);
    res.status(200).json({ status: "initiated a cluster" });
  } catch (error) {
    console.error("error message:", error.message);
  }
});

// register the sequencer into the set
app.get("/register", async (req, res) => {
  try {
    const { request } = await client.simulateContract({
      account,
      address: contractAddress,
      abi: contractAbi,
      functionName: "registerSequencer",
      args: [clusterId],
    });
    await client.writeContract(request);
    res.status(200).json({ status: "registered into the cluster" });
  } catch (error) {
    console.error("error message:", error.message);
  }
});

// deregister the sequencer from the list
app.get("/deregister", async (req, res) => {
  try {
    const { request } = await client.simulateContract({
      account,
      address: contractAddress,
      abi: contractAbi,
      functionName: "deregisterSequencer",
      args: [clusterId],
    });
    await client.writeContract(request);
    res.status(200).json({ status: "deregistered from the cluster" });
  } catch (error) {
    console.error("error message:", error.message);
  }
});

app.listen(PORT, () => {
  console.log("Server is running on port: ", PORT);
});
