// useFetchData.js
import { useQuery } from "@tanstack/react-query";

const GET = async (endpoint) => {
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const useGET = (key, endpoint, enabled = true, refetchInterval = false) => {
  return useQuery({
    queryKey: key,
    queryFn: () => GET(endpoint),
    enabled,
    refetchInterval,
  });
};

export default useGET;
