import { createPublicClient, http } from "viem";
import { contractAbi } from "../../common.js";

export const getRollupInfoList = async (
  clusterId,
  contractAddress,
  chain,
  rpcUrl
) => {
  try {
    const client = createPublicClient({
      chain,
      transport: http(rpcUrl),
    });

    const data = await client.readContract({
      address: contractAddress, // Ensure you import contractAddress and contractAbi
      abi: contractAbi,
      functionName: "getRollupInfoList",
      args: [clusterId],
    });
    console.log(`Got the list of rollups for ${clusterId}`, data);
    return data; // Return the rollup info list
  } catch (error) {
    console.error("Error fetching rollup info:", error.message);
    throw error;
  }
};
