import { validationServiceManagerAbi } from "../../common.js";
import clusterService from "../services/clusterService.js";
import { getRollupInfoList } from "./contractService.js";

const handleInitializeCluster = async (log) => {
  try {
    const clusterData = {
      clusterId: log.args.clusterId,
      owner: log.args.owner,
      maxSequencerNumber: Number(log.args.maxSequencerNumber),
    };
    await clusterService.initializeCluster(clusterData);
  } catch (error) {
    console.error("Error in handleInitializeCluster:", error.message);
  }
};

const handleAddRollup = async (
  log,
  contractAddress,
  chain,
  rpcUrl,
  webSocketUrl
) => {
  try {
    const { clusterId, rollupId, rollupOwnerAddress } = log.args;

    const rollupInfoList = await getRollupInfoList(
      clusterId,
      contractAddress,
      chain,
      rpcUrl
    );
    const rollupInfo = rollupInfoList.find(
      (info) => info.rollupId === rollupId
    );

    if (!rollupInfo) {
      console.error(
        `Rollup with ID ${rollupId} not found in contract for cluster ${clusterId}`
      );
    }

    const rollupData = {
      clusterId,
      rollupId,
      rollupOwnerAddress,
      rollupType: rollupInfo.rollupType,
      encryptedTransactionType: rollupInfo.encryptedTransactionType,
      validationInfo: rollupInfo.validationInfo,
      orderCommitmentType: rollupInfo.orderCommitmentType,
      executorAddresses: rollupInfo.executorAddresses.map((address) => ({
        address,
        rpcUrl: "not added",
        webSocketUrl: "not added",
        blockExplorerUrl: "not added",
      })),
    };

    await clusterService.addRollup(rollupData);
  } catch (error) {
    console.error("Error in handleAddRollup:", error.message);
  }
};

const handleRegisterSequencer = async (log) => {
  try {
    const sequencerData = {
      clusterId: log.args.clusterId,
      sequencerAddress: log.args.sequencerAddress,
      index: log.args.index,
    };
    await clusterService.registerSequencer(sequencerData);
  } catch (error) {
    console.error("Error in handleRegisterSequencer:", error.message);
  }
};

const handleDeregisterSequencer = async (log) => {
  try {
    const sequencerData = {
      clusterId: log.args.clusterId,
      sequencerAddress: log.args.sequencerAddress,
    };
    await clusterService.deregisterSequencer(sequencerData);
  } catch (error) {
    console.error("Error in handleDeregisterSequencer:", error.message);
  }
};

const handleRegisterRollupExecutor = async (log) => {
  try {
    const rollupExecutorData = {
      clusterId: log.args.clusterId,
      rollupId: log.args.rollupId,
      executorAddress: log.args.executorAddress,
    };
    await clusterService.registerRollupExecutor(rollupExecutorData);
  } catch (error) {
    console.error("Error in handleRegisterRollupExecutor:", error.message);
  }
};

const eventService = {
  handleInitializeCluster,
  handleAddRollup,
  handleRegisterSequencer,
  handleDeregisterSequencer,
  handleRegisterRollupExecutor,
};

export default eventService;
