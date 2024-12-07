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
import { StyledButton } from "../components/Button";

const Root = () => {
  const { address, isConnected } = useAccount();

  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();

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
