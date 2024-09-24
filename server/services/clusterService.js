import e from "express";
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
  const cluster = await Cluster.findOne({ clusterId });
  if (!cluster) {
    throw new Error("Cluster not found");
  }
  return cluster;
};

const initializeCluster = async (logs) => {
  try {
    for (const log of logs) {
      const clusterId = log.args.clusterId;
      const maxSequencerNumber = Number(log.args.maxSequencerNumber);
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
        fileStrings: {
          config: `# Set sequencer rpc url
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
is_using_zkp = false`,
        },
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

const updateCluster = async (clusterId, updateData) => {
  const { rollupId, executorAddress, rpcUrl, blockExplorerUrl, websocketUrl } =
    updateData;

  try {
    const cluster = await Cluster.findOne({ clusterId });
    if (!cluster) {
      throw new Error("Cluster not found");
    }

    const rollup = cluster.rollups.find((r) => r.rollupId === rollupId);
    if (!rollup) {
      throw new Error("Rollup not found");
    }

    const executor = rollup.executors.find(
      (e) => e.address === executorAddress
    );

    if (!executor) {
      throw new Error("Executor not found");
    }

    executor.rpcUrl = rpcUrl;
    executor.blockExplorerUrl = blockExplorerUrl;
    executor.websocketUrl = websocketUrl;

    const updatedCluster = await cluster.save();
    return updatedCluster;
  } catch (error) {
    throw new Error(error.message);
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
