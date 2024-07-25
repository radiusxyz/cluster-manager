import React, { useState } from "react";
import { useReadContract, useWriteContract, useAccount } from "wagmi";
import { config, contractAbi } from "../config.js";
import { contractAddress } from "../config.js";
import classes from "./Test.module.css";

const Test = () => {
  const [output, setOutput] = useState("");
  const { address } = useAccount(config);
  const [shouldFetch, setShouldFetch] = useState(false);
  //   const { writeContract } = useWriteContract();

  //   const result = writeContract({
  //     abi: contractAbi,
  //     address: contractAddress,
  //     functionName: "initializeProposerSet",
  //     args: [],
  //     account: "0xFad9aD5f09F274d218F8Ff4CE2194A8a5e6EE938",
  //   });

  //   console.log(result);

  const { data, error, isLoading } = useReadContract({
    abi: contractAbi,
    address: contractAddress,
    functionName: "getSequencerList",
    args: ["0xFad9aD5f09F274d218F8Ff4CE2194A8a5e6EE938"],
    account: "0xFad9aD5f09F274d218F8Ff4CE2194A8a5e6EE938",
    query: { enabled: shouldFetch },
  });

  const connectWallet = () => {
    console.log("called connectWallet");
    setOutput(`called connectWallet: ${address}`);
  };

  const initializeProposerSet = () => {
    setShouldFetch(true);
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
    console.log("called getSequencerList");
    setOutput("called getSequencerList");
  };

  if (data) return <div>here is data </div>;
  if (error) return <div>here is error </div>;
  if (isLoading) return <div>here is loading </div>;

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
