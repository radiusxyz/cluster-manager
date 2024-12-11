import React, { useEffect, useState } from "react";

import Loader from "../components/Loader";

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
  TabsWrapper,
  Tab,
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
} from "../components/TableStyles";
import { useAccount } from "wagmi";
import InitializeClusterModal from "../components/InitializeClusterModal";
import { apiEndpoint } from "../config";
import Alert from "../components/Alert";
import { useQuery } from "@tanstack/react-query";
import { GET } from "../utils/api";

const Explorer = () => {
  const [clusters, setClusters] = useState([]);
  const { address } = useAccount();
  const [shouldGetClusters, setShouldGetClusters] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const { isConnected } = useAccount();
  const [showInitializeClusterModal, setShowInitializeClusterModal] =
    useState(false);
  const toggleInitializeClusterModal = () => {
    setShowInitializeClusterModal(!showInitializeClusterModal);
  };

  const [key, setKey] = useState(["clusters"]);
  const [url, setUrl] = useState(`${apiEndpoint}/clusters`);

  const {
    isPending: isPendingClusters,
    error: errorClusters,
    data: dataClusters,
    refetch: refetchClusters,
    isFetching: isFetchingClusters,
  } = useQuery({
    queryKey: key,
    queryFn: () => GET(url),
    enabled: true,
    refetchInterval: 3000,
  });

  useEffect(() => {
    if (dataClusters) {
      console.log("dataClusters: ", dataClusters);
      setClusters(dataClusters);
    }
  }, [dataClusters]);

  const [activeTab, setActiveTab] = useState("all");

  const toggleTab = (event) => {
    setActiveTab(event.target.innerText.toLowerCase());
  };

  useEffect(() => {
    if (activeTab === "all") {
      setKey(["clusters"]);
      setUrl(`${apiEndpoint}/clusters`);
    } else if (activeTab === "joined") {
      setKey(["clustersJoined", address]);
      setUrl(`${apiEndpoint}/addresses/${address}/clusters/joined`);
    } else if (activeTab === "generated") {
      setKey(["clustersGenerated", address]);
      setUrl(`${apiEndpoint}/addresses/${address}/clusters/generated`);
    }
  }, [activeTab, address]);
  return (
    <PageContainer>
      {showAlert && <Alert error={errorClusters} />}
      <TitleRow>
        <TabsWrapper>
          <Tab $active={activeTab === "all" ? 1 : 0} onClick={toggleTab}>
            All
          </Tab>
          <Tab $active={activeTab === "generated" ? 1 : 0} onClick={toggleTab}>
            Generated
          </Tab>
          <Tab $active={activeTab === "joined" ? 1 : 0} onClick={toggleTab}>
            Joined
          </Tab>
        </TabsWrapper>
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
