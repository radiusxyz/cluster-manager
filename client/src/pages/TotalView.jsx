import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import { useClusters } from "../contexts/ClustersContext";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  height: 100%;
`;

const TotalView = () => {
  const { clusters } = useClusters();

  const clustersHeaders = ["address", "id", "size"];
  const sequencersHeaders = ["address", "id", "role"];

  const [clustersEntries] = useState(
    clusters.map(({ address, id, size }) => {
      return {
        address,
        id,
        size,
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
      <Table
        headers={clustersHeaders}
        entries={clustersEntries}
        handleDisplayedCluster={handleDisplayedCluster}
      />
      <Table headers={sequencersHeaders} entries={sequencersEntries} />
    </Container>
  );
};

export default TotalView;
