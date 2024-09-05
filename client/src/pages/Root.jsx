import React from "react";
import { Outlet } from "react-router";
import { useAccount } from "wagmi";
import * as s from "./RootStyles";

const Root = () => {
  const { address } = useAccount();

  return (
    <s.LayoutContainer>
      <s.NavBarContainer>
        <s.NavBarLinksContainer>
          <s.NavBarLink>Dashboard</s.NavBarLink>
          <s.NavBarLink>Explorer</s.NavBarLink>
        </s.NavBarLinksContainer>
        <s.StatsContainer>
          <s.Stat>Total #</s.Stat>
          <s.Stat>Total $</s.Stat>
          <s.Stat>{address ? address : "Not connected"}</s.Stat>
        </s.StatsContainer>
      </s.NavBarContainer>
      <s.OutletContainer>
        <Outlet />
      </s.OutletContainer>
      <s.FooterLinksContainer>
        <s.FooterLink>Docs</s.FooterLink>
        <s.FooterLink>Blog</s.FooterLink>
        <s.FooterLink>Report bug</s.FooterLink>
        <s.FooterLink>X</s.FooterLink>
        <s.FooterLink>Instagram</s.FooterLink>
        <s.FooterLink>YouTube</s.FooterLink>
        <s.FooterLink>LinkedIn</s.FooterLink>
      </s.FooterLinksContainer>
    </s.LayoutContainer>
  );
};

export default Root;
