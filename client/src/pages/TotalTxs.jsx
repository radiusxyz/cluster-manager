import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import { useTxs } from "../contexts/TxsContext";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
`;

const TotalTxs = () => {
  const { txs } = useTxs();

  const rollupHeaders = ["address", "id", "size"];
  const clusterHeaders = ["address", "id", "role"];

  const [rollupEntries] = useState(
    txs.map(({ address, id, size }) => {
      return {
        address,
        id,
        size,
      };
    })
  );

  const [clusterEntries, setClusterEntries] = useState([]);

  const handleDisplayedCluster = (e) => {
    e.preventDefault();
    console.log(e.target.id);
    setClusterEntries(
      rollupEntries.filter(
        ({ address, id, role }) =>
          id === e.target.id && {
            address,
            id,
            role,
          }
      ).members
    );
  };

  return (
    <Container>
      <Table
        headers={rollupHeaders}
        entries={rollupEntries}
        handleDisplayedCluster={handleDisplayedCluster}
      />
      <Table headers={clusterHeaders} entries={clusterEntries} />
    </Container>
  );
};

export default TotalTxs;
