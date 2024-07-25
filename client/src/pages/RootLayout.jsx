import React, { useState } from "react";

import { Outlet } from "react-router";

import { useConnect, useReadContract } from "wagmi";
import { config, contractAbi } from "../config.js";
import { contractAddress } from "../config.js";
import { useWriteContract } from "wagmi";

import Arrow from "../components/Arrow";
import {
  TableWrapper,
  Head,
  HeadTop,
  HeadTopLeft,
  HeadTopRight,
  Footer,
  Pagination,
  Element,
  LeftArr,
  RightArr,
  GenerateCluster,
  ConnetWallet,
} from "./RootLayoutStyles";
import { useAccount } from "wagmi";
import { injected } from "@wagmi/core";

const RootLayout = () => {
  const { writeContract } = useWriteContract();
  const { connect } = useConnect();
  const { address } = useAccount(config);

  console.log(address);
  const initializeProposerSet = () => {
    const result = writeContract({
      abi: contractAbi,
      address: contractAddress,
      functionName: "initializeProposerSet",
      args: [],
      account: "0xFad9aD5f09F274d218F8Ff4CE2194A8a5e6EE938",
    });

    console.log(result);
  };

  function getSequencerList() {
    // const result = useReadContract({
    //   abi: contractAbi,
    //   address: contractAddress,
    //   functionName: "getSequencerList",
    //   args: ["0xFad9aD5f09F274d218F8Ff4CE2194A8a5e6EE938"],
    //   account: "0xFad9aD5f09F274d218F8Ff4CE2194A8a5e6EE938",
    // });
    // console.log(result);
  }

  const [value, setValue] = useState("");
  const handleChange = (e) => {
    setValue(e.target.value.trim());
  };

  const handleFilter = () => {
    if (!value) {
      clustersCtx.handleClusters(() => clustersCtx.data);
      return;
    }
    clustersCtx.handleClusters(() =>
      clustersCtx.data.filter((cluster) => {
        return Object.values(cluster).includes(value);
      })
    );
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleFilter();
    }
  };

  return (
    <TableWrapper>
      <button onClick={() => connect({ connector: injected() })}>
        Connect
      </button>
      <Head>
        <HeadTop>
          <HeadTopLeft>
            <GenerateCluster onClick={initializeProposerSet}>
              Generate Cluster
            </GenerateCluster>
          </HeadTopLeft>
          <HeadTopRight>
            <ConnetWallet>{address ? address : "Connect Wallet"}</ConnetWallet>
          </HeadTopRight>
        </HeadTop>
      </Head>
      <Outlet />
      <Footer>
        <Pagination>
          <Element>First</Element>
          <Element>
            <LeftArr>
              <Arrow />
            </LeftArr>
          </Element>
          <Element>Page 1 of 1000</Element>
          <Element>
            <RightArr>
              <Arrow />
            </RightArr>
          </Element>
          <Element>Last</Element>
        </Pagination>
      </Footer>
    </TableWrapper>
  );
};

export default RootLayout;
