import React, { useContext, useEffect, useState } from "react";
import useGET from "../hooks/useServer";
import classes from "./TestContractFunctions.module.css";
import { ClusterContext } from "../contexts/ClusterContext";

const ClustersJoined = () => {
  const { pollingInterval, shorten, address } = useContext(ClusterContext);
  const [clustersJoined, setClustersJoined] = useState([]);
  const [shouldGetClustersJoined, setShouldGetClustersJoined] = useState(false);
  const [queryAddress, setQueryAddress] = useState(address);

  const {
    isPending: isPendingClustersJoined,
    error: errorClustersJoined,
    data: dataClustersJoined,
    refetch: refetchClustersJoined,
  } = useGET(
    ["clustersJoined", queryAddress],
    `http://localhost:3333/api/v1/addresses/${queryAddress}/clusters/joined`,
    shouldGetClustersJoined,
    pollingInterval
  );

  useEffect(() => {
    if (dataClustersJoined) {
      console.log("dataClustersJoined: ", dataClustersJoined);
      setClustersJoined(dataClustersJoined);
    }
  }, [dataClustersJoined]);

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
      <p>{"Joined Clusters"}</p>
      <div>
        {clustersJoined?.map((item) => (
          <p
            key={item?.clusterId}
            style={{
              padding: "5px 15px",
              background: "aquamarine",
              marginBottom: "5px",
            }}
          >
            {shorten(item?.clusterId)}
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
          onClick={refetchClustersJoined}
        >
          GET api/v1/addresses/:walletAddress/clusters/joined
        </button>
      </div>
    </div>
  );
};

export default ClustersJoined;
