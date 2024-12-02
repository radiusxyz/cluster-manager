import dotenv from "dotenv";

import { holesky, localhost } from "viem/chains";

dotenv.config({ path: "./.env" });

export const chainsConfig = [
  {
    chain: holesky,
    rpc: process.env.RPC_URL_INFURA_HOLESKY,
    webSocket: process.env.WS_URL_INFURA_HOLESKY,
    contractAddress: process.env.LIVENESS_CONTRACT_ADDRESS_HOLESKY,
  },
  {
    chain: localhost,
    rpc: process.env.RPC_URL_LOCALHOST,
    webSocket: process.env.WS_URL_LOCALHOST,
    contractAddress: process.env.LIVENESS_CONTRACT_ADDRESS_LOCALHOST,
  },
];
