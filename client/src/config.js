import { http, createConfig, injected } from "@wagmi/core";
import { defineChain } from "viem";

export const localhost = /*#__PURE__*/ defineChain({
  id: 31337,
  name: "Localhost",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH",
  },
  rpcUrls: {
    default: { http: ["http://127.0.0.1:8545"] },
  },
});

export const config = createConfig({
  chains: [localhost],
  transports: {
    [localhost.id]: http(),
  },
  connectors: [injected()],
});

export const hhContractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
export const hhContractAbi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "proposerSetId",
        type: "bytes32",
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
        internalType: "bytes32",
        name: "proposerSetId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "InitializeProposerSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "proposerSetId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "sequencerAddress",
        type: "address",
      },
    ],
    name: "RegisterSequencer",
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
    name: "MAX_SEQUENCER_COUNT",
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
        name: "proposerSetId",
        type: "bytes32",
      },
    ],
    name: "deregisterSequencer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "proposerSetId",
        type: "bytes32",
      },
    ],
    name: "getSequencerList",
    outputs: [
      {
        internalType: "address[30]",
        name: "",
        type: "address[30]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "initializeProposerSet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "proposerSetId",
        type: "bytes32",
      },
    ],
    name: "registerSequencer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export const contractAddress = "0xdc8e581bc58fb80cad89773f4c5830ee762d8b72";
export const contractAbi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "proposerSetId",
        type: "bytes32",
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
        internalType: "bytes32",
        name: "proposerSetId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "InitializeProposerSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "proposerSetId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "sequencerAddress",
        type: "address",
      },
    ],
    name: "RegisterSequencer",
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
    name: "MAX_SEQUENCER_COUNT",
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
        name: "proposerSetId",
        type: "bytes32",
      },
    ],
    name: "deregisterSequencer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "proposerSetId",
        type: "bytes32",
      },
    ],
    name: "getSequencerList",
    outputs: [
      {
        internalType: "address[30]",
        name: "",
        type: "address[30]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "initializeProposerSet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "proposerSetId",
        type: "bytes32",
      },
    ],
    name: "registerSequencer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
