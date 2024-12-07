import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const NavBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 53px;
  padding: 0 13px;
  background: #f5f5f5;
`;

export const NavBarLinksContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;
`;

export const NavBarLink = styled(NavLink)`
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: #666;
  font-weight: 400;
  background-color: transparent;

  ${({ $disabled }) =>
    $disabled &&
    `
      pointer-events: none;
      opacity: 0.5;
      cursor: not-allowed;
    `};

  &.active {
    color: #000000;
    background-color: #f5f5f5;
    font-weight: 600;
  }
`;

export const Stat = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Address = styled.span`
  color: #000;
  font-weight: 600;
  margin-right: 10px;
`;

export const StatsContainer = styled(NavBarLinksContainer)``;

export const OutletContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
`;

export const FooterLinksContainer = styled.div`
  height: 53px;
  display: flex;
  gap: 30px;
  align-items: center;
  padding: 0 13px;
  background: #f5f5f5;
`;

export const FooterLink = styled.a`
  color: #000;
  font-style: normal;
  line-height: 140%; /* 22.4px */
`;
