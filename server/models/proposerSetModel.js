const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProposerSetSchema = new Schema(
  {
    proposerSetId: { type: String, required: true, unique: true }, // Use the blockchain ID
    name: String,
    symbol: String,
    rpcUrl: String,
    webSocketUrl: String,
    chainId: String,
    rollupType: String,
    blockExplorerUrl: String,
    sequencers: [String],
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false }
); // Disable automatic creation of _id field

const ProposerSet = mongoose.model("ProposerSet", ProposerSetSchema);

module.exports = ProposerSet;
