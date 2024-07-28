import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import axios from "axios";
import { createPublicClient, defineChain, http } from "viem";

const app = express();

const PORT = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());

dotenv.config({ path: "../.env" });

const localhost = /*#__PURE__*/ defineChain({
  id: 31337,
  name: "Localhost",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH",
  },
  rpcUrls: {
    default: { http: ["http://127.0.0.1:8545"] },
  },
});

const client = createPublicClient({
  chain: localhost,
  transport: http(),
});

const blockNumber = await client.getBlockNumber();

console.log(blockNumber);

app.listen(PORT, () => {
  console.log("Server is running on port: ", PORT);
});
