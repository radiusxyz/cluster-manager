import React, { useEffect, useState } from "react";
import * as s from "./ClusterDetailsStyles";
import Copy from "../components/Copy";
import { useParams } from "react-router";
import { useGET } from "../hooks/useServer";
import Loader from "../components/Loader";

const ClusterDetails = () => {
  const { clusterId } = useParams();

  const [cluster, setCluster] = useState(null);
  const [shouldGetSequencers, setShouldGetSequencers] = useState(false);

  const {
    isPending: isPendingSequencers,
    error: errorSequencers,
    data: dataSequencers,
    refetch: refetchSequencers,
  } = useGET(
    ["cluster", clusterId],
    `http://localhost:3333/api/v1/clusters/${clusterId}`,
    true,
    3000
  );

  useEffect(() => {
    if (dataSequencers) {
      console.log("dataSequencers: ", dataSequencers);
      setCluster(dataSequencers);
    }
  }, [dataSequencers]);

  return (
    <s.PageContainer>
      <s.TitleJoinBtnContainer>
        <s.Title>Cluster details</s.Title>
        {/* TODO: Maybe add later, but currently, it is difficult to test, register deregister with it, because wallet is problematic */}
        {/* <s.JoinBtn>Join</s.JoinBtn> */}
      </s.TitleJoinBtnContainer>
      <s.Container>
        <s.SubTitle>Cluster Info</s.SubTitle>
        {(!cluster && <Loader />) || (
          <s.InfoItems>
            <s.InfoItem>
              <s.Property>Status</s.Property>
              <s.Value>{(cluster.active && "Active") || "Inactive"}</s.Value>
              <Copy />
            </s.InfoItem>
            <s.InfoItem>
              <s.Property>ID</s.Property>
              <s.Value>{cluster.clusterId}</s.Value> <Copy />
            </s.InfoItem>
            <s.InfoItem>
              <s.Property>Web-Socket URL</s.Property>
              <s.Value>
                {cluster.rollups[0].executors[0].websocketUrl
                  ? cluster.rollups[0].executors[0].websocketUrl
                  : "not added"}
              </s.Value>{" "}
              <Copy />
            </s.InfoItem>
            <s.InfoItem>
              <s.Property>RPC-URL</s.Property>
              <s.Value>
                {" "}
                {cluster.rollups[0].executors[0]
                  ? cluster.rollups[0].executors[0].rpcUrl
                  : "not added"}
              </s.Value>{" "}
              <Copy />
            </s.InfoItem>
            <s.InfoItem>
              <s.Property>Block Explorer URL</s.Property>
              <s.Value>
                {" "}
                {cluster.rollups[0].executors[0]
                  ? cluster.rollups[0].executors[0].blockExplorerUrl
                  : "not added"}
              </s.Value>{" "}
              <Copy />
            </s.InfoItem>
            <s.InfoItem>
              <s.Property>Quota</s.Property>
              <s.Value>
                {
                  cluster.sequencers.filter(
                    (sequencer) =>
                      sequencer !== "0x0000000000000000000000000000000000000000"
                  ).length
                }
                /{cluster.sequencers.length}
              </s.Value>{" "}
              <Copy />
            </s.InfoItem>
          </s.InfoItems>
        )}
      </s.Container>
      {cluster && (
        <s.Container>
          <s.SubTitle>Sequencers</s.SubTitle>
          <s.Table>
            <s.Headers>
              <s.Header>Address</s.Header>
            </s.Headers>
            <s.Rows>
              {cluster.sequencers
                .filter(
                  (sequencer) =>
                    sequencer !== "0x0000000000000000000000000000000000000000"
                )
                .map((sequencer, index) => (
                  <s.Row key={sequencer + index}>
                    <s.Cell>
                      <s.CellTxt>{sequencer}</s.CellTxt>
                    </s.Cell>
                  </s.Row>
                ))}
            </s.Rows>
          </s.Table>
        </s.Container>
      )}
    </s.PageContainer>
  );
};

export default ClusterDetails;
