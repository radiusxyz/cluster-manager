import Cluster from "../models/clusterModel.js";

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
    throw new Error("Failed to initialize cluster");
  }
};

const addRollup = async (rollupData) => {
  const {
    clusterId,
    rollupId,
    rollupOwnerAddress,
    rollupType,
    encryptedTransactionType,
    orderCommitmentType,
    validationInfo,
    executorAddresses,
    fileStrings,
  } = rollupData;

  try {
    const cluster = await Cluster.findOne({ clusterId });
    if (!cluster) {
      throw new Error(`Cluster with ID ${clusterId} not found`);
    }

    cluster.rollups.push({
      rollupId,
      owner: rollupOwnerAddress,
      type: rollupType,
      encryptedTransactionType,
      orderCommitmentType,
      validationInfo: {
        platform: validationInfo.platform,
        serviceProvider: validationInfo.serviceProvider,
      },
      executors: executorAddresses,
      fileStrings,
    });

    await cluster.save();
    console.log(
      `Rollup ${rollupId} added to Cluster ${clusterId} successfully.`
    );
  } catch (error) {
    console.error("Error in addRollup:", error.message);
    throw new Error("Failed to add rollup to cluster");
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
    throw new Error("Failed to register sequencer");
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
    throw new Error("Failed to deregister sequencer");
  }
};

const updateCluster = async (clusterId, updateData) => {
  const { rollupId, executorAddress, rpcUrl, blockExplorerUrl, websocketUrl } =
    updateData;

  try {
    const cluster = await Cluster.findOne({ clusterId });
    if (!cluster) {
      throw new Error(`Cluster with ID ${clusterId} not found`);
    }

    const rollup = cluster.rollups.find((r) => r.rollupId === rollupId);
    if (!rollup) {
      throw new Error(`Rollup with ID ${rollupId} not found`);
    }

    const executor = rollup.executors.find(
      (e) => e.address === executorAddress
    );

    if (!executor) {
      throw new Error(`Executor with address ${executorAddress} not found`);
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

const getRollupsByCluster = async (clusterId) => {
  try {
    const cluster = await Cluster.findOne({ clusterId });
    if (!cluster) {
      throw new Error(`Cluster with ID ${clusterId} not found`);
    }

    return cluster.rollups;
  } catch (error) {
    console.error("Error in getRollupsByCluster:", error.message);
    throw new Error("Failed to retrieve rollups for the cluster");
  }
};

const getRollupById = async (clusterId, rollupId) => {
  try {
    const cluster = await Cluster.findOne({ clusterId });
    if (!cluster) {
      throw new Error(`Cluster with ID ${clusterId} not found`);
    }

    const rollup = cluster.rollups.find((r) => r.rollupId === rollupId);
    return rollup || null;
  } catch (error) {
    console.error("Error in getRollupById:", error.message);
    throw new Error("Failed to retrieve rollup");
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
  getRollupsByCluster,
  getRollupById,
};

export default clusterService;
