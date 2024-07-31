const mongoose = require("mongoose");
const { Schema } = mongoose;

const proposerSetSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  sequencerList: [{ type: Schema.Types.ObjectId, ref: "Address" }],
  createdAt: { type: Date, default: Date.now },
});

const ProposerSet = mongoose.model("ProposerSet", proposerSetSchema);

module.exports = ProposerSet;
