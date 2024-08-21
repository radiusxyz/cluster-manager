import React from "react";
import { Outlet } from "react-router";
import styled from "styled-components";
import Footer from "../components/Footer";
import { useAccount } from "wagmi";

const NavBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LinksContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;
`;

const Link = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Stat = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StatsContainer = styled(LinksContainer)``;

const RootLayout = () => {
  const { address } = useAccount();

  return (
    <>
      <NavBarContainer>
        <LinksContainer>
          <Link>Dashboard</Link>
          <Link>Explorer</Link>
        </LinksContainer>
        <StatsContainer>
          <Stat>Total #</Stat>
          <Stat>Total $</Stat>
          <Stat>{address ? address : "Not connected"}</Stat>
        </StatsContainer>
      </NavBarContainer>
      <Outlet />
      <Footer />
    </>
  );
};

export default RootLayout;
