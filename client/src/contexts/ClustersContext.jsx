import React, { createContext, useContext, useState } from "react";

import useData from "../hooks/useData";

export const ClustersContext = createContext({
  clusters: [],
  handleSets: () => {},
});

export const useClusters = () => useContext(ClustersContext);
const data = useData();

export const ClustersProvider = ({ children }) => {
  const [clusters, setClusters] = useState(data);

  const handleClusters = (handler) => {
    setClusters(handler);
  };

  return (
    <ClustersContext.Provider value={{ data, clusters, handleClusters }}>
      {children}
    </ClustersContext.Provider>
  );
};
