import { Outlet } from "react-router";
import NavBar from "../components/NavBar";
import styled from "styled-components";
import map from "../assets/images/map.svg";
import { useState } from "react";
import { useSDK } from "@metamask/sdk-react";
import { useAccount } from "../contexts/AccountContext";

const Background = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Body = styled.div`
  width: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
`;

const Title = styled.p`
  width: 250px;
  color: #fff;
  font-family: Dosis;
  font-size: 150px;
  font-style: normal;
  font-weight: 700;
`;

const SubTitle = styled.p`
  color: #fff;
  width: 300px;
  text-align: center;
  font-family: Crimson Pro;
  font-size: 32px;
  font-style: italic;
  font-weight: 500;
  line-height: normal;
`;

export const Button = styled.button`
  border-radius: 18px;
  border: 2px solid #fff;
  background: linear-gradient(269deg, #00add1 0%, rgba(76, 65, 209, 0.8) 100%);
  box-shadow: 8px 8px 8px 0px #fff inset,
    8px 8px 8px 0px rgba(205, 30, 143, 0.7);
  padding: 10px 20px;
  color: #fff;
  text-align: center;
  font-family: Dosis;
  font-size: 40px;
  font-style: normal;
  font-weight: 700;
  line-height: 50px;
  width: auto;
  &:hover {
    cursor: pointer;
    transform: scale(1.01);
  }
  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }
`;

const RootLayout = () => {
  const { account, connectWallet } = useAccount();
  return (
    <Background>
      <NavBar account={account} />
      {true ? (
        <Outlet />
      ) : (
        <Body>
          <Title>ECO SYNC</Title>
          <SubTitle>Sync your ecosystem with the world</SubTitle>
          <Button onClick={connectWallet}>Connect Wallet</Button>
        </Body>
      )}
    </Background>
  );
};

export default RootLayout;
