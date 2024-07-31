const mongoose = require("mongoose");
const { Schema } = mongoose;

const addressSchema = new Schema({
  walletAddress: { type: String, required: true, unique: true },
  generatedProposerSets: [{ type: Schema.Types.ObjectId, ref: "ProposerSet" }],
  joinedProposerSets: [{ type: Schema.Types.ObjectId, ref: "ProposerSet" }],
});

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;
