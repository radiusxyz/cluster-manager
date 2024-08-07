import React, { createContext, useState } from "react";
import { useAccount, useWriteContract } from "wagmi";
import { hhContractAbi, hhContractAddress } from "../config";

const shorten = (ethAddr) => ethAddr.slice(0, 15) + "..." + ethAddr.slice(-12);

export const PSMContext = createContext({
  handleWriteToContract: () => {},
  handleProposerSetId: () => {},
  shorten,
  pollingInterval: 3000,
  address: "",
  proposerSetId: "",
});
export const PSMProvider = ({ children }) => {
  const { writeContract } = useWriteContract();

  const [proposerSetId, setProposerSetId] = useState("");

  const handleProposerSetId = (handler) => {
    setProposerSetId(handler);
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
        handleProposerSetId,
        proposerSetId,
      }}
    >
      {children}
    </PSMContext.Provider>
  );
};
