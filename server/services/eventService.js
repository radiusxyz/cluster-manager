import clusterService from "../services/clusterService.js";

const handleInitializeCluster = async (logs) => {
  try {
    for (const log of logs) {
      const clusterData = {
        clusterId: log.args.clusterId,
        owner: log.args.owner,
        maxSequencerNumber: Number(log.args.maxSequencerNumber),
      };
      await clusterService.initializeCluster(clusterData);
    }
  } catch (error) {
    console.error("Error in handleInitializeCluster:", error.message);
  }
};

const handleAddRollup = async (logs) => {
  try {
    for (const log of logs) {
      const rollupData = {
        clusterId: log.args.clusterId,
        rollupId: log.args.rollupId,
        rollupOwnerAddress: log.args.rollupOwnerAddress,
      };
      await clusterService.addRollup(rollupData);
    }
  } catch (error) {
    console.error("Error in handleAddRollup:", error.message);
  }
};

const handleRegisterSequencer = async (logs) => {
  try {
    for (const log of logs) {
      const sequencerData = {
        clusterId: log.args.clusterId,
        sequencerAddress: log.args.sequencerAddress,
        index: log.args.index,
      };
      await clusterService.registerSequencer(sequencerData);
    }
  } catch (error) {
    console.error("Error in handleRegisterSequencer:", error.message);
  }
};

const handleDeregisterSequencer = async (logs) => {
  try {
    for (const log of logs) {
      const sequencerData = {
        clusterId: log.args.clusterId,
        sequencerAddress: log.args.sequencerAddress,
      };
      await clusterService.deregisterSequencer(sequencerData);
    }
  } catch (error) {
    console.error("Error in handleDeregisterSequencer:", error.message);
  }
};

const eventService = {
  handleInitializeCluster,
  handleAddRollup,
  handleRegisterSequencer,
  handleDeregisterSequencer,
};

export default eventService;
