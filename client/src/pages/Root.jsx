import React from "react";
import { Outlet } from "react-router";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import * as s from "./RootStyles";
import { StyledButton } from "../components/Button";

const Root = () => {
  const { address } = useAccount();

  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <s.LayoutContainer>
      <s.NavBarContainer>
        <s.NavBarLinksContainer>
          <s.NavBarLink to="dashboard">Dashboard</s.NavBarLink>
          <s.NavBarLink to="/">Explorer</s.NavBarLink>
        </s.NavBarLinksContainer>
        <s.StatsContainer>
          {/* Seem redundant */}
          {/* <s.Stat>Total #</s.Stat>
          <s.Stat>Total $</s.Stat> */}
          <s.Stat>
            {address ? (
              <>
                <s.Address>{address}</s.Address>{" "}
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
          </s.Stat>
        </s.StatsContainer>
      </s.NavBarContainer>
      <s.OutletContainer>
        <Outlet />
      </s.OutletContainer>
      <s.FooterLinksContainer>
        <s.FooterLink>Made by Gylman</s.FooterLink>
      </s.FooterLinksContainer>
    </s.LayoutContainer>
  );
};

export default Root;
