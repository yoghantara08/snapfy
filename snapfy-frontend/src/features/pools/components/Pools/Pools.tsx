"use client";
import React, { useState } from "react";

import { useUniswapV2Pools } from "@/hooks/useUniswapV2Pools";
import useUniswapV3Pools from "@/hooks/useUniswapV3Pools";
import { IUniswapV2Pool, IUniswapV3Pool } from "@/types";

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

  const v2Pools =
    selectedMenu === "All Pools" || selectedMenu === "V2" ? poolsV2 || [] : [];
  const v3Pools =
    selectedMenu === "All Pools" || selectedMenu === "V3" ? poolsV3 || [] : [];

  const searchFilter = (pool: IUniswapV2Pool | IUniswapV3Pool) => {
    const query = search.toLowerCase();
    return (
      pool.id.toLowerCase().includes(query) ||
      pool.token0.symbol.toLowerCase().includes(query) ||
      pool.token0.name.toLowerCase().includes(query) ||
      pool.token1.symbol.toLowerCase().includes(query) ||
      pool.token1.name.toLowerCase().includes(query)
    );
  };

  const filteredPoolsV2 = v2Pools.filter(searchFilter);
  const filteredPoolsV3 = v3Pools.filter(searchFilter);
  const hasPools = filteredPoolsV2.length > 0 || filteredPoolsV3.length > 0;

  return (
    <section className="space-y-4 md:space-y-6">
      <PoolsMenuFilter
        menus={MENUS}
        search={search}
        setSearch={setSearch}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
      />
      {hasPools ? (
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {filteredPoolsV2.map((pool) => (
            <PoolCardV2 key={pool.id} poolData={pool} poolVersion="v2" />
          ))}
          {filteredPoolsV3.map((pool) => (
            <PoolCardV3 key={pool.id} poolData={pool} poolVersion="v3" />
          ))}
        </div>
      ) : (
        <EmptyPool
          title="No Liquidity Pools Found"
          description="No pools found. Try adjusting your filters or explore available liquidity pools to get started."
          buttonText="Reset Filter"
          onClick={() => setSearch("")}
        />
      )}
    </section>
  );
};

export default Pools;
