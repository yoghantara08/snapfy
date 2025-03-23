import React from "react";

import Image from "next/image";
import Link from "next/link";

import Button from "@/components/Button/Button";
import { formatCurrency } from "@/lib/utils";
import { calculateAPR } from "@/lib/utils/calculateAPR";
import { IUniswapV3Pool } from "@/types";

interface PoolCardV3Props {
  poolData: IUniswapV3Pool;
  poolVersion: string;
}

const PoolCardV3 = ({ poolData, poolVersion }: PoolCardV3Props) => {
  const poolName =
    (poolData.token0.symbol === "WETH" ? "ETH" : poolData.token0.symbol) +
    "/" +
    (poolData.token1.symbol === "WETH" ? "ETH" : poolData.token1.symbol);

  return (
    <div className="shadow-accent-blue/20 w-full space-y-5 rounded-sm border p-4 shadow">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="flex">
            <Image
              src={`/tokens/${poolData.token0.symbol}.svg`}
              alt={poolData.token0.symbol}
              width={50}
              height={50}
              className="size-11 rounded-full"
            />
            <Image
              src={`/tokens/${poolData.token1.symbol}.svg`}
              alt={poolData.token1.symbol}
              width={50}
              height={50}
              className="-ml-3 size-11 rounded-full"
            />
          </div>
          <div className="flex flex-col">
            <h3 className="text-lg font-medium">{poolName}</h3>
            <div className="text-accent-blue flex gap-1.5 text-sm">
              <div className="bg-accent-blue/20 rounded-sm px-2 py-0.5">
                {poolVersion}
              </div>
              <div className="bg-accent-blue/20 rounded-sm px-2 py-0.5">
                {poolData.feeTier / 10000}%
              </div>
            </div>
          </div>
        </div>

        <div className="text-accent-green bg-accent-green/20 w-fit rounded-sm px-2 py-1 text-sm font-medium">
          {calculateAPR(
            poolData.poolDayData[0].feesUSD,
            poolData.poolDayData[0].tvlUSD,
          )}
          % APR
        </div>
      </div>

      <div className="bg-accent-blue/20 space-y-4 rounded-sm px-3 py-4">
        <div className="flex justify-between">
          <span>Total Value Locked</span>
          <span>{formatCurrency(poolData.totalValueLockedUSD)}</span>
        </div>
        <div className="flex justify-between">
          <span>24H Volume</span>
          <span>{formatCurrency(poolData.poolDayData[0].volumeUSD)}</span>
        </div>
        <div className="flex justify-between">
          <span>24H Fees</span>
          <span>{formatCurrency(poolData.poolDayData[0].feesUSD)}</span>
        </div>
      </div>

      <Link href={`/pools/${poolVersion}/${poolData.id}`}>
        <Button className="!text-accent-blue !bg-accent-blue/20 hover:!bg-accent-blue/30 w-full">
          + Add Liquidity
        </Button>
      </Link>
    </div>
  );
};

export default PoolCardV3;
