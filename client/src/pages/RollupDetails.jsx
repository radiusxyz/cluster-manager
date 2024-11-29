import React, { useEffect, useState } from "react";
import {
  PageContainer,
  TitleJoinBtnContainer,
  Infos,
  InfoContainer,
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
import { useAccount, useContractRead } from "wagmi";
import AddExecutorModal from "../components/AddExecutorModal";
import { useGET } from "../hooks/useServer";
import { formatString } from "../utils/formatStriing";
import { contractAbi } from "../../../common";

const RollupDetails = () => {
  const { clusterId, rollupId } = useParams();
  const { address, isConnected } = useAccount();
  comst[
    (validationServiceContractAddress, setValidationServiceContractAddress)
  ] = useState("");

  const [showAddExecutorModal, setShowAddExecutorModal] = useState(false);
  const toggleAddExecutorModal = () => {
    setShowAddExecutorModal(!showAddExecutorModal);
  };

  const { data: rollup } = useGET(
    ["rollup", rollupId],
    `http://localhost:3333/api/v1/clusters/${clusterId}/rollups/${rollupId}`,
    true,
    3000
  );

  const { data: cluster } = useGET(
    ["rollup", rollupId],
    `http://localhost:3333/api/v1/clusters/${clusterId}`,
    true,
    3000
  );

  console.log("rollup", rollup);

  useEffect(() => {
    if (!rollup) return;
    setValidationServiceContractAddress(
      rollup.validationInfo.validationServiceContractAddress
    );
  }, [rollup]);

  const contractConfig = {
    address: validationServiceContractAddress,
    abi: contractAbi,
  };

  const { data: network } = useContractRead({
    ...contractConfig,
    functionName: "NETWORK",
  });

  const { data: operatorNetOptIn } = useContractRead({
    ...contractConfig,
    functionName: "OPERATOR_NET_OPT_IN",
  });

  const { data: vaultFactory } = useContractRead({
    ...contractConfig,
    functionName: "VAULT_FACTORY",
  });

  const { data: epochDuration } = useContractRead({
    ...contractConfig,
    functionName: "EPOCH_DURATION",
  });

  const { data: slashingWindow } = useContractRead({
    ...contractConfig,
    functionName: "SLASHING_WINDOW",
  });

  const { data: currentOperatorInfos } = useContractRead({
    ...contractConfig,
    functionName: "getCurrentOperatorInfos",
  });

  const { data: vaults } = useContractRead({
    ...contractConfig,
    functionName: "getCurrentVaults",
  });

  return (
    <PageContainer>
      <TitleJoinBtnContainer>
        <Title>Rollup details</Title>
      </TitleJoinBtnContainer>
      {!rollup ? (
        <Loader />
      ) : (
        <>
          <Infos>
            <InfoContainer>
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
              </InfoItems>{" "}
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
                    {/* <Header>Block Explorer</Header>
                    <Header>RPC</Header>
                    <Header>WebSocket</Header> */}
                  </Headers>
                  <Rows>
                    {rollup.executors.length ? (
                      rollup.executors.map((executor, index) => (
                        <Row key={executor.address + index}>
                          <Cell>
                            <CellTxt>{executor.address}</CellTxt>
                          </Cell>
                          {/* <Cell>
                            <CellTxt>{executor.blockExplorerUrl}</CellTxt>
                          </Cell>
                          <Cell>
                            <CellTxt>{executor.rpcUrl}</CellTxt>
                          </Cell>
                          <Cell>
                            <CellTxt>{executor.websocketUrl}</CellTxt>
                          </Cell> */}
                        </Row>
                      ))
                    ) : (
                      <Message>No executors found</Message>
                    )}
                  </Rows>
                </Table>
              </Container>
            </InfoContainer>
            <InfoContainer>
              <SubTitle>Validation Service Info</SubTitle>
              <InfoItems>
                <InfoItem>
                  <Property>Network</Property>
                  <Value>{network}</Value>
                </InfoItem>
                <InfoItem>
                  <Property>Operator Net Optin</Property>
                  <Value>{operatorNetOptIn}</Value>
                </InfoItem>
                <InfoItem>
                  <Property>Vault Factory</Property>
                  <Value>{vaultFactory}</Value>
                </InfoItem>
                <InfoItem>
                  <Property>Epoch Duration</Property>
                  <Value>{epochDuration}</Value>
                </InfoItem>
                <InfoItem>
                  <Property>Slashing Window</Property>
                  <Value>{slashingWindow}</Value>
                </InfoItem>
              </InfoItems>
              <Container>
                <TitleRow>
                  <SubTitle>Vaults</SubTitle>
                </TitleRow>
                <Table>
                  <Headers>
                    <Header>Address</Header>
                  </Headers>
                  <Rows>
                    {vaults.length ? (
                      vaults.map((vaultAddress, index) => (
                        <Row key={vaultAddress + index}>
                          <Cell>
                            <CellTxt>{vaultAddress}</CellTxt>
                          </Cell>
                        </Row>
                      ))
                    ) : (
                      <Message>No vaults found</Message>
                    )}
                  </Rows>
                </Table>
              </Container>
              <Container>
                <TitleRow>
                  <SubTitle>Operators</SubTitle>
                </TitleRow>
                <Table>
                  <Headers>
                    <Header>Address</Header>
                    <Header>Stake</Header>
                  </Headers>
                  <Rows>
                    {currentOperatorInfos.length ? (
                      currentOperatorInfos.map((operator, index) => (
                        <Row
                          error={!cluster.sequencers.includes(operator.address)}
                          key={operator.address + index}
                        >
                          <Cell>
                            <CellTxt>{operator.address}</CellTxt>
                          </Cell>
                          <Cell>
                            <CellTxt>{operator.stake}</CellTxt>
                          </Cell>
                        </Row>
                      ))
                    ) : (
                      <Message>No operators found</Message>
                    )}
                  </Rows>
                </Table>
                <Table>
                  <Headers>
                    <Header>Address</Header>
                  </Headers>
                  <Rows>
                    {rollup.executors.length ? (
                      rollup.executors.map((executor, index) => (
                        <Row key={executor.address + index}>
                          <Cell>
                            <CellTxt>{executor.address}</CellTxt>
                          </Cell>
                        </Row>
                      ))
                    ) : (
                      <Message>No vaults found</Message>
                    )}
                  </Rows>
                </Table>
              </Container>
            </InfoContainer>
          </Infos>
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
