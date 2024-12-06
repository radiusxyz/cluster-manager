import { useAccount } from "wagmi";
import { livenessRadius, livenessRadiusAbi } from "../../../common";
import { useWriteContract } from "wagmi";

const useWrite = () => {
  const { address } = useAccount();
  const {
    writeContract,
    data: hash,
    isPending: isHashPending,
  } = useWriteContract();

  const write = (functionName, args) => {
    writeContract({
      abi: livenessRadiusAbi,
      address: livenessRadius,
      functionName,
      args,
      account: address,
    });
  };
  return { write, hash, isHashPending };
};

export default useWrite;
