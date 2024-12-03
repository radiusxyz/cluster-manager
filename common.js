// LivenessContract Address
const contractAddress = "0x84eA74d481Ee0A5332c457a4d796187F6Ba67fEB";
const contractAbi = [
  { type: "constructor", inputs: [], stateMutability: "nonpayable" },
  {
    type: "function",
    name: "BLOCK_MARGIN",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "addRollup",
    inputs: [
      { name: "clusterId", type: "string", internalType: "string" },
      {
        name: "rollupInfo",
        type: "tuple",
        internalType: "struct ILivenessRadius.AddRollupInfo",
        components: [
          { name: "rollupId", type: "string", internalType: "string" },
          { name: "owner", type: "address", internalType: "address" },
          {
            name: "rollupType",
            type: "string",
            internalType: "string",
          },
          {
            name: "encryptedTransactionType",
            type: "string",
            internalType: "string",
          },
          {
            name: "orderCommitmentType",
            type: "string",
            internalType: "string",
          },
          {
            name: "executorAddress",
            type: "address",
            internalType: "address",
          },
          {
            name: "validationInfo",
            type: "tuple",
            internalType: "struct ILivenessRadius.ValidationInfo",
            components: [
              {
                name: "platform",
                type: "string",
                internalType: "string",
              },
              {
                name: "serviceProvider",
                type: "string",
                internalType: "string",
              },
              {
                name: "validationServiceManager",
                type: "address",
                internalType: "address",
              },
            ],
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "deregisterSequencer",
    inputs: [{ name: "clusterId", type: "string", internalType: "string" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getAllClusterIds",
    inputs: [],
    outputs: [{ name: "", type: "string[]", internalType: "string[]" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getClustersByOwner",
    inputs: [{ name: "owner", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "string[]", internalType: "string[]" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getClustersBySequencer",
    inputs: [{ name: "sequencer", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "string[]", internalType: "string[]" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getExecutorList",
    inputs: [
      { name: "clusterId", type: "string", internalType: "string" },
      { name: "rollupId", type: "string", internalType: "string" },
    ],
    outputs: [{ name: "", type: "address[]", internalType: "address[]" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getMaxSequencerNumber",
    inputs: [{ name: "clusterId", type: "string", internalType: "string" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getRollupInfo",
    inputs: [
      { name: "clusterId", type: "string", internalType: "string" },
      { name: "rollupId", type: "string", internalType: "string" },
    ],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct ILivenessRadius.RollupInfo",
        components: [
          { name: "rollupId", type: "string", internalType: "string" },
          { name: "owner", type: "address", internalType: "address" },
          {
            name: "rollupType",
            type: "string",
            internalType: "string",
          },
          {
            name: "encryptedTransactionType",
            type: "string",
            internalType: "string",
          },
          {
            name: "orderCommitmentType",
            type: "string",
            internalType: "string",
          },
          {
            name: "executorAddresses",
            type: "address[]",
            internalType: "address[]",
          },
          {
            name: "validationInfo",
            type: "tuple",
            internalType: "struct ILivenessRadius.ValidationInfo",
            components: [
              {
                name: "platform",
                type: "string",
                internalType: "string",
              },
              {
                name: "serviceProvider",
                type: "string",
                internalType: "string",
              },
              {
                name: "validationServiceManager",
                type: "address",
                internalType: "address",
              },
            ],
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getRollupInfoList",
    inputs: [{ name: "clusterId", type: "string", internalType: "string" }],
    outputs: [
      {
        name: "",
        type: "tuple[]",
        internalType: "struct ILivenessRadius.RollupInfo[]",
        components: [
          { name: "rollupId", type: "string", internalType: "string" },
          { name: "owner", type: "address", internalType: "address" },
          {
            name: "rollupType",
            type: "string",
            internalType: "string",
          },
          {
            name: "encryptedTransactionType",
            type: "string",
            internalType: "string",
          },
          {
            name: "orderCommitmentType",
            type: "string",
            internalType: "string",
          },
          {
            name: "executorAddresses",
            type: "address[]",
            internalType: "address[]",
          },
          {
            name: "validationInfo",
            type: "tuple",
            internalType: "struct ILivenessRadius.ValidationInfo",
            components: [
              {
                name: "platform",
                type: "string",
                internalType: "string",
              },
              {
                name: "serviceProvider",
                type: "string",
                internalType: "string",
              },
              {
                name: "validationServiceManager",
                type: "address",
                internalType: "address",
              },
            ],
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getSequencerList",
    inputs: [{ name: "clusterId", type: "string", internalType: "string" }],
    outputs: [{ name: "", type: "address[]", internalType: "address[]" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "initializeCluster",
    inputs: [
      { name: "clusterId", type: "string", internalType: "string" },
      {
        name: "maxSequencerNumber",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "isAddedRollup",
    inputs: [
      { name: "clusterId", type: "string", internalType: "string" },
      { name: "rollupId", type: "string", internalType: "string" },
    ],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "isRegisteredRollupExecutor",
    inputs: [
      { name: "clusterId", type: "string", internalType: "string" },
      { name: "rollupId", type: "string", internalType: "string" },
      {
        name: "executorAddress",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "isRegisteredSequencer",
    inputs: [
      { name: "clusterId", type: "string", internalType: "string" },
      {
        name: "sequencerAddress",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "owner",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "registerRollupExecutor",
    inputs: [
      { name: "clusterId", type: "string", internalType: "string" },
      { name: "rollupId", type: "string", internalType: "string" },
      {
        name: "executorAddress",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "registerSequencer",
    inputs: [{ name: "clusterId", type: "string", internalType: "string" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "renounceOwnership",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "transferOwnership",
    inputs: [{ name: "newOwner", type: "address", internalType: "address" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "AddRollup",
    inputs: [
      {
        name: "clusterId",
        type: "string",
        indexed: false,
        internalType: "string",
      },
      {
        name: "rollupId",
        type: "string",
        indexed: false,
        internalType: "string",
      },
      {
        name: "rollupOwnerAddress",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "DeregisterSequencer",
    inputs: [
      {
        name: "clusterId",
        type: "string",
        indexed: false,
        internalType: "string",
      },
      {
        name: "sequencerAddress",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "InitializeCluster",
    inputs: [
      {
        name: "clusterId",
        type: "string",
        indexed: false,
        internalType: "string",
      },
      {
        name: "owner",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "maxSequencerNumber",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OwnershipTransferred",
    inputs: [
      {
        name: "previousOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "newOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "RegisterRollupExecutor",
    inputs: [
      {
        name: "clusterId",
        type: "string",
        indexed: false,
        internalType: "string",
      },
      {
        name: "rollupId",
        type: "string",
        indexed: false,
        internalType: "string",
      },
      {
        name: "executorAddress",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "RegisterSequencer",
    inputs: [
      {
        name: "clusterId",
        type: "string",
        indexed: false,
        internalType: "string",
      },
      {
        name: "sequencerAddress",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "index",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "error",
    name: "OwnableInvalidOwner",
    inputs: [{ name: "owner", type: "address", internalType: "address" }],
  },
  {
    type: "error",
    name: "OwnableUnauthorizedAccount",
    inputs: [{ name: "account", type: "address", internalType: "address" }],
  },
];
// ES6 export for frontend (browser)
export { contractAddress, contractAbi };
