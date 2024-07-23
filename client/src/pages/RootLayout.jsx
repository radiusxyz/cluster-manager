import React, { useContext, useEffect, useState } from "react";

import { Outlet } from "react-router";
import { WagmiContext, useAccount, useConnect } from "wagmi";
import { injected } from "@wagmi/core";
import {
  ConnetWallet,
  Footer,
  GenerateCluster,
  Head,
  HeadTop,
  HeadTopLeft,
  HeadTopRight,
  LeftArr,
  Pagination,
  RightArr,
  TableWrapper,
} from "./RootLayoutStyles";
import Arrow from "../components/Arrow";

const RootLayout = () => {
  const { connect } = useConnect();
  const wagmiCtx = useContext(WagmiContext);
  const { address } = useAccount();

  console.log(wagmiCtx);
  console.log(address);
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
      <Head>
        <HeadTop>
          <HeadTopLeft>
            <GenerateCluster>Generate Cluster</GenerateCluster>
          </HeadTopLeft>
          <HeadTopRight>
            <ConnetWallet onClick={() => connect()}>
              {/* {address ? address : "Connect Wallet"} */}
            </ConnetWallet>
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
