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
} from "./OperatorDetailsStyles";

import { useLocation, useNavigate, useParams } from "react-router";
import { useGET } from "../hooks/useServer";
import Loader from "../components/Loader";
import useWrite from "../hooks/useContract";
import { useAccount } from "wagmi";
import RunModal from "../components/RunModal";
import AddRollupModal from "../components/AddRollupModal";
import { formatAddress } from "../utils/formatAddress";

const OperatorDetails = () => {
  const location = useLocation();
  const { operator } = location.state || {};

  useEffect(() => {
    if (operator) {
      console.log("operator: ", operator);
    }
  }, [operator]);

  return (
    <PageContainer>
      <Container>
        <SubTitle>Operator Info</SubTitle>
        {(!operator && <Loader />) || (
          <InfoItems>
            <InfoItem>
              <Property>Idle Address</Property>
              <Value>{operator.operatorAddress}</Value>
            </InfoItem>
            <InfoItem>
              <Property>Operating Address</Property>
              <Value>{operator.operatingAddress}</Value>
            </InfoItem>
            <InfoItem>
              <Property>Total Stake</Property>
              <Value>{String(operator.stake)}</Value>{" "}
            </InfoItem>
          </InfoItems>
        )}
      </Container>
      {operator && (
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
              {operator.stakes.map((stake, index) => (
                <Row key={stake.token}>
                  <Cell>
                    <CellTxt>{"None"}</CellTxt>
                  </Cell>
                  <Cell>
                    <CellTxt>{formatAddress(stake.token)}</CellTxt>
                  </Cell>
                  <Cell>
                    <CellTxt>{String(stake.stake)}</CellTxt>
                  </Cell>
                  <Cell>
                    <CellTxt>
                      {operator.stake
                        ? Math.floor(stake.stake / operator.stake) * 100
                        : String(stake.stake)}
                    </CellTxt>
                  </Cell>
                </Row>
              )) || <Message>No stakes added</Message>}
            </Rows>
          </Table>
        </Container>
      )}
    </PageContainer>
  );
};

export default OperatorDetails;
