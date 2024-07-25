import React from "react";
import { useConnect, useReadContract } from "wagmi";
import { config, contractAbi } from "../config.js";
import { contractAddress } from "../config.js";
import { useWriteContract } from "wagmi";
import { useAccount } from "wagmi";
import { injected } from "@wagmi/core";
import classes from "./Test.module.css";

const Test = () => {
  const { writeContract } = useWriteContract();
  const { connect } = useConnect();
  const { address } = useAccount(config);

  console.log(address);
  const initializeProposerSet = () => {
    const result = writeContract({
      abi: contractAbi,
      address: contractAddress,
      functionName: "initializeProposerSet",
      args: [],
      account: "0xFad9aD5f09F274d218F8Ff4CE2194A8a5e6EE938",
    });

    console.log(result);
  };

  function getSequencerList() {
    // const result = useReadContract({
    //   abi: contractAbi,
    //   address: contractAddress,
    //   functionName: "getSequencerList",
    //   args: ["0xFad9aD5f09F274d218F8Ff4CE2194A8a5e6EE938"],
    //   account: "0xFad9aD5f09F274d218F8Ff4CE2194A8a5e6EE938",
    // });
    // console.log(result);
  }

  return (
    <div
      styles={{
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
        }}
      >
        <button className={classes.btn}>initializeProposerSet</button>
        <button className={classes.btn}>registerSequencer</button>
        <button className={classes.btn}>deregisterSequencer</button>
        <button className={classes.btn}>getSequencerList</button>
      </div>
      <div
        style={{
          width: "100%",
          height: "100%",
          padding: "20px",
        }}
      ></div>
    </div>
  );
};

export default Test;
