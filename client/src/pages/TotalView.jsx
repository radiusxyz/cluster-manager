import React, { useContext, useEffect, useState } from "react";
import Table from "../components/Table";
import { useClusters } from "../contexts/ClustersContext";
import styled from "styled-components";
import { WagmiContext, useConfig } from "wagmi";
import { useConnect } from "wagmi";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const TablesContainer = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  height: 100%;
`;

const TotalView = () => {
  const { clusters } = useClusters();
  const wagmiCTX = useContext(WagmiContext);

  const clustersHeaders = ["address", "id", "quota", "action"];
  const sequencersHeaders = ["address", "id", "role"];

  const [clustersEntries] = useState(
    clusters.map(({ address, id, size, members }) => {
      return {
        address,
        id,
        quota: `${members.length}/${size}`,
      };
    })
  );

  const [sequencersEntries, setSequencersEntries] = useState([]);

  const handleDisplayedCluster = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const rowElement = e.currentTarget;

    setSequencersEntries(
      clusters.find((clustersEntry) => clustersEntry.id === rowElement.id)
        .members
    );
  };

  return (
    <Container>
      <TablesContainer>
        <Table
          headers={clustersHeaders}
          entries={clustersEntries}
          handleDisplayedCluster={handleDisplayedCluster}
        />
        <Table headers={sequencersHeaders} entries={sequencersEntries} />
      </TablesContainer>
    </Container>
  );
};

export default TotalView;
