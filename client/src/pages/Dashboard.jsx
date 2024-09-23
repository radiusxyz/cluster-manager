import React, { useEffect, useState } from "react";
import * as s from "./DashboardStyles";
import Generated from "../components/Generated";
import Modal from "../components/Modal";
import Joined from "../components/Joined";

const Dashboard = () => {
  const addresses = [
    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const nextIndex = (currentIndex + 1) % addresses.length;
  const nextAddress = addresses[nextIndex];
  const [activeTab, setActiveTab] = useState("generated");
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const toggleTab = (event) => {
    setActiveTab(event.target.innerText.toLowerCase());
  };

  const [queryAddress, setQueryAddress] = useState(addresses[0]);

  useEffect(() => {
    setQueryAddress(addresses[currentIndex]);
  }, [currentIndex]);

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
        <Joined address={queryAddress} />
      ) : (
        <Generated address={queryAddress} />
      )}
      {showModal && <Modal toggle={toggleModal} />}
      <button
        style={{
          alignSelf: "center",
          width: "600px",
          padding: "10px",
          marginTop: "20px",
          cursor: "pointer",
          borderRadius: "5px",
          backgroundColor: "lightblue",
          color: "black",
          fontWeight: "bold",
        }}
        onClick={() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % addresses.length);
        }}
      >
        Change address to: {nextAddress}
      </button>
    </s.PageContainer>
  );
};

export default Dashboard;
