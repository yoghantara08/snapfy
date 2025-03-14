export interface IPoolData {
  id: string;
  token0: {
    id: string;
    symbol: string;
    decimals: number;
    name: string;
  };
  token1: {
    id: string;
    symbol: string;
    decimals: number;
    name: string;
  };
  feeTier: number;
  token0Price: string;
  token1Price: string;
  liquidity: string;
  sqrtPrice: string;
  tick: number;
  volumeUSD: string;
  feesUSD: string;
  totalValueLockedUSD: string;
  totalValueLockedToken0: string;
  totalValueLockedToken1: string;
  poolDayData: {
    date: number;
    volumeUSD: string;
    feesUSD: string;
    tvlUSD: string;
  }[];
}
