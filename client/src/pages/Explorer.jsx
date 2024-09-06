import React, { useContext, useEffect, useState } from "react";
import * as s from "./ExplorerStyles";

import useGET from "../hooks/useGET";

import { PSMContext } from "../contexts/PSMContext";
import Modal from "../components/Modal";

const Explorer = () => {
  const { pollingInterval, shorten } = useContext(PSMContext);
  const [clusters, setClusters] = useState([]);
  const [shouldGetClusters, setShouldGetClusters] = useState(false);
  const [all, setAll] = useState(false);
  const [encrypted, setEncrypted] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const {
    isPending: isPendingClusters,
    error: errorClusters,
    data: dataClusters,
    refetch: refetchClusters,
    isFetching: isFetchingClusters,
  } = useGET(
    ["clusters"],
    "http://localhost:3333/api/v1/clusters",
    shouldGetClusters,
    pollingInterval
  );

  useEffect(() => {
    if (dataClusters) {
      console.log("dataClusters: ", dataClusters);
      setClusters(dataClusters);
    }
  }, [dataClusters]);

  const toggleAll = () => {
    setAll((prevState) => !prevState);
  };
  const toggleEncrypted = () => {
    setEncrypted((prevState) => !prevState);
  };
  return (
    <s.PageContainer>
      <s.Title>All Clusters</s.Title>
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
        <s.Filter $active={all} onClick={toggleAll}>
          Active
        </s.Filter>
        <s.Filter $active={encrypted} onClick={toggleEncrypted}>
          Encrypted Mempool
        </s.Filter>
        <s.GenerateBtn onClick={toggleModal}>Generate Cluster</s.GenerateBtn>
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
          <s.Row to="/0/details">
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
          <s.Row to="/1/details">
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
          <s.Row to="/2/details">
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
      {showModal && <Modal toggle={toggleModal} />}
    </s.PageContainer>
  );
};

export default Explorer;
