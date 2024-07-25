import React, { useState } from "react";

import { Outlet } from "react-router";

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

const RootLayout = () => {
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

  const { address } = useAccount();

  return (
    <TableWrapper>
      <Head>
        <HeadTop>
          <HeadTopLeft>
            <GenerateCluster>Generate Cluster</GenerateCluster>
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
