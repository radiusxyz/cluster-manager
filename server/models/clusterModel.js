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
  encryptedTransactionType: { type: String, required: true },
  type: { type: String, required: true },
  orderCommitmentType: { type: String, required: true },
  validationInfo: { type: ValidationInfoSchema, required: true },
  executors: [ExecutorSchema],
  fileStrings: {
    config: {
      type: String,
      default: ``,
    },
    env: {
      type: String,
      default: `#!/bin/bash
CURRENT_PATH="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"

SEEDER_BIN_PATH=$CURRENT_PATH/../target/release/seeder
SEQUENCER_BIN_PATH=$CURRENT_PATH/../target/release/sequencer`,
    },
    "01InitSequencer": {
      type: String,
      default: `#!/bin/bash
if [ "$#" -ne 1 ]; then
    echo "Usage: ./10_init_sequencer.sh <NODE_COUNT>"
    exit 1
fi

SCRIPT_PATH="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"
source $SCRIPT_PATH/env.sh

NODE_COUNT=$1

rm -rf $CURRENT_PATH/sequencers
mkdir -p $CURRENT_PATH/sequencers

for (( node_index=0; node_index<NODE_COUNT; node_index++ )) do
    echo "Initialize sequencer $node_index" 
    data_path=$CURRENT_PATH/sequencers/sequencer_$node_index
    
    $SEQUENCER_BIN_PATH init --path $data_path

    config_file_path=$data_path/config.toml
    
    sed -i.temp "s/sequencer_rpc_url = \"http:\/\/127.0.0.1:3000\"/sequencer_rpc_url = \"http:\/\/127.0.0.1:300$node_index\"/g" $config_file_path
    sed -i.temp "s/internal_rpc_url = \"http:\/\/127.0.0.1:4000\"/internal_rpc_url = \"http:\/\/127.0.0.1:400$node_index\"/g" $config_file_path
    sed -i.temp "s/cluster_rpc_url = \"http:\/\/127.0.0.1:5000\"/cluster_rpc_url = \"http:\/\/127.0.0.1:500$node_index\"/g" $config_file_path

    sed -i.temp "s/seeder_rpc_url = \"http:\/\/127.0.0.1:6000\"/seeder_rpc_url = \"http:\/\/127.0.0.1:6001\"/g" $config_file_path
    

    # TODO: remove
    private_key_path=$data_path/signing_key
    sed -i.temp "s/0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80/0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff8$node_index/g" $private_key_path

    rm $config_file_path.temp
    rm $private_key_path.temp
done`,
    },
    "02RunSequencer": {
      type: String,
      default: `#!/bin/bash
if [ "$#" -ne 1 ]; then
    echo "Usage: ./11_run_sequencer.sh <node_index>"
    exit 1
fi

SCRIPT_PATH="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"
source $SCRIPT_PATH/env.sh

node_index=$1

DATA_PATH=$CURRENT_PATH/sequencers/sequencer_$node_index

$SEQUENCER_BIN_PATH start --path $DATA_PATH`,
    },
  },
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
