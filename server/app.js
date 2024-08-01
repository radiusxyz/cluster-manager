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
import { hhAccounts } from "./accounts.js";
import startEventListeners from "./listeners/eventListeners.js";

const app = express();

const PORT = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());

dotenv.config({ path: "./.env" });

startEventListeners();

// setting the public client
const client = createPublicClient({
  chain: localhost,
  transport: http(),
});

// contract interactions
let proposerSetId;

// watching the InitializeProposerSet events
client.watchContractEvent({
  address: hhContractAddress,
  abi: hhContractAbi,
  eventName: "InitializeProposerSet",
  onLogs: (logs) => {},
});

// watching the registerSequencer events
client.watchContractEvent({
  address: hhContractAddress,
  abi: hhContractAbi,
  eventName: "RegisterSequencer",
  onLogs: (logs) => {},
});

// watching the deregisterSequencer events
client.watchContractEvent({
  address: hhContractAddress,
  abi: hhContractAbi,
  eventName: "DeregisterSequencer",
  onLogs: (logs) => {},
});

// get the list of all proposer sets
app.get("/", async (req, res) => {
  try {
    const data = [];
    res.status(200).json({
      message: `got the list of all proposer sets`,
      sequencerList: data,
    });
  } catch (error) {
    console.error("error message:", error.message);
  }
});

// get the list of sequencers for the given proposer set
app.get("/proposer-set/0x1/sequencers", async (req, res) => {
  try {
    const data = [];
    res.status(200).json({
      message: `got the list of sequencers for ${proposerSetId}`,
      sequencerList: data,
    });
  } catch (error) {
    console.error("error message:", error.message);
  }
});

// get the list of proposers for the given sequencer account
app.get("/sequencer/0x0/proposer-sets", async (req, res) => {
  try {
    const data = [];
    res.status(200).json({
      message: `got the list of proposer sets for sequencer ${account.address}`,
      sequencerList: data,
    });
  } catch (error) {
    console.error("error message:", error.message);
  }
});

// get the list of proposers for the given owner account
app.get("/owner/0x0/proposer-sets", async (req, res) => {
  try {
    const data = [];
    res.status(200).json({
      message: `got the list of proposer sets for owner ${account.address}`,
      sequencerList: data,
    });
  } catch (error) {
    console.error("error message:", error.message);
  }
});

app.listen(PORT, () => {
  console.log("Server is running on port: ", PORT);
});

/* 

We have:
proposerSetId -> sequencer list
sequencer -> proposerSetIds

if (InitializeProposerSet) {
  update the db by adding new proposer set
}

if (RegisterSequencer) {
  update the db 
}


Our server should listen to events
If it sees an initialize proposer set event, it:
  1. gets the list of proposer sets from the 

*/

/* 
[
{sequencerAddress:"0x6", proposerSetIds: ["0x1", "0x2"] },
{sequencerAddress:"0x7", proposerSetIds: ["0x1", "0x3"] },
]

[
{proposerId:"0x4", sequencerList: ["0x6", "0x7"] },
{proposerId:"0x5", sequencerList: ["0x8", "0x9"] },
]
*/

// proposer sets into which current address is registered to
// http://localhost:3333/address/0x0/proposer-sets

// proposer sets that the current address has generated
// http://localhost:3333/owner/0x0/proposer-sets

// sequencer list by the given proposer set id
// http://localhost:3333/proposer-set/0x1/sequencers

// all proposer sets
// http://localhost:333/

// http://localhost:3333/proposer-sets/
// http://localhost:3333/addresses/{walletAddress}/proposer-sets/generated
// http://localhost:3333/addresses/{walletAddress}/proposer-sets/joined
// http://localhost:3333/proposer-sets/{proposerSetId}/sequencers
