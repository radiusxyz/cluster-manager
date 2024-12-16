import React, { useEffect, useState } from "react";
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
} from "../components/TableStyles";

import { useLocation } from "react-router";
import Loader from "../components/Loader";

import { formatAddress } from "../utils/formatAddress";
import { validationServiceManagerAbi } from "../../../common";
import { useBlockNumber, useReadContracts } from "wagmi";
import { radiusTestERC20Abi } from "../../../common";

const OperatorDetails = () => {
  const location = useLocation();
  const { operatorAddress, validationServiceManager } = location.state || {};

  const [tokenContracts, setTokenContracts] = useState([]);

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

  const { data: symbols } = useReadContracts({
    contracts: tokenContracts,
    enabled: tokenContracts.length > 0,
  });

  useEffect(() => {
    if (!operatorEachTokenStake) return;

    const contracts = operatorEachTokenStake.result.map((tokenStake) => ({
      address: tokenStake.token,
      abi: radiusTestERC20Abi,
      functionName: "symbol",
    }));

    setTokenContracts(contracts);
  }, [operatorEachTokenStake]);

  useEffect(() => {
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
            <Header>Symbol</Header>
            <Header>Address</Header>
            <Header>Amount</Header>
            <Header>Share (%)</Header>
          </Headers>

          <Rows>
            {operatorEachTokenStake?.result.map((tokenStake, index) => (
              <Row
                key={tokenStake.token}
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <Cell>
                  <CellTxt>{symbols?.[index]?.result || "Loading..."}</CellTxt>
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

// useEffect(() => {
//   if (!operatorEachTokenStake) return;
//   operatorEachTokenStake.result.forEach((tokenStake) => {
//     refetch({
//       contracts: [
//         {
//           address: tokenStake.token,
//           abi: radiusTestERC20Abi,
//           functionName: "symbol",
//         },
//       ],
//     });
//   }
// }, [operatorEachTokenStake]);
