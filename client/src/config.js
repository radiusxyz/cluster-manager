import { http, createConfig, injected } from "@wagmi/core";
import { defineChain } from "viem";
import {
  contractAddress as hhCA,
  contractAbi as hhAbi,
} from "../../server/config";

export const localhost = /*#__PURE__*/ defineChain({
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

export const config = createConfig({
  chains: [localhost],
  transports: {
    [localhost.id]: http(),
  },
  connectors: [injected()],
});

export const contractAddress = hhCA;
export const contractAbi = hhAbi;
