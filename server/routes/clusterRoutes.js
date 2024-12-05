import express from "express";
import clusterController from "../controllers/clusterController.js";

const router = express.Router();

router.get("/clusters", clusterController.getAllClusters);
router.get(
  "/addresses/:walletAddress/clusters/generated",
  clusterController.getGeneratedClusters
);
router.get(
  "/addresses/:walletAddress/clusters/joined",
  clusterController.getJoinedClusters
);
router.get("/clusters/:clusterId", clusterController.getCluster);
router.patch(
  "/clusters/:clusterId",
  clusterController.updateRollupExecutorDetails
);
router.get(
  "/clusters/:clusterId/rollups",
  clusterController.getRollupsOfCluster
);
router.get(
  "/clusters/:clusterId/rollups/:rollupId",
  clusterController.getRollupById
);

router.get("/sequencer/download", clusterController.downloadSequencer);

export default router;
