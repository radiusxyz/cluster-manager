import React from "react";
import * as s from "./ExplorerPageStyles";

const ExplorerPage = () => {
  return (
    <s.PageContainer>
      <s.Title>All Proposer Sets</s.Title>
      <s.ActionsContainer>
        <s.SelectSearchWrapper>
          <s.TypeSelectBox>
            <option value="All" selected>
              All
            </option>
            <option value="zkStack">zk Stack</option>
            <option value="polygonCdk">Polygon CDK</option>
            <option value="madara">Madara</option>
            <option value="arbitrumOrbit">Arbitrum Orbit</option>
          </s.TypeSelectBox>
          <s.SearchInput>
            <s.Input />
          </s.SearchInput>
        </s.SelectSearchWrapper>
        <s.Filter>Active</s.Filter>
        <s.Filter>Encrypted Mempool Enabled</s.Filter>
        <s.GenerateBtn>Generate Proposer Set</s.GenerateBtn>
      </s.ActionsContainer>
      <s.Table>
        <s.Headers>
          <s.Header>P.S. Status</s.Header>
          <s.Header>Rolup Name</s.Header>
          <s.Header>P.S. ID</s.Header>
          <s.Header>Rollup Type</s.Header>
          <s.Header>Quota</s.Header>
          <s.Header>Earn</s.Header>
          <s.Header>Encrypted Mempool</s.Header>
        </s.Headers>
        <s.Rows>
          <s.Row>
            <s.Cell>
              <s.CellTxt>Active/Inactive</s.CellTxt>
            </s.Cell>
            <s.Cell>
              <s.CellTxt>Number</s.CellTxt>
            </s.Cell>
            <s.Cell>
              <s.CellTxt>Address</s.CellTxt>
            </s.Cell>
            <s.Cell>
              <s.CellTxt>Rollup Type</s.CellTxt>
            </s.Cell>{" "}
            <s.Cell>
              <s.CellTxt>num/num</s.CellTxt>
            </s.Cell>
            <s.Cell>
              <s.CellTxt>Amount ETH</s.CellTxt>
            </s.Cell>
            <s.Cell>
              <s.CellTxt>Enabled/Disabled</s.CellTxt>
            </s.Cell>
          </s.Row>
        </s.Rows>
      </s.Table>
    </s.PageContainer>
  );
};

export default ExplorerPage;
