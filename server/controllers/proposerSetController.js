import proposerSetService from "../services/proposerSetService.js";

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

const updateProposerSet = async (req, res) => {
  try {
    const { proposerSetId } = req.params;
    const updateData = req.body;
    const updatedProposerSet = await proposerSetService.updateProposerSet(
      proposerSetId,
      updateData
    );

    if (!updatedProposerSet) {
      return res.status(404).json({ message: "ProposerSet not found" });
    }

    res.status(200).json(updatedProposerSet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const proposerSetController = {
  getAllProposerSets,
  getGeneratedProposerSets,
  getJoinedProposerSets,
  getSequencersInProposerSet,
  updateProposerSet,
};

export default proposerSetController;
