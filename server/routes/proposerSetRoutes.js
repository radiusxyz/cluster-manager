const express = require("express");
const {
  getAllProposerSets,
  getGeneratedProposerSets,
  getJoinedProposerSets,
  getSequencersInProposerSet,
} = require("../controllers/proposerSetController");

const router = express.Router();

router.get("/proposer-sets", getAllProposerSets);
router.get(
  "/addresses/:walletAddress/proposer-sets/generated",
  getGeneratedProposerSets
);
router.get(
  "/addresses/:walletAddress/proposer-sets/joined",
  getJoinedProposerSets
);
router.get(
  "/proposer-sets/:proposerSetId/sequencers",
  getSequencersInProposerSet
);

module.exports = router;
