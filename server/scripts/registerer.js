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
import { proposerSets } from "./proposerSets.js";

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

// test

// initiate multiple proposer sets

// accountsHH.forEach(async (account) => {
//   try {
//     const { request } = await client.simulateContract({
//       account: account,
//       address: hhContractAddress,
//       abi: hhContractAbi,
//       functionName: "initializeProposerSet",
//       args: [],
//     });
//     await client.writeContract(request);
//     console.log("initiated a proposer set");
//   } catch (error) {
//     console.error("error message:", error.message);
//   }
// });

// register multiple accounts into the same proposer set, check sequencer list registration and deregistration

// registerSequencer(accountsHH[1], proposerSets[0].id);
// registerSequencer(accountsHH[2], proposerSets[0].id);
// registerSequencer(accountsHH[3], proposerSets[0].id);
// getSequencerList(accountsHH[0], proposerSets[0].id);

// register the same account into multiple proposer sets, check proposer sets by sequencer after registration and deregistration

// await initializeProposerSet(accountsHH[8]);

await initializeProposerSet(accountsHH[13]);

// await registerSequencer(accountsHH[1], proposerSetId);
// await deregisterSequencer(accountsHH[1], proposerSetId);

// getProposerSetsBySequencer(accountsHH[1]);

// app.listen(PORT, () => {
//   console.log("Server is running on port: ", PORT);
// });
