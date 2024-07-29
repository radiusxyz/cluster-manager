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

const app = express();

const PORT = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());

dotenv.config({ path: "./.env" });
const PRIVATE_KEY = process.env.PRIVATE_KEY;

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
const account = privateKeyToAccount("0x" + PRIVATE_KEY);

const client = createWalletClient({
  account,
  chain: localhost,
  transport: http(),
}).extend(publicActions);

const hash = await client.sendTransaction({
  to: "0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC",
  value: parseEther("0.001"),
});

console.log(hash);

app.listen(PORT, () => {
  console.log("Server is running on port: ", PORT);
});
