import { createPublicClient, http } from "viem";
import { localhost, holesky } from "../config.js";
import { contractAbi, contractAddress } from "../../common.js";

const client = createPublicClient({
  chain: holesky,
  transport: http(),
});

export const getRollupInfoList = async (clusterId) => {
  try {
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
