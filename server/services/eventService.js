const {
  initializeProposerSet,
  registerSequencer,
  deregisterSequencer,
} = require("../services/proposerSetService");

const handleInitializeProposerSet = async (logs) => {
  try {
    await initializeProposerSet(logs);
  } catch (error) {
    console.error("Error in handleInitializeProposerSet:", error.message);
  }
};

const handleRegisterSequencer = async (logs) => {
  try {
    await registerSequencer(logs);
  } catch (error) {
    console.error("Error in handleRegisterSequencer:", error.message);
  }
};

const handleDeregisterSequencer = async (logs) => {
  try {
    await deregisterSequencer(logs);
  } catch (error) {
    console.error("Error in handleDeregisterSequencer:", error.message);
  }
};

module.exports = {
  handleInitializeProposerSet,
  handleRegisterSequencer,
  handleDeregisterSequencer,
};
