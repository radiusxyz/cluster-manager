//deploy script using hardhat upgrades

import hre from "hardhat";
import { LivenessRadius } from "../typechain-types";
import { TransactionResponse } from "ethers";

async function main() {
  const LivenessRadius = await hre.ethers.getContractFactory("LivenessRadius");
  const livenessRadiusImpl = (await hre.upgrades.deployImplementation(LivenessRadius, {
    getTxResponse: true,
  })) as TransactionResponse;

  const txReceipt = await hre.ethers.provider.getTransactionReceipt(livenessRadiusImpl.hash);
  if (txReceipt?.contractAddress === undefined) {
    throw new Error("Contract address is undefined");
  }
  console.log("LivenessRadius implementation :", txReceipt.contractAddress);
  console.log(livenessRadiusImpl);

  const livenessRadiusData = livenessRadiusImpl.data;

  const livenessRadius = (await hre.upgrades.deployProxy(LivenessRadius)) as unknown as LivenessRadius;
  await livenessRadius.waitForDeployment();
  const livenessRadiusImplAddress = await hre.upgrades.erc1967.getImplementationAddress(
    await livenessRadius.getAddress()
  );
  console.log("livenessRadius impl", livenessRadiusImplAddress);

  console.log("LivenessRadius :", await livenessRadius.getAddress());
  const proxyTx = livenessRadius.deploymentTransaction();
  if (proxyTx === undefined || proxyTx === null) {
    throw new Error("Proxy transaction is undefined");
  }
  console.log(proxyTx);

  const proxyData = proxyTx.data;

  return { livenessRadiusData: livenessRadiusData, proxyData };
}

main().then(() => process.exit(0));
