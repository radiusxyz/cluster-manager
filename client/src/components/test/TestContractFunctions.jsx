import React, { useEffect, useState } from "react";
import { useReadContract, useWriteContract, useAccount } from "wagmi";
import { hhContractAbi, hhContractAddress } from "../config.js";
import classes from "./TestContractFunctions.module.css";
import { useWatchContractEvent } from "wagmi";

const TestContractFunctions = () => {
  const [output, setOutput] = useState("");
  const [clusterId, setClusterId] = useState(undefined);
  const { address } = useAccount();
  const { writeContract } = useWriteContract();

  // listening to the InitializeCluster event

  useWatchContractEvent({
    address: hhContractAddress,
    abi: hhContractAbi,
    eventName: "InitializeCluster",
    onLogs(logs) {
      console.log("New logs!", logs);
      setClusterId(logs[0].args.clusterId);
    },
  });

  // getting the sequencer list of a cluster

  const [shouldRunGetSequencerList, setShouldRunGetSequencerList] =
    useState(false);
  const { data, error, isLoading } = useReadContract({
    abi: hhContractAbi,
    address: hhContractAddress,
    functionName: "getSequencerList",
    args: [clusterId],
    account: address,
    query: { enabled: shouldRunGetSequencerList },
  });

  const getSequencerList = () => {
    setShouldRunGetSequencerList(true);
    console.log("called getSequencerList");
    setOutput("called getSequencerList");
  };

  useEffect(() => {
    if (shouldRunGetSequencerList) {
      if (data) {
        console.log("data: ", data);
      }
      if (error) {
        console.log("error.message: ", error.message);
      }

      if (isLoading) {
        console.log("isLoading: ", isLoading);
      }
      setShouldRunGetSequencerList(false);
    }
  }, [shouldRunGetSequencerList, data, error, isLoading]);

  // initializing the cluster
  const [shouldRunInitializeCluster, setShouldRunInitializeCluster] =
    useState(false);

  const initializeCluster = () => {
    setShouldRunInitializeCluster(true);
    console.log("called initializeCluster");
    setOutput("called initializeCluster");
  };

  useEffect(() => {
    if (shouldRunInitializeCluster) {
      console.log("inside useEffect for initializeCluster");
      writeContract({
        abi: hhContractAbi,
        address: hhContractAddress,
        functionName: "initializeCluster",
        args: [],
        account: address,
        query: { enabled: shouldRunInitializeCluster },
      });
      setShouldRunInitializeCluster(false);
    }
  }, [shouldRunInitializeCluster]);

  const connectWallet = () => {
    console.log("called connectWallet");
    setOutput(`called connectWallet: ${address}`);
  };

  // registering a sequencer to cluster
  const [shouldRunRegisterSequencer, setShouldRunRegisterSequencer] =
    useState(false);

  const registerSequencer = () => {
    setShouldRunRegisterSequencer(true);
    console.log("called registerSequencer");
    setOutput("called registerSequencer");
  };

  useEffect(() => {
    if (shouldRunRegisterSequencer) {
      console.log("inside useEffect for shouldRunRegisterSequencer");
      writeContract({
        abi: hhContractAbi,
        address: hhContractAddress,
        functionName: "registerSequencer",
        args: [clusterId],
        account: address,
        query: { enabled: shouldRunRegisterSequencer },
      });
      setShouldRunRegisterSequencer(false);
    }
  }, [shouldRunRegisterSequencer]);

  // deregistering a sequencer from cluster
  const [shouldRunDeregisterSequencer, setShouldRunDeregisterSequencer] =
    useState(false);

  const deregisterSequencer = () => {
    setShouldRunDeregisterSequencer(true);
    console.log("called deregisterSequencer");
    setOutput("called deregisterSequencer");
  };

  useEffect(() => {
    if (shouldRunDeregisterSequencer) {
      console.log("inside useEffect for shouldRunDeregisterSequencer");
      writeContract({
        abi: hhContractAbi,
        address: hhContractAddress,
        functionName: "deregisterSequencer",
        args: [clusterId],
        account: address,
        query: { enabled: shouldRunDeregisterSequencer },
      });
      setShouldRunDeregisterSequencer(false);
    }
  }, [shouldRunDeregisterSequencer]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "30px",
        background: "lightblue",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
          flexDirection: "column",
          padding: "20px",
        }}
      >
        <button className={classes.btn} onClick={connectWallet}>
          {address ? address : "Connect Wallet"}
        </button>
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          padding: "20px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {output}
      </div>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
          flexDirection: "column",
          padding: "20px",
        }}
      >
        <button className={classes.btn} onClick={initializeCluster}>
          initializeCluster
        </button>
        <button className={classes.btn} onClick={registerSequencer}>
          registerSequencer
        </button>
        <button className={classes.btn} onClick={deregisterSequencer}>
          deregisterSequencer
        </button>
        <button className={classes.btn} onClick={getSequencerList}>
          getSequencerList
        </button>
      </div>
    </div>
  );
};

export default TestContractFunctions;
