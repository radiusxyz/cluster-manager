import React from "react";
import { Outlet } from "react-router";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import {
  LayoutContainer,
  NavBarContainer,
  NavBarLinksContainer,
  NavBarLink,
  StatsContainer,
  Stat,
  Address,
  OutletContainer,
  FooterLinksContainer,
  FooterLink,
} from "./RootStyles";
import Button, { StyledButton } from "../components/Button";
import { apiEndpoint } from "../config";

const Root = () => {
  const { address, isConnected } = useAccount();

  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();

  const handleClearDb = async () => {
    try {
      await fetch(`${apiEndpoint}/clear`, {
        method: "GET",
      });
    } catch (error) {
      console.error("Error in handleClearDb:", error.message);
    }
  };

  return (
    <LayoutContainer>
      <NavBarContainer>
        <NavBarLinksContainer>
          <NavBarLink to="/">Explorer</NavBarLink>
        </NavBarLinksContainer>
        <StatsContainer>
          <Stat>
            {isConnected ? (
              <>
                <Address>{address}</Address>{" "}
                <StyledButton onClick={() => disconnect()}>
                  Disconnect Wallet
                </StyledButton>
                <div style={{ marginLeft: 10 }}>
                  <Button onClick={handleClearDb}>Clear DB</Button>
                </div>
              </>
            ) : (
              <StyledButton
                onClick={() => connect({ connector: connectors[0] })}
              >
                Connect Wallet
              </StyledButton>
            )}
          </Stat>
        </StatsContainer>
      </NavBarContainer>
      <OutletContainer>
        <Outlet />
      </OutletContainer>
      <FooterLinksContainer>
        <FooterLink>Made by Gylman</FooterLink>
      </FooterLinksContainer>
    </LayoutContainer>
  );
};

export default Root;
