import React, { useEffect, useState } from "react";
import { useGET } from "../hooks/useServer";
import Loader from "../components/Loader";
import {
  Cell,
  CellTxt,
  Header,
  Headers,
  Row,
  Rows,
  Table,
} from "../pages/TableStyles";

const Generated = ({ address }) => {
  const [clustersGenerated, setClustersGenerated] = useState([]);
  const [shouldGetClustersGenerated, setShouldGetClustersGenerated] =
    useState(false);

  const {
    isPending: isPendingClustersGenerated,
    error: errorClustersGenerated,
    data: dataClustersGenerated,
    refetch: refetchClustersGenerated,
  } = useGET(
    ["clustersGenerated", address],
    `http://localhost:3333/api/v1/addresses/${address}/clusters/generated`,
    true,
    3000
  );

  useEffect(() => {
    if (dataClustersGenerated) {
      console.log("dataClusters: ", dataClustersGenerated);
      setClustersGenerated(dataClustersGenerated);
    }
  }, [dataClustersGenerated]);

  return (
    <Table>
      <Headers>
        <Header>Status</Header>
        <Header>Id</Header>
        <Header>Quota</Header>
      </Headers>

      <Rows>
        {isPendingClustersGenerated ? (
          <Loader />
        ) : (
          clustersGenerated.map((cluster) => (
            <Row to={`/${cluster.clusterId}/details`} key={cluster.clusterId}>
              <Cell>
                <CellTxt>{cluster.active ? "Active" : "Inactive"}</CellTxt>
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

export default Generated;
