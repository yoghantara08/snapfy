"use client";
import React from "react";

import BigNumber from "bignumber.js";
import { Address } from "viem";
import { useAccount } from "wagmi";

import { UNISWAP_V2_POOL_IDS } from "@/constant";
import useLiquidityPosition from "@/hooks/useLiquidityPosition";
import { useUniswapV2GetPoolById } from "@/hooks/useUniswapV2Pools";

const pairAddress = UNISWAP_V2_POOL_IDS.ETH_USDC as Address;

const TVLAndVolume = () => {
  const { address } = useAccount();
  const { data: position, isLoading } = useLiquidityPosition(
    address as Address,
    pairAddress,
  );
  const { data: pairData, isLoading: loading } =
    useUniswapV2GetPoolById(pairAddress);
  const token0share = position?.userToken0
    .div(10 ** 18)
    .toFixed(6)
    .toString();
  const token1share = position?.userToken1
    .div(10 ** 6)
    .toFixed(2)
    .toString();

  const currentUSDPosition = BigNumber(token0share || 0)
    .times(pairData?.token1Price || 0)
    .plus(token1share || 0)
    .toFixed(2)
    .toString();

  const loaded = !isLoading && !loading;

  return (
    <div className="flex gap-3">
      <div className="bg-accent-blue/20 text-accent-blue flex flex-col gap-1 rounded-sm p-3 pr-6 md:p-4">
        <h4 className="text-sm text-nowrap md:text-base">Networth</h4>
        <h2 className="text-xl font-semibold md:text-2xl">
          ${loaded ? currentUSDPosition : 0}
        </h2>
      </div>
    </div>
  );
};

export default TVLAndVolume;
