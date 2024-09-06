import React, { createContext, useState } from "react";
import { useAccount, useWriteContract } from "wagmi";
import { hhContractAbi, hhContractAddress } from "../config";

const shorten = (ethAddr) => ethAddr.slice(0, 15) + "..." + ethAddr.slice(-12);

export const PSMContext = createContext({
  handleWriteToContract: () => {},
  handleClusterId: () => {},
  shorten,
  pollingInterval: 3000,
  address: "",
  clusterId: "",
});
export const PSMProvider = ({ children }) => {
  const { writeContract } = useWriteContract();

  const [clusterId, setClusterId] = useState("");

  const handleClusterId = (handler) => {
    setClusterId(handler);
  };

  const { address } = useAccount();

  const handleWriteToContract = (functionName, args = [], enabled = false) => {
    writeContract({
      abi: hhContractAbi,
      address: hhContractAddress,
      functionName,
      args,
      account: address,
      query: { enabled },
    });
  };

  return (
    <PSMContext.Provider
      value={{
        handleWriteToContract,
        address,
        shorten,
        handleClusterId,
        clusterId,
      }}
    >
      {children}
    </PSMContext.Provider>
  );
};
