const ProposerSet = require("./models/proposerSet");
const Address = require("./models/address");

const getGeneratedProposerSets = async (walletAddress) => {
  const address = await Address.findOne({ walletAddress }).populate(
    "generatedProposerSets"
  );
  return address ? address.generatedProposerSets : [];
};

const getJoinedProposerSets = async (walletAddress) => {
  const address = await Address.findOne({ walletAddress }).populate(
    "joinedProposerSets"
  );
  return address ? address.joinedProposerSets : [];
};
