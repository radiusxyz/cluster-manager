import React, { useEffect, useState } from "react";
import {
  PageContainer,
  Infos,
  InfoContainer,
  Container,
  SubTitle,
  InfoItems,
  InfoItem,
  Property,
  Value,
  Title,
  Message,
  TitleRow,
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

import { useParams } from "react-router";
import Loader from "../components/Loader";
import { useAccount, useReadContract } from "wagmi";
import { useGET } from "../hooks/useServer";

import { validationServiceManagerAbi } from "../../../common";
import { formatAddress } from "../utils/formatAddress";
import VaultModal from "../components/VaultModal";

import RegisterExecutorModal from "../components/RegisterExecutorModal";
import UpdateExecutorDetailsModal from "../components/UpdateExecutorDetailsModal";
import Button from "../components/Button";

const RollupDetails = () => {
  const { clusterId, rollupId } = useParams();
  const { address, isConnected } = useAccount();
  const [validationServiceManager, setValidationServiceManager] =
    useState(null);

  const [showRegisterExecutorModal, setShowRegisterExecutorModal] =
    useState(false);

  const toggleRegisterExecutorModal = () => {
    setShowRegisterExecutorModal(!showRegisterExecutorModal);
  };

  const [selectedExecutor, setSelectedExecutor] = useState(null);

  const [showUpdateExecutorDetailsModal, setShowUpdateExecutorDetailsModal] =
    useState(false);
  const toggleUpdateExecutorDetailsModal = () => {
    setShowUpdateExecutorDetailsModal(!showUpdateExecutorDetailsModal);
  };

  const [selectedVault, setSelectedVault] = useState(null);
  const [showVaultModal, setShowVaultModal] = useState(false);
  const toggleVaultModal = () => {
    setShowVaultModal(!showVaultModal);
  };

  const { data: rollup } = useGET(
    ["rollup", rollupId],
    `http://localhost:3333/api/v1/clusters/${clusterId}/rollups/${rollupId}`,
    true,
    3000
  );

  const { data: cluster } = useGET(
    ["cluster", clusterId],
    `http://localhost:3333/api/v1/clusters/${clusterId}`,
    true,
    3000
  );

  console.log("rollup", rollup);

  useEffect(() => {
    if (!rollup) return;
    if (rollup?.validationInfo?.validationServiceManager) {
      setValidationServiceManager(
        rollup.validationInfo.validationServiceManager
      );
    }
  }, [rollup]);

  const contractConfig = validationServiceManager
    ? {
        address: validationServiceManager,
        abi: validationServiceManagerAbi,
      }
    : null;

  const { data: network } = useReadContract({
    ...contractConfig,
    enabled: !!contractConfig,
    functionName: "NETWORK",
  });

  const { data: operatorNetOptIn } = useReadContract({
    ...contractConfig,
    enabled: !!contractConfig,
    functionName: "OPERATOR_NET_OPT_IN",
  });

  const { data: vaultFactory } = useReadContract({
    ...contractConfig,
    enabled: !!contractConfig,
    functionName: "VAULT_FACTORY",
  });

  const { data: epochDuration } = useReadContract({
    ...contractConfig,
    enabled: !!contractConfig,
    functionName: "EPOCH_DURATION",
  });

  const { data: slashingWindow } = useReadContract({
    ...contractConfig,
    enabled: !!contractConfig,
    functionName: "SLASHING_WINDOW",
  });

  const { data: currentEpoch } = useReadContract({
    ...contractConfig,
    enabled: !!contractConfig,
    functionName: "getCurrentEpoch",
  });

  const { data: currentOperatorInfos } = useReadContract({
    ...contractConfig,
    enabled: !!contractConfig,
    functionName: "getCurrentOperatorInfos",
  });

  const { data: vaults } = useReadContract({
    ...contractConfig,
    enabled: !!contractConfig,
    functionName: "getCurrentVaults",
  });

  useEffect(() => {
    console.log("cluster", cluster);
  }, [cluster]);

  useEffect(() => {
    console.log("validationServiceManager", validationServiceManager);
    console.log("currentOperatorInfos", currentOperatorInfos);
    console.log("vaults", vaults);
    console.log("network", network);
    console.log("operatorNetOptIn", operatorNetOptIn);
    console.log("vaultFactory", vaultFactory);
    console.log("epochDuration", epochDuration);
    console.log("slashingWindow", slashingWindow);
  }, [
    currentOperatorInfos,
    vaults,
    network,
    operatorNetOptIn,
    vaultFactory,
    epochDuration,
    slashingWindow,
    validationServiceManager,
  ]);
  return (
    <PageContainer>
      <Title>Rollup details</Title>
      {!rollup ? (
        <Loader />
      ) : (
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
                  <Button
                    onClick={toggleRegisterExecutorModal}
                    disabled={!isConnected}
                  >
                    Register Executor
                  </Button>
                )}
              </TitleRow>
              <Table>
                <Headers>
                  <Header>Address</Header>
                </Headers>
                <Rows>
                  {rollup.executors.length ? (
                    rollup.executors.map((executor, index) => (
                      <Row
                        key={executor.address + index}
                        onClick={() => {
                          setSelectedExecutor(executor);
                          toggleUpdateExecutorDetailsModal();
                        }}
                      >
                        <Cell>
                          <CellTxt>{executor.address}</CellTxt>
                        </Cell>
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
              <InfoItem>
                <Property>Current Epoch</Property>
                <Value>{currentEpoch}</Value>
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
                  {vaults?.length ? (
                    vaults.map((vaultAddress, index) => (
                      <Row
                        key={vaultAddress + index}
                        onClick={() => {
                          setSelectedVault(vaultAddress);
                          toggleVaultModal();
                        }}
                      >
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
                  <Header>Operating Address</Header>
                  <Header>Combined Stake</Header>
                </Headers>
                <Rows>
                  {currentOperatorInfos?.length ? (
                    currentOperatorInfos.map((operator, index) => (
                      <Row
                        to={`operator/${operator.operatorAddress}`}
                        key={operator.operatorAddress + index}
                        state={{
                          operatorAddress: operator.operatorAddress,
                          validationServiceManager,
                        }}
                        $error={
                          !cluster.sequencers.includes(
                            operator.operatingAddress
                          )
                        }
                      >
                        <Cell>
                          <CellTxt>
                            {formatAddress(operator.operatingAddress)}
                          </CellTxt>
                        </Cell>
                        <Cell>
                          <CellTxt>{String(operator.stake)}</CellTxt>
                        </Cell>
                      </Row>
                    ))
                  ) : (
                    <Message>No operators found</Message>
                  )}
                </Rows>
              </Table>
            </Container>
          </InfoContainer>
        </Infos>
      )}
      {showRegisterExecutorModal && (
        <RegisterExecutorModal
          toggle={toggleRegisterExecutorModal}
          clusterId={clusterId}
          rollupId={rollup.rollupId}
        />
      )}
      {showUpdateExecutorDetailsModal && selectedExecutor && (
        <UpdateExecutorDetailsModal
          toggle={toggleUpdateExecutorDetailsModal}
          executor={selectedExecutor}
          clusterId={clusterId}
          rollupId={rollup.rollupId}
        />
      )}
      {showVaultModal && selectedVault && (
        <VaultModal toggle={toggleVaultModal} vault={selectedVault} />
      )}
    </PageContainer>
  );
};

export default RollupDetails;
