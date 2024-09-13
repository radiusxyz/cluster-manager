import mongoose from "mongoose";
const { Schema } = mongoose;

const ValidationInfoSchema = new Schema({
  platform: { type: String, required: true },
  serviceProvider: { type: String, required: true },
});

const ExecutorSchema = new Schema({
  address: { type: String, required: true },
  rpcUrl: { type: String, required: true },
  websocketUrl: { type: String, required: true },
  blockExplorerUrl: { type: String, required: true },
});

const RollupSchema = new Schema({
  rollupId: { type: String, required: true },
  owner: { type: String, required: true },
  type: { type: String, required: true },
  orderCommitmentType: { type: String, required: true },
  validationInfo: { type: ValidationInfoSchema, required: true },
  executors: [ExecutorSchema],
});

const ClusterSchema = new Schema({
  clusterId: { type: String, required: true },
  owner: { type: String, required: true },
  sequencers: [{ type: String }],
  rollups: [RollupSchema],
  maxSequencerNumber: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
});

const Cluster = mongoose.model("Cluster", ClusterSchema);

export default Cluster;
