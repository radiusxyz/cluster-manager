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
} from "./OperatorDetailsStyles";

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
import { useReadContract } from "wagmi";

const OperatorDetails = () => {
  const location = useLocation();

  const { operatorAddress, validationServiceManager } = location.state || {};

  const contractConfig = validationServiceManager
    ? {
        address: validationServiceManager,
        abi: validationServiceManagerAbi,
      }
    : null;

  const { data: currentEpoch } = useReadContract({
    ...contractConfig,
    enabled: !!contractConfig,
    functionName: "getCurrentEpoch",
  });

  const { data: operatingAddress } = useReadContract({
    ...contractConfig,
    enabled: !!contractConfig,
    functionName: "getCurrentOperatorOperatingAddress",
    args: [operatorAddress],
  });

  const { data: operatorStake } = useReadContract({
    ...contractConfig,
    enabled: !!contractConfig,
    functionName: "getCurrentOperatorStake",
    args: [operatorAddress],
  });

  const { data: operatorEachTokenStake } = useReadContract({
    ...contractConfig,
    enabled: !!contractConfig,
    functionName: "getCurrentOperatorEachTokenStake",
    args: [operatorAddress],
  });

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
              <Value>{operatingAddress}</Value>
            </InfoItem>
            <InfoItem>
              <Property>Total Stake</Property>
              <Value>{String(operatorStake)}</Value>{" "}
            </InfoItem>
            <InfoItem>
              <Property>Current Epoch</Property>
              <Value>{String(currentEpoch)}</Value>{" "}
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
            {operatorEachTokenStake?.map((tokenStake, index) => (
              <Row key={tokenStake.token}>
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
                      ? Math.floor(tokenStake.stake / operatorStake) * 100
                      : String(tokenStake.stake)}
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
