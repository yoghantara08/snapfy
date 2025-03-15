import React from "react";
import { FaPlus } from "react-icons/fa6";

import Image from "next/image";

import EtherIcon from "../../../../../public/Image/etherIcon.svg";
import UsdcIcon from "../../../../../public/Image/usdcIcon.svg";

const PoolList = () => {
  return (
    <div className="poolListGrid grid w-full gap-8">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="border-border2 flex min-h-[200px] w-full flex-col items-center justify-center gap-5 rounded-[10px] border-[1px] p-5"
        >
          <div className="sx:flex-row sx:gap-8 flex flex-col items-center justify-between gap-4">
            <div className="flex w-fit items-center justify-center gap-2">
              <div className="flex">
                <Image src={UsdcIcon} alt="usdcIcon" className="w-[40px]" />
                <Image
                  src={EtherIcon}
                  alt="EtherIcon"
                  className="w-[40px] translate-x-[-10px]"
                />
              </div>
              <div className="flex flex-col items-start justify-center gap-1">
                <h3 className="text-xl font-medium">USDC/ETH</h3>
                <div className="flex items-center gap-2">
                  <div className="bg-opacity-blue text-accent-blue rounded-[7px] px-2 py-[2px]">
                    v2
                  </div>
                  <div className="bg-opacity-blue text-accent-blue rounded-[7px] px-2 py-[2px]">
                    0.3%
                  </div>
                </div>
              </div>
            </div>
            <p className="bg-opacity-blue text-accent-blue rounded-[7px] px-2 py-1">
              4.4% APR
            </p>
          </div>
          <div className="bg-opacity-blue flex w-full flex-col items-center justify-center gap-2 p-3">
            <div className="flex w-full items-center justify-between gap-5">
              <p>Total Value Locked</p>
              <p>$22.5M</p>
            </div>
            <div className="flex w-full items-center justify-between gap-5">
              <p>24h Volume</p>
              <p>$905.6K</p>
            </div>
            <div className="flex w-full items-center justify-between gap-5">
              <p>24h Fee</p>
              <p>$2.7K</p>
            </div>
          </div>
          <button className="bg-opacity-blue text-accent-blue flex w-full items-center justify-center gap-1 rounded-[5px] px-3 py-2">
            <FaPlus className="text-sm" />
            Add Liquidity
          </button>
        </div>
      ))}
    </div>
  );
};

export default PoolList;
