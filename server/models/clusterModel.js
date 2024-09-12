import mongoose from "mongoose";
const { Schema } = mongoose;

const ValidationInfoSchema = new Schema({
  platform: { type: String, required: true },
  serviceProvider: { type: String, required: true },
});

const ExecutorSchema = new Schema({
  rpcUrl: { type: String, required: true },
  websocketUrl: { type: String, required: true },
  blockExplorerUrl: { type: String, required: true },
});

const RollupSchema = new Schema({
  owner: { type: String, required: true },
  type: { type: String, required: true },
  orderCommitmentType: { type: String, required: true },
  validationInfo: { type: ValidationInfoSchema, required: true },
  executors: {
    type: Map,
    of: ExecutorSchema,
  },
});

const ClusterSchema = new Schema({
  clusterId: { type: String, required: true },
  sequencers: [{ type: String }],
  rollups: {
    type: Map,
    of: RollupSchema,
  },
  maxSequencerNumber: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

const Cluster = mongoose.model("Cluster", ClusterSchema);

export default Cluster;
