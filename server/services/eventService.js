import clusterService from "../services/clusterService.js";
import { getRollupInfoList } from "./contractService.js";

const handleInitializeCluster = async (log) => {
  try {
    const clusterData = {
      clusterId: log.args.clusterId,
      owner: log.args.owner,
      maxSequencerNumber: Number(log.args.maxSequencerNumber),
    };
    await clusterService.initializeCluster(clusterData);
  } catch (error) {
    console.error("Error in handleInitializeCluster:", error.message);
  }
};

const handleAddRollup = async (log) => {
  try {
    const { clusterId, rollupId, rollupOwnerAddress } = log.args;

    const rollupInfoList = await getRollupInfoList(clusterId);
    const rollupInfo = rollupInfoList.find(
      (info) => info.rollupId === rollupId
    );

    if (!rollupInfo) {
      console.error(
        `Rollup with ID ${rollupId} not found in contract for cluster ${clusterId}`
      );
    }

    const rollupData = {
      clusterId,
      rollupId,
      rollupOwnerAddress,
      rollupType: rollupInfo.rollupType,
      encryptedTransactionType: rollupInfo.encryptedTransactionType,
      validationInfo: rollupInfo.validationInfo,
      orderCommitmentType: rollupInfo.orderCommitmentType,
      executorAddresses: rollupInfo.executorAddresses.map((address) => ({
        address,
        rpcUrl: "not added",
        websocketUrl: "not added",
        blockExplorerUrl: "not added",
      })),
      fileStrings: {
        config: `# Set sequencer rpc url
sequencer_rpc_url = "http://127.0.0.1:3000"

# Set internal rpc url
internal_rpc_url = "http://127.0.0.1:4000"

# Set cluster rpc url
cluster_rpc_url = "http://127.0.0.1:5000"

# Set seeder rpc url
seeder_rpc_url = "http://127.0.0.1:6001"

# Set key management system rpc url
key_management_system_rpc_url = "http://127.0.0.1:7100"

# Set cluster type
cluster_type = "local"

# Set liveness provider rpc url
liveness_provider_rpc_url = "http://127.0.0.1:8545"

# Set liveness provider websocket url
liveness_provider_websocket_url = "ws://127.0.0.1:8545"

# Set liveness contract address
liveness_contract_address = ""

# Set using zkp
is_using_zkp = false`,
      },
    };

    await clusterService.addRollup(rollupData);
  } catch (error) {
    console.error("Error in handleAddRollup:", error.message);
  }
};

const handleRegisterSequencer = async (log) => {
  try {
    const sequencerData = {
      clusterId: log.args.clusterId,
      sequencerAddress: log.args.sequencerAddress,
      index: log.args.index,
    };
    await clusterService.registerSequencer(sequencerData);
  } catch (error) {
    console.error("Error in handleRegisterSequencer:", error.message);
  }
};

const handleDeregisterSequencer = async (log) => {
  try {
    const sequencerData = {
      clusterId: log.args.clusterId,
      sequencerAddress: log.args.sequencerAddress,
    };
    await clusterService.deregisterSequencer(sequencerData);
  } catch (error) {
    console.error("Error in handleDeregisterSequencer:", error.message);
  }
};

const eventService = {
  handleInitializeCluster,
  handleAddRollup,
  handleRegisterSequencer,
  handleDeregisterSequencer,
};

export default eventService;
