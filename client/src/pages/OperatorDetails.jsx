import React, { useEffect } from "react";
import {
  PageContainer,
  Container,
  SubTitle,
  InfoItems,
  InfoItem,
  Property,
  Value,
  Message,
  TitleRow,
  Title,
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

import { useLocation } from "react-router";
import Loader from "../components/Loader";

import { formatAddress } from "../utils/formatAddress";
import { validationServiceManagerAbi } from "../../../common";
import { useBlockNumber, useReadContracts } from "wagmi";

const OperatorDetails = () => {
  const location = useLocation();

  const { operatorAddress, validationServiceManager } = location.state || {};

  const contractConfig = validationServiceManager
    ? {
        address: validationServiceManager,
        abi: validationServiceManagerAbi,
      }
    : null;

  const { data, refetch } = useReadContracts({
    contracts: [
      {
        ...contractConfig,
        functionName: "getCurrentEpoch",
      },

      {
        ...contractConfig,
        functionName: "getCurrentOperatorOperatingAddress",
        args: [operatorAddress],
      },

      {
        ...contractConfig,
        functionName: "getCurrentOperatorStake",
        args: [operatorAddress],
      },

      {
        ...contractConfig,
        functionName: "getCurrentOperatorEachTokenStake",
        args: [operatorAddress],
      },
    ],
    enabled: !!contractConfig,
  });

  const { data: blockNumber } = useBlockNumber({ watch: true });

  const [
    currentEpoch,
    operatingAddress,
    operatorStake,
    operatorEachTokenStake,
  ] = data || [];

  useEffect(() => {
    // want to refetch every `n` block instead? use the modulo operator!
    // if (blockNumber % 5 === 0) refetch() // refetch every 5 blocks
    refetch();
  }, [blockNumber]);

  return (
    <PageContainer>
      <Title>Operator details</Title>
      <Container>
        <SubTitle>Operator Info</SubTitle>
        {((!currentEpoch || !currentEpoch) && <Loader />) || (
          <InfoItems>
            <InfoItem>
              <Property>Non-Operating Address</Property>
              <Value>{operatorAddress}</Value>
            </InfoItem>
            <InfoItem>
              <Property>Operating Address</Property>
              <Value>{operatingAddress?.result}</Value>
            </InfoItem>
            <InfoItem>
              <Property>Total Stake</Property>
              <Value>{String(operatorStake?.result)}</Value>{" "}
            </InfoItem>
            <InfoItem>
              <Property>Current Epoch</Property>
              <Value>{String(currentEpoch?.result)}</Value>{" "}
            </InfoItem>
          </InfoItems>
        )}
      </Container>

      <Container>
        <TitleRow>
          <SubTitle>Stakes</SubTitle>
        </TitleRow>
        <Table>
          <Headers>
            <Header> Symbol</Header>
            <Header> Address</Header>
            <Header> Amount</Header>
            <Header>Share (%)</Header>
          </Headers>

          <Rows>
            {operatorEachTokenStake?.result.map((tokenStake, index) => (
              <Row
                onClick={(e) => {
                  e.preventDefault(); // Prevent default behavior
                }}
                key={tokenStake.token}
              >
                <Cell>
                  <CellTxt>{"None"}</CellTxt>
                </Cell>
                <Cell>
                  <CellTxt>{formatAddress(tokenStake.token)}</CellTxt>
                </Cell>
                <Cell>
                  <CellTxt>{String(tokenStake.stake)}</CellTxt>
                </Cell>
                <Cell>
                  <CellTxt>
                    {tokenStake.stake > 0
                      ? Math.floor(
                          (Number(tokenStake.stake) /
                            Number(operatorStake?.result)) *
                            100
                        )
                      : 0}
                  </CellTxt>
                </Cell>
              </Row>
            )) || <Message>No stakes added</Message>}
          </Rows>
        </Table>
      </Container>
    </PageContainer>
  );
};

export default OperatorDetails;
