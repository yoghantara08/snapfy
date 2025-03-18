import { useQuery } from "@tanstack/react-query";
import { cacheExchange, fetchExchange, gql } from "@urql/core";
import { createClient } from "urql";

import { UNISWAP_V3_POOL_IDS } from "@/constant";
import { SUBGRAPH_API_KEY, UNISWAP_V3_SUBGRAPH_ID } from "@/constant";
import { IUniswapV3Pool } from "@/types";

// Create a new client with the Uniswap V3 subgraph
const client = createClient({
  url: `https://gateway.thegraph.com/api/${SUBGRAPH_API_KEY}/subgraphs/id/${UNISWAP_V3_SUBGRAPH_ID}`,
  exchanges: [cacheExchange, fetchExchange],
});

// Define the query to fetch the pool data
// The query fetches the pool data for a given pool ID
const POOL_QUERY = gql`
  query ($id: ID!) {
    pool(id: $id) {
      id
      token0 {
        id
        symbol
        decimals
        name
      }
      token1 {
        id
        symbol
        decimals
        name
      }
      feeTier
      token0Price
      token1Price
      liquidity
      sqrtPrice
      tick
      volumeUSD
      feesUSD
      totalValueLockedUSD
      totalValueLockedToken0
      totalValueLockedToken1
      poolDayData(first: 1, orderBy: date, orderDirection: desc) {
        date
        volumeUSD
        feesUSD
        tvlUSD
      }
    }
  }
`;

// Fetch the pool data for a given pool ID
// The function fetches the pool data for a given pool ID
export const fetchUniswapV3Pool = async (
  poolId: string,
): Promise<IUniswapV3Pool | null> => {
  const result = await client.query(POOL_QUERY, { id: poolId }).toPromise();
  return result.data?.pool || null;
};

// Custom Hook to fetch the Uniswap V3 pools
const useUniswapV3Pools = () => {
  return useQuery({
    queryKey: ["uniswapV3Pools"],
    queryFn: async () => {
      const pools = await Promise.all(
        Object.values(UNISWAP_V3_POOL_IDS).map(fetchUniswapV3Pool),
      );
      return pools.filter((pool): pool is IUniswapV3Pool => pool !== null);
    },
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5,
    retry: 2,
  });
};

export default useUniswapV3Pools;
