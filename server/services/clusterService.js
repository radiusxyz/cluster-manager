import Cluster from "../models/clusterModel.js";
import { getRollupInfoList } from "./contractService.js";

const getAllClusters = async () => {
  return await Cluster.find();
};

const getGeneratedClusters = async (owner) => {
  return await Cluster.find({ owner });
};

const getJoinedClusters = async (walletAddress) => {
  return await Cluster.find({ sequencers: walletAddress });
};

const getCluster = async (clusterId) => {
  return await Cluster.findOne({ clusterId });
};

const initializeCluster = async ({ clusterId, owner, maxSequencerNumber }) => {
  try {
    const newCluster = new Cluster({
      clusterId,
      owner,
      sequencers: Array(maxSequencerNumber).fill(
        "0x0000000000000000000000000000000000000000"
      ),
      rollups: [],
      maxSequencerNumber,
    });

    await newCluster.save();
    console.log(`Cluster with ID ${clusterId} created by owner ${owner}.`);
  } catch (error) {
    console.error("Error in initializeCluster:", error.message);
  }
};

const addRollup = async ({ clusterId, rollupId, rollupOwnerAddress }) => {
  try {
    const rollupInfoList = await getRollupInfoList(clusterId);
    const rollupInfo = rollupInfoList.find(
      (info) => info.rollupId === rollupId
    );

    if (!rollupInfo) {
      throw new Error(
        `Rollup with ID ${rollupId} not found in contract for cluster ${clusterId}`
      );
    }

    const {
      chainType,
      validationInfo,
      orderCommitmentType,
      executorAddresses,
    } = rollupInfo;

    const executors = executorAddresses.map((address) => ({
      address,
      rpcUrl: "not added",
      websocketUrl: "not added",
      blockExplorerUrl: "not added",
    }));

    const cluster = await Cluster.findOne({ clusterId });
    if (!cluster) {
      throw new Error(`Cluster with ID ${clusterId} not found`);
    }

    cluster.rollups.push({
      rollupId,
      owner: rollupOwnerAddress,
      type: chainType,
      orderCommitmentType,
      validationInfo: {
        platform: validationInfo.platform,
        serviceProvider: validationInfo.serviceProvider,
      },
      executors,
    });

    await cluster.save();
    console.log(
      `Rollup ${rollupId} added to Cluster ${clusterId} successfully.`
    );
  } catch (error) {
    console.error("Error in addRollup:", error.message);
  }
};

const registerSequencer = async ({ clusterId, sequencerAddress, index }) => {
  try {
    const cluster = await Cluster.findOne({ clusterId });
    if (!cluster) {
      throw new Error(`Cluster with ID ${clusterId} not found`);
    }

    if (
      cluster.sequencers[index] === "0x0000000000000000000000000000000000000000"
    ) {
      cluster.sequencers[index] = sequencerAddress;
      await cluster.save();
      console.log(
        `Sequencer ${sequencerAddress} added to Cluster ${clusterId} at index ${index}.`
      );
    } else {
      console.log(
        `Index ${index} in Cluster ${clusterId} is already occupied.`
      );
    }
  } catch (error) {
    console.error("Error in registerSequencer:", error.message);
  }
};

const deregisterSequencer = async ({ clusterId, sequencerAddress }) => {
  try {
    const cluster = await Cluster.findOne({ clusterId });
    if (!cluster) {
      throw new Error(`Cluster with ID ${clusterId} not found`);
    }

    const index = cluster.sequencers.indexOf(sequencerAddress);
    if (index === -1) {
      console.log(
        `Address ${sequencerAddress} not found in Cluster ${clusterId}.`
      );
      return;
    }

    if (
      cluster.sequencers[index] !== "0x0000000000000000000000000000000000000000"
    ) {
      cluster.sequencers[index] = "0x0000000000000000000000000000000000000000";
      await cluster.save();
      console.log(
        `Sequencer at address ${sequencerAddress} removed from Cluster ${clusterId}.`
      );
    } else {
      console.log(
        `Address ${sequencerAddress} in Cluster ${clusterId} is already empty.`
      );
    }
  } catch (error) {
    console.error("Error in deregisterSequencer:", error.message);
  }
};

const updateCluster = async (clusterId, updateData) => {
  const { rollupId, executorAddress, rpcUrl, blockExplorerUrl, websocketUrl } =
    updateData;

  try {
    const cluster = await Cluster.findOne({ clusterId });
    if (!cluster) {
      return null;
    }

    const rollup = cluster.rollups.find((r) => r.rollupId === rollupId);
    if (!rollup) {
      return null;
    }

    const executor = rollup.executors.find(
      (e) => e.address === executorAddress
    );

    if (!executor) {
      return null;
    }

    executor.rpcUrl = rpcUrl;
    executor.blockExplorerUrl = blockExplorerUrl;
    executor.websocketUrl = websocketUrl;

    const updatedCluster = await cluster.save();
    return updatedCluster;
  } catch (error) {
    console.error("Error in updateCluster:", error.message);
    throw new Error("Failed to update cluster");
  }
};

const clusterService = {
  getAllClusters,
  getGeneratedClusters,
  getJoinedClusters,
  getCluster,
  updateCluster,
  initializeCluster,
  addRollup,
  registerSequencer,
  deregisterSequencer,
};

export default clusterService;
