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
  const cluster = await Cluster.findOne({ clusterId });
  if (!cluster) {
    throw new Error("Cluster not found");
  }
  return cluster;
};

const initializeCluster = async (logs) => {
  console.log("initializeCluster logs: ", logs);
  try {
    for (const log of logs) {
      const clusterId = log.args.clusterId;
      const maxSequencerNumber = log.args.maxSequencerNumber;
      const owner = log.args.owner;

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
    }
  } catch (error) {
    console.error("Error in initializeCluster:", error.message);
  }
};

const addRollup = async (logs) => {
  try {
    for (const log of logs) {
      const clusterId = log.args.clusterId;
      const rollupId = log.args.rollupId;
      const rollupOwnerAddress = log.args.rollupOwnerAddress;
      const rollupType = log.args.rollupType;
      const orderCommitmentType = log.args.orderCommitmentType;
      const validationInfo = {
        platform: log.args.platform,
        serviceProvider: log.args.serviceProvider,
      };
      const executors = log.args.executors.map((executor) => ({
        address: executor.address,
        rpcUrl: executor.rpcUrl,
        websocketUrl: executor.websocketUrl,
        blockExplorerUrl: executor.blockExplorerUrl,
      }));

      const cluster = await Cluster.findOne({ clusterId });
      if (!cluster) {
        throw new Error(`Cluster with ID ${clusterId} not found`);
      }

      // Push the new rollup to the array of rollups
      cluster.rollups.push({
        rollupId,
        owner: rollupOwnerAddress,
        type: rollupType,
        orderCommitmentType,
        validationInfo,
        executors,
      });

      await cluster.save();
      console.log(
        `Rollup ${rollupId} added to Cluster ${clusterId} successfully.`
      );
    }
  } catch (error) {
    console.error("Error in addRollup:", error.message);
  }
};

const registerSequencer = async (logs) => {
  try {
    for (const log of logs) {
      const clusterId = log.args.clusterId;
      const sequencerAddress = log.args.sequencerAddress;
      const index = log.args.index;

      const cluster = await Cluster.findOne({ clusterId });
      if (!cluster) {
        throw new Error(`Cluster with ID ${clusterId} not found`);
      }

      if (
        cluster.sequencers[index] ===
        "0x0000000000000000000000000000000000000000"
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
    }
  } catch (error) {
    console.error("Error in registerSequencer:", error.message);
  }
};

const deregisterSequencer = async (logs) => {
  try {
    for (const log of logs) {
      const clusterId = log.args.clusterId;
      const address = log.args.sequencerAddress;

      const cluster = await Cluster.findOne({ clusterId });
      if (!cluster) {
        throw new Error(`Cluster with ID ${clusterId} not found`);
      }

      const index = cluster.sequencers.indexOf(address);
      if (index === -1) {
        console.log(`Address ${address} not found in Cluster ${clusterId}.`);
        continue;
      }

      if (
        cluster.sequencers[index] !==
        "0x0000000000000000000000000000000000000000"
      ) {
        cluster.sequencers[index] =
          "0x0000000000000000000000000000000000000000";
        await cluster.save();
        console.log(
          `Sequencer at address ${address} removed from Cluster ${clusterId}.`
        );
      } else {
        console.log(
          `Address ${address} in Cluster ${clusterId} is already empty.`
        );
      }
    }
  } catch (error) {
    console.error("Error in deregisterSequencer:", error.message);
  }
};

const clusterService = {
  getAllClusters,
  getGeneratedClusters,
  getJoinedClusters,
  getCluster,
  initializeCluster,
  addRollup,
  registerSequencer,
  deregisterSequencer,
};

export default clusterService;
