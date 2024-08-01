import proposerSetService from "../services/proposerSetService.js";

const handleInitializeProposerSet = async (logs) => {
  try {
    await proposerSetService.initializeProposerSet(logs);
  } catch (error) {
    console.error("Error in handleInitializeProposerSet:", error.message);
  }
};

const handleRegisterSequencer = async (logs) => {
  try {
    await proposerSetService.registerSequencer(logs);
  } catch (error) {
    console.error("Error in handleRegisterSequencer:", error.message);
  }
};

const handleDeregisterSequencer = async (logs) => {
  try {
    await proposerSetService.deregisterSequencer(logs);
  } catch (error) {
    console.error("Error in handleDeregisterSequencer:", error.message);
  }
};

const eventService = {
  handleInitializeProposerSet,
  handleRegisterSequencer,
  handleDeregisterSequencer,
};

export default eventService;
