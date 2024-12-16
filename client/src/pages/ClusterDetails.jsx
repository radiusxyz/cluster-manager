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
} from "../components/TableStyles";

import { useParams } from "react-router";
import Loader from "../components/Loader";
import { useAccount, useWriteContract } from "wagmi";
import RunModal from "../components/RunModal";
import AddRollupModal from "../components/AddRollupModal";
import Button from "../components/Button";
import { formatAddress } from "../utils/formatAddress";
import { apiEndpoint } from "../config";
import { GET } from "../utils/api";
import { useQuery } from "@tanstack/react-query";
import { livenessRadius, livenessRadiusAbi } from "../../../common";
import useAlert from "../hooks/useAlert";
import Alert from "../components/Alert";
import { areEqual } from "../utils/areEqual";

const ClusterDetails = () => {
  const { clusterId } = useParams();
  const { address, isConnected } = useAccount();

  const [state, setState] = useState({
    selectedRollupId: null,
    showAddRollupModal: false,
    showRunModal: false,
    sequencers: [],
    rollups: [],
  });

  const toggleModal = (key) => {
    setState((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const { writeContract, hash, isHashPending } = useWriteContract({
    mutation: {
      onSuccess: (data) =>
        handleAlert(true, "processing", `Transaction hash: ${data}`),
      onError: (error) => handleAlert(true, "error", error.message, 3000),
    },
  });

  const { showAlert, alertStatus, alertMessage, handleAlert } = useAlert();

  const {
    isPending: isClusterPending,
    error,
    data: fetchedCluster,
    refetch,
  } = useQuery({
    queryKey: ["cluster", clusterId],
    queryFn: () => GET(`${apiEndpoint}/clusters/${clusterId}`),
    enabled: true,
    refetchInterval: 3000,
  });

  const handleJoinLeave = () => {
    const functionName = fetchedCluster.sequencers.includes(address)
      ? "deregisterSequencer"
      : "registerSequencer";

    writeContract({
      abi: livenessRadiusAbi,
      address: livenessRadius,
      functionName,
      args: [clusterId],
      account: address,
    });
  };

  useEffect(() => {
    if (error) {
      handleAlert(true, "error", error.message, 3000);
      return;
    }
    if (isClusterPending) {
      handleAlert(true, "processing", "Fetching the cluster data...");
      return;
    }
    if (fetchedCluster) {
      const { sequencers, rollups } = fetchedCluster;

      if (!state.sequencers.length || areEqual(sequencers, state.sequencers)) {
        handleAlert(false);
      } else {
        handleAlert(
          true,
          "serverSuccess",
          "Sequencer list updated successfully",
          2000
        );
      }

      if (!state.rollups.length || areEqual(rollups, state.rollups)) {
        handleAlert(false);
      } else {
        handleAlert(
          true,
          "serverSuccess",
          "Rollup list updated successfully",
          2000
        );
      }
      setState((prev) => ({ ...prev, sequencers, rollups }));
    }
  }, [error, hash, fetchedCluster, isClusterPending]);

  return (
    <PageContainer>
      {showAlert && <Alert status={alertStatus} message={alertMessage} />}
      <Title>Cluster details</Title>
      <Infos>
        <InfoContainer>
          <SubTitle>Cluster Info</SubTitle>
          {!fetchedCluster ? (
            <Loader />
          ) : (
            <>
              <InfoItems>
                <InfoItem>
                  <Property>Id</Property>
                  <Value>{fetchedCluster.clusterId}</Value>
                </InfoItem>
                <InfoItem>
                  <Property>Owner</Property>
                  <Value>{formatAddress(fetchedCluster.owner)}</Value>
                </InfoItem>
                <InfoItem>
                  <Property>Quota</Property>
                  <Value>
                    {
                      fetchedCluster.sequencers.filter(
                        (sequencer) =>
                          sequencer !==
                          "0x0000000000000000000000000000000000000000"
                      ).length
                    }
                    /{fetchedCluster.sequencers.length}
                  </Value>
                </InfoItem>
                <InfoItem>
                  <Property>Status</Property>
                  <Value>
                    {(fetchedCluster.active && "Active") || "Inactive"}
                  </Value>
                </InfoItem>
              </InfoItems>

              <Container>
                <TitleRow>
                  <SubTitle>Sequencers</SubTitle>
                  {address && fetchedCluster.sequencers.includes(address) ? (
                    <BtnsContainer>
                      <Button onClick={() => toggleModal("showRunModal")}>
                        Run
                      </Button>
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
                    {fetchedCluster.sequencers
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

              <Container>
                <TitleRow>
                  <SubTitle>Rollups</SubTitle>
                  {fetchedCluster.owner === address && (
                    <Button onClick={() => toggleModal("showAddRollupModal")}>
                      Add rollup
                    </Button>
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
                    {(fetchedCluster.rollups.length &&
                      fetchedCluster.rollups.map((rollup, index) => (
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
            </>
          )}
        </InfoContainer>
      </Infos>

      {state.showRunModal && (
        <RunModal
          toggle={() => toggleModal("showRunModal")}
          cluster={fetchedCluster}
        />
      )}
      {state.showAddRollupModal && (
        <AddRollupModal
          toggle={() => toggleModal("showAddRollupModal")}
          clusterId={clusterId}
          handleAlert={handleAlert}
        />
      )}
    </PageContainer>
  );
};

export default ClusterDetails;
