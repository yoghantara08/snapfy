"use client";
import React from "react";

import useUniswapV3Pools from "@/hooks/useUniswapV3Pools";

import PoolCard from "./PoolCard";

const Pools = () => {
  const { data: pools, error, isLoading } = useUniswapV3Pools();

  if (!pools || isLoading) {
    return <>Loading...</>;
  }

  if (error) {
    return <>Error</>;
  }

  return (
    <section className="mt-4 lg:mt-6">
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {pools.map((pool) => (
          <PoolCard key={pool.id} poolData={pool} poolVersion="v3" />
        ))}
      </div>
    </section>
  );
};

export default Pools;
