import React, { useEffect, useState } from "react";
import {
  PageContainer,
  TitleJoinBtnContainer,
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
  AddExecutorBtn,
  TitleRow,
} from "./RollupDetailsStyles";

import { useParams } from "react-router";
import Loader from "../components/Loader";
import { useAccount } from "wagmi";
import AddExecutorModal from "../components/AddExecutorModal";
import { useGET } from "../hooks/useServer";

const RollupDetails = () => {
  const { clusterId, rollupId } = useParams();
  const { address, isConnected } = useAccount();

  const [showAddExecutorModal, setShowAddExecutorModal] = useState(false);
  const toggleAddExecutorModal = () => {
    setShowAddExecutorModal(!showAddExecutorModal);
  };

  const {
    isPending,
    error,
    data: rollup,
    refetch,
  } = useGET(
    ["rollup", rollupId],
    `http://localhost:3333/api/v1/clusters/${clusterId}/rollups/${rollupId}`,
    true,
    3000
  );

  console.log("rollup", rollup);

  return (
    <PageContainer>
      <TitleJoinBtnContainer>
        <Title>Rollup details</Title>
      </TitleJoinBtnContainer>
      {!rollup ? (
        <Loader />
      ) : (
        <>
          <Container>
            <SubTitle>Rollup Info</SubTitle>
            <InfoItems>
              <InfoItem>
                <Property>Id</Property>
                <Value>{rollup.rollupId}</Value>
              </InfoItem>
              <InfoItem>
                <Property>Type</Property>
                <Value>{rollup.type}</Value>
              </InfoItem>
              <InfoItem>
                <Property>Encrypted Transaction Type</Property>
                <Value>{rollup.encryptedTransactionType}</Value>
              </InfoItem>
              <InfoItem>
                <Property>Platform</Property>
                <Value>{rollup.validationInfo.platform}</Value>
              </InfoItem>
              <InfoItem>
                <Property>Service Provider</Property>
                <Value>{rollup.validationInfo.serviceProvider}</Value>
              </InfoItem>
              <InfoItem>
                <Property>Order Commitment Type</Property>
                <Value>{rollup.orderCommitmentType}</Value>
              </InfoItem>
            </InfoItems>
          </Container>
          <Container>
            <SubTitle>Validation Service Info</SubTitle>
            <InfoItems>
              <InfoItem>
                <Property>Network</Property>
                <Value>{rollup.rollupId}</Value>
              </InfoItem>
              <InfoItem>
                <Property>Operator Registry</Property>
                <Value>{rollup.type}</Value>
              </InfoItem>
              <InfoItem>
                <Property>Operator Net Optin</Property>
                <Value>{rollup.encryptedTransactionType}</Value>
              </InfoItem>
              <InfoItem>
                <Property>Vault Registry</Property>
                <Value>{rollup.validationInfo.platform}</Value>
              </InfoItem>
              <InfoItem>
                <Property>Epoch Duration</Property>
                <Value>{rollup.validationInfo.serviceProvider}</Value>
              </InfoItem>
              <InfoItem>
                <Property>Slashing Window</Property>
                <Value>{rollup.orderCommitmentType}</Value>
              </InfoItem>
            </InfoItems>
          </Container>
          <Container>
            <TitleRow>
              <SubTitle>Executors</SubTitle>
              {rollup.owner === address && (
                <AddExecutorBtn
                  onClick={toggleAddExecutorModal}
                  disabled={!isConnected}
                >
                  Add executor
                </AddExecutorBtn>
              )}
            </TitleRow>
            <Table>
              <Headers>
                <Header>Address</Header>
                <Header>Block Explorer</Header>
                <Header>RPC</Header>
                <Header>WebSocket</Header>
              </Headers>
              <Rows>
                {rollup.executors.length ? (
                  rollup.executors.map((executor, index) => (
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
                  ))
                ) : (
                  <Message>No executors found</Message>
                )}
              </Rows>
            </Table>
          </Container>
        </>
      )}
      {showAddExecutorModal && (
        <AddExecutorModal
          toggle={toggleAddExecutorModal}
          clusterId={clusterId}
          rollupId={rollup.rollupId}
        />
      )}
    </PageContainer>
  );
};

export default RollupDetails;
