import React, { useEffect, useState } from "react";
import { useReadContract, useWriteContract, useAccount } from "wagmi";
import { hhContractAbi, hhContractAddress } from "../config.js";
import classes from "./TestContractFunctions.module.css";
import { useWatchContractEvent } from "wagmi";
import { useQuery } from "@tanstack/react-query";
import useGET from "../hooks/useGET.js";

const Integration = () => {
  const [pollingInterval, setPollingInterval] = useState(3000);
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [queryAddress, setQueryAddress] = useState(address);
  const [proposerSetId, setProposerSetId] = useState(undefined);
  const [output, setOutput] = useState("");

  const [shouldGetProposerSets, setShouldGetProposerSets] = useState(true);
  const [shouldGetProposerSetsGenerated, setShouldGetProposerSetsGenerated] =
    useState(false);
  const [shouldGetProposerSetsJoined, setShouldGetProposerSetsJoined] =
    useState(false);
  const [shouldGetSequencers, setShouldGetSequencers] = useState(false);
  const [shouldInitializeProposerSet, setShouldInitializeProposerSet] =
    useState(false);
  const [shouldRegisterSequencer, setShouldRegisterSequencer] = useState(false);
  const [shouldDeregisterSequencer, setShouldDeregisterSequencer] =
    useState(false);
  const {
    isPending: isPendingProposerSets,
    error: errorProposerSets,
    data: dataProposerSets,
    refetch: refetchProposerSets,
  } = useGET(
    ["proposerSets"],
    "http://localhost:3333/api/v1/proposer-sets",
    shouldGetProposerSets,
    pollingInterval
  );

  const {
    isPending: isPendingProposerSetsGenerated,
    error: errorProposerSetsGenerated,
    data: dataProposerSetsGenerated,
    refetch: refetchProposerSetsGenerated,
  } = useGET(
    ["proposerSetsGenerated", queryAddress],
    `http://localhost:3333/api/v1/addresses/${queryAddress}/proposer-sets/generated`,
    shouldGetProposerSetsGenerated,
    pollingInterval
  );

  const {
    isPending: isPendingProposerSetsJoined,
    error: errorProposerSetsJoined,
    data: dataProposerSetsJoined,
    refetch: refetchProposerSetsJoined,
  } = useGET(
    ["proposerSetsJoined", queryAddress],
    `http://localhost:3333/api/v1/addresses/${queryAddress}/proposer-sets/joined`,
    shouldGetProposerSetsJoined,
    pollingInterval
  );

  const {
    isPending: isPendingSequencers,
    error: errorSequencers,
    data: dataSequencers,
    refetch: refetchSequencers,
  } = useGET(
    ["sequencers", proposerSetId],
    `http://localhost:3333/api/v1/proposer-sets/${proposerSetId}/sequencers`,
    shouldGetSequencers,
    pollingInterval
  );

  const connectWallet = () => {
    console.log("Called connectWallet");
  };

  const handleWriteToContract = (functionName, args = [], enabled = false) => {
    writeContract({
      abi: hhContractAbi,
      address: hhContractAddress,
      functionName,
      args,
      account: address,
      query: { enabled },
    });
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
        <button
          className={`${classes.btn} ${classes.btnGET}`}
          onClick={() => {}}
        >
          GET api/v1/proposer-sets
        </button>
        <button
          className={`${classes.btn} ${classes.btnGET}`}
          onClick={() => {}}
        >
          GET api/v1/addresses/:walletAddress/proposer-sets/generated
        </button>
        <button className={classes.btn} onClick={registerSequencer}>
          registerSequencer
        </button>
        <button
          className={`${classes.btn} ${classes.btnGET}`}
          onClick={() => {}}
        >
          GET api/v1/addresses/:walletAddress/proposer-sets/joined
        </button>
        <button className={classes.btn} onClick={deregisterSequencer}>
          deregisterSequencer
        </button>
        <button
          className={`${classes.btn} ${classes.btnGET}`}
          onClick={() => {}}
        >
          GET api/v1/addresses/:walletAddress/proposer-sets/joined
        </button>
        <button
          className={`${classes.btn} ${classes.btnGET}`}
          onClick={() => {}}
        >
          GET api/v1/proposer-sets/:proposerSetId/sequencers
        </button>
      </div>
    </div>
  );
};

export default Integration;
