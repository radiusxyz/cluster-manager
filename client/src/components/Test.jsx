import React, { useEffect, useState } from "react";
import { useReadContract, useWriteContract, useAccount } from "wagmi";
import { config, contractAbi } from "../config.js";
import { contractAddress } from "../config.js";
import classes from "./Test.module.css";
import { useWatchContractEvent } from "wagmi";

const Test = () => {
  const [output, setOutput] = useState("");
  const { address } = useAccount(config);

  // reading from the contract

  const [shouldRunGetSequencerList, setShouldRunGetSequencerList] =
    useState(false);
  const { data, error, isLoading } = useReadContract({
    abi: contractAbi,
    address: contractAddress,
    functionName: "getSequencerList",
    args: [address],
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
    }
  }, [shouldRunGetSequencerList, data, error, isLoading]);

  // writing to the contract
  const [shouldRunInitializeProposerSet, setShouldRunInitializeProposerSet] =
    useState(false);
  const { writeContract } = useWriteContract();

  const initializeProposerSet = () => {
    setShouldRunInitializeProposerSet(true);
    console.log("called initializeProposerSet");
    setOutput("called initializeProposerSet");
  };

  useEffect(() => {
    if (shouldRunInitializeProposerSet) {
      writeContract({
        abi: contractAbi,
        address: contractAddress,
        functionName: "initializeProposerSet",
        args: [],
        account: address,
        query: { enabled: shouldRunInitializeProposerSet },
      });
    }
  }, [shouldRunInitializeProposerSet]);

  const connectWallet = () => {
    console.log("called connectWallet");
    setOutput(`called connectWallet: ${address}`);
  };

  const registerSequencer = () => {
    console.log("called registerSequencer");
    setOutput("called registerSequencer");
  };

  const deregisterSequencer = () => {
    console.log("called deregisterSequencer");
    setOutput("called deregisterSequencer");
  };

  // listening to the InitializeProposerSet event

  useWatchContractEvent({
    address: contractAddress,
    abi: contractAbi,
    config: config,
    eventName: "InitializeProposerSet",
    onLogs(logs) {
      console.log("New logs!", logs);
    },
  });

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
        <button className={classes.btn} onClick={initializeProposerSet}>
          initializeProposerSet
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

export default Test;
