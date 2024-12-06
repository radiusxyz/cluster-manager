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

export const configString = `# Set sequencer rpc url
sequencer_rpc_url = "http://127.0.0.1:3000"

# Set internal rpc url
internal_rpc_url = "http://127.0.0.1:4000"

# Set cluster rpc url
cluster_rpc_url = "http://127.0.0.1:5000"

# Set seeder rpc url
seeder_rpc_url = "http://127.0.0.1:6001"

# Set key management system rpc url
key_management_system_rpc_url = "http://127.0.0.1:7100"

# Set cluster type
cluster_type = "local"

# Set liveness provider rpc url
liveness_provider_rpc_url = "http://127.0.0.1:8545"

# Set liveness provider websocket url
liveness_provider_websocket_url = "ws://127.0.0.1:8545"

# Set liveness contract address
liveness_contract_address = ""

# Set using zkp
is_using_zkp = false`;
