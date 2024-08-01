import express from "express";
import proposerSetController from "../controllers/proposerSetController.js";

const router = express.Router();

router.get("/proposer-sets", proposerSetController.getAllProposerSets);
router.get(
  "/addresses/:walletAddress/proposer-sets/generated",
  proposerSetController.getGeneratedProposerSets
);
router.get(
  "/addresses/:walletAddress/proposer-sets/joined",
  proposerSetController.getJoinedProposerSets
);
router.get(
  "/proposer-sets/:proposerSetId/sequencers",
  proposerSetController.getSequencersInProposerSet
);

export default router;
