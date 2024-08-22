import React, { useContext, useEffect, useState } from "react";
import * as s from "./ExplorePageStyles";

import useGET from "../hooks/useGET";

import { PSMContext } from "../contexts/PSMContext";

const ExplorePage = () => {
  const { pollingInterval, shorten } = useContext(PSMContext);
  const [proposerSets, setProposerSets] = useState([]);
  const [shouldGetProposerSets, setShouldGetProposerSets] = useState(false);

  const {
    isPending: isPendingProposerSets,
    error: errorProposerSets,
    data: dataProposerSets,
    refetch: refetchProposerSets,
    isFetching: isFetchingProposerSets,
  } = useGET(
    ["proposerSets"],
    "http://localhost:3333/api/v1/proposer-sets",
    shouldGetProposerSets,
    pollingInterval
  );

  useEffect(() => {
    if (dataProposerSets) {
      console.log("dataProposerSets: ", dataProposerSets);
      setProposerSets(dataProposerSets);
    }
  }, [dataProposerSets]);

  return (
    <s.PageContainer>
      <s.Title>All Proposer Sets</s.Title>
      <s.ActionsContainer>
        <s.SelectSearchWrapper>
          <s.TypeSelectBox>
            <option defaultValue="All">All</option>
            <option value="zkStack">zk Stack</option>
            <option value="polygonCdk">Polygon CDK</option>
            <option value="madara">Madara</option>
            <option value="arbitrumOrbit">Arbitrum Orbit</option>
          </s.TypeSelectBox>
          <s.SearchInput>
            <s.Input />
          </s.SearchInput>
        </s.SelectSearchWrapper>
        <s.Filter>Active</s.Filter>
        <s.Filter>Encrypted Mempool Enabled</s.Filter>
        <s.GenerateBtn>Generate Proposer Set</s.GenerateBtn>
      </s.ActionsContainer>
      <s.Table>
        <s.Headers>
          <s.Header>P.S. Status</s.Header>
          <s.Header>Rolup Name</s.Header>
          <s.Header>P.S. ID</s.Header>
          <s.Header>Rollup Type</s.Header>
          <s.Header>Quota</s.Header>
          <s.Header>Earn</s.Header>
          <s.Header>Encrypted Mempool</s.Header>
        </s.Headers>
        <s.Rows>
          <s.Row>
            <s.Cell>
              <s.CellTxt>Active/Inactive</s.CellTxt>
            </s.Cell>
            <s.Cell>
              <s.CellTxt>Number</s.CellTxt>
            </s.Cell>
            <s.Cell>
              <s.CellTxt>Address</s.CellTxt>
            </s.Cell>
            <s.Cell>
              <s.CellTxt>Rollup Type</s.CellTxt>
            </s.Cell>{" "}
            <s.Cell>
              <s.CellTxt>num/num</s.CellTxt>
            </s.Cell>
            <s.Cell>
              <s.CellTxt>Amount ETH</s.CellTxt>
            </s.Cell>
            <s.Cell>
              <s.CellTxt>Enabled/Disabled</s.CellTxt>
            </s.Cell>
          </s.Row>
        </s.Rows>
      </s.Table>
    </s.PageContainer>
  );
};

export default ExplorePage;
