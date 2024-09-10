import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre, { ethers } from "hardhat";
import "../typechain-types";
import { LivenessRadius } from "../typechain-types";
import * as dotenv from "dotenv";
dotenv.config();

async function deployLivenessRadiusImpl() {
  // Contracts are deployed using the first signer/account by default
  const livenessRadiusOwner = await hre.ethers.provider.getSigner(0);
  const rollupOwner = await hre.ethers.provider.getSigner(1);
  const anotherRollupExecutor = await hre.ethers.provider.getSigner(2);
  const otherSequencer = await hre.ethers.provider.getSigner(3);
  const anotherSequencer = await hre.ethers.provider.getSigner(4);

  const clusterId = process.env.CLUSTER_ID as string;
  const chainType = process.env.CHAIN_TYPE as string;
  const maxSequencerNumber = Number(process.env.MAX_SEQUENCER_NUMBER);
  const rollupId = process.env.ROLLUP_ID as string;
  const orderCommitmentType = process.env.ORDER_COMMITMENT_TYPE as string;

  const platform = process.env.PLATFORM as string;
  const serviceProvider = process.env.SERVICE_PROVIDER as string;

  const LivenessRadius = await hre.ethers.getContractFactory("LivenessRadius");
  let livenessRadius = (await hre.upgrades.deployProxy(LivenessRadius)) as unknown as LivenessRadius;
  livenessRadius = livenessRadius.connect(livenessRadiusOwner);

  console.log("livenessRadius", await livenessRadius.getAddress());

  await livenessRadius.initializeCluster(clusterId, maxSequencerNumber);

  await livenessRadius.addRollup(clusterId, rollupId, chainType, rollupOwner.address, orderCommitmentType, {
    "platform": platform,
    "serviceProvider": serviceProvider,
  });

  return {
    livenessRadius,
    livenessRadiusOwner,
    rollupOwner,
    anotherRollupExecutor,
    clusterId,
    rollupId,
    otherSequencer,
    anotherSequencer,
    maxSequencerNumber,
    platform,
    serviceProvider,
    chainType,
    orderCommitmentType,
  };
}

describe("LivenessRadius", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.

  it("check owner", async function () {
    const { livenessRadius, livenessRadiusOwner } = await loadFixture(deployLivenessRadiusImpl);

    expect(await livenessRadius.owner()).to.be.equal(livenessRadiusOwner.address);
  });

  it("register executor", async function () {
    const { livenessRadius, rollupOwner, anotherRollupExecutor, clusterId, rollupId } = await loadFixture(
      deployLivenessRadiusImpl
    );

    await livenessRadius
      .connect(rollupOwner)
      .registerRollupExecutor(clusterId, rollupId, anotherRollupExecutor.address);

    const rollupExecutorList = await livenessRadius.getExecutorList(clusterId, rollupId);

    expect(rollupExecutorList[0]).to.be.equal(rollupOwner.address);
    expect(rollupExecutorList[1]).to.be.equal(anotherRollupExecutor.address);
  });

  it("register sequencer", async function () {
    const { livenessRadius, livenessRadiusOwner, anotherSequencer, clusterId } = await loadFixture(
      deployLivenessRadiusImpl
    );

    await livenessRadius.connect(livenessRadiusOwner).registerSequencer(clusterId);
    await livenessRadius.connect(anotherSequencer).registerSequencer(clusterId);

    let result = await livenessRadius.isRegisteredSequencer(clusterId, livenessRadiusOwner.address);
    expect(true).to.be.equal(result);

    result = await livenessRadius.isRegisteredSequencer(clusterId, anotherSequencer.address);
    expect(true).to.be.equal(result);

    const rollupSequencerList = await livenessRadius.getSequencerList(clusterId);

    expect(rollupSequencerList[0]).to.be.equal(livenessRadiusOwner.address);
    expect(rollupSequencerList[1]).to.be.equal(anotherSequencer.address);
  });

  it("deregister and register sequencer", async function () {
    const { livenessRadius, maxSequencerNumber, clusterId } = await loadFixture(deployLivenessRadiusImpl);

    for (let i = 0; i < maxSequencerNumber; i++) {
      const sequencer = await hre.ethers.provider.getSigner(i);
      await livenessRadius.connect(sequencer).registerSequencer(clusterId);
    }

    const index = 1;
    const deregisterSequencer = await hre.ethers.provider.getSigner(index);
    const registerSequencer = await hre.ethers.provider.getSigner(maxSequencerNumber);

    await livenessRadius.connect(deregisterSequencer).deregisterSequencer(clusterId);
    await livenessRadius.connect(registerSequencer).registerSequencer(clusterId);

    const rollupSequencerList = await livenessRadius.getSequencerList(clusterId);
    expect(rollupSequencerList[index]).to.be.equal(registerSequencer.address);
  });

  it("get max sequencer number", async function () {
    const { livenessRadius, maxSequencerNumber, clusterId } = await loadFixture(deployLivenessRadiusImpl);

    const maxSequencerNumberResult = await livenessRadius.getMaxSequencerNumber(clusterId);

    expect(maxSequencerNumber).to.be.equal(maxSequencerNumberResult);
  });

  it("get rollup infos", async function () {
    const { livenessRadius, clusterId, platform, serviceProvider, chainType, rollupOwner, orderCommitmentType } =
      await loadFixture(deployLivenessRadiusImpl);

    await livenessRadius.addRollup(clusterId, "test", chainType, rollupOwner.address, orderCommitmentType, {
      "platform": platform,
      "serviceProvider": serviceProvider,
    });

    const getRollupInfoListResult = await livenessRadius.getRollupInfoList(clusterId);

    console.log("getRollupInfoListResult", getRollupInfoListResult);
  });

  it("get rollup info", async function () {
    const { livenessRadius, clusterId, rollupId, rollupOwner, anotherRollupExecutor } = await loadFixture(
      deployLivenessRadiusImpl
    );

    await livenessRadius
      .connect(rollupOwner)
      .registerRollupExecutor(clusterId, rollupId, anotherRollupExecutor.address);
    const getRollupInfoResult = await livenessRadius.getRollupInfo(clusterId, rollupId);

    console.log("getRollupInfoResult", getRollupInfoResult);
  });

  it("is added rollup", async function () {
    const { livenessRadius, clusterId, rollupId } = await loadFixture(deployLivenessRadiusImpl);

    const isAddedRollupResult = await livenessRadius.isAddedRollup(clusterId, rollupId);

    expect(true).to.be.equal(isAddedRollupResult);
  });

  it("is registered rollup executor", async function () {
    const { livenessRadius, clusterId, rollupId, rollupOwner } = await loadFixture(deployLivenessRadiusImpl);

    const isRegisteredRollupExecutorResult = await livenessRadius.isRegisteredRollupExecutor(
      clusterId,
      rollupId,
      rollupOwner
    );

    expect(true).to.be.equal(isRegisteredRollupExecutorResult);
  });
});
