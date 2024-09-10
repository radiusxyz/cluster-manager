import mongoose from "mongoose";
const { Schema } = mongoose;

const ClusterSchema = new Schema({
  clusterId: String,
  owner: String,
  name: String,
  symbol: String,
  rpcUrl: String,
  webSocketUrl: String,
  chainId: String,
  rollupType: String,
  blockExplorerUrl: String,
  sequencers: [String],
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

const Cluster = mongoose.model("Cluster", ClusterSchema);

export default Cluster;
