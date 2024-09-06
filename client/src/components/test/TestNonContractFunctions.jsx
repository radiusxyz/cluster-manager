import React, { useEffect, useState } from "react";
import cuid from "cuid";
import classes from "./TestContractFunctions.module.css";

const generateCluster = () => ({
  id: cuid(),
  rpcUrl: "rpcUrl" + cuid().slice(-5),
  chainId: "chainId" + cuid().slice(-5),
  type: "type" + String(Math.floor(Math.random() * 2)),
  webSocketUrl: "webSocketUrl" + cuid().slice(-5),
  blockExplorer: "blockExplorer" + cuid().slice(-5),
  name: "name" + String(Math.floor(Math.random() * 2)),
  symbol: "symbol" + cuid().slice(-5),
  quota: Math.floor(Math.random() * 30),
  status: ["active", "inactive"][Math.floor(Math.random() * 2)],
});

const clustersDefault = Array(20)
  .fill(0)
  .map(() => generateCluster());

const TestNonContractFunctions = () => {
  const [clusters, setClusters] = useState(clustersDefault);

  useEffect(() => {
    console.log(clusters);
  }, [clusters]);
  const filter = (by, what) => {
    setClusters(clustersDefault.filter((cluster) => cluster[by] === what));
  };

  const sortByQuota = (order) => {
    const sortedClusters = [...clustersDefault].sort((a, b) => {
      if (order === "ascending") {
        return a.quota - b.quota;
      } else if (order === "descending") {
        return b.quota - a.quota;
      }
      return 0;
    });
    setClusters(sortedClusters);
  };
  return (
    <ul
      style={{
        listStyleType: "none",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        width: "80%",
      }}
    >
      {clusters.map((item) => (
        <ul
          key={item.id}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            listStyleType: "none",
          }}
        >
          {" "}
          <li>{item.status}</li>
          <li>{item.id}</li>
          <li>{item.rpcUrl}</li>
          <li>{item.chainId}</li>
          <li>{item.type}</li>
          <li>{item.webSocketUrl}</li>
          <li>{item.blockExplorer}</li>
          <li>{item.name}</li>
          <li>{item.symbol}</li>
          <li>{item.quota}</li>
        </ul>
      ))}
      <div
        style={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          gap: "10px",
          alignItems: "center",
          marginTop: "30px",
        }}
      >
        <button
          className={classes.btn}
          style={{ padding: "20px 10px", width: "300px" }}
          onClick={() => filter("type", "type0")}
        >
          Filter by type: type0
        </button>{" "}
        <button
          style={{ padding: "20px 10px", width: "300px" }}
          className={classes.btn}
          onClick={() => filter("type", "type1")}
        >
          Filter by type: type1
        </button>
        <button
          style={{ padding: "20px 10px", width: "300px" }}
          className={classes.btn}
          onClick={() => filter("status", "inactive")}
        >
          Filter by status: inactive
        </button>
        <button
          style={{ padding: "20px 10px", width: "300px" }}
          className={classes.btn}
          onClick={() => filter("status", "active")}
        >
          Filter by status: active
        </button>
        <button
          style={{ padding: "20px 10px", width: "300px" }}
          className={classes.btn}
          onClick={() => filter("name", "name0")}
        >
          Filter by name: name0
        </button>
        <button
          style={{ padding: "20px 10px", width: "300px" }}
          className={classes.btn}
          onClick={() => filter("name", "name1")}
        >
          Filter by status: name1
        </button>
        <button
          style={{ padding: "20px 10px", width: "300px" }}
          className={classes.btn}
          onClick={() => {
            sortByQuota("ascending");
          }}
        >
          Sort by quota: ascending order{" "}
        </button>{" "}
        <button
          style={{ padding: "20px 10px", width: "300px" }}
          className={classes.btn}
          styles={{ marginTop: "30px", padding: "20px 10px" }}
          onClick={() => {
            sortByQuota("descending");
          }}
        >
          Sort by quota: descending order{" "}
        </button>{" "}
      </div>
    </ul>
  );
};

export default TestNonContractFunctions;
