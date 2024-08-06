import React, { createContext } from "react";
import { useAccount, useWriteContract } from "wagmi";

const shorten = (ethAddr) => ethAddr.slice(0, 15) + "..." + ethAddr.slice(-12);

export const PSMContext = createContext({
  handleWriteToContract: () => {},
  shorten,
  pollingInterval: 3000,
  address: "",
});
export const PSMProvider = ({ children }) => {
  const { writeContract } = useWriteContract();

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
    <PSMContext.Provider value={{ handleWriteToContract, address, shorten }}>
      {children}
    </PSMContext.Provider>
  );
};
