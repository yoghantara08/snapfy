"use client";
import React, { useState } from "react";
import { FaMinus } from "react-icons/fa6";

import Image from "next/image";

import BigNumber from "bignumber.js";
import { Address } from "viem";
import { useAccount } from "wagmi";

import Button from "@/components/Button/Button";
import { UNISWAP_V2_POOL_IDS } from "@/constant";
import useLiquidityPosition from "@/hooks/useLiquidityPosition";
import { useUniswapV2GetPoolById } from "@/hooks/useUniswapV2Pools";
import { calculateAPRV2 } from "@/lib/utils/calculateAPR";

import EtherIcon from "../../../../../public/Image/etherIcon.svg";
import UsdcIcon from "../../../../../public/Image/usdcIcon.svg";

import RemoveLiquidityModal from "./RemoveLiquidityModal";

const pairAddress = UNISWAP_V2_POOL_IDS.ETH_USDC as Address;

const Positions = () => {
  const { address } = useAccount();
  const { data: position, isLoading } = useLiquidityPosition(
    address as Address,
    pairAddress,
  );
  const { data: pairData, isLoading: loading } =
    useUniswapV2GetPoolById(pairAddress);

  const [open, setOpen] = useState(false);

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

  const shareOfPool = position?.userShare.toFixed(6).toString();

  const APR = calculateAPRV2(
    pairData?.dailyFeesUSD || 0,
    parseFloat(pairData?.reserveUSD || "0"),
  );

  const loaded = !isLoading && !loading;

  return (
    <div className="grid w-full gap-3 md:grid-cols-2">
      <div className="shadow-opacity-blue flex w-full flex-col items-center justify-center gap-5 rounded-sm border p-5 shadow">
        <div className="sx:flex-row sx:gap-8 flex flex-col items-center justify-between gap-4">
          <div className="flex w-fit items-center justify-center gap-3">
            <div className="flex">
              <Image
                src={EtherIcon}
                alt="EtherIcon"
                width={50}
                height={50}
                className="size-14 rounded-full"
              />
              <Image
                src={UsdcIcon}
                alt="usdcIcon"
                width={50}
                height={50}
                className="-ml-3 size-14 rounded-full"
              />
            </div>
            <div className="flex flex-col items-start justify-center gap-1">
              <h3 className="text-xl font-medium">ETH/USDC</h3>
              <div className="flex items-center gap-2">
                <div className="bg-opacity-blue text-accent-blue rounded-sm px-2 py-[2px]">
                  v2
                </div>
                <div className="bg-opacity-blue text-accent-blue rounded-sm px-2 py-[2px]">
                  0.3%
                </div>
              </div>
            </div>
          </div>

          <p className="bg-opacity-green text-accent-green rounded-sm px-2 py-1">
            {loaded ? APR : 0}% APR
          </p>
        </div>
        <div className="bg-opacity-blue flex w-full flex-col items-center justify-center gap-2 rounded-sm p-3">
          <div className="flex w-full items-center justify-between gap-5">
            <p>Current Position</p>
            <p>${loaded ? currentUSDPosition : 0}</p>
          </div>
          <div className="flex w-full items-center justify-between gap-5">
            <p>Share of pool</p>
            <p>{loaded ? shareOfPool : 0}%</p>
          </div>
          <div className="flex w-full items-center justify-between gap-5">
            <p>Deposited ETH</p>
            <p>{loaded ? token0share : 0}</p>
          </div>
          <div className="flex w-full items-center justify-between gap-5">
            <p>Deposited USDC</p>
            <p>{loaded ? token1share : 0}</p>
          </div>
        </div>

        <Button
          onClick={() => setOpen(true)}
          className="!text-accent-blue !bg-accent-blue/20 hover:!bg-accent-blue/30 flex w-full items-center justify-center gap-1"
        >
          <FaMinus className="text-sm" /> Remove Liquidity
        </Button>
      </div>

      <RemoveLiquidityModal open={open} handleClose={() => setOpen(false)} />
    </div>
  );
};

export default Positions;
