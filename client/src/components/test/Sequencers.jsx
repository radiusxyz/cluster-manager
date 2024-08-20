import React, { useContext, useEffect, useState } from "react";
import { PSMContext } from "../contexts/PSMContext";
import useGET from "../hooks/useGET";
import classes from "./TestContractFunctions.module.css";

const Sequencers = () => {
  const { pollingInterval, shorten, proposerSetId } = useContext(PSMContext);
  const [sequencers, setSequencers] = useState([]);
  const [shouldGetSequencers, setShouldGetSequencers] = useState(false);

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
    if (dataSequencers) {
      console.log("dataSequencers: ", dataSequencers);
      setSequencers(dataSequencers);
    }
  }, [dataSequencers]);
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
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
          onClick={refetchSequencers}
        >
          GET api/v1/proposer-sets/:proposerSetId/sequencers
        </button>
      </div>
    </div>
  );
};

export default Sequencers;