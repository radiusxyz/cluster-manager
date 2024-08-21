import styled from "styled-components";

export const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const NavBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const LinksContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;
`;

export const Link = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Stat = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StatsContainer = styled(LinksContainer)``;

export const OutletContainer = styled.div`
  flex: 1;
`;
