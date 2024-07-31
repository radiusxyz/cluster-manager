const mongoose = require("mongoose");
const { Schema } = mongoose;

const proposerSetSchema = new Schema(
  {
    id: { type: String, required: true, unique: true }, // Use the blockchain ID
    name: { type: String, required: true },
    symbol: { type: String, required: true },
    rpcUrl: { type: String, required: true },
    webSocketUrl: { type: String, required: true },
    chainId: { type: String, required: true },
    rollupType: { type: String, required: true },
    blockExplorerUrl: { type: String, required: true },
    sequencerList: [{ type: Schema.Types.ObjectId, ref: "Sequencer" }],
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false }
); // Disable automatic creation of _id field

const ProposerSet = mongoose.model("ProposerSet", proposerSetSchema);

module.exports = ProposerSet;
