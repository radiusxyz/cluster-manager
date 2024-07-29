// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Ssal {
    mapping(bytes32 => ProposerSet) private proposerSets;

    uint256 public constant MAX_SEQUENCER_COUNT = 30;
    uint256 public constant BLOCK_MARGIN = 7;

    struct ProposerSet {
        address owner; // Owner is rollup contract address
        mapping(address => bool) isRegisteredSequencer;
        mapping(address => uint256) sequencerIndex; // Maps address to index in the array
        address[MAX_SEQUENCER_COUNT] sequencerAddresses;
        uint256 currentSequencerCount;
    }

    event InitializeProposerSet(bytes32 proposerSetId, address owner);
    event RegisterSequencer(bytes32 proposerSetId, address sequencerAddress);
    event DeregisterSequencer(bytes32 proposerSetId, address sequencerAddress);

    function initializeProposerSet() public {
        bytes32 proposerSetId = keccak256(
            abi.encodePacked(msg.sender, blockhash(block.number - 1))
        );

        ProposerSet storage proposerSet = proposerSets[proposerSetId];

        require(
            proposerSet.owner == address(0),
            "Already initialized proposer set"
        );

        proposerSet.owner = msg.sender;
        proposerSet.currentSequencerCount = 0;

        emit InitializeProposerSet(proposerSetId, msg.sender);
    }

    function registerSequencer(bytes32 proposerSetId) public {
        ProposerSet storage proposerSet = proposerSets[proposerSetId];

        require(
            proposerSet.owner != address(0),
            "Proposer set not initialized"
        );
        require(
            !proposerSet.isRegisteredSequencer[msg.sender],
            "Already registered sequencer"
        );
        require(
            proposerSet.currentSequencerCount < MAX_SEQUENCER_COUNT,
            "Max sequencer count exceeded"
        );

        proposerSet.isRegisteredSequencer[msg.sender] = true;
        proposerSet.sequencerAddresses[proposerSet.currentSequencerCount] = msg
            .sender;
        proposerSet.sequencerIndex[msg.sender] = proposerSet
            .currentSequencerCount;
        proposerSet.currentSequencerCount++;

        emit RegisterSequencer(proposerSetId, msg.sender);
    }

    function deregisterSequencer(bytes32 proposerSetId) public {
        ProposerSet storage proposerSet = proposerSets[proposerSetId];

        require(
            proposerSet.owner != address(0),
            "Proposer set not initialized"
        );
        require(
            proposerSet.isRegisteredSequencer[msg.sender],
            "Not registered sequencer"
        );

        proposerSet.isRegisteredSequencer[msg.sender] = false;

        // Swap and pop to remove the sequencer
        uint256 index = proposerSet.sequencerIndex[msg.sender];
        uint256 lastIndex = proposerSet.currentSequencerCount - 1;
        if (index != lastIndex) {
            address lastSequencer = proposerSet.sequencerAddresses[lastIndex];
            proposerSet.sequencerAddresses[index] = lastSequencer;
            proposerSet.sequencerIndex[lastSequencer] = index;
        }
        proposerSet.sequencerAddresses[lastIndex] = address(0);
        proposerSet.currentSequencerCount--;

        delete proposerSet.sequencerIndex[msg.sender];

        emit DeregisterSequencer(proposerSetId, msg.sender);
    }

    function getSequencerList(
        bytes32 proposerSetId
    ) public view returns (address[MAX_SEQUENCER_COUNT] memory) {
        return proposerSets[proposerSetId].sequencerAddresses;
    }

    function isRegistered(
        bytes32 proposerSetId,
        address sequencerAddress
    ) public view returns (bool) {
        return
            proposerSets[proposerSetId].isRegisteredSequencer[sequencerAddress];
    }
}
