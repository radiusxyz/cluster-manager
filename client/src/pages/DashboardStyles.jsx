import styled from "styled-components";
import Button, { StyledButton } from "../components/Button";

export const PageContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;
  max-width: 1192px;
  width: 100%;
  max-height: 840px;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
`;

export const Title = styled.p`
  font-size: 36px;
  font-weight: 600;
  line-height: 43.2px;
  letter-spacing: -0.02em;
  text-align: left;
  margin-bottom: 10px;
`;

export const CardsContainer = styled.div`
  display: flex;
  gap: 24px;
  padding: 24px;
  align-items: center;

  border-radius: var(--sds-size-radius-200);
  border: var(--sds-size-stroke-border) solid #1e1e1e;
  opacity: var(--sds-size-stroke-border);
  background: var(--sds-color-background-default-default);

  margin-bottom: 10px;
`;

export const Card = styled.div`
  max-width: 325px;
  border-radius: 8px;
  border: 1px solid #1e1e1e;
  padding: 10px;
  opacity: var(--sds-size-stroke-border);
  background: var(--sds-color-background-default-default);
  height: 191px;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const CardTitle = styled.p`
  color: var(--sds-color-text-default-secondary);
  font-family: var(--sds-typography-body-font-family);
  font-size: var(--sds-typography-body-size-medium);
  font-style: normal;
  font-weight: var(--sds-typography-body-font-weight-regular);
  line-height: 140%; /* 22.4px */
  margin-bottom: 8px;
`;

export const CardNumericValue = styled.p`
  color: #1e1e1e;
  font-family: var(--sds-typography-heading-font-family);
  font-size: var(--sds-typography-heading-size-base);
  font-style: normal;
  font-weight: var(--sds-typography-heading-font-weight);
  line-height: 120%; /* 28.8px */
  letter-spacing: -0.48px;
  margin-bottom: 44px;
`;
export const CardBtn = styled(StyledButton)`
  align-self: flex-start;
  margin-top: auto;
`;

export const TabsWrapper = styled.div`
  display: flex;
  gap: 25px;
  align-items: center;
  margin-bottom: 67px;
`;

export const Tab = styled(Title)`
  color: ${(props) => (props.$active ? "#000000" : "#DDDDDD")};
  margin-bottom: 0;
  cursor: pointer;
`;

export const ConnectWalletBtn = styled(StyledButton)`
  margin-left: auto;
`;
