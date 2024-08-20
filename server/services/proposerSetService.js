import ProposerSet from "../models/proposerSetModel.js";

const getAllProposerSets = async () => {
  return await ProposerSet.find();
};

const getGeneratedProposerSets = async (owner) => {
  return await ProposerSet.find({ owner });
};

const getJoinedProposerSets = async (walletAddress) => {
  return await ProposerSet.find({ sequencers: walletAddress });
};

const getSequencersInProposerSet = async (proposerSetId) => {
  const proposerSet = await ProposerSet.findOne({ proposerSetId });
  if (!proposerSet) {
    throw new Error("Proposer Set not found");
  }
  return proposerSet.sequencers;
};

const initializeProposerSet = async (logs) => {
  try {
    for (const log of logs) {
      const proposerSetId = log.args.proposerSetId;
      const owner = log.args.owner;

      const newProposerSet = new ProposerSet({
        proposerSetId,
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

      await newProposerSet.save();
      console.log(`ProposerSet with ID ${proposerSetId} created successfully.`);
    }
  } catch (error) {
    console.error("Error in initializeProposerSet:", error.message);
  }
};

const registerSequencer = async (logs) => {
  try {
    for (const log of logs) {
      const proposerSetId = log.args.proposerSetId;
      const sequencerAddress = log.args.sequencerAddress;
      const index = log.args.index;

      const proposerSet = await ProposerSet.findOne({ proposerSetId });
      if (!proposerSet) {
        throw new Error(`Proposer Set with ID ${proposerSetId} not found`);
      }

      if (
        proposerSet.sequencers[index] ===
        "0x0000000000000000000000000000000000000000"
      ) {
        proposerSet.sequencers[index] = sequencerAddress;
        await proposerSet.save();
        console.log(
          `Sequencer ${sequencerAddress} added to ProposerSet ${proposerSetId} at index ${index}.`
        );
      } else {
        console.log(
          `Index ${index} in ProposerSet ${proposerSetId} is already occupied.`
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
      const proposerSetId = log.args.proposerSetId;
      const address = log.args.sequencerAddress;

      const proposerSet = await ProposerSet.findOne({ proposerSetId });
      if (!proposerSet) {
        throw new Error(`Proposer Set with ID ${proposerSetId} not found`);
      }

      const index = proposerSet.sequencers.indexOf(address);
      if (index === -1) {
        console.log(
          `Address ${address} not found in ProposerSet ${proposerSetId}.`
        );
        continue;
      }

      if (
        proposerSet.sequencers[index] !==
        "0x0000000000000000000000000000000000000000"
      ) {
        proposerSet.sequencers[index] =
          "0x0000000000000000000000000000000000000000";
        await proposerSet.save();
        console.log(
          `Sequencer at address ${address} removed from ProposerSet ${proposerSetId}.`
        );
      } else {
        console.log(
          `Address ${address} in ProposerSet ${proposerSetId} is already empty.`
        );
      }
    }
  } catch (error) {
    console.error("Error in deregisterSequencer:", error.message);
  }
};

const proposerSetService = {
  getAllProposerSets,
  getGeneratedProposerSets,
  getJoinedProposerSets,
  getSequencersInProposerSet,
  initializeProposerSet,
  registerSequencer,
  deregisterSequencer,
};

export default proposerSetService;
