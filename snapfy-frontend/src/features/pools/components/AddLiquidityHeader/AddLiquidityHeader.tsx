"use client";
import React from "react";

import Image from "next/image";
import Link from "next/link";

import { ExternalLinkIcon } from "lucide-react";

import OpenExternalLink from "@/components/OpenExternalLink/OpenExternalLink";
import { transformAddress } from "@/lib/utils";

interface AddLiquidityHeaderProps {
  token0Symbol: string;
  token1Symbol: string;
  poolId: string;
  poolVersion: string;
  feeTier: number;
}

const AddLiquidityHeader = ({
  token0Symbol,
  token1Symbol,
  poolId,
  poolVersion,
  feeTier,
}: AddLiquidityHeaderProps) => {
  return (
    <div className="space-y-5">
      <div className="text-lg">
        <Link href={"/pools"} className="font-semibold">
          Pools
        </Link>
        <span className="text-secondary">
          {" "}
          &gt; {token0Symbol}/{token1Symbol} Pool
        </span>
      </div>
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="flex">
          <Image
            src={`/tokens/${token0Symbol}.svg`}
            alt={token0Symbol}
            width={64}
            height={64}
            className="size-14 rounded-full"
          />
          <Image
            src={`/tokens/${token1Symbol}.svg`}
            alt={token1Symbol}
            width={64}
            height={64}
            className="-ml-3 size-14 rounded-full"
          />
        </div>
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-semibold md:text-3xl">
              {token0Symbol}/{token1Symbol}
            </h2>
            <div className="text-accent-blue flex gap-2 text-sm">
              <div className="bg-accent-blue/20 rounded-sm px-2 py-0.5">
                {poolVersion}
              </div>
              <div className="bg-accent-blue/20 rounded-sm px-2 py-0.5">
                {feeTier}%
              </div>
            </div>
          </div>
          <div className="text-secondary flex items-center gap-2">
            <span
              className="hover:text-primary cursor-pointer"
              onClick={() => navigator.clipboard.writeText(poolId)}
            >
              {transformAddress(14, 14, poolId)}
            </span>
            <OpenExternalLink link={`https://etherscan.io/address/${poolId}`}>
              <ExternalLinkIcon className="hover:text-primary size-4.5 cursor-pointer" />
            </OpenExternalLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddLiquidityHeader;
