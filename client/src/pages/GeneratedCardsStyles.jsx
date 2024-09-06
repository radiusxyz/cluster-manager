import { Link } from "react-router-dom";
import styled from "styled-components";

export const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 26px;
  padding: 21px;
  overflow-y: scroll;
  height: 450px;
  border-radius: 8px;
  border: 1px solid lightgrey;
  cursor: pointer;
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
  flex-direction: column;
`;

export const Name = styled.span``;
export const Id = styled.span``;

export const EditBtn = styled.button`
  padding: 10px 20px;
`;

export const PropsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const PropWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PropTitle = styled.span``;
export const PropValue = styled.span``;
