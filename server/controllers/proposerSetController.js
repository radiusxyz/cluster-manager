const ProposerSet = require("./models/proposerSet");
const Address = require("./models/address");

const createProposerSet = async (name, description) => {
  const proposerSet = new ProposerSet({ name, description });
  await proposerSet.save();
  return proposerSet;
};

const getSequencerList = async (proposerSetId) => {
  const proposerSet = await ProposerSet.findOne({ id: proposerSetId }).populate(
    "sequencerList"
  );
  return proposerSet ? proposerSet.sequencerList : [];
};

const addAddressToSequencerList = async (proposerSetId, walletAddress) => {
  const proposerSet = await ProposerSet.findById(proposerSetId);
  const address = await Address.findOne({ walletAddress });

  if (proposerSet && address) {
    proposerSet.sequencerList.push(address._id);
    await proposerSet.save();
    return proposerSet;
  } else {
    throw new Error("Proposer Set or Address not found");
  }
};

const addAddressToSequencerList = async (proposerSetId, walletAddress) => {
  const proposerSet = await ProposerSet.findOne({ id: proposerSetId });
  let address = await Address.findOne({ walletAddress });

  if (!address) {
    address = new Address({ walletAddress });
    await address.save();
  }

  if (proposerSet && !proposerSet.sequencerList.includes(address._id)) {
    proposerSet.sequencerList.push(address._id);
    await proposerSet.save();
  }

  return proposerSet;
};
