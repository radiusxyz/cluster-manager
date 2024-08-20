import React, { useContext, useEffect, useState } from "react";
import useGET from "../hooks/useGET";
import classes from "./TestContractFunctions.module.css";
import { PSMContext } from "../contexts/PSMContext";

const ProposerSetsJoined = () => {
  const { pollingInterval, shorten, address } = useContext(PSMContext);
  const [proposerSetsJoined, setProposerSetsJoined] = useState([]);
  const [shouldGetProposerSetsJoined, setShouldGetProposerSetsJoined] =
    useState(false);
  const [queryAddress, setQueryAddress] = useState(address);

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

  useEffect(() => {
    if (dataProposerSetsJoined) {
      console.log("dataProposerSetsJoined: ", dataProposerSetsJoined);
      setProposerSetsJoined(dataProposerSetsJoined);
    }
  }, [dataProposerSetsJoined]);

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
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
      <div
        style={{
          display: "flex",
          bottom: "100px",
          position: "absolute",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <button
          className={`${classes.btn} ${classes.btnGET}`}
          onClick={refetchProposerSetsJoined}
        >
          GET api/v1/addresses/:walletAddress/proposer-sets/joined
        </button>
      </div>
    </div>
  );
};

export default ProposerSetsJoined;
