export interface IUniswapV3Pool {
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

export interface IUniswapV2Pool {
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
  reserve0: string;
  reserve1: string;
  token0Price: string;
  token1Price: string;
  totalSupply: string;
  volumeUSD: string;
  untrackedVolumeUSD: string;
  txCount: string;
  reserveUSD: string;
  tvlUSD: number;
  dailyVolumeUSD: number;
  dailyFeesUSD: number;
}
