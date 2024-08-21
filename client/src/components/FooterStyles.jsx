import styled from "styled-components";

export const LinksContainer = styled.div`
  height: 53px;
  display: flex;
  gap: 30px;
  align-items: center;
`;

export const Link = styled.a`
  color: #000;

  font-family: var(--sds-typography-body-font-family);
  font-size: var(--sds-typography-body-size-medium);
  font-style: normal;
  font-weight: var(--sds-typography-body-font-weight-strong);
  line-height: 140%; /* 22.4px */
`;
