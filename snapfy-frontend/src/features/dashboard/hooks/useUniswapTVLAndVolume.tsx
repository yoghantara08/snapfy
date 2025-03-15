import { useQuery } from "@tanstack/react-query";

const fetchUniswapTVLAndVolume = async (): Promise<{
  tvl: number;
  volume24h: number;
}> => {
  const tvlResponse = await fetch("https://api.llama.fi/tvl/uniswap");
  const volumeResponse = await fetch(
    "https://api.llama.fi/summary/dexs/uniswap",
  );

  if (!tvlResponse.ok || !volumeResponse.ok) {
    throw new Error("Failed to fetch Uniswap data");
  }

  const tvlData = await tvlResponse.json();
  const volumeData = await volumeResponse.json();

  return {
    tvl: tvlData,
    volume24h: volumeData.total24h,
  };
};

const useUniswapTVLAndVolume = () => {
  return useQuery({
    queryKey: ["uniswapTVLAndVolume"],
    queryFn: fetchUniswapTVLAndVolume,
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5,
    retry: 2,
  });
};

export default useUniswapTVLAndVolume;
