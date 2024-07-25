import React, { useState } from "react";
import { useConnect, useReadContract } from "wagmi";
import { config, contractAbi } from "../config.js";
import { contractAddress } from "../config.js";
import { useWriteContract } from "wagmi";
import { useAccount } from "wagmi";
import { injected } from "@wagmi/core";
import classes from "./Test.module.css";

const Test = () => {
  const [output, setOutput] = useState("");

  const connectWallet = () => {
    console.log("called connectWallet");
    setOutput("called connectWallet");
  };

  const initializeProposerSet = () => {
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

  const { writeContract } = useWriteContract();
  const { connect } = useConnect();
  const { address } = useAccount(config);

  console.log(address);
  //   const initializeProposerSet = () => {
  //     const result = writeContract({
  //       abi: contractAbi,
  //       address: contractAddress,
  //       functionName: "initializeProposerSet",
  //       args: [],
  //       account: "0xFad9aD5f09F274d218F8Ff4CE2194A8a5e6EE938",
  //     });

  //     console.log(result);
  //   };

  //   function getSequencerList() {
  // const result = useReadContract({
  //   abi: contractAbi,
  //   address: contractAddress,
  //   functionName: "getSequencerList",
  //   args: ["0xFad9aD5f09F274d218F8Ff4CE2194A8a5e6EE938"],
  //   account: "0xFad9aD5f09F274d218F8Ff4CE2194A8a5e6EE938",
  // });
  // console.log(result);
  //   }

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "30px",
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
          Connect Wallet
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
