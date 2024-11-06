import React, { useEffect, useState } from "react";

import Loader from "../components/Loader";

import { useGET } from "../hooks/useServer";

import Modal from "../components/Modal";
import {
  ActionsContainer,
  Filter,
  GenerateBtn,
  Input,
  PageContainer,
  SearchInput,
  SelectSearchWrapper,
  Title,
  TypeSelectBox,
} from "./ExplorerStyles";
import {
  Cell,
  CellTxt,
  Header,
  Headers,
  Row,
  Rows,
  Table,
} from "./TableStyles";

const Explorer = () => {
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
  } = useGET(["clusters"], "http://localhost:3333/api/v1/clusters", true, 3000);

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
    <PageContainer>
      <Title>All Clusters</Title>
      <ActionsContainer>
        <SelectSearchWrapper>
          <TypeSelectBox>
            <option defaultValue="All">All</option>
            <option value="zkStack">zk Stack</option>
            <option value="polygonCdk">Polygon CDK</option>
            <option value="madara">Madara</option>
            <option value="arbitrumOrbit">Arbitrum Orbit</option>
          </TypeSelectBox>
          <SearchInput>
            <Input />
          </SearchInput>
        </SelectSearchWrapper>
        <Filter $active={all} onClick={toggleAll}>
          Active
        </Filter>
        <Filter $active={encrypted} onClick={toggleEncrypted}>
          Encrypted Mempool
        </Filter>
        <GenerateBtn onClick={toggleModal}>Generate Cluster</GenerateBtn>
      </ActionsContainer>
      <Table>
        <Headers>
          <Header>Status</Header>
          <Header>Id</Header>
          <Header>Quota</Header>
        </Headers>

        <Rows>
          {isPendingClusters ? (
            <Loader />
          ) : (
            clusters.map((cluster) => (
              <Row to={`/${cluster.clusterId}/details`} key={cluster.clusterId}>
                <Cell>
                  <CellTxt>{cluster.active ? "Active" : "Inactive"}</CellTxt>
                </Cell>
                <Cell>
                  <CellTxt>{cluster.clusterId}</CellTxt>
                </Cell>
                <Cell>
                  <CellTxt>
                    {
                      cluster.sequencers.filter(
                        (sequencer) =>
                          sequencer !==
                          "0x0000000000000000000000000000000000000000"
                      ).length
                    }
                    /{cluster.sequencers.length}
                  </CellTxt>
                </Cell>
              </Row>
            ))
          )}
        </Rows>
      </Table>
      {showModal && <Modal toggle={toggleModal} />}
    </PageContainer>
  );
};

export default Explorer;
