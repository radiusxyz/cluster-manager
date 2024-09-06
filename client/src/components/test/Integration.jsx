import React, { useContext, useEffect, useState } from "react";
import { useWriteContract, useAccount } from "wagmi";
import { hhContractAbi, hhContractAddress } from "../config.js";
import classes from "./TestContractFunctions.module.css";
import useGET from "../hooks/useGET.js";
import { PSMContext } from "../contexts/PSMContext.jsx";
import Clusters from "./Clusters.jsx";
import ClustersGenerated from "./ClustersGenerated.jsx";
import ClustersJoined from "./ClustersJoined.jsx";
import Sequencers from "./Sequencers.jsx";

const Integration = () => {
  const { shorten, address, clusterId, handleWriteToContract } =
    useContext(PSMContext);
  const [shouldInitializeCluster, setShouldInitializeCluster] = useState(false);
  const [shouldRegisterSequencer, setShouldRegisterSequencer] = useState(false);
  const [shouldDeregisterSequencer, setShouldDeregisterSequencer] =
    useState(false);
  console.log("this is clusterId", clusterId);

  const connectWallet = () => {
    console.log("Called connectWallet");
  };

  // initializing the cluster

  const initializeCluster = () => {
    handleWriteToContract("initializeCluster", [], shouldInitializeCluster);
  };

  // registering a sequencer to cluster

  const registerSequencer = () => {
    handleWriteToContract(
      "registerSequencer",
      [clusterId],
      shouldRegisterSequencer
    );
  };

  // deregistering a sequencer from cluster

  const deregisterSequencer = () => {
    handleWriteToContract(
      "deregisterSequencer",
      [clusterId],
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
        <Clusters />
        <ClustersGenerated />
        <ClustersJoined />
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
          <button className={classes.btn} onClick={initializeCluster}>
            initializeCluster
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
