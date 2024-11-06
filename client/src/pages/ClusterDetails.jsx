import React, { useEffect, useState } from "react";
import {
  PageContainer,
  TitleJoinBtnContainer,
  BtnsContainer,
  RunBtn,
  JoinBtn,
  Container,
  SubTitle,
  InfoItems,
  InfoItem,
  Property,
  Value,
  Table,
  Headers,
  Header,
  Rows,
  Row,
  Cell,
  CellTxt,
  Title,
} from "./ClusterDetailsStyles";
import Copy from "../components/Copy";
import { useParams } from "react-router";
import { useGET } from "../hooks/useServer";
import Loader from "../components/Loader";
import useWrite from "../hooks/useContract";
import { useAccount } from "wagmi";
import RunModal from "../components/RunModal";

const ClusterDetails = () => {
  const { clusterId } = useParams();
  const { address } = useAccount();
  const [cluster, setCluster] = useState(null);
  const [shouldGetSequencers, setShouldGetSequencers] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const { write, hash, isHashPending } = useWrite();

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

  const handleJoinLeave = () => {
    if (cluster.sequencers.includes(address)) {
      write("deregisterSequencer", [clusterId]);
    } else {
      write("registerSequencer", [clusterId]);
    }
  };

  const handleRun = () => {
    toggleModal();
  };

  useEffect(() => {
    if (dataSequencers) {
      console.log("dataSequencers: ", dataSequencers);
      setCluster(dataSequencers);
    }
  }, [dataSequencers]);

  return (
    <PageContainer>
      <TitleJoinBtnContainer>
        <Title>Cluster details</Title>
        {address && cluster && cluster.sequencers.includes(address) ? (
          <BtnsContainer>
            <RunBtn onClick={handleRun}>Run</RunBtn>
            <JoinBtn onClick={handleJoinLeave}>Leave</JoinBtn>
          </BtnsContainer>
        ) : (
          <BtnsContainer>
            <JoinBtn onClick={handleJoinLeave}>Join</JoinBtn>
          </BtnsContainer>
        )}
      </TitleJoinBtnContainer>
      <Container>
        <SubTitle>Cluster Info</SubTitle>
        {(!cluster && <Loader />) || (
          <InfoItems>
            <InfoItem>
              <Property>Status</Property>
              <Value>{(cluster.active && "Active") || "Inactive"}</Value>
              <Copy />
            </InfoItem>
            <InfoItem>
              <Property>ID</Property>
              <Value>{cluster.clusterId}</Value> <Copy />
            </InfoItem>
            <InfoItem>
              <Property>Web-Socket URL</Property>
              <Value>
                {cluster.rollups[0]?.executors[0].websocketUrl
                  ? cluster.rollups[0]?.executors[0].websocketUrl
                  : "not added"}
              </Value>{" "}
              <Copy />
            </InfoItem>
            <InfoItem>
              <Property>RPC-URL</Property>
              <Value>
                {cluster.rollups[0]?.executors[0]
                  ? cluster.rollups[0]?.executors[0].rpcUrl
                  : "not added"}
              </Value>{" "}
              <Copy />
            </InfoItem>
            <InfoItem>
              <Property>Block Explorer URL</Property>
              <Value>
                {cluster.rollups[0]?.executors[0]
                  ? cluster.rollups[0]?.executors[0].blockExplorerUrl
                  : "not added"}
              </Value>{" "}
              <Copy />
            </InfoItem>
            <InfoItem>
              <Property>Quota</Property>
              <Value>
                {
                  cluster.sequencers.filter(
                    (sequencer) =>
                      sequencer !== "0x0000000000000000000000000000000000000000"
                  ).length
                }
                /{cluster.sequencers.length}
              </Value>{" "}
              <Copy />
            </InfoItem>
          </InfoItems>
        )}
      </Container>
      {cluster && (
        <Container>
          <SubTitle>Sequencers</SubTitle>
          <Table>
            <Headers>
              <Header>Address</Header>
            </Headers>
            <Rows>
              {cluster.sequencers
                .filter(
                  (sequencer) =>
                    sequencer !== "0x0000000000000000000000000000000000000000"
                )
                .map((sequencer, index) => (
                  <Row key={sequencer + index}>
                    <Cell>
                      <CellTxt>{sequencer}</CellTxt>
                    </Cell>
                  </Row>
                ))}
            </Rows>
          </Table>
        </Container>
      )}
      {showModal && <RunModal toggle={toggleModal} cluster={cluster} />}
    </PageContainer>
  );
};

export default ClusterDetails;
