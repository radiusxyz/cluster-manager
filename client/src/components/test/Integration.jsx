import React, { useContext, useEffect, useState } from "react";
import { useWriteContract, useAccount } from "wagmi";
import { hhContractAbi, hhContractAddress } from "../config.js";
import classes from "./TestContractFunctions.module.css";
import useGET from "../hooks/useGET.js";
import { PSMContext } from "../contexts/PSMContext.jsx";
import ProposerSets from "./ProposerSets.jsx";
import ProposerSetsGenerated from "./ProposerSetsGenerated.jsx";
import ProposerSetsJoined from "./ProposerSetsJoined.jsx";
import Sequencers from "./Sequencers.jsx";

const Integration = () => {
  const { shorten, address, proposerSetId, handleWriteToContract } =
    useContext(PSMContext);
  const [shouldInitializeProposerSet, setShouldInitializeProposerSet] =
    useState(false);
  const [shouldRegisterSequencer, setShouldRegisterSequencer] = useState(false);
  const [shouldDeregisterSequencer, setShouldDeregisterSequencer] =
    useState(false);
  console.log("this is proposerSetId", proposerSetId);

  const connectWallet = () => {
    console.log("Called connectWallet");
  };

  // initializing the proposer set

  const initializeProposerSet = () => {
    handleWriteToContract(
      "initializeProposerSet",
      [],
      shouldInitializeProposerSet
    );
  };

  // registering a sequencer to proposer set

  const registerSequencer = () => {
    handleWriteToContract(
      "registerSequencer",
      [proposerSetId],
      shouldRegisterSequencer
    );
  };

  // deregistering a sequencer from proposer set

  const deregisterSequencer = () => {
    handleWriteToContract(
      "deregisterSequencer",
      [proposerSetId],
      shouldDeregisterSequencer
    );
  };

  return (
    <div className={classes.main}>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
          flexDirection: "column",
          padding: "20px",
        }}
      >
        <button className={classes.btn} onClick={connectWallet}>
          {address ? shorten(address) : "Connect Wallet"}
        </button>
      </div>

      <div className={classes.data}>
        <ProposerSets />
        <ProposerSetsGenerated />
        <ProposerSetsJoined />
        <Sequencers />
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "100px",
          padding: "20px",
        }}
      >
        <div style={{ display: "flex", gap: "10px" }}>
          <button className={classes.btn} onClick={initializeProposerSet}>
            initializeProposerSet
          </button>
          <button className={classes.btn} onClick={registerSequencer}>
            registerSequencer
          </button>
          <button className={classes.btn} onClick={deregisterSequencer}>
            deregisterSequencer
          </button>
        </div>
      </div>
    </div>
  );
};

export default Integration;
