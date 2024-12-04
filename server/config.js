import dotenv from "dotenv";

import { holesky, localhost } from "viem/chains";

dotenv.config({ path: "./.env" });

export const chainsConfig = [
  // {
  //   chain: holesky,
  //   rpcUrl: process.env.RPC_URL_INFURA_HOLESKY,
  //   webSocketUrl: process.env.WS_URL_INFURA_HOLESKY,
  //   contractAddress: process.env.LIVENESS_CONTRACT_ADDRESS_HOLESKY,
  // },
  {
    chain: localhost,
    rpcUrl: process.env.RPC_URL_LOCALHOST,
    webSocketUrl: process.env.WS_URL_LOCALHOST,
    contractAddress: process.env.LIVENESS_CONTRACT_ADDRESS_LOCALHOST,
  },
];
