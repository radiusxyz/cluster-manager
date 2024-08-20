import React, { useState } from "react";
import styled from "styled-components";

import cuid from "cuid";
import { useClusters } from "../contexts/PSMContext";
import { Link } from "react-router-dom";
import Copy from "./Copy";

const PlaceHolder = styled.p`
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 16px;
  letter-spacing: 0.44px;
  text-transform: uppercase;
  color: #5a9bb0;
`;

const Head = styled.div`
  position: sticky;
  top: 64px;
`;

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  border: none;
  outline: none;
`;

const TableTitles = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
`;

const TableTitle = styled.p`
  display: flex;
  width: 100%;
  justify-content: center;
  font-family: Inter;
  background: #f4fcff;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 16px;
  letter-spacing: 0.44px;
  text-transform: uppercase;
  flex: 1;
  color: #5a9bb0;
`;

const HeaderText = styled.span`
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 16px;
  letter-spacing: 0.44px;
  text-transform: uppercase;
  flex: 1;
  color: #5a9bb0;
`;

const Body = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  background: #f4fcff;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 20px;
  width: 100%;
  &:nth-child(even) {
    background: #ffffff;
  }
`;

const HeaderRow = styled(Row)`
  background: #d6ebf2;
  border-bottom: 1px solid var(--Gray-50, #e9edf5);
`;

const Rows = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-y: scroll;
`;

const CellWrapper = styled.div`
  flex: 1;
  display: flex;
  gap: 3px;
  align-items: center;
  color: #2b8492;
  cursor: pointer;
`;
const CellText = styled.span`
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  line-height: 20px;
  color: #2b8492;
`;

const StatusText = styled(CellText)`
  display: flex;
  align-items: center;
  padding: 0 10px;
  text-transform: capitalize;
  border-radius: 10px;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 0.36px;
  background: ${({ status }) =>
    (status === "fail" && "var(--Red-0, #FAF0F3)") ||
    (status === "pending" && "rgba(214, 162, 67, 0.12)") ||
    (status === "success" && "var(--Green-0, #E1FCEF)")};
  color: ${({ status }) =>
    (status === "fail" && "var(--Red-500, #D12953)") ||
    (status === "pending" && "#D6A243") ||
    (status === "success" && "var(--Green-500, #14804A)")};
`;

const Join = styled.button`
  background-color: #e1ecf4;
  border-radius: 3px;
  border: 1px solid #7aa7c7;
  box-shadow: rgba(255, 255, 255, 0.7) 0 1px 0 0 inset;
  box-sizing: border-box;
  color: #39739d;
  cursor: pointer;
  display: inline-block;
  font-family: -apple-system, system-ui, "Segoe UI", "Liberation Sans",
    sans-serif;
  font-size: 13px;
  font-weight: 400;
  line-height: 1.15385;
  margin: 0;
  outline: none;
  padding: 8px 0.8em;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: baseline;
  white-space: nowrap;

  &:hover,
  &:focus {
    background-color: #b3d3ea;
    color: #2c5777;
  }

  &:focus {
    box-shadow: 0 0 0 4px rgba(0, 149, 255, 0.15);
  }

  &:active {
    background-color: #a0c7e4;
    box-shadow: none;
    color: #2c5777;
  }
`;

const shorten = (ethAddr) =>
  ethAddr?.length > 14
    ? ethAddr.slice(0, 5) + "..." + ethAddr.slice(-3)
    : ethAddr;

const handleCopy = (text) => {
  navigator.clipboard.writeText(text);
};

const Table = ({ headers, entries, handleDisplayedCluster }) => {
  return entries?.length ? (
    <Body>
      <Head>
        <TableTitles>
          <TableTitle>Clusters</TableTitle>
        </TableTitles>
        <HeaderRow>
          {headers.map((header) => {
            return <HeaderText key={cuid()}>{header}</HeaderText>;
          })}
        </HeaderRow>
      </Head>
      <Rows>
        {entries.map((entry) => {
          return (
            <Row key={cuid()} onClick={handleDisplayedCluster} id={entry.id}>
              {headers.map((header) => {
                return (
                  <CellWrapper key={cuid()}>
                    {header === "action" ? (
                      <Join>JOIN</Join>
                    ) : (
                      <>
                        <CellText>{shorten(entry[header])}</CellText>
                        <Copy handler={() => handleCopy(entry[header])} />
                      </>
                    )}
                  </CellWrapper>
                );
              })}
            </Row>
          );
        })}
      </Rows>
    </Body>
  ) : (
    <Body>
      <Head>
        <TableTitles>
          <TableTitle>Sequencers</TableTitle>
        </TableTitles>
        <HeaderRow>
          {headers.map((header) => {
            return <HeaderText key={cuid()}>{header}</HeaderText>;
          })}
        </HeaderRow>
      </Head>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <PlaceHolder>Click on a cluster to display its sequencers </PlaceHolder>
      </div>
    </Body>
  );
};

export default Table;
