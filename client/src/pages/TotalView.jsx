import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import { useClusters } from "../contexts/ClustersContext";
import styled from "styled-components";

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
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 16px;
  letter-spacing: 0.44px;
  text-transform: uppercase;
  flex: 1;
  color: #5a9bb0;
`;

const TotalView = () => {
  const { clusters } = useClusters();

  const clustersHeaders = ["address", "id", "quota"];
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
    console.log(rowElement, rowElement.id);

    setSequencersEntries(
      clusters.find((clustersEntry) => clustersEntry.id === rowElement.id)
        .members
    );
  };

  return (
    <Container>
      <TableTitles>
        <TableTitle>Clusters</TableTitle>
        <TableTitle>Sequencers</TableTitle>
      </TableTitles>
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
