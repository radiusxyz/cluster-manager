import React, { useContext, useEffect, useState } from "react";
import useGET from "../hooks/useGET";
import { PSMContext } from "../contexts/PSMContext";

const ProposerSets = () => {
  const { pollingInterval, shorten } = useContext(PSMContext);
  const [proposerSets, setProposerSets] = useState([]);
  const [shouldGetProposerSets, setShouldGetProposerSets] = useState(false);

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

  useEffect(() => {
    if (dataProposerSets) {
      console.log("dataProposerSets: ", dataProposerSets);
      setProposerSets(dataProposerSets);
    }
  }, [dataProposerSets]);
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
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

      <div style={{ display: "none", flexDirection: "column", gap: "10px" }}>
        <button
          className={`${classes.btn} ${classes.btnGET}`}
          onClick={refetchProposerSets}
        >
          GET api/v1/proposer-sets
        </button>{" "}
        <button
          className={`${classes.btn} ${classes.btnPOST}`}
          onClick={refetchProposerSets}
        >
          POST api/v1/proposer-sets/:proposerSetId
        </button>
      </div>
    </div>
  );
};

export default ProposerSets;
