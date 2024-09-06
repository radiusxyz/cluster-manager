import React, { useContext, useEffect, useState } from "react";
import useGET from "../hooks/useGET";
import classes from "./TestContractFunctions.module.css";

import { PSMContext } from "../contexts/PSMContext";

const Clusters = () => {
  const { pollingInterval, shorten } = useContext(PSMContext);
  const [clusters, setClusters] = useState([]);
  const [shouldGetClusters, setShouldGetClusters] = useState(false);

  const {
    isPending: isPendingClusters,
    error: errorClusters,
    data: dataClusters,
    refetch: refetchClusters,
    isFetching: isFetchingClusters,
  } = useGET(
    ["clusters"],
    "http://localhost:3333/api/v1/clusters",
    shouldGetClusters,
    pollingInterval
  );

  useEffect(() => {
    if (dataClusters) {
      console.log("dataClusters: ", dataClusters);
      setClusters(dataClusters);
    }
  }, [dataClusters]);
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
      <p>{"Clusters"}</p>
      <div>
        {clusters?.map((item) => (
          <p
            key={item?.clusterId}
            style={{
              padding: "5px 15px",
              background: "lightgreen",
              marginBottom: "5px",
            }}
          >
            {shorten(item?.clusterId)}
          </p>
        ))}
      </div>

      <div
        style={{
          bottom: "100px",
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <button
          className={`${classes.btn} ${classes.btnGET}`}
          onClick={refetchClusters}
        >
          GET api/v1/clusters
        </button>{" "}
        <button
          className={`${classes.btn} ${classes.btnPOST}`}
          onClick={refetchClusters}
        >
          POST api/v1/clusters/:clusterId
        </button>
      </div>
    </div>
  );
};

export default Clusters;
