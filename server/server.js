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
import { localhost, hhContractAbi, hhContractAddress } from "./config.js";

const app = express();

const PORT = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());

dotenv.config({ path: "./.env" });
const PRIVATE_KEY = process.env.PRIVATE_KEY;

// setting the wallet client

const account = privateKeyToAccount("0x" + PRIVATE_KEY);

const client = createWalletClient({
  account,
  chain: localhost,
  transport: http(),
}).extend(publicActions);

// contract interactions

// listening to the InitializeProposerSet event

// useWatchContractEvent({
//   address: hhContractAddress,
//   abi: hhContractAbi,
//   eventName: "InitializeProposerSet",
//   onLogs(logs) {
//     console.log("New logs!", logs);
//     setProposerSetId(logs[0].args.proposerSetId);
//   },
// });

let proposerSetId;

// watching events

const unwatch = client.watchContractEvent({
  address: hhContractAddress,
  abi: hhContractAbi,
  onLogs: (logs) => {
    proposerSetId = logs[logs.length - 1].args.proposerSetId;
    console.log(proposerSetId);
  },
});

// get the list of sequencers for the given proposer set
app.get("/get", async (req, res) => {
  try {
    const data = await client.readContract({
      account,
      address: hhContractAddress,
      abi: hhContractAbi,
      functionName: "getSequencerList",
      args: [proposerSetId],
    });
    res.status(200).json({
      message: `got the list of sequencers for ${proposerSetId}`,
      sequencerList: data,
    });
  } catch (error) {
    console.error("error message:", error.message);
  }
});

// initialize a proposer set
app.get("/init", async (req, res) => {
  try {
    const { request } = await client.simulateContract({
      account,
      address: hhContractAddress,
      abi: hhContractAbi,
      functionName: "initializeProposerSet",
      args: [],
    });
    await client.writeContract(request);
    res.status(200).json({ status: "initiated a proposer set" });
  } catch (error) {
    console.error("error message:", error.message);
  }
});

// register the sequencer into the set
app.get("/register", async (req, res) => {
  try {
    const { request } = await client.simulateContract({
      account,
      address: hhContractAddress,
      abi: hhContractAbi,
      functionName: "registerSequencer",
      args: [proposerSetId],
    });
    await client.writeContract(request);
    res.status(200).json({ status: "registered into the proposer set" });
  } catch (error) {
    console.error("error message:", error.message);
  }
});

// deregister the sequencer from the list
app.get("/deregister", async (req, res) => {
  try {
    const { request } = await client.simulateContract({
      account,
      address: hhContractAddress,
      abi: hhContractAbi,
      functionName: "deregisterSequencer",
      args: [proposerSetId],
    });
    await client.writeContract(request);
    res.status(200).json({ status: "deregistered from the proposer set" });
  } catch (error) {
    console.error("error message:", error.message);
  }
});

app.listen(PORT, () => {
  console.log("Server is running on port: ", PORT);
});
