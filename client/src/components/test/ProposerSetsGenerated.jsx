import React, { useContext, useEffect, useState } from "react";
import { PSMContext } from "../contexts/PSMContext";
import classes from "./TestContractFunctions.module.css";
import useGET from "../hooks/useGET";

const urls = {
  rpcUrl: "gylman.eth",
  webSocketUrl: "gylman.eth",
  blockExplorerUrl: "gylman.eth",
};

const ClustersGenerated = () => {
  const { pollingInterval, shorten, address, handleClusterId, clusterId } =
    useContext(PSMContext);

  const [clustersGenerated, setClustersGenerated] = useState([]);
  const [shouldGetClustersGenerated, setShouldGetClustersGenerated] =
    useState(false);
  const [queryAddress, setQueryAddress] = useState(address);

  const {
    isPending: isPendingClustersGenerated,
    error: errorClustersGenerated,
    data: dataClustersGenerated,
    refetch: refetchClustersGenerated,
  } = useGET(
    ["clustersGenerated", queryAddress],
    `http://localhost:3333/api/v1/addresses/${queryAddress}/clusters/generated`,
    shouldGetClustersGenerated,
    pollingInterval
  );

  useEffect(() => {
    if (dataClustersGenerated) {
      console.log("dataClusters: ", dataClustersGenerated);
      handleClusterId(() => dataClustersGenerated[0]?.clusterId);
      setClustersGenerated(dataClustersGenerated);
    }
  }, [dataClustersGenerated]);
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        padding: "20px",
        background: "aquamarine",
        gap: 100,
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <p>{"Generated Clusters"}</p>
      <div>
        {clustersGenerated?.map((item) => (
          <p
            key={item?.clusterId}
            style={{
              padding: "5px 15px",
              background: "paleturquoise",
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
          onClick={refetchClustersGenerated}
        >
          GET api/v1/addresses/:walletAddress/clusters/generated
        </button>
      </div>
    </div>
  );
};

export default ClustersGenerated;
