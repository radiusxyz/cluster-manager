import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

const blinkAnimation = keyframes`
  0% { background-color: yellow; }
  100% { background-color: white; }
`;

export const Table = styled.div``;

export const Headers = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 0px 10px;
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
`;

export const Row = styled(Link)`
  text-decoration: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  cursor: pointer;
  padding: 5px 10px;
  background-color: white;
  transition: background-color 0.3s ease;

  &:nth-child(odd) {
    background-color: ${(props) => (props.$error ? "red" : "#f9f9f9")};
    color: ${(props) => (props.$error ? "white" : "black")};
  }

  &:nth-child(even) {
    background-color: ${(props) => (props.$error ? "red" : "#ffffff")};
    color: ${(props) => (props.$error ? "white" : "black")};
  }

  &:hover {
    background-color: #000;
    color: #fff;
  }

  animation: ${(props) =>
    props.isNew ? `${blinkAnimation} 2s ease-out` : "none"};
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
