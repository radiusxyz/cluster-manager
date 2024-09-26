import { http, createConfig, injected } from "@wagmi/core";
import { holesky } from "wagmi/chains";

import { defineChain } from "viem";

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
  chains: [holesky],
  transports: {
    [holesky.id]: http(),
  },
  connectors: [injected()],
});
