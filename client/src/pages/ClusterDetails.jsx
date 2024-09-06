import React from "react";
import * as s from "./ClusterDetailsStyles";
import Copy from "../components/Copy";

const ClusterDetails = () => {
  return (
    <s.PageContainer>
      <s.TitleJoinBtnContainer>
        <s.Title>Cluster details</s.Title>
        <s.JoinBtn>Join</s.JoinBtn>
      </s.TitleJoinBtnContainer>
      <s.Container>
        <s.SubTitle>Cluster Info</s.SubTitle>
        <s.InfoItems>
          <s.InfoItem>
            <s.Property>Status</s.Property>
            <s.Value>blabla</s.Value>
            <Copy />
          </s.InfoItem>
          <s.InfoItem>
            <s.Property>ID</s.Property>
            <s.Value>blabla</s.Value> <Copy />
          </s.InfoItem>
          <s.InfoItem>
            <s.Property>Web-Socket URL</s.Property>
            <s.Value>blabla</s.Value> <Copy />
          </s.InfoItem>
          <s.InfoItem>
            <s.Property>RPC-URL</s.Property>
            <s.Value>blabla</s.Value> <Copy />
          </s.InfoItem>
          <s.InfoItem>
            <s.Property>Block Explorer URL</s.Property>
            <s.Value>blabla</s.Value> <Copy />
          </s.InfoItem>
          <s.InfoItem>
            <s.Property>QuotaL</s.Property>
            <s.Value>blabla</s.Value> <Copy />
          </s.InfoItem>
        </s.InfoItems>
      </s.Container>
      <s.Container>
        <s.SubTitle>Sequencers</s.SubTitle>
        <s.Table>
          <s.Headers>
            <s.Header>Status</s.Header>
            <s.Header>Address</s.Header>
          </s.Headers>
          <s.Rows>
            <s.Row to="/0/details">
              <s.Cell>
                <s.CellTxt>Active/Inactive</s.CellTxt>
              </s.Cell>
              <s.Cell>
                <s.CellTxt>Number</s.CellTxt>
              </s.Cell>
            </s.Row>
            <s.Row to="/1/details">
              <s.Cell>
                <s.CellTxt>Active/Inactive</s.CellTxt>
              </s.Cell>
              <s.Cell>
                <s.CellTxt>Number</s.CellTxt>
              </s.Cell>
            </s.Row>
            <s.Row to="/2/details">
              <s.Cell>
                <s.CellTxt>Active/Inactive</s.CellTxt>
              </s.Cell>
              <s.Cell>
                <s.CellTxt>Number</s.CellTxt>
              </s.Cell>
            </s.Row>
          </s.Rows>
        </s.Table>
      </s.Container>
    </s.PageContainer>
  );
};

export default ClusterDetails;
