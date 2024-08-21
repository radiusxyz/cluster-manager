import React from "react";
import {
  ActionsContainer,
  CellTxt,
  Filter,
  GenerateBtn,
  Input,
  PageContainer,
  SearchInput,
  SelectSearchWrapper,
  Title,
  TypeSelectBox,
  Table,
  Header,
  Headers,
  Rows,
  Row,
  Cell,
} from "./ExplorerPageStyles";

const ExplorerPage = () => {
  return (
    <PageContainer>
      <Title>All Proposer Sets</Title>
      <ActionsContainer>
        <SelectSearchWrapper>
          <TypeSelectBox></TypeSelectBox>
          <SearchInput>
            <Input />
          </SearchInput>
        </SelectSearchWrapper>
        <Filter>Active</Filter>
        <Filter>Encrypted Mempool Enabled</Filter>
        <GenerateBtn>Generate Proposer Set</GenerateBtn>
      </ActionsContainer>
      <Table>
        <Headers>
          <Header>P.S. Status</Header>
          <Header>Rolup Name</Header>
          <Header>P.S. ID</Header>
          <Header>Rollup Type</Header>
          <Header>Quota</Header>
          <Header>Earn</Header>
          <Header>Encrypted Mempool</Header>
        </Headers>
        <Rows>
          <Row>
            <Cell>
              <CellTxt>Active/Inactive</CellTxt>
            </Cell>
            <Cell>
              <CellTxt>Number</CellTxt>
            </Cell>
            <Cell>
              <CellTxt>Address</CellTxt>
            </Cell>
            <Cell>
              <CellTxt>Rollup Type</CellTxt>
            </Cell>{" "}
            <Cell>
              <CellTxt>num/num</CellTxt>
            </Cell>
            <Cell>
              <CellTxt>Amount ETH</CellTxt>
            </Cell>
            <Cell>
              <CellTxt>Enabled/Disabled</CellTxt>
            </Cell>
          </Row>
        </Rows>
      </Table>
    </PageContainer>
  );
};

export default ExplorerPage;
