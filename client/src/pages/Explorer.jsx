import React, { useEffect, useState } from "react";

import Loader from "../components/Loader";

import { useGET } from "../hooks/useServer";

import Modal from "../components/Modal";
import {
  ActionsContainer,
  Filter,
  GenerateBtn,
  InitializeClusterBtn,
  Input,
  PageContainer,
  SearchInput,
  SelectSearchWrapper,
  SubTitle,
  Title,
  TypeSelectBox,
  TitleRow,
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
import { useAccount } from "wagmi";
import InitializeClusterModal from "../components/InitializeClusterModal";

const Explorer = () => {
  const [clusters, setClusters] = useState([]);
  const [shouldGetClusters, setShouldGetClusters] = useState(false);
  const [all, setAll] = useState(false);
  const [encrypted, setEncrypted] = useState(false);
  const { isConnected } = useAccount();
  const [showInitializeClusterModal, setShowInitializeClusterModal] =
    useState(false);
  const toggleInitializeClusterModal = () => {
    setShowInitializeClusterModal(!showInitializeClusterModal);
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
      <TitleRow>
        <Title>All Clusters</Title>
        <InitializeClusterBtn
          onClick={toggleInitializeClusterModal}
          disabled={!isConnected}
        >
          Generate Cluster
        </InitializeClusterBtn>
      </TitleRow>
      <ActionsContainer></ActionsContainer>
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
      {showInitializeClusterModal && (
        <InitializeClusterModal toggle={toggleInitializeClusterModal} />
      )}
    </PageContainer>
  );
};

export default Explorer;
