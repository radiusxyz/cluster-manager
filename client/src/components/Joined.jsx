import React, { useEffect, useState } from "react";

import Loader from "./Loader";
import { useGET } from "../hooks/useServer";
import {
  Cell,
  CellTxt,
  Header,
  Headers,
  Row,
  Rows,
  Table,
} from "../pages/TableStyles";

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
    <Table>
      <Headers>
        <Header>Status</Header>
        <Header>Id</Header>
        <Header>Quota</Header>
      </Headers>
      <Rows>
        {!clustersJoined ? (
          <Loader />
        ) : (
          clustersJoined.map((cluster) => (
            <Row to={`/${cluster.clusterId}/details`} key={cluster.clusterId}>
              <Cell>
                <CellTxt>{(cluster.active && "Active") || "Inactive"}</CellTxt>
              </Cell>
              <Cell>
                <CellTxt>{cluster.clusterId}</CellTxt>
              </Cell>
              <Cell>
                <CellTxt>
                  {
                    cluster.sequencers.filter(
                      (sequencer) =>
                        sequencer !==
                        "0x0000000000000000000000000000000000000000"
                    ).length
                  }
                  /{cluster.sequencers.length}
                </CellTxt>
              </Cell>
            </Row>
          ))
        )}
      </Rows>
    </Table>
  );
};

export default Joined;
