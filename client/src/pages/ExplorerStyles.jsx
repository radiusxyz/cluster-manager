import styled from "styled-components";
import { Link } from "react-router-dom";
import { StyledButton } from "../components/Button";

export const PageContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin: 50px;
  max-width: 1700px;
  width: 100%;
  max-height: 840px;
`;

export const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 30px;
  margin-bottom: 10px;
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

export const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.p`
  font-size: 36px;
  font-weight: 600;
  line-height: 43.2px;
  letter-spacing: -0.02em;
  text-align: left;
`;

export const SubTitle = styled.p`
  font-size: 24px;
  font-weight: 600;
`;

export const BtnsContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-left: auto;
  margin-top: auto;
`;

export const TabsWrapper = styled.div`
  display: flex;
  gap: 25px;
  align-items: center;
`;

export const Tab = styled(Title)`
  color: ${(props) => (props.$active ? "#000000" : "#DDDDDD")};
  margin-bottom: 0;
  cursor: pointer;
`;
