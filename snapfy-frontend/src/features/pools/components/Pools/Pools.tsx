"use client";
import React, { useState } from "react";

import useUniswapV2Pools from "@/hooks/useUniswapV2Pools";
import useUniswapV3Pools from "@/hooks/useUniswapV3Pools";

import EmptyPool from "../EmptyPool/EmptyPool";
import PoolsMenuFilter from "../PoolsMenuFilter/PoolsMenuFilter";

import PoolCardV2 from "./PoolCardV2";
import PoolCardV3 from "./PoolCardV3";

const MENUS = ["All Pools", "V2", "V3"];

const Pools = () => {
  const { data: poolsV2 } = useUniswapV2Pools();
  const { data: poolsV3, error, isLoading } = useUniswapV3Pools();

  const [search, setSearch] = useState("");
  const [selectedMenu, setSelectedMenu] = useState(MENUS[0]);

  if (!poolsV3 || !poolsV2 || isLoading) {
    return <>Loading...</>;
  }

  if (error) {
    return <>Error</>;
  }

  return (
    <section className="space-y-4 md:space-y-6">
      <PoolsMenuFilter
        menus={MENUS}
        search={search}
        setSearch={setSearch}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
      />
      {poolsV3 && poolsV3.length > 0 ? (
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {poolsV2.map((pool) => (
            <PoolCardV2 key={pool.id} poolData={pool} poolVersion="v2" />
          ))}
          {poolsV3.map((pool) => (
            <PoolCardV3 key={pool.id} poolData={pool} poolVersion="v3" />
          ))}
        </div>
      ) : (
        <EmptyPool
          title="No Liquidity Pools Found"
          description="No pools found. Try adjusting your filters or explore available liquidity pools to get started."
          buttonText="Reset Filter"
        />
      )}
    </section>
  );
};

export default Pools;
