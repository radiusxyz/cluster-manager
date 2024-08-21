import styled from "styled-components";

export const PageContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-top: 104px;
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
`;

export const SelectSearchWrapper = styled.div`
  display: flex;
  gap: 10px;
`;
export const TypeSelectBox = styled.select`
  width: 100px;
`;
export const SearchInput = styled.div``;
export const Input = styled.input``;
export const Filter = styled.div``;
export const GenerateBtn = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: auto;
`;
export const Table = styled.div``;

export const Headers = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
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
