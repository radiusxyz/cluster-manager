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
  StyledNavLink,
  AddRollupBtn,
  TitleRow,
} from "./ClusterDetailsStyles";

import { useNavigate, useParams } from "react-router";
import { useGET } from "../hooks/useServer";
import Loader from "../components/Loader";
import useWrite from "../hooks/useContract";
import { useAccount } from "wagmi";
import RunModal from "../components/RunModal";
import { NavLink } from "react-router-dom";

const ClusterDetails = () => {
  const { clusterId } = useParams();
  const { address, isConnected } = useAccount();
  const [cluster, setCluster] = useState(null);
  const [selectedRollupId, setSelectedRollupId] = useState(null);
  const [shouldGetSequencers, setShouldGetSequencers] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

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

  const handleNavigateToRollup = (rollup) => {
    navigate(`rollup/${rollup.rollupId}`, { state: { rollup } });
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
            <JoinBtn disabled={!isConnected} onClick={handleJoinLeave}>
              Join as sequencer
            </JoinBtn>
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
          <TitleRow>
            <SubTitle>Rollups</SubTitle>
            {cluster.owner === address && (
              <AddRollupBtn>Add rollup</AddRollupBtn>
            )}
          </TitleRow>

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
                  // <StyledNavLink
                  //   key={rollup.rollupId}
                  //   to={`rollup/${rollup.rollupId}`}
                  // >
                  <Row
                    onClick={() => handleNavigateToRollup(rollup)}
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
                  // </StyledNavLink>
                ))) || <Message>No rollups added</Message>}
            </Rows>
          </Table>
        </Container>
      )}
      {showModal && <RunModal toggle={toggleModal} cluster={cluster} />}
    </PageContainer>
  );
};

export default ClusterDetails;
