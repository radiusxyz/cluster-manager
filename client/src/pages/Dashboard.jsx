import React, { useEffect, useState } from "react";
import * as s from "./DashboardStyles";
import Generated from "../components/Generated";
import Modal from "../components/Modal";
import Joined from "../components/Joined";
import { useAccount } from "wagmi";

const Dashboard = () => {
  const { address } = useAccount();

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
      {/* The part that goes here is actually implemented, check commit ff06edce8633e25b551c1d173fc4838205d73932 */}
      <s.TabsWrapper>
        <s.Tab $active={activeTab === "generated" ? 1 : 0} onClick={toggleTab}>
          Generated
        </s.Tab>
        <s.Tab $active={activeTab === "joined" ? 1 : 0} onClick={toggleTab}>
          Joined
        </s.Tab>
        {/* <s.ConnectWalletBtn>Connect Wallet</s.ConnectWalletBtn> */}
      </s.TabsWrapper>
      {activeTab === "joined" ? (
        <Joined address={address} />
      ) : (
        <Generated address={address} />
      )}
      {showModal && <Modal toggle={toggleModal} />}
    </s.PageContainer>
  );
};

export default Dashboard;
