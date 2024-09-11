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
      const owner = log.args.owner;

      const newCluster = new Cluster({
        clusterId,
        owner,
        name: log.args.name || "",
        symbol: log.args.symbol || "",
        rpcUrl: log.args.rpcUrl || "",
        webSocketUrl: log.args.webSocketUrl || "",
        chainId: log.args.chainId || "",
        rollupType: log.args.rollupType || "",
        blockExplorerUrl: log.args.blockExplorerUrl || "",
        sequencers: Array(30).fill(
          "0x0000000000000000000000000000000000000000"
        ),
        createdAt: new Date(),
      });

      await newCluster.save();
      console.log(`Cluster with ID ${clusterId} created successfully.`);
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
      const cluster = await Cluster.findOne({ clusterId });

      if (!cluster) {
        throw new Error(`Cluster with ID ${clusterId} not found`);
      }

      cluster.rollupAddress = rollupAddress;
      await cluster.save();
      console.log(
        `Rollup ${rollupAddress} added to Cluster ${clusterId} successfully.`
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
