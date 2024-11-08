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
  AddExecutorBtn,
  TitleRow,
} from "./RollupDetailsStyles";

import { useLocation, useParams } from "react-router";
import { useGET } from "../hooks/useServer";
import Loader from "../components/Loader";
import useWrite from "../hooks/useContract";
import { useAccount } from "wagmi";
import RunModal from "../components/RunModal";
import AddExecutorModal from "../components/AddExecutorModal";

const RollupDetails = () => {
  console.log("here");

  const { address, isConnected } = useAccount();
  const location = useLocation();
  const [rollup, setRollup] = useState(location.state?.rollup);

  const [selectedRollupId, setSelectedRollupId] = useState(null);
  const [showAddExecutorModal, setShowAddExecutorModal] = useState(false);
  const toggleAddExecutorModal = () => {
    setShowAddExecutorModal(!showAddExecutorModal);
  };

  return (
    <PageContainer>
      <TitleJoinBtnContainer>
        <Title>Rollup details</Title>
      </TitleJoinBtnContainer>
      <Container>
        <SubTitle>Rollup Info</SubTitle>
        {(!rollup && <Loader />) || (
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
        )}
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
      {showAddExecutorModal && (
        <AddExecutorModal toggle={toggleAddExecutorModal} rollup={rollup} />
      )}
    </PageContainer>
  );
};

export default RollupDetails;
