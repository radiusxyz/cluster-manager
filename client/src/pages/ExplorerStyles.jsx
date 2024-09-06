import styled from "styled-components";
import { Link } from "react-router-dom";
import { StyledButton } from "../components/Button";

export const PageContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;
  max-width: 1192px;
  width: 100%;
  max-height: 840px;
`;

export const Title = styled.p`
  font-family: var(--sds-typography-heading-font-family);
  font-size: 36px;
  font-weight: 600;
  line-height: 43.2px;
  letter-spacing: -0.02em;
  text-align: left;
  margin-bottom: 67px;
`;

export const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 30px;
  margin-bottom: 31px;
  border-bottom: 1px solid #e1e1e1;
  padding-bottom: 10px;
`;

export const SelectSearchWrapper = styled.div`
  display: flex;
  gap: 10px;
`;
export const TypeSelectBox = styled.select`
  width: 100px;
  height: 30px;
  border-radius: 5px;
  border: 1px solid #e1e1e1;
  padding: 5px;
`;
export const SearchInput = styled.div``;
export const Input = styled.input`
  height: 30px;
  border-radius: 5px;
  border: 1px solid #e1e1e1;
  padding: 5px;
`;
export const Filter = styled.div`
  cursor: pointer;
  color: ${(props) => (props.$active ? "#000000" : "#DDDDDD")};
  font-weight: ${(props) => (props.$active ? "600" : "400")};
  background-color: ${(props) => (props.$active ? "#F5F5F5" : "transparent")};
  padding: 5px 10px;
  border-radius: 5px;
`;
export const GenerateBtn = styled(StyledButton)`
  margin-left: auto;
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

export const Row = styled(Link)`
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

export const tableStyles = {
  Table,
  Headers,
  Header,
  Rows,
  Row,
  Cell,
  CellTxt,
};
