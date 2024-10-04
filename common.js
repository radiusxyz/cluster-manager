const contractAddress = "0x99E5Ff2f7c842F977A1645710c9eB685F0051791";
const contractAbi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "AccessControlBadConfirmation",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "neededRole",
        type: "bytes32",
      },
    ],
    name: "AccessControlUnauthorizedAccount",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidInitialization",
    type: "error",
  },
  {
    inputs: [],
    name: "NotInitializing",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    inputs: [],
    name: "ReentrancyGuardReentrantCall",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "clusterId",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "rollupId",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "rollupOwnerAddress",
        type: "address",
      },
    ],
    name: "AddRollup",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "clusterId",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "sequencerAddress",
        type: "address",
      },
    ],
    name: "DeregisterSequencer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "clusterId",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "maxSequencerNumber",
        type: "uint256",
      },
    ],
    name: "InitializeCluster",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint64",
        name: "version",
        type: "uint64",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "clusterId",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "rollupId",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "executorAddress",
        type: "address",
      },
    ],
    name: "RegisterRollupExecutor",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "clusterId",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "sequencerAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "RegisterSequencer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    inputs: [],
    name: "BLOCK_MARGIN",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "clusterId",
        type: "string",
      },
      {
        components: [
          {
            internalType: "string",
            name: "rollupId",
            type: "string",
          },
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "string",
            name: "rollupType",
            type: "string",
          },
          {
            internalType: "string",
            name: "encryptedTransactionType",
            type: "string",
          },
          {
            components: [
              {
                internalType: "string",
                name: "platform",
                type: "string",
              },
              {
                internalType: "string",
                name: "serviceProvider",
                type: "string",
              },
            ],
            internalType: "struct ILivenessRadius.ValidationInfo",
            name: "validationInfo",
            type: "tuple",
          },
          {
            internalType: "string",
            name: "orderCommitmentType",
            type: "string",
          },
        ],
        internalType: "struct ILivenessRadius.AddRollupInfo",
        name: "rollupInfo",
        type: "tuple",
      },
    ],
    name: "addRollup",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "clusterId",
        type: "string",
      },
    ],
    name: "deregisterSequencer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllClusterIds",
    outputs: [
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "getClustersByOwner",
    outputs: [
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sequencer",
        type: "address",
      },
    ],
    name: "getClustersBySequencer",
    outputs: [
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "clusterId",
        type: "string",
      },
      {
        internalType: "string",
        name: "rollupId",
        type: "string",
      },
    ],
    name: "getExecutorList",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "clusterId",
        type: "string",
      },
    ],
    name: "getMaxSequencerNumber",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleAdmin",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "clusterId",
        type: "string",
      },
      {
        internalType: "string",
        name: "rollupId",
        type: "string",
      },
    ],
    name: "getRollupInfo",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "rollupId",
            type: "string",
          },
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "string",
            name: "rollupType",
            type: "string",
          },
          {
            internalType: "string",
            name: "encryptedTransactionType",
            type: "string",
          },
          {
            components: [
              {
                internalType: "string",
                name: "platform",
                type: "string",
              },
              {
                internalType: "string",
                name: "serviceProvider",
                type: "string",
              },
            ],
            internalType: "struct ILivenessRadius.ValidationInfo",
            name: "validationInfo",
            type: "tuple",
          },
          {
            internalType: "string",
            name: "orderCommitmentType",
            type: "string",
          },
          {
            internalType: "address[]",
            name: "executorAddresses",
            type: "address[]",
          },
        ],
        internalType: "struct ILivenessRadius.RollupInfo",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "clusterId",
        type: "string",
      },
    ],
    name: "getRollupInfoList",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "rollupId",
            type: "string",
          },
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "string",
            name: "rollupType",
            type: "string",
          },
          {
            internalType: "string",
            name: "encryptedTransactionType",
            type: "string",
          },
          {
            components: [
              {
                internalType: "string",
                name: "platform",
                type: "string",
              },
              {
                internalType: "string",
                name: "serviceProvider",
                type: "string",
              },
            ],
            internalType: "struct ILivenessRadius.ValidationInfo",
            name: "validationInfo",
            type: "tuple",
          },
          {
            internalType: "string",
            name: "orderCommitmentType",
            type: "string",
          },
          {
            internalType: "address[]",
            name: "executorAddresses",
            type: "address[]",
          },
        ],
        internalType: "struct ILivenessRadius.RollupInfo[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "clusterId",
        type: "string",
      },
    ],
    name: "getSequencerList",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "hasRole",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "clusterId",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "maxSequencerNumber",
        type: "uint256",
      },
    ],
    name: "initializeCluster",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "clusterId",
        type: "string",
      },
      {
        internalType: "string",
        name: "rollupId",
        type: "string",
      },
    ],
    name: "isAddedRollup",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "clusterId",
        type: "string",
      },
      {
        internalType: "string",
        name: "rollupId",
        type: "string",
      },
      {
        internalType: "address",
        name: "executorAddress",
        type: "address",
      },
    ],
    name: "isRegisteredRollupExecutor",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "clusterId",
        type: "string",
      },
      {
        internalType: "address",
        name: "sequencerAddress",
        type: "address",
      },
    ],
    name: "isRegisteredSequencer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "clusterId",
        type: "string",
      },
      {
        internalType: "string",
        name: "rollupId",
        type: "string",
      },
      {
        internalType: "address",
        name: "rollupExecutorAddress",
        type: "address",
      },
    ],
    name: "registerRollupExecutor",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "clusterId",
        type: "string",
      },
    ],
    name: "registerSequencer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "callerConfirmation",
        type: "address",
      },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

// ES6 export for frontend (browser)
export { contractAddress, contractAbi };
