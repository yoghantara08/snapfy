"use client";
import React from "react";

import useUniswapV3Pools from "@/hooks/useUniswapV3Pools";

import EmptyPool from "../EmptyPool/EmptyPool";

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
    <>
      {pools ? (
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {pools.map((pool) => (
            <PoolCard key={pool.id} poolData={pool} poolVersion="v3" />
          ))}
        </div>
      ) : (
        <EmptyPool
          title="No Matching Pools Found"
          description="No pools found. Try adjusting your filters or explore available liquidity pools to get started."
          buttonText="Reset Filter"
        />
      )}
    </>
  );
};

export default Pools;
