import styled from "styled-components";
import { StyledButton } from "../components/Button";

export const PageContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;
  max-width: 1192px;
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

export const Table = styled.div``;

export const Headers = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const Header = styled.div`
  font-family: Inter;
  font-size: 16px;
  font-weight: 600;
  line-height: 19.36px;
  flex: 1;
`;

export const Rows = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Row = styled.div`
  text-decoration: none;
  color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  cursor: pointer;
`;

export const Cell = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
`;

export const CellTxt = styled.span`
  font-family: Inter;
  font-size: 16px;
  font-weight: 400;
  line-height: 19.36px;
`;
