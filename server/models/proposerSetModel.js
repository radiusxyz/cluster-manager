import mongoose from "mongoose";
const { Schema } = mongoose;

const ProposerSetSchema = new Schema({
  proposerSetId: String,
  owner: String,
  name: String,
  symbol: String,
  rpcUrl: String,
  webSocketUrl: String,
  chainId: String,
  rollupType: String,
  blockExplorerUrl: String,
  sequencers: [String],
  createdAt: { type: Date, default: Date.now },
});

const ProposerSet = mongoose.model("ProposerSet", ProposerSetSchema);

export default ProposerSet;
