"use client";

import React, { useState } from "react";

import Networth from "@/features/dashboard/components/Networth/Networth";
import PoolsHeadline from "@/features/dashboard/components/PoolsHeadline/PoolsHeadline";
import PoolsMenuFilter from "@/features/dashboard/components/PoolsMenuFilter/PoolsMenuFilter";
import Positions from "@/features/dashboard/components/Positions/Positions";
import EmptyPool from "@/features/pools/components/EmptyPool/EmptyPool";

const DashboardPage = () => {
  const [pools] = useState(["dfkjvn", "sdkfjv"]);
  return (
    <div className="mt-6 mb-10 flex w-full justify-center sm:mt-8 lg:mt-12 lg:mb-28">
      <div className="mx-3 w-full max-w-[1070px]">
        <section className="flex flex-col gap-3 md:flex-row md:justify-between md:gap-4">
          <PoolsHeadline />
          <Networth />
        </section>
        <section className="space-y-4 md:space-y-6">
          <PoolsMenuFilter />
          {pools?.length > 0 ? (
            <Positions />
          ) : (
            <EmptyPool
              title="No Liquidity Positions Found"
              description="Add liquidity to a pool and view your positions here"
              buttonText="Explore Pools"
            />
          )}
        </section>
      </div>
    </div>
  );
};

export default DashboardPage;
