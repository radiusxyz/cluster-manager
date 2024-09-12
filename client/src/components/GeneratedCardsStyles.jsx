import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "./Button";

export const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 26px;
  padding: 21px;
  overflow-y: scroll;
  border-radius: 8px;
  border: 1px solid lightgrey;
  cursor: pointer;
  align-items: flex-start;
`;

export const CardWrapperLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

export const Card = styled.div`
  width: 100%;
  border: 1px solid lightgrey;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
`;

export const NameIdEditWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const NameIdWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

export const Name = styled.span`
  font-size: 16px;
`;
export const Id = styled.span`
  font-weight: 600;
  font-size: 16px;
`;

export const EditBtn = styled(Button)``;

export const PropsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const PropWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

export const PropTitle = styled.span``;
export const PropValue = styled.span`
  font-weight: 600;
  font-size: 16px;
`;
