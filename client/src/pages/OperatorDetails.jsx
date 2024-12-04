import React, { useEffect, useState } from "react";
import {
  PageContainer,
  TitleJoinBtnContainer,
  BtnsContainer,
  RunBtn,
  JoinBtn,
  Container,
  SubTitle,
  InfoItems,
  InfoItem,
  Property,
  Value,
  Table,
  Headers,
  Header,
  Rows,
  Row,
  Cell,
  CellTxt,
  Title,
  Message,
  StyledNavLink,
  AddRollupBtn,
  TitleRow,
} from "./OperatorDetailsStyles";

import { useNavigate, useParams } from "react-router";
import { useGET } from "../hooks/useServer";
import Loader from "../components/Loader";
import useWrite from "../hooks/useContract";
import { useAccount } from "wagmi";
import RunModal from "../components/RunModal";
import AddRollupModal from "../components/AddRollupModal";

const OperatorDetails = () => {
  const { clusterId } = useParams();
  const { address, isConnected } = useAccount();
  const [cluster, setCluster] = useState(null);
  const [selectedRollupId, setSelectedRollupId] = useState(null);
  const [shouldGetSequencers, setShouldGetSequencers] = useState(false);
  const [showAddRollupModal, setShowAddRollupModal] = useState(false);
  const navigate = useNavigate();

  const toggleAddRollupModal = () => {
    setShowAddRollupModal(!showAddRollupModal);
  };

  const [showRunModal, setShowRunModal] = useState(false);
  const toggleRunModal = () => {
    setShowRunModal(!showRunModal);
  };

  const { write, hash, isHashPending } = useWrite();

  const {
    isPending,
    error,
    data,
    refetch: refetchSequencers,
  } = useGET(
    ["cluster", clusterId],
    `http://localhost:3333/api/v1/clusters/${clusterId}`,
    true,
    3000
  );

  const handleJoinLeave = () => {
    if (cluster.sequencers.includes(address)) {
      write("deregisterSequencer", [clusterId]);
    } else {
      write("registerSequencer", [clusterId]);
    }
  };

  const handleRun = () => {
    toggleRunModal();
  };

  useEffect(() => {
    if (data) {
      console.log("cluster: ", data);
      setCluster(data);
    }
  }, [data]);

  return (
    <PageContainer>
      <Container>
        <SubTitle>Opertor Info</SubTitle>
        {(!operator && <Loader />) || (
          <InfoItems>
            <InfoItem>
              <Property>Idle Address</Property>
              <Value>{operator.operatorAddress}</Value>
            </InfoItem>
            <InfoItem>
              <Property>Operating Address</Property>
              <Value>{operator.operatingAddress}</Value>
            </InfoItem>
            <InfoItem>
              <Property>Total Stake</Property>
              <Value>{operator.stake}</Value>{" "}
            </InfoItem>
          </InfoItems>
        )}
      </Container>
      {operator && (
        <Container>
          <TitleRow>
            <SubTitle>Stakes</SubTitle>
          </TitleRow>
          <Table>
            <Headers>
              <Header> Symbol</Header>
              <Header> Address</Header>
              <Header> Amount</Header>
              <Header>Share (%)</Header>
            </Headers>

            <Rows>
              {operator.stakes.map((stake, index) => (
                <Row>
                  <Cell>
                    <CellTxt>{"None"}</CellTxt>
                  </Cell>
                  <Cell>
                    <CellTxt>{stake.token}</CellTxt>
                  </Cell>
                  <Cell>
                    <CellTxt>{stake.stake}</CellTxt>
                  </Cell>
                  <Cell>
                    <CellTxt>
                      {Math.floor(stake.stake / stake.share) * 100}
                    </CellTxt>
                  </Cell>
                </Row>
              )) || <Message>No stakes added</Message>}
            </Rows>
          </Table>
        </Container>
      )}
    </PageContainer>
  );
};

export default OperatorDetails;
