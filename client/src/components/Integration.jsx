import React, { useEffect, useState } from "react";
import { useWriteContract, useAccount } from "wagmi";
import { hhContractAbi, hhContractAddress } from "../config.js";
import classes from "./TestContractFunctions.module.css";
import useGET from "../hooks/useGET.js";

const shorten = (ethAddr) => ethAddr.slice(0, 15) + "..." + ethAddr.slice(-12);

const Integration = () => {
  const [pollingInterval, setPollingInterval] = useState(3000);
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [queryAddress, setQueryAddress] = useState(address);
  const [proposerSetId, setProposerSetId] = useState("");
  const [proposerSets, setProposerSets] = useState([]);
  const [proposerSetsGenerated, setProposerSetsGenerated] = useState([]);
  const [proposerSetsJoined, setProposerSetsJoined] = useState([]);
  const [sequencers, setSequencers] = useState([]);

  const [shouldGetProposerSets, setShouldGetProposerSets] = useState(false);
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
  const {
    isPending: isPendingProposerSets,
    error: errorProposerSets,
    data: dataProposerSets,
    refetch: refetchProposerSets,
    isFetching: isFetchingProposerSets,
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

  useEffect(() => {
    if (dataProposerSets) {
      console.log("dataProposerSets: ", dataProposerSets);
      setProposerSets(dataProposerSets);
    }
    if (dataProposerSetsGenerated) {
      console.log("dataProposerSetsGenerated: ", dataProposerSetsGenerated);
      setProposerSetId(dataProposerSetsGenerated[0].proposerSetId);
      setProposerSetsGenerated(dataProposerSetsGenerated);
    }
    if (dataProposerSetsJoined) {
      console.log("dataProposerSetsJoined: ", dataProposerSetsJoined);
      setProposerSetsJoined(dataProposerSetsGenerated);
    }
    if (dataSequencers) {
      console.log("dataSequencers: ", dataSequencers);
      setSequencers(dataSequencers);
    }
    if (errorProposerSets) {
      console.log("errorProposerSets: ", errorProposerSets);
    }
    if (errorProposerSetsGenerated) {
      console.log("errorProposerSetsGenerated: ", errorProposerSetsGenerated);
    }
    if (errorProposerSetsJoined) {
      console.log("errorProposerSetsJoined: ", errorProposerSetsJoined);
    }
    if (errorSequencers) {
      console.log("errorSequencers: ", errorSequencers);
    }
  }, [
    dataProposerSets,
    dataProposerSetsGenerated,
    dataProposerSetsJoined,
    dataSequencers,
    errorProposerSets,
    errorProposerSetsGenerated,
    errorProposerSetsJoined,
    errorSequencers,
    isPendingProposerSets,
    isPendingProposerSetsGenerated,
    isPendingProposerSetsJoined,
    isPendingSequencers,
  ]);

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
          height: "60%",
          padding: "20px",
          background: "paleturquoise",
          gap: 100,
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <p>{"Proposer Sets"}</p>
        <div>
          {proposerSets?.map((item) => (
            <p
              key={item?.proposerSetId}
              style={{
                padding: "5px 15px",
                background: "lightgreen",
                marginBottom: "5px",
              }}
            >
              {shorten(item?.proposerSetId)}
            </p>
          ))}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "60%",
          padding: "20px",
          background: "aquamarine",
          gap: 100,
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <p>{"Generated Proposer Sets"}</p>
        <div>
          {proposerSetsGenerated?.map((item) => (
            <p
              key={item?.proposerSetId}
              style={{
                padding: "5px 15px",
                background: "paleturquoise",
                marginBottom: "5px",
              }}
            >
              {shorten(item?.proposerSetId)}
            </p>
          ))}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "60%",
          padding: "20px",
          background: "darkturquoise",
          gap: 100,
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <p>{"Joined Proposer Sets"}</p>
        <div>
          {proposerSetsJoined?.map((item) => (
            <p
              key={item?.proposerSetId}
              style={{
                padding: "5px 15px",
                background: "aquamarine",
                marginBottom: "5px",
              }}
            >
              {shorten(item?.proposerSetId)}
            </p>
          ))}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "60%",
          padding: "20px",
          background: "lightgreen",
          gap: 100,
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <p>{"Sequencers"}</p>

        <div style={{ overflowX: "scroll" }}>
          {sequencers?.map((item) => (
            <p
              key={item}
              style={{
                padding: "5px 15px",
                background: "darkturquoise",
                marginBottom: "5px",
              }}
            >
              {shorten(item)}
            </p>
          ))}
        </div>
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
          onClick={refetchProposerSets}
        >
          GET api/v1/proposer-sets
        </button>
        <button
          className={`${classes.btn} ${classes.btnGET}`}
          onClick={refetchProposerSetsGenerated}
        >
          GET api/v1/addresses/:walletAddress/proposer-sets/generated
        </button>
        <button className={classes.btn} onClick={registerSequencer}>
          registerSequencer
        </button>
        <button
          className={`${classes.btn} ${classes.btnGET}`}
          onClick={refetchProposerSetsJoined}
        >
          GET api/v1/addresses/:walletAddress/proposer-sets/joined
        </button>
        <button className={classes.btn} onClick={deregisterSequencer}>
          deregisterSequencer
        </button>
        <button
          className={`${classes.btn} ${classes.btnGET}`}
          onClick={refetchSequencers}
        >
          GET api/v1/proposer-sets/:proposerSetId/sequencers
        </button>
      </div>
    </div>
  );
};

export default Integration;
