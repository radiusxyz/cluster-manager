import React, { useEffect, useState } from "react";
import { tableStyles as tS } from "../pages/ExplorerStyles";
import Loader from "./Loader";
import { useGET } from "../hooks/useServer";

const Joined = ({ address }) => {
  const [clustersJoined, setClustersJoined] = useState(null);
  const [shouldGetClustersJoined, setShouldGetClustersJoined] = useState(false);

  const {
    isPending: isPendingClustersJoined,
    error: errorClustersJoined,
    data: dataClustersJoined,
    refetch: refetchClustersJoined,
  } = useGET(
    ["clustersJoined", address],
    `http://localhost:3333/api/v1/addresses/${address}/clusters/joined`,
    true,
    300
  );

  useEffect(() => {
    if (dataClustersJoined) {
      console.log("dataClustersJoined: ", dataClustersJoined);
      setClustersJoined(dataClustersJoined);
    }
  }, [dataClustersJoined]);
  return (
    <tS.Table>
      <tS.Headers>
        <tS.Header>Status</tS.Header>
        <tS.Header>Id</tS.Header>
        <tS.Header>RPC Endpoint</tS.Header>
      </tS.Headers>
      <tS.Rows>
        {!clustersJoined ? (
          <Loader />
        ) : (
          clustersJoined.map((cluster) => (
            <tS.Row key={cluster.clusterId}>
              <tS.Cell>
                <tS.CellTxt>
                  {(cluster.active && "Active") || "Inactive"}
                </tS.CellTxt>
              </tS.Cell>
              <tS.Cell>
                <tS.CellTxt>{cluster.clusterId}</tS.CellTxt>
              </tS.Cell>
              <tS.Cell>
                <tS.CellTxt>
                  {cluster.rpcUrl ? cluster.rpcUrl : "Not added"}
                </tS.CellTxt>
              </tS.Cell>
            </tS.Row>
          ))
        )}
      </tS.Rows>
    </tS.Table>
  );
};

export default Joined;
