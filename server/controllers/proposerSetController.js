const ProposerSet = require("../models/proposerSetModel");
const proposerSetService = require("../services/proposerSetService");

const getAllProposerSets = async (req, res) => {
  try {
    const proposerSets = await proposerSetService.getAllProposerSets();
    res.status(200).json(proposerSets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getGeneratedProposerSets = async (req, res) => {
  try {
    const { walletAddress } = req.params;
    const proposerSets = await proposerSetService.getGeneratedProposerSets(
      walletAddress
    );
    res.status(200).json(proposerSets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getJoinedProposerSets = async (req, res) => {
  try {
    const { walletAddress } = req.params;
    const proposerSets = await proposerSetService.getJoinedProposerSets(
      walletAddress
    );
    res.status(200).json(proposerSets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSequencersInProposerSet = async (req, res) => {
  try {
    const { proposerSetId } = req.params;
    const sequencers = await proposerSetService.getSequencersInProposerSet(
      proposerSetId
    );
    res.status(200).json(sequencers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllProposerSets,
  getGeneratedProposerSets,
  getJoinedProposerSets,
  getSequencersInProposerSet,
};
