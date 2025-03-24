import { useQuery } from "@tanstack/react-query";
import { cacheExchange, fetchExchange, gql } from "@urql/core";
import { createClient } from "urql";

import { UNISWAP_V2_POOL_IDS } from "@/constant";
import { SUBGRAPH_API_KEY, UNISWAP_V2_SUBGRAPH_ID } from "@/constant";
import { IUniswapV2Pool } from "@/types";

// Create a new client with the Uniswap V2 subgraph on Base network
const client = createClient({
  url: `https://gateway.thegraph.com/api/${SUBGRAPH_API_KEY}/subgraphs/id/${UNISWAP_V2_SUBGRAPH_ID}`,
  exchanges: [cacheExchange, fetchExchange],
});

// Define the query to fetch the pool data
const POOL_QUERY = gql`
  query ($id: ID!) {
    pair(id: $id) {
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
      reserve0
      reserve1
      token0Price
      token1Price
      totalSupply
      volumeUSD
      untrackedVolumeUSD
      txCount
      dailyVolumeUSD: volumeUSD @daily
      reserveUSD
    }
  }
`;

const PAIR_DAY_DATA_QUERY = gql`
  query ($id: ID!) {
    pairDayDatas(
      first: 1
      orderBy: date
      orderDirection: desc
      where: { pairAddress: $id }
    ) {
      dailyVolumeUSD
      dailyTxns
    }
  }
`;

export const fetchUniswapV2PoolDayData = async (poolId: string) => {
  const result = await client
    .query(PAIR_DAY_DATA_QUERY, { id: poolId })
    .toPromise();
  return result.data?.pairDayDatas?.[0] || null;
};

// Fetch the pool data for a given pool ID
export const fetchUniswapV2Pool = async (
  poolId: string,
): Promise<IUniswapV2Pool | null> => {
  const result = await client.query(POOL_QUERY, { id: poolId }).toPromise();
  return result.data?.pair || null;
};

// Custom Hook to fetch the Uniswap V2 pools on Base network
const useUniswapV2Pools = () => {
  const pools = useQuery({
    queryKey: ["uniswapV2Pools"],
    queryFn: async () => {
      const pools = await Promise.all(
        Object.values(UNISWAP_V2_POOL_IDS).map(async (id) => {
          const pool = await fetchUniswapV2Pool(id.toLowerCase());
          if (!pool) return null;

          const SWAP_FEE_PERCENTAGE = 0.003; // 0.3%

          const dayData = await fetchUniswapV2PoolDayData(id.toLowerCase());

          const dailyVolumeUSD = parseFloat(dayData?.dailyVolumeUSD || "0");
          const dailyFeesUSD = dailyVolumeUSD * SWAP_FEE_PERCENTAGE;

          return { ...pool, dailyVolumeUSD, dailyFeesUSD };
        }),
      );
      return pools.filter((pool): pool is IUniswapV2Pool => pool !== null);
    },
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5,
    retry: 2,
  });

  const getPoolById = (poolId: string) => {
    return pools.data?.find((pool) => pool.id === poolId);
  };

  return { pools, getPoolById };
};

export default useUniswapV2Pools;
