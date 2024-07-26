import React, { useEffect, useState } from "react";
import { useReadContract, useWriteContract, useAccount } from "wagmi";
import { hhContractAbi, hhContractAddress } from "../config.js";
import classes from "./Test.module.css";
import { useWatchContractEvent } from "wagmi";

const Test = () => {
  const [output, setOutput] = useState("");
  const [proposerSetId, setProposerSetId] = useState(undefined);
  const { address } = useAccount();
  const { writeContract } = useWriteContract();

  // listening to the InitializeProposerSet event

  useWatchContractEvent({
    address: hhContractAddress,
    abi: hhContractAbi,
    eventName: "InitializeProposerSet",
    onLogs(logs) {
      console.log("New logs!", logs);
      setProposerSetId(logs[0].args.proposerSetId);
    },
  });

  // getting the sequencer list of a proposer set

  const [shouldRunGetSequencerList, setShouldRunGetSequencerList] =
    useState(false);
  const { data, error, isLoading } = useReadContract({
    abi: hhContractAbi,
    address: hhContractAddress,
    functionName: "getSequencerList",
    args: [proposerSetId],
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

  // initializing the proposer set
  const [shouldRunInitializeProposerSet, setShouldRunInitializeProposerSet] =
    useState(false);

  const initializeProposerSet = () => {
    setShouldRunInitializeProposerSet(true);
    console.log("called initializeProposerSet");
    setOutput("called initializeProposerSet");
  };

  useEffect(() => {
    if (shouldRunInitializeProposerSet) {
      console.log("inside useEffect for initializeProposerSet");
      writeContract({
        abi: hhContractAbi,
        address: hhContractAddress,
        functionName: "initializeProposerSet",
        args: [],
        account: address,
        query: { enabled: shouldRunInitializeProposerSet },
      });
      setShouldRunInitializeProposerSet(false);
    }
  }, [shouldRunInitializeProposerSet]);

  const connectWallet = () => {
    console.log("called connectWallet");
    setOutput(`called connectWallet: ${address}`);
  };

  // registering a sequencer to proposer set
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
        args: [proposerSetId, address],
        account: address,
        query: { enabled: shouldRunRegisterSequencer },
      });
      setShouldRunRegisterSequencer(false);
    }
  }, [shouldRunRegisterSequencer]);

  const deregisterSequencer = () => {
    console.log("called deregisterSequencer");
    setOutput("called deregisterSequencer");
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
