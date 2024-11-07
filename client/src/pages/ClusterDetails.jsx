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
  Message,
} from "./ClusterDetailsStyles";

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
  const [selectedRollupId, setSelectedRollupId] = useState(null);
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

  const handleSelectRollup = (rollupId) => {
    setSelectedRollupId(rollupId);
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
            </InfoItem>
            <InfoItem>
              <Property>Id</Property>
              <Value>{cluster.clusterId}</Value>
            </InfoItem>
            {/* <InfoItem>
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
            </InfoItem> */}
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
      {cluster && (
        <Container>
          <SubTitle>Rollups</SubTitle>
          <Table>
            <Headers>
              <Header>Id</Header>
              <Header>Type</Header>
              <Header>Encrypted Tx. Type</Header>
              <Header>Platform</Header>
              <Header>Service Provider</Header>
              <Header>Order Commitment Type</Header>
            </Headers>

            <Rows>
              {(cluster.rollups.length &&
                cluster.rollups.map((rollup, index) => (
                  <Row
                    onClick={() => handleSelectRollup(rollup.rollupId)}
                    key={rollup.rollupId + index}
                  >
                    <Cell>
                      <CellTxt>{rollup.rollupId}</CellTxt>
                    </Cell>
                    <Cell>
                      <CellTxt>{rollup.type}</CellTxt>
                    </Cell>
                    <Cell>
                      <CellTxt>{rollup.encryptedTransactionType}</CellTxt>
                    </Cell>
                    <Cell>
                      <CellTxt>{rollup.validationInfo.platform}</CellTxt>
                    </Cell>
                    <Cell>
                      <CellTxt>{rollup.validationInfo.serviceProvider}</CellTxt>
                    </Cell>
                    <Cell>
                      <CellTxt>{rollup.orderCommitmentType}</CellTxt>
                    </Cell>
                  </Row>
                ))) || <Message>No rollups added</Message>}
            </Rows>
          </Table>
        </Container>
      )}
      {cluster && (
        <Container>
          <SubTitle>Executors</SubTitle>
          <Table>
            <Headers>
              <Header>Address</Header>
              <Header>Block Explorer</Header>
              <Header>RPC</Header>
              <Header>WebSocket</Header>
            </Headers>
            <Rows>
              {selectedRollupId &&
                cluster.rollups
                  .find((rollup) => rollup.rollupId === selectedRollupId)
                  ?.executors.map((executor, index) => (
                    <Row key={executor.address + index}>
                      <Cell>
                        <CellTxt>{executor.address}</CellTxt>
                      </Cell>
                      <Cell>
                        <CellTxt>{executor.blockExplorerUrl}</CellTxt>
                      </Cell>
                      <Cell>
                        <CellTxt>{executor.rpcUrl}</CellTxt>
                      </Cell>
                      <Cell>
                        <CellTxt>{executor.websocketUrl}</CellTxt>
                      </Cell>
                    </Row>
                  ))}
              {!selectedRollupId && cluster.rollups.length !== 0 && (
                <Message>Click on a rollup to display its executors</Message>
              )}
              {cluster.rollups.length === 0 && (
                <Message>Not Applicable</Message>
              )}
            </Rows>
          </Table>
        </Container>
      )}
      {showModal && <RunModal toggle={toggleModal} cluster={cluster} />}
    </PageContainer>
  );
};

export default ClusterDetails;
