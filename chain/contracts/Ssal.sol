// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Ssal {
    mapping(bytes32 => Cluster) private clusters;
    mapping(address => bytes32[]) private clusterByOwner;
    mapping(address => bytes32[]) private clusterBySequencer;

    bytes32[] private allClusterIds;

    uint256 public constant MAX_SEQUENCER_COUNT = 30;
    uint256 public constant BLOCK_MARGIN = 7;

    struct Cluster {
        address owner; // Owner is rollup contract address
        mapping(address => bool) isRegisteredSequencer;
        mapping(address => uint256) sequencerIndex; // Maps address to index in the array
        address[MAX_SEQUENCER_COUNT] sequencerAddresses;
        uint256 currentSequencerCount;
        uint256[] emptySlots; // Keeps track of empty slots
    }

    event InitializeCluster(bytes32 clusterId, address owner);
    event RegisterSequencer(
        bytes32 clusterId,
        address sequencerAddress,
        uint256 index
    );
    event DeregisterSequencer(bytes32 clusterId, address sequencerAddress);

    function initializeCluster() public {
        bytes32 clusterId = keccak256(
            abi.encodePacked(msg.sender, blockhash(block.number - 1))
        );

        Cluster storage cluster = clusters[clusterId];

        require(cluster.owner == address(0), "Already initialized cluster");

        cluster.owner = msg.sender;
        cluster.currentSequencerCount = 0;

        for (uint256 i = 0; i < MAX_SEQUENCER_COUNT; i++) {
            cluster.emptySlots.push(i);
        }

        clusterByOwner[msg.sender].push(clusterId);
        allClusterIds.push(clusterId);

        emit InitializeCluster(clusterId, msg.sender);
    }

    function registerSequencer(bytes32 clusterId) public {
        Cluster storage cluster = clusters[clusterId];

        require(cluster.owner != address(0), "Cluster not initialized");
        require(
            !cluster.isRegisteredSequencer[msg.sender],
            "Already registered sequencer"
        );
        require(
            cluster.currentSequencerCount < MAX_SEQUENCER_COUNT,
            "Max sequencer count exceeded"
        );

        cluster.isRegisteredSequencer[msg.sender] = true;
        uint256 slotIndex = cluster.emptySlots[cluster.emptySlots.length - 1];
        cluster.emptySlots.pop();

        cluster.sequencerAddresses[slotIndex] = msg.sender;
        cluster.sequencerIndex[msg.sender] = slotIndex;
        cluster.currentSequencerCount++;

        clusterBySequencer[msg.sender].push(clusterId);

        emit RegisterSequencer(clusterId, msg.sender, slotIndex);
    }

    function deregisterSequencer(bytes32 clusterId) public {
        Cluster storage cluster = clusters[clusterId];

        require(cluster.owner != address(0), "Cluster not initialized");
        require(
            cluster.isRegisteredSequencer[msg.sender],
            "Not registered sequencer"
        );

        cluster.isRegisteredSequencer[msg.sender] = false;

        uint256 index = cluster.sequencerIndex[msg.sender];
        cluster.sequencerAddresses[index] = address(0);

        delete cluster.sequencerIndex[msg.sender];
        cluster.currentSequencerCount--;
        cluster.emptySlots.push(index);

        // Remove from clusterBySequencer array
        bytes32[] storage sequencerSets = clusterBySequencer[msg.sender];
        for (uint i = 0; i < sequencerSets.length; i++) {
            if (sequencerSets[i] == clusterId) {
                sequencerSets[i] = sequencerSets[sequencerSets.length - 1];
                sequencerSets.pop();
                break;
            }
        }

        emit DeregisterSequencer(clusterId, msg.sender);
    }

    function getSequencerList(
        bytes32 clusterId
    )
        public
        view
        returns (address[MAX_SEQUENCER_COUNT] memory validSequencers)
    {
        Cluster storage cluster = clusters[clusterId];
        uint256 count = 0;

        for (uint256 i = 0; i < MAX_SEQUENCER_COUNT; i++) {
            if (cluster.sequencerAddresses[i] != address(0)) {
                validSequencers[count] = cluster.sequencerAddresses[i];
                count++;
            }
        }
        return validSequencers;
    }

    function isRegistered(
        bytes32 clusterId,
        address sequencerAddress
    ) public view returns (bool) {
        return clusters[clusterId].isRegisteredSequencer[sequencerAddress];
    }

    function getClustersByOwner(
        address owner
    ) public view returns (bytes32[] memory) {
        return clusterByOwner[owner];
    }

    function getClustersBySequencer(
        address sequencer
    ) public view returns (bytes32[] memory) {
        return clusterBySequencer[sequencer];
    }

    function getAllClusterIds() public view returns (bytes32[] memory) {
        return allClusterIds;
    }
}
