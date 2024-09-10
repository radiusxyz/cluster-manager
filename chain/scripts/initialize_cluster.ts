import hre, { ethers } from "hardhat";
import { LivenessRadius } from "../typechain-types";
import * as dotenv from "dotenv";
dotenv.config();

async function initializeCluster(clusterId: string, maxSequencerNumber: number = 10) {
  const livenessRadiusOwner = await hre.ethers.provider.getSigner(0);

  console.log(process.env.RADIUS_LIVENESS_CONTRACT_ADDRESS as string);

  let livenessRadius = await ethers.getContractAt(
    "LivenessRadius",
    process.env.RADIUS_LIVENESS_CONTRACT_ADDRESS as string,
    livenessRadiusOwner
  );
  // livenessRadius = livenessRadius.connect(livenessRadiusOwner);

  console.log("clusterId", clusterId);
}

initializeCluster(process.env.CLUSTER_ID as string, Number(process.env.MAX_SEQUENCER_NUMBER)).then(() =>
  process.exit(0)
);
