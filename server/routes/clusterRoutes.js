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
router.patch("/clusters/:clusterId", clusterController.updateCluster);

export default router;
