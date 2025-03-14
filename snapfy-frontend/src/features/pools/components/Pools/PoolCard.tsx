import React from "react";

import Image from "next/image";

import Button from "@/components/Button/Button";

const PoolCard = () => {
  return (
    <div className="shadow-accent-blue/20 w-full space-y-5 rounded-sm border p-4 shadow">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="flex">
            <Image
              src={"/tokens/usdc.svg"}
              alt="usdc"
              width={50}
              height={50}
              className="size-11 rounded-full"
            />
            <Image
              src={"/tokens/eth.svg"}
              alt="eth"
              width={50}
              height={50}
              className="-ml-3 size-11 rounded-full"
            />
          </div>
          <div className="flex flex-col">
            <h3 className="text-lg font-medium">USDC/ETH</h3>
            <div className="text-accent-blue flex gap-1.5 text-sm">
              <div className="bg-accent-blue/20 rounded-sm px-2 py-0.5">v2</div>
              <div className="bg-accent-blue/20 rounded-sm px-2 py-0.5">
                0.3%
              </div>
            </div>
          </div>
        </div>

        <div className="text-accent-blue bg-accent-blue/20 text rounded-sm px-2 py-1 font-medium">
          4.4% APR
        </div>
      </div>

      <div className="bg-accent-blue/20 space-y-4 rounded-sm px-3 py-4">
        <div className="flex justify-between">
          <span>Total Value Locked</span>
          <span>$22.5M</span>
        </div>
        <div className="flex justify-between">
          <span>24H Volume</span>
          <span>$905.6K</span>
        </div>
        <div className="flex justify-between">
          <span>24H Fees</span>
          <span>$2.7K</span>
        </div>
      </div>

      <Button className="!text-accent-blue !bg-accent-blue/20 hover:!bg-accent-blue/30 w-full">
        + Add Liquidity
      </Button>
    </div>
  );
};

export default PoolCard;
