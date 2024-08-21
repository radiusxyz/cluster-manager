import React from "react";
import styled from "styled-components";

const PageContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-top: 104px;
  max-width: 1192px;
  width: 100%;
  max-height: 840px;
`;

const Title = styled.p`
  font-family: var(--sds-typography-heading-font-family);
  font-size: 36px;
  font-weight: 600;
  line-height: 43.2px;
  letter-spacing: -0.02em;
  text-align: left;
  margin-bottom: 67px;
`;

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 30px;
`;

const SelectSearchWrapper = styled.div`
  display: flex;
  gap: 10px;
`;
const TypeSelectBox = styled.select`
  width: 100px;
`;
const SearchInput = styled.div``;
const Input = styled.input``;
const Filter = styled.div``;
const GenerateBtn = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: auto;
`;

const ExplorerPage = () => {
  return (
    <PageContainer>
      <Title>All Proposer Sets</Title>
      <ActionsContainer>
        <SelectSearchWrapper>
          <TypeSelectBox></TypeSelectBox>
          <SearchInput>
            <Input />
          </SearchInput>
        </SelectSearchWrapper>
        <Filter>Active</Filter>
        <Filter>Encrypted Mempool Enabled</Filter>
        <GenerateBtn>Generate Proposer Set</GenerateBtn>
      </ActionsContainer>
    </PageContainer>
  );
};

export default ExplorerPage;
