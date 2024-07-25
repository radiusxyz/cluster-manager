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
    args: ["0xFad9aD5f09F274d218F8Ff4CE2194A8a5e6EE938"],
    account: "0xFad9aD5f09F274d218F8Ff4CE2194A8a5e6EE938",
    query: { enabled: shouldRunGetSequencerList },
  });

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

  useEffect(() => {
    if (shouldRunInitializeProposerSet) {
      const resultOfInitializeProposerSet = writeContract({
        abi: contractAbi,
        address: contractAddress,
        functionName: "initializeProposerSet",
        args: [],
        account: "0xFad9aD5f09F274d218F8Ff4CE2194A8a5e6EE938",
        query: { enabled: shouldRunInitializeProposerSet },
      });

      console.log(
        "resultOfInitializeProposerSet: ",
        resultOfInitializeProposerSet
      );
    }
  }, [shouldRunInitializeProposerSet]);

  useWatchContractEvent({
    address: contractAddress,
    abi: contractAbi,
    eventName: "InitializeProposerSet",
    onLogs(logs) {
      console.log("New logs!", logs);
    },
  });

  const connectWallet = () => {
    console.log("called connectWallet");
    setOutput(`called connectWallet: ${address}`);
  };

  const initializeProposerSet = () => {
    setShouldRunInitializeProposerSet(true);
    console.log("called initializeProposerSet");
    setOutput("called initializeProposerSet");
  };

  const registerSequencer = () => {
    console.log("called registerSequencer");
    setOutput("called registerSequencer");
  };

  const deregisterSequencer = () => {
    console.log("called deregisterSequencer");
    setOutput("called deregisterSequencer");
  };

  const getSequencerList = () => {
    setShouldRunGetSequencerList(true);
    console.log("called getSequencerList");
    setOutput("called getSequencerList");
  };

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
