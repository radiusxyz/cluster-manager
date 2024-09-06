import React, { useState } from "react";
import * as s from "./DashboardStyles";
import { tableStyles as tS } from "./ExplorerStyles";
import GeneratedCards from "./GeneratedCards";
import Modal from "../components/Modal";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("generated");
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const toggleTab = (event) => {
    setActiveTab(event.target.innerText.toLowerCase());
  };
  return (
    <s.PageContainer>
      {/* These seem redundant */}
      {/*
      <s.Title>Overview</s.Title>
       <s.CardsContainer>
        <s.Card>
          <s.CardTitle># of generated clusters</s.CardTitle>
          <s.CardNumericValue>4</s.CardNumericValue>
          <s.CardBtn onClick={toggleModal}>Generate</s.CardBtn>
        </s.Card>
        <s.Card>
          <s.CardTitle># of joined clusters</s.CardTitle>
          <s.CardNumericValue>4</s.CardNumericValue>
          <s.CardBtn onClick={toggleModal}>Generate</s.CardBtn>
        </s.Card>
        <s.Card>
          <s.CardTitle># of amount earned</s.CardTitle>
          <s.CardNumericValue>4</s.CardNumericValue>
        </s.Card>
      </s.CardsContainer> */}
      <s.TabsWrapper>
        <s.Tab $active={activeTab === "generated" ? 1 : 0} onClick={toggleTab}>
          Generated
        </s.Tab>
        <s.Tab $active={activeTab === "joined" ? 1 : 0} onClick={toggleTab}>
          Joined
        </s.Tab>
        <s.ConnectWalletBtn>Connect Wallet</s.ConnectWalletBtn>
      </s.TabsWrapper>
      {activeTab === "joined" ? (
        <tS.Table>
          <tS.Headers>
            <tS.Header>Status</tS.Header>
            <tS.Header>Id</tS.Header>
            <tS.Header>RPC Endpoint</tS.Header>
          </tS.Headers>
          <tS.Rows></tS.Rows>
        </tS.Table>
      ) : (
        <GeneratedCards />
      )}
      {showModal && <Modal toggle={toggleModal} />}
    </s.PageContainer>
  );
};

export default Dashboard;
