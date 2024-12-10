import { http, createConfig, injected } from "@wagmi/core";
import { defineChain } from "viem";
import { holesky } from "viem/chains";

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

export const serverUrl = "http://localhost:3333/api/v1";
