import styled from "styled-components";
import { StyledButton } from "../components/Button";
import { NavLink } from "react-router-dom";

export const PageContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin: 50px;
  max-width: 1700px;
  width: 100%;
  max-height: 840px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const TitleJoinBtnContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

export const Title = styled.p`
  font-family: var(--sds-typography-heading-font-family);
  font-size: 36px;
  font-weight: 600;
  line-height: 43.2px;
  letter-spacing: -0.02em;
  text-align: left;
  margin-bottom: 10px;
`;

export const BtnsContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-left: auto;
  margin-top: auto;
`;

export const JoinBtn = styled(StyledButton)`
  align-self: flex-start;
`;

export const RunBtn = styled(StyledButton)``;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  border-radius: 5px;

  border: 1px solid #e1e1e1;
`;

export const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const AddRollupBtn = styled(StyledButton)`
  align-self: flex-end;
`;

export const SubTitle = styled.p`
  font-size: 24px;
  font-weight: 600;
`;

export const InfoItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const InfoItem = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
`;

export const Property = styled.p`
  font-size: 18px;
  flex: 1;
  color: #666;
`;

export const Value = styled.p`
  flex: 1;
  font-weight: 600;
`;

export const Message = styled.p`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 600;
  color: #777;
`;

export const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: black;
`;
