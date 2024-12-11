import React, { useEffect, useState } from "react";
import {
  PageContainer,
  BtnsContainer,
  Container,
  SubTitle,
  InfoItems,
  InfoItem,
  Property,
  Value,
  Title,
  Message,
  TitleRow,
  Infos,
  InfoContainer,
} from "./PageStyles";

import {
  Table,
  Headers,
  Header,
  Rows,
  Row,
  Cell,
  CellTxt,
} from "./TableStyles";

import { useNavigate, useParams } from "react-router";
import Loader from "../components/Loader";
import useWrite from "../hooks/useContract";
import { useAccount } from "wagmi";
import RunModal from "../components/RunModal";
import AddRollupModal from "../components/AddRollupModal";
import Button from "../components/Button";
import { formatAddress } from "../utils/formatAddress";
import { apiEndpoint } from "../config";
import { GET } from "../utils/api";
import { useQuery } from "@tanstack/react-query";

const ClusterDetails = () => {
  const { clusterId } = useParams();
  const { address, isConnected } = useAccount();
  const [cluster, setCluster] = useState(null);
  const [selectedRollupId, setSelectedRollupId] = useState(null);
  const [shouldGetSequencers, setShouldGetSequencers] = useState(false);
  const [showAddRollupModal, setShowAddRollupModal] = useState(false);
  const navigate = useNavigate();

  const toggleAddRollupModal = () => {
    setShowAddRollupModal(!showAddRollupModal);
  };

  const [showRunModal, setShowRunModal] = useState(false);
  const toggleRunModal = () => {
    setShowRunModal(!showRunModal);
  };

  const { write, hash, isHashPending } = useWrite();

  const {
    isPending,
    error,
    data,
    refetch: refetchSequencers,
  } = useQuery({
    queryKey: ["cluster", clusterId],
    queryFn: () => GET(`${apiEndpoint}/clusters/${clusterId}`),
    enabled: true,
    refetchInterval: 3000,
  });

  const handleJoinLeave = () => {
    if (cluster.sequencers.includes(address)) {
      write("deregisterSequencer", [clusterId]);
    } else {
      write("registerSequencer", [clusterId]);
    }
  };

  const handleRun = () => {
    toggleRunModal();
  };

  useEffect(() => {
    if (data) {
      console.log("cluster: ", data);
      setCluster(data);
    }
  }, [data]);

  return (
    <PageContainer>
      <Title>Cluster details</Title>
      <Infos>
        <InfoContainer>
          <SubTitle>Cluster Info</SubTitle>
          {(!cluster && <Loader />) || (
            <InfoItems>
              <InfoItem>
                <Property>Id</Property>
                <Value>{cluster.clusterId}</Value>
              </InfoItem>
              <InfoItem>
                <Property>Owner</Property>
                <Value>{formatAddress(cluster.owner)}</Value>
              </InfoItem>
              <InfoItem>
                <Property>Quota</Property>
                <Value>
                  {
                    cluster.sequencers.filter(
                      (sequencer) =>
                        sequencer !==
                        "0x0000000000000000000000000000000000000000"
                    ).length
                  }
                  /{cluster.sequencers.length}
                </Value>{" "}
              </InfoItem>
              <InfoItem>
                <Property>Status</Property>
                <Value>{(cluster.active && "Active") || "Inactive"}</Value>
              </InfoItem>
            </InfoItems>
          )}
          {cluster && (
            <Container>
              <TitleRow>
                <SubTitle>Sequencers</SubTitle>
                {address && cluster && cluster.sequencers.includes(address) ? (
                  <BtnsContainer>
                    <Button onClick={handleRun}>Run</Button>
                    <Button onClick={handleJoinLeave}>Leave</Button>
                  </BtnsContainer>
                ) : (
                  <BtnsContainer>
                    <Button disabled={!isConnected} onClick={handleJoinLeave}>
                      Join as sequencer
                    </Button>
                  </BtnsContainer>
                )}
              </TitleRow>
              <Table>
                <Headers>
                  <Header>Address</Header>
                </Headers>
                <Rows>
                  {cluster.sequencers
                    .filter(
                      (sequencer) =>
                        sequencer !==
                        "0x0000000000000000000000000000000000000000"
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
                  <Button onClick={toggleAddRollupModal}>Add rollup</Button>
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
                      <Row
                        to={`rollup/${rollup.rollupId}`}
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
                          <CellTxt>
                            {rollup.validationInfo.serviceProvider}
                          </CellTxt>
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
        </InfoContainer>
      </Infos>

      {showRunModal && <RunModal toggle={toggleRunModal} cluster={cluster} />}
      {showAddRollupModal && (
        <AddRollupModal toggle={toggleAddRollupModal} clusterId={clusterId} />
      )}
    </PageContainer>
  );
};

export default ClusterDetails;
