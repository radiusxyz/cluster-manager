import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";
import "solidity-docgen";
import * as dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    holesky: {
      // url: "https://holesky.infura.io/v3/f491db8c1a9141cf9677321929138b4a",
      url: "https://ethereum-holesky-rpc.publicnode.com",
      accounts: [process.env.PRIVATE_KEY || ""],
    },
    // {Network Name} <= npx hardhat ignition deploy ignition/modules/ProxyModule.ts --network {Network Name}
  },
};

export default config;
