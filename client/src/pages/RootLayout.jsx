import React from "react";
import { Outlet } from "react-router";
import Footer from "../components/Footer";
import { useAccount } from "wagmi";
import {
  LayoutContainer,
  Link,
  LinksContainer,
  NavBarContainer,
  OutletContainer,
  Stat,
  StatsContainer,
} from "./RootLayoutStyles";

const RootLayout = () => {
  const { address } = useAccount();

  return (
    <LayoutContainer>
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
      <OutletContainer>
        <Outlet />
      </OutletContainer>
      <Footer />
    </LayoutContainer>
  );
};

export default RootLayout;
