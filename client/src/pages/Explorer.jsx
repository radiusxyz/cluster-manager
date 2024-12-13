import React, { useEffect, useState } from "react";

import Loader from "../components/Loader";

import {
  ActionsContainer,
  Filter,
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
import Button from "../components/Button";

const Explorer = () => {
  const { address } = useAccount();
  const [shouldGetClusters, setShouldGetClusters] = useState(false);
  const [clusters, setClusters] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertStatus, setAlertStatus] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const { isConnected } = useAccount();
  const [showInitializeClusterModal, setShowInitializeClusterModal] =
    useState(false);
  const toggleInitializeClusterModal = () => {
    setShowInitializeClusterModal(!showInitializeClusterModal);
  };

  const handleAlert = (status, message, duration) => {
    setShowAlert(true);
    setAlertStatus(status);
    setAlertMessage(message);
    if (duration) {
      setTimeout(() => {
        setShowAlert(false);
      }, duration);
    }
  };

  const [key, setKey] = useState(["clusters"]);
  const [url, setUrl] = useState(`${apiEndpoint}/clusters`);

  const {
    isPending,
    error,
    data: fetchedClusters,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: key,
    queryFn: () => GET(url),
    enabled: true,
    refetchInterval: 1000,
  });

  useEffect(() => {
    if (error) {
      handleAlert("error", error.message, 3000);
    }
    if (isPending) {
      handleAlert("processing", "Fetching data...");
    }
    if (fetchedClusters && fetchedClusters.length !== clusters.length) {
      handleAlert("serverSuccess", "Clusters are fetched successfully", 2000);
      setClusters(fetchedClusters);
    }
  }, [error, fetchedClusters, isPending]);

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
      {showAlert && <Alert status={alertStatus} message={alertMessage} />}
      <TitleRow>
        <TabsWrapper>
          <Tab $active={activeTab === "all" ? 1 : 0} onClick={toggleTab}>
            All
          </Tab>
          {address && (
            <Tab
              $active={activeTab === "generated" ? 1 : 0}
              onClick={toggleTab}
            >
              Generated
            </Tab>
          )}
          {address && (
            <Tab $active={activeTab === "joined" ? 1 : 0} onClick={toggleTab}>
              Joined
            </Tab>
          )}
        </TabsWrapper>
        <Button onClick={toggleInitializeClusterModal} disabled={!isConnected}>
          Generate Cluster
        </Button>
      </TitleRow>
      <ActionsContainer></ActionsContainer>
      <Table>
        <Headers>
          <Header>Status</Header>
          <Header>Id</Header>
          <Header>Quota</Header>
        </Headers>
        <Rows>
          {isPending ? (
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
        <InitializeClusterModal
          toggle={toggleInitializeClusterModal}
          handleAlert={handleAlert}
        />
      )}
    </PageContainer>
  );
};

export default Explorer;
