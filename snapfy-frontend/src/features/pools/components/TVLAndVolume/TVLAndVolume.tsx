"use client";
import React from "react";

import { formatCurrency } from "@/lib/utils";

import useUniswapTVLAndVolume from "../../hooks/useUniswapTVLAndVolume";

const TVLAndVolume = () => {
  const { data, isLoading, isError, error } = useUniswapTVLAndVolume();

  const loading = isLoading || !data;

  const INFOS = [
    {
      title: "Uniswap TVL",
      value: !loading ? formatCurrency(data.tvl) : "$0",
    },
    {
      title: "Uniswap Vol (24H)",
      value: !loading ? formatCurrency(data.volume24h) : "$0",
    },
  ];

  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="flex gap-3">
      {INFOS.map((info) => (
        <div
          key={info.title}
          className="bg-accent-blue/20 text-accent-blue flex flex-col gap-1 rounded-sm p-3 pr-6 md:p-4"
        >
          <h4 className="text-sm text-nowrap md:text-base">{info.title}</h4>
          <h2 className="text-xl font-semibold md:text-2xl">{info.value}</h2>
        </div>
      ))}
    </div>
  );
};

export default TVLAndVolume;
