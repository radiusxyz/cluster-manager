import clusterService from "../services/clusterService.js";

const handleInitializeCluster = async (logs) => {
  try {
    await clusterService.initializeCluster(logs);
  } catch (error) {
    console.error("Error in handleInitializeCluster:", error.message);
  }
};

const handleAddRollup = async (logs) => {
  try {
    await clusterService.addRollup(logs);
  } catch (error) {
    console.error("Error in handleAddRollup:", error.message);
  }
};

const handleRegisterSequencer = async (logs) => {
  try {
    await clusterService.registerSequencer(logs);
  } catch (error) {
    console.error("Error in handleRegisterSequencer:", error.message);
  }
};

const handleDeregisterSequencer = async (logs) => {
  try {
    await clusterService.deregisterSequencer(logs);
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
