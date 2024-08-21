import React, { useState } from "react";
import * as s from "./DashboardPageStyles";
import { tableStyles as tS } from "./ExplorerPageStyles";

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState("joined");

  return (
    <s.PageContainer>
      <s.Title>Overview</s.Title>
      <s.CardsContainer>
        <s.Card>
          <s.CardTitle># of generated proposer sets</s.CardTitle>
          <s.CardNumericValue>4</s.CardNumericValue>
          <s.CardBtn>Generate</s.CardBtn>
        </s.Card>
        <s.Card>
          <s.CardTitle># of joined proposer sets</s.CardTitle>
          <s.CardNumericValue>4</s.CardNumericValue>
          <s.CardBtn>Generate</s.CardBtn>
        </s.Card>
        <s.Card>
          <s.CardTitle># of amount earned</s.CardTitle>
          <s.CardNumericValue>4</s.CardNumericValue>
        </s.Card>
      </s.CardsContainer>
      <s.TabsWrapper>
        <s.Tab $active={activeTab === "generated" ? 1 : 0}>
          Generated Proposer Sets
        </s.Tab>
        <s.Tab $active={activeTab === "joined" ? 1 : 0}>
          Joined Proposer Sets
        </s.Tab>
        <s.ConnectWalletBtn>Connect Wallet</s.ConnectWalletBtn>
      </s.TabsWrapper>
      <tS.Table>
        <tS.Headers>
          <tS.Header>Status</tS.Header>
          <tS.Header>Rollup Name</tS.Header>
          <tS.Header>Proposer Set Id</tS.Header>
          <tS.Header># of blocks</tS.Header>
          <tS.Header>Reward</tS.Header>
          <tS.Header>Rollup Type</tS.Header>
          <tS.Header>RPC Endpoint</tS.Header>
        </tS.Headers>
        <tS.Rows></tS.Rows>
      </tS.Table>
    </s.PageContainer>
  );
};

export default DashboardPage;
